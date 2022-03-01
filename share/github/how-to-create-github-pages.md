---
title: 如何创建一个github pages仓库
date: '2019-05-16 21:12:23'
categories:
  - github
lang: zh-cn
---

## 创建 github pages 的 3 种方法

### 1.username.github.io 方法

1. 首先创建一个新的仓库，并命名为 username.github.io,其中 username 替换成当前 github 用户的名称
2. 在仓库中新建一个 index.html 或者 index.md。添加一些内容，并提交
3. 访问[username].github.io

<!-- more -->

### 2.通过已有模版创建

1. 新建一个仓库，命名随意
2. 在 setting 中找到 github pages。点击 choose themes 按钮，选择一款主题
3. 提交之后便可以通过[username].github.io/[reponame]访问

### 3.自定义页面

1. 新建一个仓库，命名随意
2. 在 setting 中找到 github pages。在 source 选择需要展示的分支，然后点击 save
3. 保存成功以后通过[username].github.io/[reponame]访问

默认行为下，[username].github.io 是直接访问[username].github.io 仓库的，其他的仓库在配置了`github pages`服务之后需要指定对应的仓库名才能访问

### CNAME 访问

在仓库里面创建一个 CNAME 文件，写入域名解析中的 CNAME 记录。CNAME 记录需要解析到[username].github.io，比如说对于[username].github.io/[reponame]，就创建一个 CNAME 记录为[reponame].domain.com。这样访问[reponame].domain.com 就可以直接访问[reponame]仓库部署的 pages 服务

## 配合[vuepress](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)部署

按照正常的步骤编译并提交。这里主要说一下关于访问的问题。

如果实用的是方式 1 进行部署，那么不用做任何修改。

如果使用的是后面两种方式部署，那么需要修改 config.js 里面的 base 字段。部署后的访问路径是`[username].github.io/[reponame]`。所以，base 也修改为`reponame`同名即可访问。另外，如果当前仓库通过自己的域名通过 CNAME 的方式访问，那么只需要把`setting`里面的`custom domain`修改为自定义链接就可以了
