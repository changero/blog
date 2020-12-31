---
title: youtube-dl使用指南
date: 2020-11-19
categories:
  - tool
---

## 安装

youtube-dl 的运行依赖 python3

- UNIX 系统

```bash
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
```

<!-- more -->

或者

```bash
sudo wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
```

- windows

[下载链接](https://yt-dl.org/latest/youtube-dl.exe)，然后加到环境变量中。

- pip

通过 pip 安装:

> sudo -H pip install --upgrade youtube-dl

- macOS

> brew install youtube-dl

或者通过 macport 安装

> sudo port install youtube-dl

- ubuntu
  > apt-get install youtube-dl

## 使用简介

> youtube-dl https://www.youtube.com/watch?v=eTFPMxqod2I

- 使用代理

  > youtube-dl https://www.youtube.com/watch?v=eTFPMxqod2I --proxy 127.0.0.1:1080

- 指定文件名

  > youtube-dl -o 'yd-video' [url]

- 下载多个文件

  > youtube-dl [url1][url2]

      可以将它们全部放在文本文件中，并将其作为参数传递给Youtube-dl
      > youtube-dl -a url.txt

- 仅下载音频

  > youtube-dl -x --audio-format mp3 [url]

- 查看格式，能够得到格式代码

  > youtube-dl -F [url]

      下载特定格式
      > youtube-dl -f 格式代码 [url]

- 按格式下载

  > youtube-dl --format mp4 [url]

- 下载列表
  > youtube-dl --download-archive archive.txt [playlist]

## 配置文件

> sudo touch /etc/youtube-dl.conf

> vim /etc/youtube-dl.conf

--proxy 127.0.0.1:1080

-o ~/download

## you-get

you-get 可以用来下来 B 站的视频，youtube-dl 也可以，但问题在于无法下来视频列表

### 安装

> brew install you-get # macOS

> pip3 install you-get # ubuntu

### 下载

-l, --list 用来下载列表

-o 指定下载目录，跟 youtube-dl 一样

-h 查看帮助命令

```bash
you-get -l -o ~/Downloads/xx https://www.bilibili.com/avXXXXXXX
```
