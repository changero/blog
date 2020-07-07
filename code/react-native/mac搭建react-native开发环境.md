---
title: mac搭建react-native开发环境
date: 2020-07-07
categories:
  - react-native
tags:
  - 配置
---

## ios端

#### 安装homebrew

搜索按照官方命令直接安装

#### 安装nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

可以将以上github地址替换为`jsdelivr`CDN

```bash
curl -o- https://cdn.jsdelivr.net/gh/nvm-sh/nvm@v0.35.3/install.sh | bash
```

##### 配置环境变量

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```



##### 使用nvm安装node

1、配置镜像

```bash
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
```

2、查看可用版本

```bash
nvm ls-remote --lts
```

3、安装

```bash
nvm install xx.xx.xx
```

4、安装镜像管理包nrm

```bash
npm install nrm -g
nrm use taobao
```

到这里就可以通过npm来安装`react-native-cli`工具了

```bash
npm install react-native-cli
```

*可选yarn替代npm*

#### 安装watchman

```bash
brew install watchman
# 或者通过代理的形式安装
all_proxy=socks5://127.0.0.1:1080 brew install watchman
```

#### 安装xocde并配置common Line tools

启动 Xcode，并在`Xcode | Preferences | Locations`菜单中检查一下是否装有某个版本的`Command Line Tools`

#### 安装cocoapods

[CocoaPods](https://cocoapods.org/)是用 Ruby 编写的包管理器。从 0.60 版本开始 react native 的 iOS 版本需要使用 CocoaPods 来管理依赖，可以使用brew安装，也可以使用ruby的包管理工具安装

```bash
sudo gem install cocoapods
```

*可选配置cocoapods的中科大源*，[参考](https://mirrors.tuna.tsinghua.edu.cn/help/CocoaPods/)

### 初始化项目

```bash
react-native init myrn
```

### 启动

建议在ios目录下通过pod先安装依赖

```bash
cd myrn && pod install 
```

安装报错，可以[参考](https://www.jianshu.com/p/7b21254cbd77)

可以提前设置好代理

```bash
export all_proxy=socks5://127.0.0.1:1080
```

最后可以通过打开ios目录下的`.xcworkspace`文件直接导入到XCODE中运行，也可以执行：

```bash
react-native run-ios
```

来启动项目。此时会打开ios模拟器和一个终端

### 可能出现的问题

在启动终端打开模拟器的时候，出现找不到node执行文件的情况。

原因是启动的终端的环境变量中并没有node，主要跟终端的配置有关。通过nvm安装node，以软连接的形式将node链接到全局环境下

```bash
ln -s $(which node) /usr/local/bin/node
```

或者在xcode中配置，[参考](https://www.jianshu.com/p/4501ed597aba)

## Android端配置

`brew`、`node`、`watchman`等安装配置参考上面。一定要备好梯子

### 安装JDK

mac一般自带jdk，也可以手动安装，[下载地址](https://www.kagura.me/dev/20200424112618.html)

然后配置环境变量

```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_251.jdk/Contents/Home
PATH=$JAVA_HOME/bin:$PATH:.
CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
export JAVA_HOME
export PATH
export CLASSPATH
```

试试运行javac

### 安装Android Studio

可以在这个[网站](https://www.androiddevtools.cn/#)上下载，也可以去官网，备好梯子。

#### SDK的安装

如果下载到没有SDK的版本，需要单独下载SDK，[参考](https://testerhome.com/topics/19377)

然后需要配置sdk环境变量

```bash
export ANDROID_HOME=$HOME/XXX
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```



### 启动项目

先执行`npm run android`构建Android项目，并启动一个Server。

将android项目导入到android studio，点击模拟器启动，第一次需要创建一个模拟器。按步骤执行安装模拟器虚拟设备就可以了

最后启动成功

#### 关于maven镜像的问题

可以尝试阿里云提供的[maven 镜像](https://help.aliyun.com/document_detail/102512.html?spm=a2c40.aliyun_maven_repo.0.0.361865e90r2x4b)，将`android/build.gradle`中的`jcenter()`和`google()`分别替换为`maven { url 'https://maven.aliyun.com/repository/jcenter' }`和`maven { url 'https://maven.aliyun.com/repository/google' }`（注意有多处需要替换

