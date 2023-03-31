---
title: 通过actions部署应用到surge
date: "2022-07-30 18:44:50"
categories:
  - github
lang: zh-cn
---

## 前言

[surge](https://surge.sh/)是一个用于部署静态应用的工具，通过它我们可以免费部署自己的前端静态应用

## 安装

首先要在本地安装 surge，通过本地 surge 来进行登录注册，以及获取 token。

可以直接通过 npm 来安装 surge

```bash
npm i surge -g
```

安装完成以后输入`surge`命令来完成登录或者注册

```bash
> surge

 Welcome to surge! (surge.sh)
   Login (or create surge account) by entering email & password.

          email:

```

输入邮箱和密码之后完成注册或者登录

## 本地部署

在本地安装 surge 并登录之后，来到我们要部署的静态文件夹，直接输入`surge`就可以将当前目录部署到 surge。

## 自定义域名

通过 surge 部署的时候，每一次会生成一个不同的二级域名。这样在更新的时候很不方便。所以我们需要自定义域名

- 方式一: 在部署的时候手动修改 domain
- 方式二: 在部署的时候添加`domain`参数，比如：`surge --domain mydomain.surge.sh`

当自定义域名之后，使用的仍然是 surge 的一级域名，如果想将我们自己的域名解析过去，比如访问`app.mydomain.com`就访问到我们的应用。那我们可以通过 CANME 文件来定义

首先在自己域名服务商处添加一条 CNAME 记录，解析地址就是我们的 surge 的地址。然后添加 CNAME 文件，文件内容就是`app.mydomain.com`，就可以了

## github 部署

我们可以通过 github 的 actions 功能来实现自动化部署，首先需要添加`.github/workflows`目录，目录中随便添加一个 yml 文件，这就是我们的部署文件，在流程中添加以下流程。(关于 workflows 的用法不在此处详述)

action[主页](https://github.com/marketplace/actions/publish-to-surge-sh)

```YAML
name: My workflow

on: push

jobs:
  my-job:
    name: My job
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to foo-bar.surge.sh
        uses: dswistowski/surge-sh-action@v1
        with:
          domain: 'foo-bar.surge.sh'
          project: '.'
          login: ${{ secrets.surge_login }}
          token: ${{ secrets.surge_token }}
```

其中，`domain`就是我们的自定义域名，`project`是部署的目录，`login`是 surge 登录邮箱，`token`需要在登录以后通过`surge token`来获取。

login 以及 token 需要在对应仓库的 settings 中配置`settings > Secrets > Actions`,也可以访问`https://github.com/[username]/[repo]/settings/secrets/actions`，替换对应的用户名和仓库名即可。

点击右上角`new repository secret` 按钮来创建 secret

最后将代码推送到远程仓库即可
