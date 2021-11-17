---
title: harbor搭建及证书生成
date: "2021-11-17 20:54:30"
categories:
  - linux
tags:
  - harbor
lang: zh-cn
---

## 安装 harbor

到[Releases · goharbor/harbor · GitHub](https://github.com/goharbor/harbor/releases)页面下载离线包,比如：[harbor-offline-installer-v2.3.4.tgz](https://github.com/goharbor/harbor/releases/download/v2.3.4/harbor-offline-installer-v2.3.4.tgz)

```bash
tar -xvf harbor-offline-installer-v2.3.4.tgz
```

解压以后修改其中的 harbor.yml 配置文件，并执行`./install.sh`开始安装

<!-- more -->

### 生成自验证证书

- 生成服务器私钥

  ```text
  openssl genrsa -des3 -out server.key 2048
  ```

- 生成服务器签署申请文件

  ```text
  openssl req -new -out server.csr -key server.key -config /etc/ssl/openssl.cnf
  ```

- ##### 从秘钥中删除 Passphrase

  ```text
  cp server.key server.key.org
  openssl rsa -in server.key.org -out server.key
  ```

- 签名，生成一个 3650 天的临时证书

  ```text
  openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt
  ```

参考使用 CA 创建证书,[https 搭建(自签名证书) - 数小钱钱的种花兔 - 博客园 (cnblogs.com)](https://www.cnblogs.com/buptleida/p/12090237.html)或者[如何创建自签名的 SSL 证书 - 简书 (jianshu.com)](https://www.jianshu.com/p/e5f46dcf4664)

## 登陆

修改`/etc/docker/daemon.json`

添加

```json
"insecure-registries": ["https://harbor的ip和端口"]
```
