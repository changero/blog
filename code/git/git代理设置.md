---
title: git代理设置
date: 2020-03-11
categories:
  - git
tags:
  - 代理
---

### git设置全局代理
```bash
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080

git config --global --unset http.proxy
git config --global --unset https.proxy

npm config delete proxy
```

### 只对github.com
```bash
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080

# 取消代理
git config --global --unset http.https://github.com.proxy
```

### ssh协议
对于使用git@协议的，可以配置socks5代理
在~/.ssh/config 文件后面添加几行，没有可以新建一个
```bash
Host github.com
    ProxyCommand nc -X 5 -x 127.0.0.1:1080 %h %p
```

ssh访问
需要修改~/.ssh/config文件, 没有的话新建一个. 同样仅为github.com设置代理:
```bash
Host github.com
    User git
    ProxyCommand nc -v -x 127.0.0.1:1086 %h %p
```
如果是在Windows下, 则需要个性%home%.ssh\config, 其中内容类似于:
```bash
Host github.com
    User git
    ProxyCommand connect -S 127.0.0.1:1086 %h %p
```
需要设置一个环境变量
如果要设置默认密码：
```
SOCKS5_PASSWD
HTTP_PROXY_PASSWORD
```
如果要设置默认用户名：
```
SOCKS_USER
HTTP_PROXY_USER
```

## 参考

- [在 Windows 上给 Git SSH 设置代理](https://walkedby.com/sshwindowsproxy/)
