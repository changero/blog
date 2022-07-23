---
title: 部署Heroku
date: 2020-09-10
---

**已失效**

### 部署 Heroku

- 登录[Heroku](https://id.heroku.com/login)

- 到[仓库地址](https://github.com/bclswl0827/v2ray-heroku)中点击 Deploy

- 输入 APPName，记录 UUid

- 部署完成以后，配置 v2ray

  ```json
  {
    "address": "输入的APPName.herokuapp.com",
    "port": 443,
    "alterId": 64
  }
  ```

网络选择`ws`，路径`/`，加密传输选择`tls`，选择不校验

### CloudFlare

登录[cloudFlare](https://www.cloudflare.com)

添加一个 worker

```js
addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  url.hostname = '输入的APPName.herokuapp.com';
  const request = new Request(url, event.request);
  event.respondWith(fetch(request));
});
```

### 配置

直接修改 address 为 worker 的地址

或者 address 填`cloudflare.com`、下面的 hosts 和 tls servername 都填 worker 的地址，然后删掉 path
