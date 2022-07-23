---
title: 搭建开发搭建（mac篇-安卓）
date: 2020-12-12
---

最新环境搭建[文档](https://www.react-native.cn/docs/environment-setup)

## 工具

- jdk
- Android studio

微云里面有

## 安装 jdk

mac 一般自带 jdk，也可以手动安装，[下载地址](https://www.kagura.me/dev/20200424112618.html)

然后配置环境变量

```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_251.jdk/Contents/Home
PATH=$JAVA_HOME/bin:$PATH:.
CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
export JAVA_HOME
export PATH
export CLASSPATH
```

试试运行 javac

## 安装 androidStudio

[下载地址](https://developer.android.google.cn/studio)，也可以在这个[网站](https://www.androiddevtools.cn/#)上下载

直接安装，打开的时候默认会安装安卓 sdk 包，包含 tools、platform-tools、build-tools

也可以单独下载 SDK，[参考](https://testerhome.com/topics/19377)

可以配置环境变量

```bash
export ANDROID_HOME=$HOME/XXX
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```

路径根据实际情况配置
