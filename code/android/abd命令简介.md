---
title: abd命令简介
date: "2021-05-30 23:22:36"
categories:
  - 编程
tags:
  - android
lang: zh-cn
---

## abd 命令简介

> adb 位于 sdk 目录（`C:\Users\changero\AppData\Local\Android\Sdk`）下的`platform-tools`文件夹或者`C:\Android\`
>
> 如果安装了网易木木，则位于 C:\Program Files (x86)\Nemu\vmonitor\bin\adb_server.exe

### 连接设备

adb kill-server

- **连接网易木木**：`adb connect 127.0.0.1:7555`。如果是在 macos 上，`adb connect 127.0.0.1:5555`
- 列出所有设备：`adb devices`

### 如果在连接有多台设备的情况下进行操作

命令格式：adb -s 模拟器端口 其他命令，如：adb -s 127.0.0.1:7555 shell pm list package -3

### 安装与卸载

- 安装：adb install xx.apk

- 卸载：adb uninstall xx.apk
- 安装多个 apk：adb install-mutiple xx.apk yy.apk

#### 安装的选项

- -t：允许安装测试包
- -r：覆盖已经安装的包，保存其数据，也就是强制安装
- -g：授予应用程序清单中列出的所有权限

### 获取已安装应用包名

所有应用包名列表

adb shell pm list packages

第三方应用包名列表

adb shell pm list packages -3

系统应用包名列表

adb shell pm list packages -s

正在运行应用包名

adb shell dumpsys window | findstr mCurrentFocus

### 获取已安装应用 Activity 类名

adb logcat ActivityManager:I \*:s | findstr "cmp"后启动目标应用

### 启动应用

adb shell am start -n 应用包名/应用 Activity 类名

若想查看启动应用耗时，则可使用 adb shell am start -W 应用包名/应用 Activity 类名

### 关闭应用

adb shell am force-stop 应用包名

如关闭第五人格应用：

adb shell am force-stop com.netease.dwrg

### 查看应用版本号

adb shell dumpsys package 应用包名 | findstr version

### 清理应用数据

adb shell pm clear 应用包名

### 模拟输入

按键输入

adb shell input keyevent 键值

如：adb shell input keyevent 3 表示按下 HOME 键，其他键值对应键位可网上搜索

字符输入

adb shell input text 字符

如：adb shell input text test 则表示输入了 test 字符串

ps：字符不支持中文

鼠标点击

adb shell input tap X Y

X Y 分别为当前屏幕下的 x 和 y 轴坐标值

鼠标滑动

adb shell input swipe X1 Y1 X2 Y2

X1 Y1 和 X2 Y2 分别为滑动起始点的坐标

### 从电脑上传文件至模拟器

adb push C:\test.apk sdcard/test.apk

### 从模拟器复制文件至电脑

adb pull sdcard/data/test.apk C:\test.apk

### 截图

将模拟器当前显示截图

adb shell screencap /data/screen.png

将截图文件下载至电脑

adb pull /data/screen.png C:\

### 录制视频

开始录制

adb shell screenrecord /data/test.mp4

结束录制

可按 CTRL+C 结束录制

导出视频文件

adb pull /data/test.mp4 C:\

### 查看设备信息

设备型号

adb shell getprop ro.product.model

设备品牌

adb shell getprop ro.product.brand

设备处理器型号

adb shell getprop ro.product.board

设备安卓版本号

adb shell getprop ro.build.version.release

设备引擎渲染模式

adb shell dumpsys SurfaceFlinger|findstr "GLES"

## 参考文章

[ADB 命令大全 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/89060003)
