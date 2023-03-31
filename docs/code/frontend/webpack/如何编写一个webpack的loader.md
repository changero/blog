---
title: 如何编写一个webpack的loader
date: "2021-04-15 00:17:32"
categories:
  - 前端
tags:
  - webpack
lang: zh-cn
---

loader 本质上就是一个处理文件内容的函数，第一个 loader 的传入参数只有一个：资源文件(resource file)的内容。compiler 需要得到最后一个 loader 产生的处理结果。这个处理结果应该是 String 或者 Buffer（被转换为一个 string），代表了模块的 JavaScript 源码。另外还可以传递一个可选的 SourceMap 结果（格式为 JSON 对象）。

如果是单个处理结果，可以在同步模式中直接返回。如果有多个处理结果，则必须调用 this.callback()。在异步模式中，必须调用 this.async()，来指示 loader runner 等待异步结果，它会返回 this.callback() 回调函数，随后 loader 必须返回 undefined 并且调用该回调函数。

```js
// loader.js
module.exports = function(content, map, meta) {};
```

<!-- more -->

## 创建一个简单的 webpack 项目

文件结构如下：

```
- src
  - index.js
- loaders
  - loader1.js
webpack.config.js
```

`wbepack.config.js`的文件内容如下：

```js
const fs = require("fs");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "my-loader",
      },
    ],
  },
  resolveLoader: {
    modules: [path.resolve("./loaders")],
  },
};
```

- `resolveLoader.modules`配置查找 loader 的目录，这样在写 loader 的时候就不用写绝对路径。比如用`path.resolve`来处理得到绝对路径

`src/index.js`如下：

```js
console.log(process.env.LOADER);
```

模拟的 loader 功能就是替换`process.env.LOADER`为对应的字符串

### 同步返回

`loader1.js`的内容：

```js
module.exports = function(content, map, meta) {
  return content.replace("process.env.LOADER", "'yes, oh, my loader'");
};
```

或者通过 this.callback()

```js
module.exports = function(content, map, meta) {
  this.callback(
    null,
    content.replace("process.env.LOADER", "'yes, oh, my loader'"),
    map,
    meta
  );
  return;
};
```

这样执行 webpack 命令就能完成构建

## 进阶

### 如何传递参数

安装`loader-utils`，`schema-utils`

- 首先要创建一个`schema.json`文件

  ```json
  {
      "type": "object",
      "properties": {
          "content": {
              type: "string"
          }
      },
      // 是否允许添加额外的参数
      "additionalproperties"： false,
  }
  ```

修改`loader1.js`文件内容：

添加`loader-utils`和`schema-utils`的引用

```js
const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");

const schema = require("./schema.json");

module.exports = function(content, map, meta) {
  const options = getOptions(this) || {};
  validate(schema, options, {
    name: "my-loader",
  });
  return content.replace("process.env.LOADER", options.content);
};
```

在`webpack.config.js`文件中添加 loader 的 options

```js
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'my-loader',
    options: {
        content: "'yes, oh, my loader, options'",
    }
}
```

接着执行 webpack 进行编译，查看编译后的效果

在上面的 schema.json 文件中，我们设置`"additionalproperties"： false,`，来试试效果

在 options 中增加一个`name`字段，编译的时候，webpack 就会给我们提示

```bash
configuration has an unknown property 'name'. These properties are valid:
```

### 异步构建

在多数时候，我们的 loader 所执行的任务不是同步完成的 ，可能需要等到很长的时间，所以就不能通过直接 retuern 的形式返回执行后的结果

在 loader 函数中，先创建一个异步函数

```js
module.exports = function(content, map, meta) {
  const options = getOptions(this) || {};
  validate(schema, options, {
    name: "my-loader",
  });
  // 创建异步任务
  const callback = this.async();
  Promise.resolve()
    .then(() => {
      const newContent = content.replace("process.env.LOADER", options.content);
      // 假设这是一个很耗时的任务
      setTimeout(() => {
        callback(null, newContent, map, meta);
      }, 3000);
    })
    .catch(callback);
};
```

这里异步并不是可以跳过结果，执行下一个 loader，只是在本次任务中的异步行为

第二种创建异步任务的模式是返回一个 Promise，不在赘述

## [pitch 阶段](https://www.webpackjs.com/api/loaders/#%E8%B6%8A%E8%BF%87-loader-pitching-loader-)

在配置`module.rules`上，每一组规则的 loader 是从后往前执行的，而在 loader 上可以挂载一个`pitch`函数，这个函数的执行顺序就是从前往后执行，而且所有 loader 的 pitch 函数会在第一个执行的 loader 前执行

首先，传递给 pitch 方法的 data，在执行阶段也会暴露在 this.data 之下，并且可以用于在循环时，捕获和共享前面的信息。

```js
module.exports = function(content) {
  return someSyncOperation(content, this.data.value);
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  data.value = 42;
};
```

其次，如果某个 loader 在 pitch 方法中给出一个结果，那么这个过程会回过身来，并跳过剩下的 loader。在我们上面的例子中，如果 b-loader 的 pitch 方法返回了一些东西：

则将会跳过当前 loader 以及后面的 loader

## 参考

- [编写一个 loader](https://webpackjs.com/contribute/writing-a-loader)
- [loader api](https://www.webpackjs.com/api/loaders/)
