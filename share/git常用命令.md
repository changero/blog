---
title: git常用命令
date: 2019-07-09
tags:
  - git
---

## 配置
### 生成公钥
```bash
ssh-keygen -t rsa -C 'email'
```
如果要生成多个ssh密钥文件，可以输入不同的文件路径，默认在.ssh文件夹下，将对应的公钥添加到相应的git远程仓库网站,同时配置config文件，以便在使用不同网站的时候能使用正确的私钥

取消全局配置
```bash
    git config --global --unset user.name
    git config --global --unset user.email
```
<!-- more -->

config文件
```bash
Host github.com     # 这里是服务器名称，任意
HostName github.com # 这里是服务器真实地址
User git 
IdentifyFile ~/.ssh/id_rsa.pub # 对应网站的公钥

Host gitlab.com     # 这里是服务器名称，任意
HostName gitlab.com # 这里是服务器真实地址
User git 
IdentifyFile ~/.ssh/id_rsa_lab.pub # 对应网站的公钥
```
### 命令
##### 添加远程仓库地址 
> git remote add origin address

origin ： 自定义远程仓库名称
address:  远程仓库地址

##### 查看远程仓库地址
> git remote -v
##### 删除远程仓库
> git remote rm origin

##### 提交工作区修改到暂存区
> git add 
##### 提交暂存区所有信息到仓库，形成一个commitId
> git commit -m 'message'

> git commit -am 'message'

##### 提交本地修改到远程仓库
> git push 

##### 删除文件
> git rm file
##### 移动、改名
> git mv file newFile

##### 查看分支信息
> git branch   
添加a参数可以查看远程仓库的分支

回退本次merge
> git merge --abort

##### 创建分支
> git checkout -b branch

##### 创建分支并关联远程分支
> git checkout -b branch origin/branch

##### 切换分支
> git checkout branch

##### 从目标分支拉取部分文件
> git checkout branch [files]

##### 关联分支
> git branch --set-upstream-to=origin/branch branch

##### 提交的时候关联分支
> git push origin 远程分支:本地分支

> git push -u origin 远程分支

`如果本地分支名和远程分支名相同，默认情况下可以直接推送，如果不同，需要设置push.default为upstream`
> git config --local push.default upstream

##### 拉取远程数据
> git fetch 

##### 合并到当前分支
> git merge

### 回退版本的操作

1、 如果还没有通过add提交到暂存区
```bash
git checkout -- filename
```
`git checkout`还可以用于撤销修改到某一个特定版本或者分支的文件状态
```bash
git checkout origin/master -- filname
git checkout commitid -- filename
```

2、 如果提交到暂存区了
```bash
# 丢弃暂存区内的所有修改
git reset .
```
接着，可以通过`checkout`命令来撤销工作区的修改

3、 回退文件到特定版本

```bash
# 回退版本并且删除所有暂存区、工作区修改
git reset --hard commitId/branch/originbranch 
# 将所有改动合并到暂存区，工作区不变
git reset --soft commitId/branch/originbranch 
```