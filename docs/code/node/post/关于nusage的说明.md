---
title: 关于nusage的说明
date: "2022-08-20 19:42:28"
categories:
  - nodejs
lang: zh-cn
---

# 前言

作为 7 年老前端，终于写出了我的第一个 nodejs 工具[nusage](https://github.com/changero/nusage)。抛开能力不谈，主要这几年对自己的时间规划不够、以及缺乏了主动积极性导致的。不敢说以后就一定怎么怎么样，只希望自己在未来能更认真的做事，杜绝没有价值的事情占用太多的时间

项目起源自看到的[这个](https://github.com/chenquan/diskusage)使用`go lang`实现的查看文件大小的工具，突然萌发了自己使用 nodejs 来实现相同功能的工具的想法

从昨天到现在不到 24 小时的时间里，终于是完成了项目的基本结构和发布流程。主要包括

1. 使用 rollup+babel 进行打包
2. 通过 npm 全局安装的方式来使用可执行命令
3. 配合 github actions 完成 publish 和 release 的动作

# 项目说明

目前项目设施还很简陋，只有 rollup 和 babel，主要还是功能比较简单，并且今天主要的工作还是把整个链路走通，所有没有弄其他花哨的东西进来。

项目通过 rollup 将`src`中的源文件打包成 cjs 模块放到`dist`目录下。node 平台下，打包工具还有其他的，比如：`webpack`、`browserify`等。这里选择 rollup 也是想练练手，学习一下的意思。

值得注意的几个点：

1. 项目名是一个 scope 名，因此发布的时候一定要指定`access: public`。最好的方法是在`package.json`中配置`publishConfig`属性
2. 因为包要向外提供可执行文件，因此需要在`package.json`中配置`bin`字段。该字段可以是一个字符串，表示用哪个文件作为可执行文件。也可以是一个对象，其中每一个字段就是向外提供的一个工具名，字段的值就是可执行文件的路径

## 关于可执行文件

除了提供命令行的方式使用，还提供了可执行文件，包括 Windows/MAC/Linux。这里主要是使用[nexe](/code/node/nexe%E4%BB%8B%E7%BB%8D.html#%E5%89%8D%E8%A8%80)来完成可执行文件的编译工作

nexe 使用起来唯一比较难的就是编译包需要从 github 下载到本地的`~/.nexe`目录中，才能完成编译的动作。不过好在这个在 Github actions 上都不是问题

# 自动化

基于上述的 2 个主要发包动作，采用 Github actions 来完成，没办法，就是方便。

省去一些不重要的中间流程，这里主要说几个主要的点

## 获取 tag

由于发布的时候需要对资源进行标记，也就是打 tag，最方便的就是获取 git 里面的 tag，在推代码之前，通过`standard-version`这个包来完成

在 actions 中方法如下：

```yml
- name: Get Version
  id: get_version
  run: echo ::set-output name=VERSION::${GITHUB_REF/refs\/tags\//}
```

这样在后续的流程中，就可以通过`steps.get_version.outputs.VERSION`变量来访问

## 发布到仓库的 release

将打包出来的可执行文件都放在 release 文件夹中

```yml
- uses: ncipollo/release-action@v1.10.0
  with:
    artifacts: "release/*"
    token: ${{ secrets.MY_GITHUB_TOKEN }}
```

## 发布到 npm registry

```yml
- uses: JS-DevTools/npm-publish@v1
  with:
    token: ${{ secrets.NPM_TOKEN }}
    access: public
    tag: ${{ steps.get_version.outputs.VERSION }}
```

其中 tag 可以不传，默认就是 latest

# 后续规划

今天实现的主要的构建和发布流程，后续就主要规划对项目功能本身进行迭代。目前可以列出来的点：

1. loading 展示，计划使用[ora](https://github.com/sindresorhus/ora)

2. ui 重构，使用 React 语法的[ink](https://github.com/vadimdemedes/ink)，或者 Vue 语法的[temir](https://github.com/webfansplz/temir)

3. 添加命令行参数，如层级、忽略文件夹、指定目录、指定文件类型

4. 多线程计算

5. 封装 gui

想法需要有，慢慢做，万一都完成了呢
