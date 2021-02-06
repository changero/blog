---
title: git服务器接受到更新
date: 2021-02-06
categories:
  - git
lang: zh-cn
---

我想每次推送代码到 git 服务器的时候能自动执行一下动作，这个时候就需要 git hook 上场了

git 所有 hook 在仓库的`hooks`文件夹下

<!-- more -->

首先登陆到服务器上，进入目标仓库的目录，比如`/srv/sample.git`

```bash
cd /srv/sample.git/hooks
cp post-update.sample post-update
nano post-update
```

进入编辑`post-update`文件

```bash
#! /bin/sh
unset GIT_DIR # 重要

DIR=/home/user/workspace/sample

cd $DIR

git init

git remote add origin /srv/sample.git # 直接写git仓库的文件夹路径

git clean -df

git pull origin master
```

在本地通过 clone 下载仓库

```bash
git clone git@ip:/srv/sample.git
```

之后在本地修改文件并 push 上去之后就能触发`post-update`脚本，执行相应的任务了。
