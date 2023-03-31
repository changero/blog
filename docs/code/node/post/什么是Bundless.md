---
title: 什么是Bundless
date: "2022-09-02 12:06:35"
categories:
  - node
lang: zh-cn
---

## 什么是 Bundless

如今有许多现代打包器，它们都提供了对`ES Module`和`Commonjs`模块的支持，可以根据依赖对模块进行打包并生成一个 Bundle 文件。但有的时候，我们并不总是需要将代码打包成一个 Bundle，这就是 Bundless。比如：`tsc`、`@babel/cli`以及`mkdist`等工具

## mkdist

[mkdist](https://github.com/unjs/mkdist) 是一个轻量级的文件到文件转换器

- 复制所有资源
- 支持对 Vue 但文件组件进行转换
- 基于 `esbuild` 实现快速且最小的转换
- 支持`ts`、`js`和`vue`文件

与 tsc 和 babel 的区别在于，它们主要专注于转译而不是保持源代码级别的质量，此外缺乏对 vue 文件的支持

### 简单使用

安装

```bash
yarn add mkdist -D

npx mkdist
```

有几个比较重要的参数

- `--src`，打包的源文件夹，默认:src
- `--dist`，打包生成的目标文件夹，默认:dist
- `--format`，目标文件格式，默认:esm，可以指定为 cjs
- `--ext`，支持的文件后缀，默认: ts|js|mjs

**需要注意的是，mkdist 不会做多余的语法转换的动作**

## unbuild

[`unbuild`](https://github.com/unjs/unbuild)是一个统一的 javascript 构建系统，基于 rollup，支持 typescript 并生成其类型声明文件

- Bundless，基于`mkdist`完成文件到文件的转换
- typescript，利用[`jiti`](https://github.com/unjs/jiti)来支持在 nodejs 下的 typescript 运行时

### 使用方法

安装

```bash
yarn add unbuild -D
```

创建`build.config.js`

```js
export default {
  entries: ["./src/index.js"],
};
```

unbuild 的配置可以在`package.json`中指定`unbuild`字段，或者创建`build.config.{js,ts,json}`配置文件

例如 build.config.ts

```ts
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index"],
});
```

### 参数说明

|      参数名      |                            说明                             |                                       类型                                       | 默认值 |
| :--------------: | :---------------------------------------------------------: | :------------------------------------------------------------------------------: | :----: |
|       name       |                                                             |                                                                                  |        |
|     rootDir      |                                                             |                                                                                  |        |
|     entries      | 入口文件,如果配有在配置文件中申明，将从 package.json 中读取 |    [BuildEntry](https://github.com/unjs/unbuild/blob/main/src/types.ts#L40)[]    |        |
|      outDir      |                          输入目录                           |                                      string                                      |  dist  |
|   declaration    |                      是否输出申明文件                       |                                     boolean                                      | false  |
|      clean       |                 是否每次构建的时候进行清理                  |                                     boolean                                      | false  |
|       stub       |                                                             |                                     boolean                                      | false  |
|    externals     |                         排除的文件                          |                                      Array                                       |        |
|   dependencies   |                                                             |                                      Array                                       |        |
| peerDependencies |                                                             |                                      Array                                       |        |
| devDependencies  |                                                             |                                      Array                                       |        |
|      alias       |                            别名                             |                                                                                  |        |
|     replace      |                                                             |                                                                                  |        |
|    failOnWarn    |                        出现警告失败                         |                                     boolean                                      |        |
|      rollup      |                       rollup 的配置项                       | [RollupBuildOptions](https://github.com/unjs/unbuild/blob/main/src/types.ts#L42) |        |

#### BuildEntry 说明

- builder，构建器，支持`untyped`、`rollup`、`mkdist`
- input，入口目录
- name,
- outDir, 输入目录
- declaration，是否输出类型声明文件

以下参数为`builder: mkdist`拥有

- format，打包格式，可选：`esm`，`cjs`
- ext, 文件扩展，可选：`cjs`，`mjs`，`js`，`ts`

以下参数为`builder: untyped`拥有

- defaults，类型：`Record<string, any>`

## father

[father](https://github.com/umijs/father/blob/master/docs/guide/index.md)是 umijs 团队开发的打包工具，集成了多种打包方式。包括 Bundle、Bundless，支持 cjs、umd 和 esm 等格式

### 快速上手

通过`create-father`快速生成一个 father 项目

```bash
yarn create father father-demo
```

执行`yarn build`即可完成构建

构建参数查看[文档](https://github.com/umijs/father/blob/master/docs/config.md)
