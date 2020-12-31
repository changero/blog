---
title: nvm
date: 2020-12-19
categories:
  - node
---

github 仓库地址：[https://github.com/creationix/nvm](https://github.com/creationix/nvm)

## 安装

```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.37.2/install.sh | bash
# 或者
wget -qO- https://cdn.jsdelivr.net/gh/creationix/nvm@v0.37.2/install.sh | bash
# 不过最后都是从github下载，其实也没多大区别
```

安装完成后执行下面的命令检查：

```bash
nvm --version
```

<!-- more -->

## 基本用法

```bash
nvm ls-remote
# 只列出LTS版本
nvm ls-remote --lts
```

下一步就是安装 nodejs

### 安装 node

```bash
nvm install [version]
```

version 可以只不用指定具体的版本号，nvm 会自动下载指定版本的最新版本

### 下载加速

通过设置环境变量

```bash
NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirror/node/
```

### 设置 npm 仓库镜像

推荐 nrm 包，或者

```bash
npm config set registry=https://registry.npm.taobao.org
```

### 自动版本切换

```bash
npm install avn avn-nvm
```
