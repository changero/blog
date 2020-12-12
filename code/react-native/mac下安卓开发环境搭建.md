---
title: mac下安卓开发环境搭建
date: 2020-12-12
---

### 工具

- jdk
- Android studio

微云里面有

### 安装 jdk

[下载地址](https://www.kagura.me/dev/20200424112618.html)

直接点击安装，默认安装到`/usr/bin`，所以不用关心环境变量

### 安装 androidStudio

[下载地址](https://developer.android.google.cn/studio)

直接安装，打开的时候默认会安装安卓 sdk 包，包含 tools、platform-tools、build-tools

可以配置安卓 sdk 的环境变量

```bash
export PATH="/Users/changero/Library/Android/sdk:$PATH"
export PATH="/Users/changero/Library/Android/sdk/build-tools:$PATH"
export PATH="/Users/changero/Library/Android/sdk/platform-tools:$PATH"
export PATH="/Users/changero/Library/Android/sdk/tools:$PATH"

```

路径根据实际情况配置
