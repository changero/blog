---
title: react-native项目各种基本要素
date: "2021-04-24 15:57:01"
categories:
  - 前端
tags:
  - react-native
lang: zh-cn
---

## react-native 项目各种基本要素

### 修改 registerComponent 的 name

- 在安卓项目中找到`getMainComponentName`方法，这个方法就是告诉 app，当前 activity 加载 rn 中注册的名字，加载对应的 js 代码
- ios 项目中搜索`RCTRootView`

<!-- mode -->

### 修改 APP 名称

- android：在`AndroidMinifest.xml`文件中
- ios：在`xcode`中双击项目名，在`General`页中可以修改

### 修改包名(com.xxxx.yyy)

- android:
- ios：同修改 APP 名称

### 修改图标等资源

- android：在`src/main/res`文件夹
- ios：同修改 APP 名称的地方，找到`APP Icons and Launch Images`，根据尺寸把图片拖进去，[参考](https://blog.csdn.net/xiaowu0124/article/details/44063341)

### 苹果证书(.p12)及描述文件

[苹果证书（.p12）及描述文件创建 - 简书 (jianshu.com)](https://www.jianshu.com/p/668244e917f5)

[iOS 创建苹果证书、制作 p12 证书流程\_u010263943 的博客-CSDN 博客\_ios p12 证书](https://blog.csdn.net/u010263943/article/details/108003540)

[免费苹果账号（apple id）申请 ios 证书 p12 真机调试 - Mica - 博客园 (cnblogs.com)](https://www.cnblogs.com/mica/p/10654050.html)

[证书（Certificate）与描述文件（Provisioning Profiles） - rslai - 博客园 (cnblogs.com)](https://www.cnblogs.com/rslai/p/9291159.html)

[iOS Provisioning Profile(Certificate)与 Code Signing 详解\_曾梦想仗剑走天涯-CSDN 博客](https://blog.csdn.net/phunxm/article/details/42685597/)

证书和描述文件制作

[【2021】IOS 证书(.p12)和描述文件(.mobileprovision)申请\_2kb-CSDN 博客](https://blog.csdn.net/weixin_36406616/article/details/114970240)

- Certificate（证书）

  就是 app 在打包的时候必须签名，苹果 iOS 系统在安装 app 之前会验证 Certificate，否则不会通过安装。证书可以有很多张，对应多个环境。

在 xcode 中可以快速创建证书，打开`performence>Accounts>Manage Certificates`，点击左下角即可添加一个开发者证书。在证书上右键，选择 export 可导出.p12 文件。当然这是一个快捷操作，也可以在[开发者中心](https://developer.apple.com)上手动创建，需要制作 CSR 证书来上传。查看上面的连接来制作，基本操作流程是一样的

- Provisioning Profile

  描述文件描述了是用于开发还是发布，作用于哪个 APPID，包含哪些证书，和设备 ID 等各种信息的集合体。一般来说，在打包 ipa 的时候，必须配置 Provisioning Profile。

有了证书以后，到`Build Settings> Code Signing Indetify`中配置证书。在回到`Signing & Capabilities`标签页，输入`Bundle Identifier`，也就是在开发者中心创建的 APPID，会自动拉取该 APPID 对应的描述文件，可能有多个，只需要选择与证书对应的描述文件就可以了

签名打包就是在编译的过程中加入证书签名，那肯定是需要去 Xcode 中配置的，目前网上有方法能实现企业级证书打包签名不需要在编译时，而在编译之后。因此现在打包有两种方式：
1、在 Xcode 中配置 code sign，实现签名打包 ipa。适用于企业级账号证书，个人账号证书。
2、在 Xcode 中无证书打包 ipa，上传到指定工作室网站，淘宝上现在一大堆打包服务的，由别人用他们的账号签名 ipa。适用于企业及账号。

[iOS 证书申请 – Application Loader](http://blog.applicationloader.net/blog/zh/help/ioszhengshu)

[iOS 打包教程 – Application Loader](http://blog.applicationloader.net/blog/zh/help/dabao)

[iOS 上架流程 – Application Loader](http://blog.applicationloader.net/blog/zh/help/shangjia)

[React Native 混合开发(iOS 篇) - 云+社区 - 腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1346931)

### 安卓打包加固

安卓加固会使得签名丢失，所以需要重签名，加固使用腾讯云的免费加固

未完待续...

如何修改 bundle 文件

ios 如何修改 APP 名称
