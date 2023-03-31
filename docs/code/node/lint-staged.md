---
title: lint-staged
date: "2021-05-09 00:26:36"
categories:
  - node
tags:
  - tool
lang: zh-cn
---

## 前言

之前我一直没有明白`lint-staged`的作用，觉得这个工具在整个流程中的作用很小，可以完全不需要。后来明白，在工程化体系中，减少哪怕一步操作，也是一个益处

那么具体作用是什么。试想在一个项目中，我们需要在提交代码之前，对代码进行格式化(lint)，然后在`add`，接着`commit`。可不可以直接在`husky`上配置钩子，直接`lint`呢，当然不行，因为对代码进行格式化之后，文件会修改，而修改之后的更改仍然在`git工作区`，不能提交到本次`commit`。所以，如果在一个较大的项目里面，哪怕我们更改一个文件，在提交之前，也需要手动执行一次`lint`，对所有文件都 lint 一遍。这时候的工作流程是

> 修改文件 -> lint -> git add -> 修改文件 -> lint -> git add -> git commit

`lint-staged`的作用就是对提交到`暂存区`的文件执行对应的命令，比如 lint，这样，当修改一个文件之后，只需要 add 到暂存区就行了。而最佳实践是，通过 husky 配置`pre-commit`钩子，执行 lint-staged，这时候的流程就变成了

> 修改文件 -> git add -> 修改文件 -> git add -> git commit

在`commit`流程之前会自动 lint，并添加到暂存区，然后`commit`

接下来开始说明`lint-staged`如何配置

## 安装

```bash
$ npm install ling-staged -D
$ yarn lint-staged -D
```

## 配置

修改`package.json`

```json
{
  "lint-staged": {
    "src/**/*.js": ["lint", "git add"]
  }
}
```

其他配置文件还有`.lintstagedrc`, `lint-staged.config.js`

配置[husky](./husky)，添加`pre-commit`钩子

```bash
$ npx husky add .husky/pre-commit "npx lint-staged"
```

[参考文章](https://www.cnblogs.com/jiaoshou/p/12250278.html)

## mrm

mrm 是一个可以根据项目的依赖自动生成配置的工具

### 安装

```bash
$ npm install mrm -D
```

### 示例

在安装好相应的依赖之后

```bash
$ npx mrm package editorconfig gitignore eslint prettier lint-staged
```
