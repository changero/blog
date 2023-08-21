---
title: RN第三方包
date: '2021-06-24 22:08:07'
categories:
  - 前端
tags:
  - react-natives
lang: zh-cn
---

常用的 react-native 第三方工具

## RN 第三方包

- react-native-version-number
- react-native-extra-dimensions-android
- react-native-reanimated
- [react-native-modal - npm (npmjs.com)](https://www.npmjs.com/package/react-native-modal)
- react-native-swiper
- react-native-linear-gradient
- react-native-shadow
- react-native-communications
- react-native-scrollable-tab-view
- react-native-gesture-handler
- react-native-root-siblings
- rn-fetch-blob、[react-native-fetch-blob](https://github.com/wkh237/react-native-fetch-blob)
- react-native-system-setting 系统音量亮度控制
- react-native-orientation **react-native-orientation-locker** 控制方向
- react-native-video
- react-native-silder
- svg - `react-native-svg`、`react-native-svg-transforms`、[`react-native-svg-transformer`](https://www.npmjs.com/package/react-native-svg-transformer)
- 导航 - `react-navigation`
- 图标 - `react-native-vector-icons`
- UI 组件 - `react-native-paper`、`[nativebase](https://docs.nativebase.io/installation)`
- 动画 - `react-native-reanimated`
  - [`react-native-animatable`](https://github.com/oblador/react-native-animatable)
  - `react-native-pose`
- 渐变 - `react-native-liner-gradient`
- 启动页
  - `react-native-bootsplash`
  - `react-native-splash-screen`
- 优化图片 - `react-native-fast-image`
- 环境变量 - `react-native-dotenv`
- 存储 - `react-native-async-storage/async-storage`
- 相机 - `react-native-camera`、[`react-native-vision-camera`](https://github.com/mrousavy/react-native-vision-camera)
- 图片剪切 - `react-native-image-crop-picker`
- 系统相册 - [`react-native-image-picker`](https://github.com/react-native-image-picker/react-native-image-picker)
- 设备信息 - `react-native-device-info`
- webview - `react-native-webview`
- app 版本信息 - `react-native-version-number`
- 安全区 - `react-native-safe-area-context`
- 轮播 - `react-native-snap-carousel`
- 日历 - [react-native-date-picker](https://www.npmjs.com/package/react-native-date-picker)
- 声音 - [`react-native-sound`](https://github.com/zmxv/react-native-sound)
- 剪切板 - [`@react-native-clipboard/clipboard`](https://github.com/react-native-clipboard/clipboard)
- 消息提示 - [`rn-overlay`](https://github.com/caoyongfeng0214/rn-overlay)
- 分享 - [`react-native-share`](https://react-native-share.github.io/react-native-share/)
- 系统通信录 - [react-native-contacts](https://www.npmjs.com/package/react-native-contacts)
- wifi管理 - [react-native-wifi-reborn](https://www.npmjs.com/package/react-native-wifi-reborn)。
> 需要修改`AndroidManifest.xml`
> 1. 添加权限声明：`<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />`
> 2. 顶部manifest标签添加`xmlns:tools="http://schemas.android.com/tools"`
> 3. application标签添加`tools:replace="android:label"`以及`tools:node="replace"`
> [详见](https://stackoverflow.com/questions/28095703/manifest-merger-failed-error)
- 权限管理 - [react-native-permissions](https://github.com/zoontek/react-native-permissions)

### 社区组件

> `@react-native-community`

- 存储 - `async-storage`
- `masked-view`
- `art`
- 相册 - [@react-native-community/cameraroll](https://github.com/rescript-react-native/cameraroll)

## 配置相关

- 配置路径别名：[babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver)。如果配置了 eslint-plugin-import 的 eslint 插件的规则，这个插件因为不识别@icons 这样的路径别名而会报错，这时候你可以装一个 eslint-import-resolver-babel-module 来避免别名路径被 eslint-plugin-import 报错;
