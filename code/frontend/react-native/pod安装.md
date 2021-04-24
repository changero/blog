---
title: pod 安装
date: "2021-04-24 16:04:41"
categories:
  - 前端
tags:
  - ios
  - react-native
lang: zh-cn
---

## pod 安装

- 查看 ruby 的版本，`ruby -v`，安装 cocoapods 需要 2.2.2 版本以上

- 更换源

  ```bash
  $ sudo gem update --system
  $ gem source --remove https://rubygems.org/
  $ gem source --add https://gems.ruby-china.com/
  # 或者淘宝镜像
  $ gem source --add https://ruby.taobao.org
  ```

<!-- mode -->

- 查看源

  ```bash
  $ gem sources -l
  ```

- 安装 cocoapods

  ```bash
  $ sudo gem install -n /usr/local/bin cocoapods
  ```

- 如果安装了多个 xcode，使用下面的命令选择

  ```bash
  $ sudo xcode-select -switch /Applications/Xcode.app     /Contents/Developer
  ```

- 安装本地库

  ```bash
  $ pod setup
  ```

- 手动安装

  ```bash
  $ git clone https://github.com/CocoaPods/Specs.git ~/.cocoapods/repos/trunk
  ```

- 或者使用[镜像](https://mirrors.tuna.tsinghua.edu.cn/help/CocoaPods)

  ```bash
  # 清华源也慢
  $ git clone https://mirrors/yuna.tsinghua.edu.cn/git/CocoaPods/Specs.git ~/.cocoapods/repos/trunk
  # 或者
  $ git clone https://gitee.com/mirrors/CocoaPods-Specs.git
  ```

- 如果还是不行

  ```bash
  # 安装最新版cocoapods
  sudo gem install cocoapods --pre
  # 移除本地master
  sudo rm -rf ~/.cocoapods/repos/master
  # 移除本地缓存
  sudo rm -rf ~/Library/Caches/CocoaPods
  # 重新Setup，也可以用上面clone的办法
  pod setup --verbose
  # 移除trunk
  pod repo remove trunk
  ```

## pod 的使用

- 创建 podfile 文件

  ```bash
  $ pod init
  ```

- 搜索

  ```bash
  $ pod search [name]
  ```

- 安装依赖

  ```bash
  $ pod install
  ```

  如果遇到`iphoneos`can not be located

  ```bash
  $ sudo xcode-select -s /Applications/Xcode.app
  ```

## [m1 芯片 mac 安装的问题](https://www.jianshu.com/p/455fce1753bf)

通过上述方法能正常安装 cocoapods，但是`~/.cocoapods/repos`文件夹并没有生成。

执行`pod install`的时候会报错

```bash
[!] Oh no, an error occurred
```

让去 github 找解决方法

最终解决方法如下：

打开访达>应用>实用工具>终端>右键终端>显示简介>勾选使用 Rosetta 打开，关闭终端后重新打开

执行命令

```bash
$ sudo gem install cocoapods
$ sudo gem install ffi
```
