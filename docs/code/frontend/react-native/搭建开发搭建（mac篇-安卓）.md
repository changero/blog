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

> 2023-08-02更新
> 如今官网推荐通过brew安装jdk，`brew tap homebrew/cask-versions`，`brew install --cask zulu11`，如果失败，先更新brew,`brew update`。[原文](https://reactnative.cn/docs/environment-setup#java-development-kit)
> React Native 需要 Java Development Kit [JDK] 11。你可以在命令行中输入 javac -version（请注意是 javac，不是 java）来查看你当前安装的 JDK 版本。
> 低于 0.67 版本的 React Native 需要 JDK 1.8 版本（官方也称 8 版本）。
> ps: macos默认jdk版本就是1.8

## 安装 androidStudio

[下载地址](https://developer.android.google.cn/studio)，也可以在这个[网站](https://www.androiddevtools.cn/#)上下载

直接安装，打开的时候默认会安装安卓 sdk 包，包含 tools、platform-tools、build-tools，这一步最好配置好一个可用的代理

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

在连接上手机以后，可以执行`npx react-native doctor`查看当前环境还有哪些没有设置好

## 启动服务

1. 直接在android studio上启动，启动成功之后，会在连接的设备或者模拟器上安装开发的APP
2. 启动js Server，执行`npm start --port 8188`，可以通过port参数修改启动的端口，默认在8081
3. 以上两个步骤可以合为一个即`npm run android`
4. 手机连接电脑上的服务，可以查看[调试FAQ](./调试FAQ)

## 打包

[官网的打包流程](https://reactnative.cn/docs/signed-apk-android)

其中两个步骤可以做替换

1. keystore的生成，可以直接在Android Studio上生成，具体可以查看[网址](https://blog.csdn.net/xiaohelan/article/details/105514531)
2. 生成APK，除了在Android目录下执行`./gradlew assembleRelease`，也可以直接在Android Studio上选择`build > Generate Sign Bundle/Apk`执行




