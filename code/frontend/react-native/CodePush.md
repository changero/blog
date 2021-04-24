---
title: CodePush
date: "2021-04-24 16:12:09"
categories:
  - 前端
tags:
  - react-native
lang: zh-cn
---

# Code Push

## react-native-code-push

微软开发的中心化 codepush

## code-push-cli

本地通过命令操作 codepush，相当于客户端，默认连接的是微软官方的服务

<!-- mode -->

### 安装

指定 2.1.9 版本，否则不能用自定义的 server 服务

> npm i code-push-cli@2.1.9 -g

```bash
# 注册
code-push register
```

## [code-push-server](https://github.com/lisong/code-push-server)

可用于自行搭建的 codepush 服务，[参考](https://www.jianshu.com/p/ca4beb5973bb)

## 操作

### 登录

> code-push login https://ip:port

### 注册

> code-push register https://ip:port

### APP 相关命令

> code-push app --help

#### 添加 APP

> code-push app add --help

e.g

> code-push app add rndemo-ios ios react-native
>
> code-push app add rndemo-android android react-native

就可以获取`DevelopmentKey`了，之后就可以在`info.plist`中修改

| Name                  | String         |
| --------------------- | -------------- |
| CodePushDeploymentKey | DeploymentKey  |
| CodePushServerURL     | http://ip:port |

### 推热更

> code-push release-react --help

e.g

> code-push release-react rndemo-android android --t 3.4.2 --dev false --d Staging --des "youhui" --m true

> code-push release-react rndemo-ios android --t 3.3.0 --dev false --d Production --des "更新了一部分内容" --m true

### 添加部署环境

> code-push deployment add <app_name> test

### 查看 APP 的环境信息

> code-push deployment list <app_name> --format json

### 查看应用列表

> code-push app list

### 查看 Bundle 包

> code-push deployment history rndemo-android Staging
> code-push deployment history rndemo-android Production

### 回滚

> code-push rollback MyApp Production // "MyApp"中"Production"部署执行回滚
> code-push rollback MyApp Production --targetRelease v4 // "MyApp"中"Production"部署执行回滚，回滚到 v4 这个标签版本
> code-push rollback GeekMathAppAndroid Production --targetRelease v50 // "MyApp"中"Production"部署执行回滚，回滚到 v4 这个标签版本

### react-native 打包命令

> react-native bundle --entry-file index.js --bundle-output ./android/[path]/.jsbundle --platform android --dev false
>
> react-native bundle --entry-file index.js --bundle-output ./ios/[path]/.jsbundle --platform ios--dev false

### rn 中集成

```js
import CodePush from "react-native-code-push";

const APP = () => {};

export default CodePush(APP);
export default CodePush({
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(APP);
```

### 安卓集成

### ios 集成

[Code-Push 使用 - 简书 (jianshu.com)](https://www.jianshu.com/p/cd7576af381f)
