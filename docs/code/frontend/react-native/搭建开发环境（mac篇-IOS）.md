---
title: 搭建开发环境（mac篇-IOS）
date: 2020-07-07
categories:
  - react-native
tags:
  - 配置
---

最新环境搭建[文档](https://www.react-native.cn/docs/environment-setup)

## 安装 homebrew

搜索按照官方命令直接安装

## 安装 nvm

[查看](/code/node/nvm.html)安装方法

## 安装 watchman

```bash
brew install watchman
# 或者通过代理的形式安装
all_proxy=socks5://127.0.0.1:1080 brew install watchman
```

## 安装 xocde 并配置 common Line tools

启动 Xcode，并在`Xcode | Preferences | Locations`菜单中检查一下是否装有某个版本的`Command Line Tools`

## 安装 cocoapods

[CocoaPods](https://cocoapods.org/)是用 Ruby 编写的包管理器。从 0.60 版本开始 react native 的 iOS 版本需要使用 CocoaPods 来管理依赖，可以使用 brew 安装，也可以使用 ruby 的包管理工具安装

```bash
sudo gem install cocoapods
```

或者通过homebrew安装

```bash
brew install cocoapods
```

可以查看pod[安装](./pod安装)相关

_可选配置 cocoapods 的中科大源_，[参考](https://mirrors.tuna.tsinghua.edu.cn/help/CocoaPods/)

## 初始化项目

```bash
npx react-native@latest init myrn --npm
```

### 出现ruby版本过低的问题

mac电脑上自带的ruby版本可能过低，需要手动重新安装。可以通过brew安装

```bash
brew search ruby

brew install ruby@3.0
```

然后配置zsh配置文件

```bash
export PATH=/opt/homebrew/opt/ruby@3.1/bin:$PATH
```

最后执行`source ~/.zshrc`就可以了

## 启动

如果在初始化过程中，pod相关的依赖都已经正确安装，否则建议在 ios 目录下通过 pod 先安装依赖

```bash
cd myrn/ios && pod install
```

安装报错，可以[参考](https://www.jianshu.com/p/7b21254cbd77)

可以提前设置好代理

```bash
export all_proxy=socks5://127.0.0.1:1080
```

最后可以通过打开 ios 目录下的`.xcworkspace`文件直接导入到 XCODE 中运行，并等待xcode索引完成

也可以执行：

```bash
react-native run-ios
```

来启动项目。此时会打开 ios 模拟器和一个终端

## 可能出现的问题

在启动终端打开模拟器的时候，出现找不到 node 执行文件的情况。

原因是启动的终端的环境变量中并没有 node，主要跟终端的配置有关。通过 nvm 安装 node，以软连接的形式将 node 链接到全局环境下

```bash
ln -s $(which node) /usr/local/bin/node
```

或者在 xcode 中配置，[参考](https://www.jianshu.com/p/4501ed597aba)

### 启动项目

先执行`npm run android`构建 Android 项目，并启动一个 Server。

将 android 项目导入到 android studio，点击模拟器启动，第一次需要创建一个模拟器。按步骤执行安装模拟器虚拟设备就可以了

最后启动成功

#### 关于 maven 镜像的问题

可以尝试阿里云提供的[maven 镜像](https://help.aliyun.com/document_detail/102512.html?spm=a2c40.aliyun_maven_repo.0.0.361865e90r2x4b)，将`android/build.gradle`中的`jcenter()`和`google()`分别替换为`maven { url 'https://maven.aliyun.com/repository/jcenter' }`和`maven { url 'https://maven.aliyun.com/repository/google' }`（注意有多处需要替换

## QA

1. 启动之后显示`no bundle url present`

a. 在 package.json 中添加一条，然后执行`npm run build:ios`

    ```json
      {
        "scripts":{
          "build:ios": "react-native --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios'"
        }
      }
    ```

b. 打开 xcode，选择`Select -> Target → Build Phases`,在`Copy Bundle Resources`下添加好刚才构建出来的 main.jsbundle

c. 重新启动

[参考连接](https://onexlab-io.medium.com/no-bundle-url-present-fixed-ca2688a80f66)
