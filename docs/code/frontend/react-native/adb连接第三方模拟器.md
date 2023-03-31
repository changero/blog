---
title: adb连接第三方模拟器
date: '2022-07-10 20:02:48'
lang: zh-cn
---

mumu 模拟器：adb connect 127.0.0.1:7555，相关开发者[说明书](https://mumu.163.com/help/func/20190129/30131_797867.html)

海马玩模拟器：adb connect 127.0.0.1:26944

逍遥安卓模拟器：adb connect 127.0.0.1:21503
如果出现无法连接，需要确认自己打开的虚拟机的配置，用编辑器打开`安装目录\MEmu\MemuHyperv VMs\MEmu_1\MEmu_1.memu-prev`文件，找到`<Forwarding name="ADB"` 的字样，后面就有端口号

夜神玩模拟器：adb connect 127.0.0.1:62001

天天模拟器：adb connect 127.0.0.1:6555
