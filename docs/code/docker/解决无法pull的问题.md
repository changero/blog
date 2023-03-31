---
title: 解决无法pull的问题
date: '2023-03-25 16:31:44'
categories:
  - docker
lang: zh-cn
---

事情是这样的，nas机器上有几个服务版本太老，想要通过docker升级一下，但是在执行`docker pull`的时候永远都会返回一个错误

> Error response from daemon: Get "https://registry-1.docker.io/v2/": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)

看到这个提示的，第一时间能想到的就是在pull的时候，直接走了官方的镜像源去下载，由于网络的问题导致了下载失败。

所以自然就想到了用[`registry-mirrors`](./docker安装及加速器和镜像) 来解决这个问题。中间还经历过对docker的卸载和重装，版本是升级为了23版本

结果无论怎么修改`registry-mirrors`，哪怕是只留下自己在阿里云容器服务里的专有地址，都仍然出现上面的错误

期间除了修改`registry`，还包括修改本机DNS等都无济于事

鬼使神差之下，想着能不同通过登录阿里云的容器服务，来下载包，于是指定`docker login --username=email registry-cn.hangzhou.aliyuncs.com `为阿里云容器服务公网地址。这时候仍然出现了上述的错误，但是提示的地址变为了阿里云的地址，也就是说这个时候，确确实实走的是阿里云的地址去登录，但为什么还是无法登录呢？

我直接ping了一下阿里云的地址，发现是能ping通的，也就是说本机网络，和地址都没有问题，问题就只可能出现docker上

由于对docker不是很熟悉，所以就想到能不能通过代理让docker去执行pull的动作，最后发现是可行的，具体设置方法可以查看[文章](https://cloud.tencent.com/developer/article/1806455)，摘抄至如下：

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo touch /etc/systemd/system/docker.service.d/proxy.conf
```

修改这个conf文件

```
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:8080/"
Environment="HTTPS_PROXY=http://proxy.example.com:8080/"
Environment="NO_PROXY=localhost,127.0.0.1,.example.com"
```

然后重启

```bash
systemctl daemon-reload
systemctl restart docker
```

接着再次执行pull的时候，就可以了。

并且，发现这个时候在代理软件中看到了，在`registry-mirrors`设置的阿里云专属加速地址也可以用了，反正就是贼神奇

对了，docker升级以后，对非登录用户做了限制，所以pull之前是必须要登录的

> - 根据Docker公司政策，2020年11月01日起将逐步向Docker Hub匿名和免费用户实施速率和拉取请求次数限制。ACR镜像加速器无法保障一定拉取到latest最新的镜像版本，建议您指定镜像版本拉取。
>
>   关于Docker Hub拉取请求次数限制的详细介绍，请参见[Download rate limit](https://docs.docker.com/docker-hub/download-rate-limit/)。