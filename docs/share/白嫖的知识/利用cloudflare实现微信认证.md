---
title: 利用cloudflare实现微信认证
date: '2022-08-12 21:12:50'
categories:
  - cloudflare
lang: zh-cn
---

我们在本地开发微信[网页授权](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)功能的时候，首选需要用户同意并获取 code。

而 code 的获取则需要我们传递一个`redirect_uri`参数，用以在授权成功以后，微信服务器将 code 作为参数添加到`redirect_uri`中，并进行重定向。例如官方给的授权地址例子：

<blockquote><p style="word-break: break-all">https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&amp;redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php&amp;response_type=code&amp;scope=snsapi_base&amp;state=123#wechat_redirect</p></blockquote>

但是在配置相关网页授权回调域名的时候，没有办法配置本地域名的开发，所以一般会采用以下的方式

- 通过内网穿透，将服务暴露到公网，如：ngrok、frp 等工具

- 修改 hosts，将一个域名指向本地

于是总结了第三种方法：利用 Cloudflare 来承接微信的重定向获取 code。

**首先需要准备以下信息**

- cloudflare 账号
- 域名

1. 在 cloudflare 的域名中，添加一条 A 记录 解析，**注意：一定要打开代理**

2. 创建一个 worker，代码如下：

```js
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const ri = url.searchParams.get('ri');
  const u = new URL(decodeURIComponent(ri));
  u.searchParams.set('code', code);
  return Response.redirect(u.toString(), 301);
}
```

3. 在域名的 workers 中添加一条 http 路由，将刚才的域名解析到创建的 worker 上。**注意：域名后面一定要添加/\*来表示通配符**

4. 配置微信的回调域名为第一步添加的域名记录

5. 将 redirect_uri 改为`encodeURIComponent('https://wechat.demo.com?ri=' + encodeURIComponent("http://localhost:8080"))`的结果，这样 cloudflare work 拿到 code 以后就会自动重定向到本地服务上

6. 拿到 code 以后，后续的流程保持不变即可
