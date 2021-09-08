---
title: HMR
date: "2021-09-07 23:06:56"
categories:
  - 前端
tags:
  - webpack
lang: zh-cn
---

## HMR

HMR(Hot Module Replacement)，全称模块热替换，主要用于开发过程中，只更新修改过的部分，并保留了其他部分的状态。避免因项目过大导致更新时间过长的问题。在不开启 hmr 的项目中，当修改一个文件之后，webpack 会重新打包所有模块，并通过 ws 通知客户端刷新整个页面(live reload)。

### 如何开启 HMR

开启 hmr 选项，必须使用`webpack-dev-server`来启动开发服务，在 webpack 配置文件中，比如`webpack.config.js`，添加`devServer`选项

<!-- more -->

```js
// webpack.config.js
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].[chunkhash:6].js", // chunkhash或者contenthash,hash选项在w5会警告了
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new HotModuleReplacementPlugin(), // development模式下，开启了Hot之后，webpack会自动添加该插件
    // 或者 new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true, // 添加这个配置
    port: 8080,
  },
};
```

简单的写一点`src/index.js`的文件内容

```js
// src/index.js

const show = () => {
  app.innerText = "1";
};
```

此时，如果修改了文件之后，webpack 会重建所有文件，并通知浏览器刷新。这样在项目过大的时候，往往一次编译需要花不少的时间，而保存是一个高频操作，这样使得每一次修改文件之后的调试体验非常差

接着在入口文件中添加`module.hot`相关的配置，（vite 是放在了 import.meta 上）

```js
if (module.hot) {
  module.hot.accept(show);
}
```

上面这一段的意思是，如果开启了 hmr，则当有文件更新的时候，执行 show 方法。

对于`module.hot`这个守卫语句，可以在构建的时候通过`tree-shaking`移除掉

现在可以看到，当修改了`index.js`文件之后，能自动执行 show 方法

通过检查`network`，能够发现，当修改了文件之后，多了 1 个`json`文件和`js`文件的请求，这就是 webpack 请求到的差异包内容，说明 hmr 启动成功了

### 包含依赖文件

假设`index.js`依赖其他文件的数据，

```js
// src/index.js
const bo = require("./body.js");
const show = () => {
  app.innerText = bo;
};
if (module.hot) {
  module.hot.accept("./body.js", show);
}

// src/body.js
module.exports = "body.js";
```

当我们修改 body 文件之后，发现客户端确有请求差异包，但是界面却没有更新。

仔细分析一下这里的逻辑

1. 监听`body.js`文件，当文件变化，请求差异包
2. 执行 show 方法

根据比较观察到的现象，问题只能出现在 show 方法中，通过打印得知，当更新了 body 文件之后，并没有重建 body 文件，需要做如下修改

```js
// src/index.js
// 删除 const bo = require('./body.js')
const show = () => {
  app.innerText = require("./body.js");
};
```

或者，删除掉`module.hot.accept`的第一个参数

```js
if (module.hot) {
  module.hot.accept(show);
}
```

这样，当修改任意文件之后，重建所有文件，包括`index`文件，这样也能获取到 body 的最新内容

### 原理解析

使用`webpack serve`启动开发服务，webpack 通过解析，加载 server，位于`node_modules\@webpack-cli\serve\lib\index.js`，在该文件中，启动`webpack-dev-server`

```js
// node_modules\@webpack-cli\serve\lib\index.js
if (typeof server.start === "function") {
  await server.start();
}
// node_modules\webpack-dev-server\lib\Server.js
// 进入初始化阶段
await this.initialize();
```

在`initialize`阶段，主要处理了这些事情

1. 补充额外的入口文件

   ```js
   // 添加客户端socket
   additionalEntries.push(
     `${require.resolve("../client/index.js")}?${webSocketURL}`
   );

   if (this.options.hot === "only") {
     hotEntry = require.resolve("webpack/hot/only-dev-server");
   } else if (this.options.hot) {
     hotEntry = require.resolve("webpack/hot/dev-server");
   }
   ```

   创建`webpack.EntryPlugin`

   ```js
   new webpack.EntryPlugin(compiler.context, [(hotEntry: 插件位置)], {
     name: undefined,
   }).apply(compiler);
   ```

   如果没有`webpack.EntryPlugin`,否则的话会通过`compiler.options.entry`来修改入口

2. 启动服务

```js
// 通过compiler.hooks.done.tap，给每一个compiler对象添加完成事件，得到本次编译之后的stat信息
this.setupHooks();
// 创建express对象
this.setupApp();
// express的中间件，用于验证请求头
this.setupHostHeaderCheck();
// 添加webpack-dev-middleware中间件
this.setupDevMiddleware();
// Should be after `webpack-dev-middleware`, otherwise other middlewares might rewrite response
// 内置路由 /webpack-dev-server
this.setupBuiltInRoutes();
// 文件监听
this.setupWatchFiles();
// 根据options中的参数执行其他功能
this.setupFeatures();
// 创建server对象
this.createServer();
```

`webpack-dev-middler`会真正的启动监听模式，

```js
const MemoryFS = require("memory-fs");
const mime = require("mime");
const fs = new MemoryFS();
function DevMiddler(compiler) {
  compiler.watch({}, () => {
    // 监听回调
    console.log();
  });
  compiler.outputFileSystem = fs;
  return (req, res, next) => {
    // url  http://localhost:8080/main.js
    const filename = fs.join(compiler.outputPath, req.url);
    try {
      const stat = fs.stat(filename);
      if (stat.isFile()) {
        const content = fs.readFileSync(filename);
        res.setHeader("Content-Type", mime.getType(filename));
        res.send(content);
      }
    } catch {
      res.sendStatus(404);
    }
  };
}
```

> 为了提高性能，devserver 生成的文件并不会直接生成到硬盘上，而是在内存中，通过`memory-fs`模块完成
>
> compiler.outputFileSystem = new require('memory-fs')

#### 创建 socket 服务器

```js
// Server.js
const socket = require('socket.io')

const io = socket(httpServer)

io.on("connection", (client) => {
    this.sockets.push(client)

    client.on("disconnect", () => {
        // 断开连接的操作，需要清除数组中对应的数据
    })
    if(this._state){ // 通过添加compiler.hooks.done.tap通知
        client.emit("hash", this._state.hash)
        client.emit("ok")
    }

})
// 同时在setupHooks函数中，向所有客户端广播更新
setupHooks(){
    compiler.hooks.done.tap('server', (stat) => {
        this._stat = stat
        this.sockets.forEach(client => {
			client.emit("hash", state.hash)
	        client.emit("ok")
        })
    })
}
```
