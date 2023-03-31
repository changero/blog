---
title: RN根据环境加载babel插件
date: '2021-06-24 22:05:00'
categories:
  - 前端
tags:
  - react-native
lang: zh-cn
---

## RN 根据环境加载 babel 插件

```js
const presets = ['module:metro-react-native-babel-preset'];
const basePlugins = [
  [
    'module-resolver',
    {
      root: ['./src'],
      alias: {
        '@': './src',
      },
    },
  ],
  [
    'module:react-native-dotenv',
    {
      moduleName: '@env',
      path: '.env',
      allowUndefined: true,
      blacklist: null,
      whitelist: null,
      safe: true,
    },
  ],
];

module.exports = {
  presets,
  plugins: basePlugins,
  env: {
    production: {
      plugins: [['transform-remove-console']],
    },
    development: {},
  },
};
```

<!-- more -->

## 解决路径别名

安装`babel-plugin-module-resolver`插件，修改`bebel.config.js`

```js
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src/',
        },
      },
    ],
  ],
};
```

这样就可以在项目中通过`@`引用 src 目录下的文件

vscode 编辑器支持，需要添加`jsconfig.js`或者`tsconfig.ts`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 解决文件后缀的问题

引入文件的时候希望省略`.js`后缀，安装`babel-plugin-module-extension-resolver`，修改`bebel.config.js`

```js
module.exports = {
  plugins: [
    [
      'module-extension-resolver',
      {
        dstExtension: '.js',
      },
    ],
  ],
};
```
