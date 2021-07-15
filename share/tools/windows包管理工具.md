---
title: windows包管理工具
date: "2021-04-11 18:31:16"
categories:
  - 工具
lang: zh-cn
---

在 mac、linux 上都有相应的包管理工具，可以很方便的安装生产工具，而 windows 也有几款不错的包管理工具。因为当前的 WSL2 访问主机文件的感人速度，所以也可以用来构建不错的集成环境

## win-get

`win-get`是 windows 官方发布的包管理工具

### win-get 安装（手动安装）

在[github release](https://github.com/microsoft/winget-cli/releases)下载，然后直接点击安装。不过这样安装不能自动更新

<!-- more -->

> [软件列表](https://github.com/microsoft/winget-pkgs/tree/master/manifests)

### 使用方法

最好在通过 scoop 安装 sudo 之后安装，

```bash
# 搜索
winget search # 列出所有包
winget search package # 查找具体包
# 安装
winget install package
winget install package --rainbow # 彩虹进度条
# 卸载
# 没有卸载
```

### 安装列表

#### 编辑器

- visual studio code(vscode)
- atom
- sublime
- EditPlus
- Notepad++

#### 压缩工具

- 7zip
- winzip
- Bandizip
- winrar



* windows terminal
* terminus
* tencent(腾讯软件)
* jdk8、11、14、15、16
* 1Password
* kindle
* anaconda3
* wizTree
* etcher(写镜像到 U 盘)、win32diskimager、rufus
* bitwarden
* listary
* Brave browser
* Potplayer
* DropBox
* EagleGet
* clash for windows
* wget for windows
* Android Studio
* Google Chrome(beta、dev)
* Google Earth
* jetbrains(webstorm)
* jianguoyun
* mactype(似苹果 Mac 系统下的字体渲染)
* edge
* nodejs
* virtualbox
* picgo
* ccleaner
* postman
* putty
* python
* quicklook
* qv2ray
* vncviewer
* league of legends(lol 外服)
* beyond compare
* free download Manager
* teamviewer
* telegram
* typora
* vmware
* wireguard
* wireshark
* wox
* Yarn
* youdaonote
* yuque
* evernote
* 12306-electron
* dingtalk
* shimo
* wechat devtool
* everything

## chocolatey

### 安装

在安装完成以前，要先在环境变量里面配置好 PATH

1、 `ChocolateyInstall`配置 choco 的安装路径。默认是在`C:\ProgramData\Chocolatey`

2、 `ChocolateyToolsLocation`配置通过 choco 安装的软件的安装路径。不同的软件有软件自身的路径，所以这个路径不一定生效

[chocolatey 安装参考](https://www.jianshu.com/p/f5f4efd04cab)

大部分软件都是通过[chocolatey](http://chocolatey.org)来安装。首先要安装 chocolatey，管理员身份打开 CDM

```bash
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

powershell 安装命令

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

配置文件路径：`安装路径\config`

### 推荐软件

chocolatey 提供了一个地址来搜索软件

- **cmder**，一款终端工具，支持大部分 linux 命令，配置透明度颜值能打。包括完整版和 mini 版，完成版里面包含了 git 工具
  安装命令：`choco install cmdermini`或者`choco install cmder`

- **git-fork**，git 图形化管理工具，类似的还有 sourcetree，安装命令:`choco install git-fork`

- **wox**，wox 是一款类似 MAC 系统中 Spotlight 的工具，通过`ALT+SPACE`启动，内置了`everything`。还有其他非常多的功能，可以通过扩展来增加功能
  安装命令:`choco install wox`

- **stickies**，一款便签软件，包含有日历功能。类似的还有`simple-sticky-notes`。安装命令`choco install stickies`，以及`choco install simple-sticky-notes`

- **nvm**, node 版本管理工具。安装命令`choco install nvm`

- **ccleaner**，轻量级系统管理软件，包含垃圾清理，软件卸载等常用功能，占用内存小。支持中文，安装命令`choco install ccleaner`

- **potplayer**, 可播放 4K 视频，她的优点是启动速度快，内存占用小，无广告，功能强大。安装命令：`choco install potplayer`

- **Bandizip**, Bandzizip 是一款压缩工具，他轻巧，快捷、免费、无任何广告。它支持 WinZip、7-Zip、WinRAR 以及其他格式。安装命令：`choco install bandizip`

- **listary**, 跟`wox`+`everything`一样的功能，听过跟`totalcommander`搭配更佳。`choco install listary`。

- **quicklook**, 快速查看工具，比较轻量，按空格就能查看文件，图片，压缩文件等。`choco install quicklook`

- **googlechrome**, 谷歌浏览器,`choco install googlechrome`

- **firefox**, 火狐浏览器,`choco install firefox`

> 下面的软件还没有进行过实测

- **Fastston capture**,一个 Windows 上滚动截图的神器，可以录像，以及截任何你想截的图。支持 BMP、JPG、JPEG、GIF、PNG、TIFF、WMF、ICO 和 TGA 在内的主流图片格式，提供缩放、旋转、剪切、颜色调整功能。安装命令：`choco install fscapture`

- **WizTree**,Windows 磁盘分析工具，他可以用来查找占用大量分区的无用文件和文件夹，可以直接进行删除等操作。安装命令：`choco install wiztree`

- **steam**,不解释了,安装命令：`choco install steam`

- **rainmeter**，Rainmeter 可在桌面上显示可自定义的皮肤，如内存和电池电量，RSS 源和天气预报。安装命令：`choco install rainmeter`。

- **vnc-viewer**，`choco install vnc-viewer`

- **msys2**, `choco install msys2`

- **beyondcompare**, `choco install beyondcompare`

- **zoom**, `choco install zoom`

- **kodi**, `choco install kodi`

- **angryip**, `choco install angryip`

- **rocketdock**, 任务栏美化，类似 MAC 的 dock。`choco install rocketdock`。

- **aria2**, 多线程下载工具，应该可以配合百度云使用。`choco install aria2`。

- **ditto**, 功能强大的剪切板，支持局域网内剪切板同步。`choco install ditto`。

- **typora**, markdown 编辑器。`choco install typora`。

- **sharex**, 可以用它截图、录屏、拾取颜色、合并图像、生成视频缩略图、检查哈希值、生成二维码、捕捉网页和滚动窗口、对图片进行 OCR 文字识别，甚至还可以当做 FTP 客户端使用。`choco install sharex`。

- **eagleget**, 下载工具，配合 tampermonkey 下来百度云。`choco install eagleget`。

- **Clover**, 下将 Chrome 样式选项卡带到 Windows 资源管理器。。`choco install clover`。

- **totalcommander**, 两个文件窗口并排，增强的搜索功能，内置 FTP 客户端，支持 FXP（服务器到服务器）和 HTTP 代理支持。`choco install totalcommander`。

- **spacesniffer**, SpaceSniffer 可以说是非常直观的磁盘分析清理软件了，用图形表格的形式帮助我们查看我们磁盘空间的占用情况。。`choco install spacesniffer`。

- **foobar2000**, 音乐播放器。`choco install foobar2000`。

- **Launchy**, 快速启动工具，类似 everything。`choco install Launchy`。

- **internet-download-manager**, IDM）是一种将下载速度提高最多 5 倍，恢复和计划下载的工具。`choco install internet-download-manager`。

- **spacesniffer**, 只需轻轻一点，所有的文件都会通过大小不同的形状展示出来。`choco install spacesniffer`。

其他的还有 vscode、tim、teamviewer、firefox、googlechrome、googledrive、网易云音乐(netease-cloudmusic)、jdk、golang 等软件

- **snipaste**，小巧的截图软件，分厂轻量，喜欢他的截图贴纸功能，可以把截下来的图直接放到所有软件上面显示，而不需要保存

- **BaiduPcs-go**, 命令行端百度云盘管理工具。[地址](https://github.com/iikira/BaiduPCS-Go)

- **freedownloadmanager**, 下载工具。[地址](https://www.freedownloadmanager.org/zh/)

- **quicker**, 多功能组合程序,[地址](https://getquicker.net/)

### 卸载

> 删除环境变量 ChocolateyInstall 对应的安装文件夹，默认是 C:\ProgramData\chocolatey
> 删除环境变量 ChocolateyInstall
> 删除环境变量 ChocolateyToolsLocation，部分工具软件安装的位置，删除需谨慎
> 删除环境变量 ChocolateyLastPathUpdate
> 更新环境变量 PATH ，去掉 Chocolatey 相关的配置

## scoop

[官方 wiki](https://github.com/lukesampson/scoop/wiki)

> 修改scoop的安装位置，打开powershell，`$env:SCOOP='D:\software\scoop'`

### 安装

1. 打开全局代理

2. 关闭防火墙、杀毒软件
3. 打开 powershell

```bash
# 长命令
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
# 短命令
iwr -useb get.scoop.sh | iex
```

如果还是遇到网络问题，可能问题在于`raw.githubusercontent.com`DNS 污染无法解析，[参考](https://sspai.com/post/52710)，修改 hosts 文件`199.232.68.133 raw.githubusercontent.com`

### 国内安装

`https://get.scoop.sh`会重定向到`raw.githubusercontent.com`,自动下载scoop的仓库，但经常因为网络原因导致下载失败

```bash
$ iwr -useb https://changero.coding.cn/p/scoop-cn/d/scoop-cn/git/raw/master/install.ps1?download=false | iex
$ iwr -useb https://scoop.bianqu.cf | iex
```

### 使用

- 配置代理

```
scoop config proxy 127.0.0.1:1080
```

### 软件列表

- sudo
- nvm
- wget
