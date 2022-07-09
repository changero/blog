---
title: vue项目实战课笔记
date: '2022-04-21 21:40:15'
categories:
  - vue
lang: zh-cn
---

## 生成项目

使用`vue-cli4`生成项目

### 与之前版本的主要区别

包括整个目录的变化，以及 webpack 的升级，提高了构建的速度，以及提供了 vue ui，相比于 cli3 的主要区别

- 默认 css 预处理器由 sass 选项改为`dart sass`
- 其他依赖的升级

### 初始化

安装最新版 cli4

```bash
# use npm
npm install @vue/cli -g

# use yarn
yarn global add @vue/cli

# use pnpm
pnpm install @vue/cli -g
```

通过`vue ui`可视化创建项目

### 路由的配置

在 router 文件夹，分模块的引入所有页面组件，在 router 文件中，通过`require.context`引入定义的所有模块文件

```js
const files = require.context('./', false, /\.router\.js$/); // false表示不读取子目录
const routes = [];
// 假设每个子模块中配置的都是数组结构
files.keys().forEach((key) => routes.push(...files(key).default));
```

### vuex 的配置

同样采用模块化的配置，通过`require.context`引入每一个 module

```js
const modulesFile = require.context('./modules', false, /\.js$/);
const modules = modulesFile.keys().reduce((m, mkey) => {
  m[mkey] = modulesFile[key].default;
  m[mkey].namespaced = true;
}, {});

export default new Store({
  modules,
});
```
