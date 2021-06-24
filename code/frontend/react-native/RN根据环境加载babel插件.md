---
title: RN根据环境加载babel插件
date: "2021-06-24 22:05:00"
categories:
  - 前端
tags:
  - react-native
lang: zh-cn
---

## RN根据环境加载babel插件

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

