---
title: docker安装及加速器和镜像
date: "2021-11-17 20:57:21"
categories:
  - linux
tags:
  - docker
lang: zh-cn
---

## 安装

[参考](../linux/centos搭建k8s.html#安装-docker)

## registry

registry 是提供仓库的地方，最常使用的 Registry 公开服务是官方的[ Docker Hub](https://hub.docker.com)，这也是默认的 Registry，并拥有大量的高质量的 官方镜像。除此以外，还有 Red Hat 的 [Quay.io](https://quay.io/repository/)；Google 的 [Google Container Registry](https://cloud.google.com/container-registry/)，[Kubernetes](https://kubernetes.io/)的镜像使用的就是这个服务；代码托管平台 GitHub 推出的 [ghcr.io](https://docs.github.com/cn/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

<!-- more -->

由于某些原因，在国内访问这些服务可能会比较慢。国内的一些云服务商提供了针对 Docker Hub 的镜像服务（Registry Mirror），这些镜像服务被称为 加速器。常见的有 [阿里云加速器](https://www.aliyun.com/product/acr?source=5176.11533457&userCode=8lx5zmtu)、[DaoCloud 加速器](https://www.daocloud.io/mirror#accelerator-doc)等。使用加速器会直接从国内的地址下载 Docker Hub 的镜像，比直接从 Docker Hub 下载速度会提高很多。

国内也有一些云服务商提供类似于 Docker Hub 的公开服务。比如 [网易云镜像服务](https://c.163.com/hub#/m/library/)、[DaoCloud 镜像市场](https://hub.daocloud.io/)、[阿里云镜像库](https://www.aliyun.com/product/acr?source=5176.11533457&userCode=8lx5zmtu)等

```json
{
  "registry-mirrors": [
    "https://registry.docker-cn.com",
    "https://mirror.ccs.tencentyun.com",
    "http://docker.mirrors.ustc.edu.cn",
    "http://hub-mirror.c.163.com"
  ]
}
```

## docker-compose 一键安装

```
curl -L https://github.com/docker/compose/releases/download/v2.1.0/docker-compose-linux-`uname -m` -o /usr/local/bin/docker-compose
# 添加执行权限
chmod +x /usr/local/bin/docker-compose
# 检查版本
docker-compose version
```
