---
title: 如何创建一个github pages仓库
meta:
    - name: author
      content: Changero
    - name: email
      content: changero@126.com

---


## 创建github pages的3种方法

### 1.username.github.io方法

1. 首先创建一个新的仓库，并命名为username.github.io,其中username替换成当前github用户的名称
2. 在仓库中新建一个index.html或者index.md。添加一些内容，并提交
3. 访问[username].github.io

### 2.通过已有模版创建

1. 新建一个仓库，命名随意
2. 在setting中找到github pages。点击choose themes按钮，选择一款主题
3. 提交之后便可以通过[username].github.io/[reponame]， 访问

### 3.自定义页面

1. 新建一个仓库，命名随意
2. 在setting中找到github pages。在source选择需要展示的分支，然后点击save
3. 保存成功以后通过[username].github.io/[reponame]

如果还没有创建[username].github.io，那么可以通过custom domain的方式访问，具体就是需要有自己的域名，接着添加CNAME解析到[username].github.io。这样通过自己的域名就可以访问当前仓库了


## 配合[vuepress](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)部署

按照正常的步骤编译并提交。这里主要说一下关于访问的问题。

如果实用的是方式1进行部署，那么不用做任何修改。

如果使用的是后面两种方式部署，那么需要修改config.js里面的base字段。部署后的访问路径是`[username].github.io/[reponame]`。所以，base也修改为`reponame`同名即可访问。另外，如果当前仓库通过自己的域名通过CNAME的方式访问，那么只需要把`setting`里面的`custom domain`修改为自定义链接就可以了