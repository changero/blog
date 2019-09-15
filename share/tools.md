---
title: 工具分享
date: 2019-05-19
sidebarDepth: 2
categories:
  - 工具
---



## chrome扩展

- [chrome多平台各版本下载](https://www.chromedownloads.net/chrome64win/)

这里记录一下常用的chrome扩展，免得经常性的到处找。以下链接都是google商店地址，如果没有梯子，也可以到[crx4chrome](https://www.crx4chrome.com/)、[cnplugins](http://www.cnplugins.com/)、[chromecj](http://chromecj.com/)、[chrome666](https://www.chrome666.com/)、[extfans](https://extfans.com/)等商店上去寻找

- [toby](https://chrome.google.com/webstore/detail/toby-for-chrome/hddnkoipeenegfoeaoibdmnaalmgkpip?utm_source=chrome-ntp-icon)类似书签管理

<!-- more -->

- [SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif?utm_source=chrome-ntp-icon)好用的代理工具。[github wiki](https://github.com/FelisCatus/SwitchyOmega/wiki/GFWList)

分享一个几乎永久使用的节点: `https://www.copyplay.net:443`

规则列表：`https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt`


- [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?utm_source=chrome-ntp-icon)谁用谁知道的插件，通过脚本扩展目标网站的功能。脚本的下载网址：[greasyfork](https://greasyfork.org/zh-CN/scripts)、[国外](http://userscripts-mirror.org/)。推荐[脚本](https://greasyfork.org/zh-CN/scripts/370811-2019%E5%B9%B44%E6%9C%8815%E6%97%A5%E6%9B%B4%E6%96%B0-%E7%BD%91%E7%9B%98%E4%B8%87%E8%83%BD%E9%92%A5%E5%8C%99-%E8%87%AA%E5%8A%A8%E6%9F%A5%E8%AF%A2%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E5%88%86%E4%BA%AB%E9%93%BE%E6%8E%A5%E7%9A%84%E6%8F%90%E5%8F%96%E7%A0%81-%E5%85%A8%E7%BD%91vip%E8%A7%86%E9%A2%91%E8%A7%A3%E6%9E%90%E6%92%AD%E6%94%BE-%E5%85%A8%E7%BD%91%E4%BB%98%E8%B4%B9%E9%9F%B3%E4%B9%90%E5%85%8D%E8%B4%B9%E4%B8%8B%E8%BD%BD-%E6%B7%98%E5%AE%9D-%E6%8B%BC%E5%A4%9A%E5%A4%9A%E5%A4%A7%E9%A2%9D%E8%B4%AD%E7%89%A9%E4%BC%98%E6%83%A0%E5%88%B8%E9%A2%86%E5%8F%96-%E6%94%AF%E6%8C%81%E5%8E%86%E5%8F%B2%E4%BB%B7%E6%A0%BC%E6%9F%A5%E8%AF%A2),可以破解百度网盘的分享

- [octotree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc?utm_source=chrome-ntp-icon)浏览github仓库的时候再也不用一层一层的去找文件了

- [广告终结者](https://chrome.google.com/webstore/detail/%E5%B9%BF%E5%91%8A%E7%BB%88%E7%BB%93%E8%80%85/fpdnjdlbdmifoocedhkighhlbchbiikl?utm_source=chrome-ntp-icon)亲测拦截优酷广告有效

- [loom](https://chrome.google.com/webstore/detail/loom-video-recorder-scree/liecbddmkiiihnedobmlmillhodjkdmb?utm_source=chrome-ntp-icon)浏览器录屏扩展

- [youtube广告拦截](https://chrome.google.com/webstore/detail/video-adblocker-for-youtu/hflefjhkfeiaignkclmphmokmmbhbhik)见明知意

- [mega](https://chrome.google.com/webstore/detail/mega/bigefpfhnfcobdlfbedofhhaibnlghod/related)免费的50G云盘

- [octolinker](https://chrome.google.com/webstore/detail/octolinker/jlmafbaeoofdegohdhinkhilhclaklkp/related)查看github仓库代码的时候可以很方便的跳转到其依赖的库

- [npmhub](https://chrome.google.com/webstore/detail/npmhub/kbbbjimdjbjclaebffknlabpogocablj/related)扫描出`package.json`文件中的依赖，显示在`README`下面

## windows下软件

大部分软件都是通过[chocolatey](http://chocolatey.org)来安装。首先要安装chocolatey，管理员身份打开CDM

```bash
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

在安装完成以前，要先在环境变量里面配置好PATH

1、 `ChocolateyInstall`配置choco的安装路径。默认是在`C:\ProgramData\Chocolatey`

2、 `ChocolateyToolsLocation`配置通过choco安装的软件的安装路径。不同的软件有软件自身的路径，所以这个路径不一定生效

[chocolatey安装参考](https://www.jianshu.com/p/f5f4efd04cab)

### 推荐软件

- **cmder**，一款终端工具，支持大部分linux命令，配置透明度颜值能打。包括完整版和mini版，完成版里面包含了git工具
安装命令：`choco install cmdermini`或者`choco install cmder`

- **git-fork**，git图形化管理工具，类似的还有sourcetree，安装命令:`choco install git-fork`

- **wox**，wox是一款类似MAC系统中Spotlight的工具，通过`ALT+SPACE`启动，内置了`everything`。还有其他非常多的功能，可以通过扩展来增加功能
安装命令:`choco install wox`

- **stickies**，一款便签软件，包含有日历功能。类似的还有`simple-sticky-notes`。安装命令`choco install stickies`，以及`choco install simple-sticky-notes`

- **nvm**, node版本管理工具。安装命令`choco install nvm`

- **ccleaner**，轻量级系统管理软件，包含垃圾清理，软件卸载等常用功能，占用内存小。支持中文，安装命令`choco install ccleaner`

- **potplayer**, 可播放4K视频，她的优点是启动速度快，内存占用小，无广告，功能强大。安装命令：`choco install potplayer`

- **Bandizip**, Bandzizip是一款压缩工具，他轻巧，快捷、免费、无任何广告。它支持WinZip、7-Zip、WinRAR以及其他格式。安装命令：`choco install bandizip`

- **listary**, 跟`wox`+`everything`一样的功能，听过跟`totalcommander`搭配更佳。`choco install listary`。

- **quicklook**, 快速查看工具，比较轻量，按空格就能查看文件，图片，压缩文件等。`choco install quicklook`

> 下面的软件还没有进行过实测

- **Fastston capture**,一个Windows上滚动截图的神器，可以录像，以及截任何你想截的图。支持 BMP、JPG、JPEG、GIF、PNG、TIFF、WMF、ICO 和 TGA 在内的主流图片格式，提供缩放、旋转、剪切、颜色调整功能。安装命令：`choco install fscapture`

- **WizTree**,Windows 磁盘分析工具，他可以用来查找占用大量分区的无用文件和文件夹，可以直接进行删除等操作。安装命令：`choco install wiztree`

- **steam**,不解释了,安装命令：`choco install steam`

- **rainmeter**，Rainmeter可在桌面上显示可自定义的皮肤，如内存和电池电量，RSS源和天气预报。安装命令：`choco install rainmeter`。

- **vnc-viewer**，`choco install vnc-viewer`

- **msys2**, `choco install msys2`

- **beyondcompare**, `choco install beyondcompare`

- **zoom**, `choco install zoom`

- **kodi**, `choco install kodi`

- **angryip**, `choco install angryip`

- **rocketdock**, 任务栏美化，类似MAC的dock。`choco install rocketdock`。

- **aria2**, 多线程下载工具，应该可以配合百度云使用。`choco install aria2`。

- **ditto**, 功能强大的剪切板，支持局域网内剪切板同步。`choco install ditto`。

- **typora**, markdown编辑器。`choco install typora`。

- **sharex**, 可以用它截图、录屏、拾取颜色、合并图像、生成视频缩略图、检查哈希值、生成二维码、捕捉网页和滚动窗口、对图片进行 OCR 文字识别，甚至还可以当做 FTP 客户端使用。`choco install sharex`。

- **eagleget**, 下载工具，配合tampermonkey下来百度云。`choco install eagleget`。

- **Clover**, 下将Chrome样式选项卡带到Windows资源管理器。。`choco install clover`。

- **totalcommander**, 两个文件窗口并排，增强的搜索功能，内置FTP客户端，支持FXP（服务器到服务器）和HTTP代理支持。`choco install totalcommander`。

- **spacesniffer**, SpaceSniffer可以说是非常直观的磁盘分析清理软件了，用图形表格的形式帮助我们查看我们磁盘空间的占用情况。。`choco install spacesniffer`。

- **foobar2000**, 音乐播放器。`choco install foobar2000`。

- **Launchy**, 快速启动工具，类似everything。`choco install Launchy`。

- **internet-download-manager**, IDM）是一种将下载速度提高最多5倍，恢复和计划下载的工具。`choco install internet-download-manager`。

- **spacesniffer**, 只需轻轻一点，所有的文件都会通过大小不同的形状展示出来。`choco install spacesniffer`。

其他的还有vscode、tim、teamviewer、firefox、googlechrome、googledrive、网易云音乐(netease-cloudmusic)、jdk、golang等软件

- **snipaste**，小巧的截图软件，分厂轻量，喜欢他的截图贴纸功能，可以把截下来的图直接放到所有软件上面显示，而不需要保存

- **BaiduPcs-go**, 命令行端百度云盘管理工具。[地址](https://github.com/iikira/BaiduPCS-Go)

- **freedownloadmanager**, 下载工具。[地址](https://www.freedownloadmanager.org/zh/)

- **quicker**, 多功能组合程序,[地址](https://getquicker.net/)

## 命令行上传工具

> [网址](https://bashupload.com),上传的时候需要用到curl工具，下载的时候用到wget工具。当然也可以直接在网站上去操作。最多保存7天，其间不限次数下载

> windows上可以通过[choco](https://chocolatey.org)安装`curl`和`wget`

1、 上传

```bash
> curl https://bashupload.com/[filename] --data-binary @text.txt

Uploaded 1 file, 3 bytes

wget https://bashupload.com/aDH9y/myfile.txt
```

上传之后会返回相关的下载链接

2、 下载

> 直接用上面的链接就可以下载
```bash
wget https://bashupload.com/aDH9y/myfile.txt
```

## 命令行生成二维码

```bash
curl -L qrgo.elsesiy.com/test
curl -L qrgo.elsesiy.com/http://cblog.changero.win
```


## 网站分享

### 免费接码平台

- [https://www.freeonlinephone.org/](https://www.freeonlinephone.org/)

- [http://sms.sellaite.com/](http://sms.sellaite.com/)

- [http://receivefreesms.com/](http://receivefreesms.com/)

- [https://receive-a-sms.com/](https://receive-a-sms.com/)

- [https://smsnumbersonline.com/](https://smsnumbersonline.com/)

- [https://sms-online.co/receive-free-sms](https://sms-online.co/receive-free-sms)

- [https://receive-sms.com/](https://receive-sms.com/)

- [http://receive-sms-online.com/](http://receive-sms-online.com/)

- [http://receive-sms-now.com/](http://receive-sms-now.com/)

- [https://smsreceivefree.com](https://smsreceivefree.com)

- [https://www.receive-sms-online.info/](https://www.receive-sms-online.info/  )

- [https://www.textnow.com/](https://www.textnow.com/)

- [https://www.pinger.com/text-free/](https://www.pinger.com/text-free/)

- [https://www.twilio.com/](https://www.twilio.com/)

- [http://www.heywire.com/](http://www.heywire.com/)

- [http://www.lleida.net/en](http://www.lleida.net/en)

- [https://www.pinger.com/content/home.html](https://www.pinger.com/content/home.html)

- [http://sellaite.com/smsreceiver/](http://sellaite.com/smsreceiver/)

- [http://receivesmsonline.com/](http://receivesmsonline.com/)

- [http://www.receivefreesms.com/](http://www.receivefreesms.com/)

- [https://www.virtualphoneline.com/login/](https://www.virtualphoneline.com/login/)

- [http://sonetel.com/](http://sonetel.com/)

- [http://pinger.com/tfw/](http://pinger.com/tfw/)

### 搜索资源站

- [史莱姆搜索](http://www.slimego.cn/)

- [胖次](https://www.panc.cc/)

- [特百度](http://www.tebaidu.com/)

- [呆木瓜](http://www.daimugua.com)

- [一行代码](https://www.alinecode.com/)

### 网盘搜索汇总

#### ★★★★★

- [鸠摩搜书](https://www.jiumodiary.com/)

- [*盘多多](http://www.panduoduo.net/)

- [*去转盘](http://www.quzhuanpan.com/)

- [*Bdsola](http://www.3134.cc/)

- [*西林街](http://www.xilinjie.com/)

#### ★★★★

- [*探索云盘搜索](http://tansuo233.com/)

- [*BDY搜](http://www.bdysou.com)

- [*盘窝窝](http://www.panww.com)

- [*百度网盘搜索](http://uzi8.cn)

- [*网盘007](https://wangpan007.com)

#### ★★★
- [*胖次](http://www.panc.cc)

- [*盘搜搜](http://www.pansoso.com)

- [*番茄搜索](https://www.fqsousou.com)

- [*微友搜索](http://www.weiyoou.com)

- [*凌风云](https://www.lingfengyun.com)

- [*盘优搜](http://www.panuso.comsoso)

- [*云盘](http://www.sosoyunpan.com)

- [*特百度](http://www.tebaidu.com)

- [*搜百度盘](http://www.sobaidupan.com)

- [*pan115](http://www.pan115.com)

- [*鸵鸟搜索](http://www.tuoniao.me)

- [*我的盘](http://www.wodepan.com)

- [*搜网盘](http://www.swangpan.com)

- [*51菜场](http://wx01.51caichang.com)

- [*网盘之家](http://www.wangpanzhijia.net)

- [*及搜盘](http://www.jisoupan.com)

- [*众人搜索](http://wangpan.renrensousuo.com)

- [*行笑网](http://www.walksmile.com)

- [*史莱姆搜索](http://www.slimego.cn)

- [*百度云盘](http://www.baiduyunpan.com)

- [*300搜](http://www.3bsou.com)

- [*58网盘搜索](http://www.58wangpan.com)

- [*56网盘搜索](http://www.56wangpan.com)

- [*我搜云](http://www.wosouyun.com)

- [*坑搜](http://www.kengso.com)

- [*搜盘侠](http://www.sopanxia.com)

## 磁盘刻录工具

### iso文件

|软件|跨平台|github|官网|choco|支持img
|:-:|:-:|:-:|:-:|:-:|:-:|
|etcher|是|[github](https://github.com/balena-io/etcher/releases)|[官网](https://www.balena.io/etcher/)|是|是
|rufus|windows|[github](https://github.com/pbatard/rufus)|[官网](https://rufus.ie/)|是|是
|unetbootin|是|[github](https://github.com/unetbootin/unetbootin/releases)|[官网](https://unetbootin.github.io/)|是|是
|软碟通|windows|-|[官网](https://cn.ultraiso.net/xiazai.html)|-|-
|win32diskimager|windows|-|[官网](https://sourceforge.net/projects/win32diskimager/)|是|-|
|tuxboot|ubuntu|-|[官网](https://tuxboot.org/download/)|是|-|
|poweriso|是|[github](https://github.com/thioshp/poweriso)|[官网](https://www.poweriso.com/download.php)|是|-|
|autobootdisk|linux|[github](https://github.com/EvilSourcerer/AutoBootDisk)|[官网](https://www.simpodex.com/)|是|-|
|isorecorder|windows|-|[官网](http://isorecorder.alexfeinman.com/#/)|是|-|


### img文件

- <a href="https://coding.net/api/project/3188554/files/5626570/download" download='physdiskWriter.exe' >physdiskWriter</a>  - windows

- <a href="https://coding.net/api/project/3188554/files/5626569/download" download='img2kvm' >img2kvm</a>  - linux

## webstorm激活码

> 1、hosts添加`0.0.0.0 account.jetbrains.com`

> 56ZS5PQ1RF-eyJsaWNlbnNlSWQiOiI1NlpTNVBRMVJGIiwibGljZW5zZWVOYW1lIjoi5q2j54mI5o6I5p2DIC4iLCJhc3NpZ25lZU5hbWUiOiIiLCJhc3NpZ25lZUVtYWlsIjoiIiwibGljZW5zZVJlc3RyaWN0aW9uIjoiRm9yIGVkdWNhdGlvbmFsIHVzZSBvbmx5IiwiY2hlY2tDb25jdXJyZW50VXNlIjpmYWxzZSwicHJvZHVjdHMiOlt7ImNvZGUiOiJJSSIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9LHsiY29kZSI6IkFDIiwicGFpZFVwVG8iOiIyMDIwLTAzLTEwIn0seyJjb2RlIjoiRFBOIiwicGFpZFVwVG8iOiIyMDIwLTAzLTEwIn0seyJjb2RlIjoiUFMiLCJwYWlkVXBUbyI6IjIwMjAtMDMtMTAifSx7ImNvZGUiOiJHTyIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9LHsiY29kZSI6IkRNIiwicGFpZFVwVG8iOiIyMDIwLTAzLTEwIn0seyJjb2RlIjoiQ0wiLCJwYWlkVXBUbyI6IjIwMjAtMDMtMTAifSx7ImNvZGUiOiJSUzAiLCJwYWlkVXBUbyI6IjIwMjAtMDMtMTAifSx7ImNvZGUiOiJSQyIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9LHsiY29kZSI6IlJEIiwicGFpZFVwVG8iOiIyMDIwLTAzLTEwIn0seyJjb2RlIjoiUEMiLCJwYWlkVXBUbyI6IjIwMjAtMDMtMTAifSx7ImNvZGUiOiJSTSIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9LHsiY29kZSI6IldTIiwicGFpZFVwVG8iOiIyMDIwLTAzLTEwIn0seyJjb2RlIjoiREIiLCJwYWlkVXBUbyI6IjIwMjAtMDMtMTAifSx7ImNvZGUiOiJEQyIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9LHsiY29kZSI6IlJTVSIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9XSwiaGFzaCI6IjEyMjkxNDk4LzAiLCJncmFjZVBlcmlvZERheXMiOjAsImF1dG9Qcm9sb25nYXRlZCI6ZmFsc2UsImlzQXV0b1Byb2xvbmdhdGVkIjpmYWxzZX0=-SYSsDcgL1WJmHnsiGaHUWbaZLPIe2oI3QiIneDtaIbh/SZOqu63G7RGudSjf3ssPb1zxroMti/bK9II1ugHz/nTjw31Uah7D0HqeaCO7Zc0q9BeHysiWmBZ+8bABs5vr25GgIa5pO7CJhL7RitXQbWpAajrMBAeZ2En3wCgNwT6D6hNmiMlhXsWgwkw2OKnyHZ2dl8yEL+oV5SW14t7bdjYGKQrYjSd4+2zc4FnaX88yLnGNO9B3U6G+BuM37pxS5MjHrkHqMTK8W3I66mIj6IB6dYXD5nvKKO1OZREBAr6LV0BqRYSbuJKFhZ8nd6YDG20GvW6leimv0rHVBFmA0w==-

> MIIElTCCAn2gAwIBAgIBCTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTE4MTEwMTEyMjk0NloXDTIwMTEwMjEyMjk0NlowaDELMAkGA1UEBhMCQ1oxDjAMBgNVBAgMBU51c2xlMQ8wDQYDVQQHDAZQcmFndWUxGTAXBgNVBAoMEEpldEJyYWlucyBzLnIuby4xHTAbBgNVBAMMFHByb2QzeS1mcm9tLTIwMTgxMTAxMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxcQkq+zdxlR2mmRYBPzGbUNdMN6OaXiXzxIWtMEkrJMO/5oUfQJbLLuMSMK0QHFmaI37WShyxZcfRCidwXjot4zmNBKnlyHodDij/78TmVqFl8nOeD5+07B8VEaIu7c3E1N+e1doC6wht4I4+IEmtsPAdoaj5WCQVQbrI8KeT8M9VcBIWX7fD0fhexfg3ZRt0xqwMcXGNp3DdJHiO0rCdU+Itv7EmtnSVq9jBG1usMSFvMowR25mju2JcPFp1+I4ZI+FqgR8gyG8oiNDyNEoAbsR3lOpI7grUYSvkB/xVy/VoklPCK2h0f0GJxFjnye8NT1PAywoyl7RmiAVRE/EKwIDAQABo4GZMIGWMAkGA1UdEwQCMAAwHQYDVR0OBBYEFGEpG9oZGcfLMGNBkY7SgHiMGgTcMEgGA1UdIwRBMD+AFKOetkhnQhI2Qb1t4Lm0oFKLl/GzoRykGjAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBggkA0myxg7KDeeEwEwYDVR0lBAwwCgYIKwYBBQUHAwEwCwYDVR0PBAQDAgWgMA0GCSqGSIb3DQEBCwUAA4ICAQAF8uc+YJOHHwOFcPzmbjcxNDuGoOUIP+2h1R75Lecswb7ru2LWWSUMtXVKQzChLNPn/72W0k+oI056tgiwuG7M49LXp4zQVlQnFmWU1wwGvVhq5R63Rpjx1zjGUhcXgayu7+9zMUW596Lbomsg8qVve6euqsrFicYkIIuUu4zYPndJwfe0YkS5nY72SHnNdbPhEnN8wcB2Kz+OIG0lih3yz5EqFhld03bGp222ZQCIghCTVL6QBNadGsiN/lWLl4JdR3lJkZzlpFdiHijoVRdWeSWqM4y0t23c92HXKrgppoSV18XMxrWVdoSM3nuMHwxGhFyde05OdDtLpCv+jlWf5REAHHA201pAU6bJSZINyHDUTB+Beo28rRXSwSh3OUIvYwKNVeoBY+KwOJ7WnuTCUq1meE6GkKc4D/cXmgpOyW/1SmBz3XjVIi/zprZ0zf3qH5mkphtg6ksjKgKjmx1cXfZAAX6wcDBNaCL+Ortep1Dh8xDUbqbBVNBL4jbiL3i3xsfNiyJgaZ5sX7i8tmStEpLbPwvHcByuf59qJhV/bZOl8KqJBETCDJcY6O2aqhTUy+9x93ThKs1GKrRPePrWPluud7ttlgtRveit/pcBrnQcXOl1rHq7ByB8CFAxNotRUYL9IF5n3wJOgkPojMy6jetQA5Ogc8Sm7RG6vg1yow==



<iframe src="https://www.gettoby.com/e/99d3rnacsjj8" width="690" height="350" frameBorder="0">Collection: VPS (62 tabs)<a href="https://www.gettoby.com/p/99d3rnacsjj8" target="_blank"></a></iframe>

<iframe src="https://www.gettoby.com/e/76vggkacyvnl" width="690" height="350" frameBorder="0">Collection: 工具 (88 tabs)<a href="https://www.gettoby.com/p/76vggkacyvnl" target="_blank"></a></iframe>