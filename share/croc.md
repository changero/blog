---
title: croc
date: 2020-10-12
categories:
  - 工具
---

## 前言

在此之前，与服务器完成文件传输的主要工具是`ssh`、`FTP`等手段。后来了解到[`bashupload`](https://bashupload.com/)，上传文件后可以得到7天的免费存储时间。不过文件总归是存在在别人的服务器上。后来终于等来了croc

## bashupload

```bash
curl https://bashupload.com/name.txt --data-binary @file.txt
```

## Croc

[github](https://github.com/schollz/croc)地址

### 安装

直接通过命令行安装最新版本

> curl https://getcroc.schollz.com | bash

- MacOS
	
  > brew install croc
  
- windows
	> scoop install croc
  > choco install croc

- ubuntu
	> snap install croc

<!-- more -->

### 使用

- 发送文件

```bash
croc send [file(s)-or-folder]
Sending 'file-or-folder' (X MB)
Code is: code-phrase
```

- 接收文件

```bash
croc code-phrase
```

- 自定义code

```bash
croc send --code myfile [file(s)-or-folder]
Sending 'file-or-folder' (X MB)
Code is: myfile
```

- 管道

```bash
cat [filename] | croc send
```

- 直接发送文本

```bash
croc send --text 'hello'
```

- 自主中继

我觉得是最主要的功能，默认情况下，croc使用公共中继，也可以开启自己的中继

```bash
croc relay
```

会占用`9009-9013`端口
>您可以自定义端口（例如croc relay --ports 1111,1112），但是中继必须至少有2个端口。第一个端口用于通信，随后的端口用于多路复用数据传输

使用中继发送文件

```bash
croc --relay 'youhost.com:9009' send [filename]
```

使用docker

```
docker run -d -p 9009-9013:9009-9013 -e CROC_PASS='YOURPASSWORD' schollz/croc
```

在接收文件的时候确保密码正确

```croc
croc --pass YOURPASSWORD --relay 'youhost.com:9009' [code]
```

注意 如果需要在docker的宿主机上发送文件，需要修改docker容器占用的端口，否则在宿主机上发送文件的时候会提示端口被占用，例如：

```
docker run -d -p 9109-9113:9009-9013 -e CROC_PASS='YOURPASSWORD' schollz/croc
```