---
title: husky
date: "2021-05-09 00:05:51"
categories:
  - node
tags:
  - tool
lang: zh-cn
---

> husky 是一个用于在 node 中配置 git 钩子的工具，这样我们可以在提交的时候对代码进行格式化，规范团队的代码格式。如今 husky 进入了版本 6，在用法上也有点区别了，不需要在`package.json`文件里面配置了。于是在此做个记录。更多信息查看[官方 git](https://github.com/typicode/husky)

## 安装

```bash
$ npm install husky -D
# 或者
$ yarn husky -D
```

## 初始化

```bash
$ npx husky install
```

或者可以按照官方的指引，在`npm`的版本在 7 以上，可以使用`npm set-scripts`

```bash
$ npm set-script prepare "husky install" && npm run prepare
```

初始化完成以后，默认会在根目录下生成`.husky`文件夹，当然也可以自己指定

```bash
$ npx husky install .config/husky
```

## 添加钩子

```bash
$ npx husky add .husky/pre-commit "eslint --fix"
# 或者
$ npx husky set .husky/pre-commit "eslint --fix"
```

`add`和`set`的区别在于，每次`add`的命令会添加到钩子文件中，如果没有会创建钩子文件，而`set`执行之后，钩子文件中只会有设置的这一条命令

## 卸载

用法

```bash
$ npx husky uninstall
```

卸载之后之前添加的钩子文件还在，只是不会触发钩子的功能
