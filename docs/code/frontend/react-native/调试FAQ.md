---
title: 调试FAQ
date: '2022-07-10 20:44:02'
lang: zh-cn
---

## 如何开启调试

现将 app 安装到手机或者模拟器，可以通过 AndroidStudio 直接安装，也可以在 AndroidStudio 就绪之后，点击顶部导航的`Build > Build Bundles/Apks > Build APK(s)`，来生成一个调试用的 apk 包，然后安装到真机或者模拟器，

启动 js 项目，打开控制台，在项目根目录下单独启动 RN 服务`yarn start`。这个时候会出现找不到开发服务器的提示，这个时候有 2 个方法

1. 在控制台执行`adb reverse tcp:8081 tcp:8081`，使得在调试机上请求 8081 的数据转发到电脑的 8081 上

2. 摇一摇手机，出现菜单，选择`Change Bundle Location`，修改为开发服务的 ip 和端口，比如：192.168.0.1:8081

> 如果是模拟器，无法使用摇一摇，可以在控制台通过 adb 发送指令,`adb shell input keyevent 82`,如果连接了多个设备，可以通过`adb devices`查看设备，然后用`-s`指定执行命令的设备。如果只有一个模拟器和一个手机连着电脑； 可以用 adb -e 来指明是操作模拟器（Emulator）； 可以用 adb -d 来指明是操作设备
