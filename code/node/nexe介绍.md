---
title: nexe介绍
date: '2022-05-05 22:29:48'
lang: zh-cn
---

## 前言

[nexe](https://github.com/nexe/nexe)是一款可以将 Node.js 应用打包成可执行程序的一款工具。

在 nodejs 中，也可以在`package.json`中申明`bin`字段，指定可执行文件。但需要本地环境安装 node，与`bash`脚本一样，需要在文件头上声明`#! /usr/bin/env node`来指定运行该脚本的程序

而通过 nexe 构建的应用就跟普通的应用一样，不需要单独的 node 环境来支持

## 安装

### 安装 nexe

```bash
$ npm install nexe -g
```

安装完成以后就可以在控制台调用 nexe 工具

### 使用

直接在命令行中使用非常简单

```bash
$ echo "console.log('hello nexe')" >> hello.js
$ nexe hello.js
```

不过在第一次执行的时候，会远程从 github 下载平台文件，如果网络不好，非常容易导致失败。可以使用下面的方式指定下载的地址

```bash
$ nexe -i hello.js --remote https://github-do.panbaidu.cn/https://github.com/nexe/nexe/releases/download/v3.3.3 -t 14.15.3
```

或者在[releases](https://github.com/nexe/nexe/releases/tag/v3.3.3)页面下载对应的版本之后，放到`用户目录>.nexe`目录下面

> `-i`表示输入文件，`--remote`提供自定义远程位置，用于从中获取预构建的 nexe 二进制文件。这可以是 HTTP 或 HTTPS URL。，`-t`表示构建目标，`-o`指定输出文件，`-r`指定嵌入的资源

以后在使用 nexe 构建程序的时候就不同添加`--remote`，但需要指定`-t <version>`以使用之前下载的二进制文件

```bash
$ nexe hello.js -t 14.15.3
```

### 在 node 程序中使用

本地安装，使用方式与全局安装一致

```bash
$ npm install nexe -D
```

修改`package.json`

```json
{
  "scripts": {
    "build": "nexe"
  }
}
```

[观看视频](https://www.youtube.com/watch?v=ODlYsEITCBM)
