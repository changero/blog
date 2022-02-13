---
title: 新的react-jsx转换器
date: '2022-02-13 20:07:35'
categories:
  - react
lang: zh-cn
---

## 前言

新的 jsx 转换器是 react 更新到 v17 之后加入的。使用最新版的 create-react-app 来创建项目则开箱即用，包含以下新的特性：

1. 通过新的转换，在使用 JSX 时可以不导入 React
2. 其编译的输出可能会略微改善捆绑包大小
3. 它将使未来的改进成为可能，从而减少学习 React 所需的概念数量

对于以上的特性，可能最关注的就是第一条，而其他改善是我们直观上看不到的。

在以前的版本中，我们直到，如果在一个文件中有使用到 jsx，则必须引入 React，即使没有用到 React 本身。原因是我们的 jsx 经过编译之后，生成的代码中需要调用 React.createElement 方法，所以必须手动引入

而在新版本的转换器中，则不是必须添加的。

```js
function App() {
  return <h1>Hello world</h1>;
}
```

转化之后

```js
import { jsx as _jsx } from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}
```

## 如何升级 transform

这里只介绍手动升级的方法

如果您使用的是 ：@babel/plugin-transform-react-jsx

```bash
npm update @babel/core @babel/plugin-transform-react-jsx
yarn upgrade @babel/core @babel/plugin-transform-react-jsx
```

如果您使用的是 ：@babel/preset-react

```bash
npm update @babel/core @babel/preset-react
yarn upgrade @babel/core @babel/preset-react
```

接着再 babel 配置中，修改对应插件的选项

```json
{
  "plugins": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ]
  ]
}
```

将`runtime`选项修改为`automatic`就可以了，注意，需要先将对象的插件升级到最新版本才支持。默认情况下，runtime 的默认值是`classic`

## 删除无用的 react 导入

升级完成以后，对于代码中对于的引入可以做一个清理，官方提供了一个包

```bash
npx react-codemod update-react-imports
```

运行此 codemod 将：

1. 删除所有未使用的 React 导入，作为升级到新 JSX 转换的结果。

2. 将所有默认的 React 导入（即 ）更改为解构的命名导入（例如），这是将来的首选样式

[原文](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)
