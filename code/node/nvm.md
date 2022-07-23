---
title: nvm
date: 2020-12-19
categories:
  - npm
---

## mac 端安装

github 仓库地址：[https://github.com/creationix/nvm](https://github.com/creationix/nvm)

### 安装

```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.37.2/install.sh | bash
# 或者
wget -qO- https://cdn.jsdelivr.net/gh/creationix/nvm@v0.37.2/install.sh | bash
# 或者
wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
# 不过最后都是从github下载，其实也没多大区别
```

centos 下也可以通过 yum 安装

```bash
curl -sL https://rpm.nodesource.com/setup_10.x | bash -

yum install -y nodejs
```

安装完成后执行下面的命令检查：

```bash
nvm --version
```

<!-- more -->

### 基本用法

```bash
nvm ls-remote
# 只列出LTS版本
nvm ls-remote --lts
```

下一步就是安装 nodejs

#### 安装 node

```bash
nvm install [version]
```

version 可以只不用指定具体的版本号，nvm 会自动下载指定版本的最新版本

#### 下载加速

通过设置环境变量

```bash
NVM_NODEJS_ORG_MIRROR=https://registry.npmmirror.com/-/binary/node
```

#### 设置 npm 仓库镜像

推荐 nrm 包，或者

```bash
npm config set registry=https://registry.npmmirror.com/
```

#### 自动版本切换

```bash
npm install avn avn-nvm
```

## windows 下安装

### 首先安装 scoop

查看[scoop 的安装](/share/tools/windows包管理工具.html#scoop)

### 使用

在 scoop 的安装目录，下找到`apps/nvm/current`，用管理员模式双击打开`install.cmd`。

#### 配置镜像

配置 node 镜像

> nvm node_mirror https://registry.npmmirror.com/-/binary/node

配置 npm 镜像

> nvm npm_mirror https://registry.npmmirror.com/-/binary/npm

#### 查看可用安装

> nvm ls available

#### 安装和卸载

```bash
# 安装
  nvm install [version]
# 卸载
  nvm uninstall [version]
```
