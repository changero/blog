---
title: webpack之Dll技术
date: "2021-09-08 23:00:41"
categories:
  - 前端
tags:
  - webpack
lang: zh-cn
---

## webpack 之 Dll 技术

dll 在 windows 编程中指的是动态链接库，在 webpack 中则是用于将更改不频繁的代码单独编译，比如第三方库，提高编译速度

### external

跟`external`的区别在于，`external`指定的包压根不输出，而是在运行时从外部获取，比如通过 CDN 获取

```js
// webpack.config.js
external:{
 jquery: "jQuery", // 代码中import jquery，编译之后在运行时从jQuery获取
}
 // index.js
 import jquery from 'jquery'
```

<!-- more -->

### 实现 dll

创建`webpack.dll.js`

```js
// webpack.dll.js
const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "production",
  entry: {
    // 前面的jquery和jquery.plugin.js打包进名为jquery的包中
    jquery: ["jquery", "jquery.plugin.js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dll"),
    library: "[name]_[hash:6]", // 包里面暴露出去的变量名
  },
  plugin: [
    // 打包生成manifest文件，提供了映射关系等信息
    new webpack.DllPlugin({
      name: "[name]_[hash:6]", // 映射库暴露的名称
      path: path.resolve(__dirname, "dll/manifest.json"), // 资源清单文件
    }),
  ],
};
```

然后通过这个文件来打包出 dll 配置

```bash
$ webpack -c webpack.dll.js
```

接着在`webpack.config.js`中，通过`webpack.DllReferencePlugin`插件加载 dll 的配置

```js
// webpack.config.js

module.exports = {
    ...,
    plugins:[
	    ...,
    // 告诉webpack哪些库不参与打包
    	new webpack.DllReferencePlugin({
    		manifest: path.resolve(__dirname, 'dll/manifest.json') // webpack.dll.js中的输出文件
		})
    ]
}
```

这个时候在最后的输出中就不会包含 manifest 中的库

### 引入哪些没有打包的资源

接下来就是如何引入的问题，需要用到`add-asset-html-webpack-plugin`

```bash
$ npm i add-asset-html-webpack-plugin -D
```

在`webpack.config.js`文件中引入

```js
// webpack.config.js
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
module.exports = {
  plugins: [
    // 将某个文件打包输出，并自动在最终的html文件中引入
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, "dll/jquery.js"), // dll的输出文件
    }),
  ],
};
```
