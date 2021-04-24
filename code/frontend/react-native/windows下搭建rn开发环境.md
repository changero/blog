---
title: windows下搭建rn开发环境
date: "2021-04-24 16:12:41"
categories:
  - 前端
tags:
  - react-native
lang: zh-cn
---

## windows 下搭建 rn 开发环境

### 安装

必须环境`node`,`jdk8`, `android studio`

#### 安装 Android Studio

```bash
sudo winget install Google.AndroidStudio
```

<!-- more -->

#### 创建环境变量

- `ANDROID_HOME`：默认是在 C:\Users\[用户目录]\AppData\Local\Android\Sdk\

以下变量添加到 PATH 中

- `platform-tools`：%ANDROID_HOME%\platform-tools
- `emulator`：%ANDROID_HOME%\emulator
- `tools`：%ANDROID_HOME%\tools
- `tools/bin`：%ANDROID_HOME%\tools\bin

#### 安装 jdk

```bash
$ sudo winget install BellSoft.LibericaJDK8
```

会自动设置好环境变量

#### licenses 信任

> sdkmanager.bat --licenses
>
> 执行之后，它会提示你去允许认证，然后命令会提醒你确定 y/n（accept lincense），一路 y 下去便可以了。

#### 安装 react-native-cli

```bash
$ npm install react-native-cli -g
```
