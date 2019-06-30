---
title: babel7入门级指南
date: 2019-06-04
categories:
  - 编程
  - 前端
tags:
  - js
  - babel 
sidebarDepth: 2
---

babel中文[文档](https://www.babeljs.cn/)，[官网](https://babeljs.io/)

## 介绍

> 撰写这篇文章的时候基于`babel: ^7.4.5`

Babel 是一个通用的多用途 JavaScript 编译器。通过 Babel 你可以使用（并创建）下一代的 JavaScript，以及下一代的 JavaScript 工具。

作为一种语言，JavaScript 在不断发展，新的标准／提案和新的特性层出不穷。 在得到广泛普及之前，Babel 能够让你提前（甚至数年）使用它们。

<!-- more -->

Babel 把用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本。 这一过程叫做“源码到源码”编译， 也被称为转换编译（transpiling，是一个自造合成词，即转换＋编译。以下也简称为转译）。

例如，Babel 能够将新的 ES2015 箭头函数语法：

```JS
const square = n => n * n;
```

转译为：

```js
const square = function square(n) {
  return n * n;
};
```

不过 Babel 的用途并不止于此，它支持语法扩展，能支持像 React 所用的 JSX 语法，同时还支持用于静态类型检查的流式语法（Flow Syntax）。

更重要的是，Babel 的一切都是简单的插件，谁都可以创建自己的插件，利用 Babel 的全部威力去做任何事情。

再进一步，Babel 自身被分解成了数个核心模块，任何人都可以利用它们来创建下一代的 JavaScript 工具。

babel 总共分为三个阶段：解析，转换，生成。

babel 本身不具有任何转化功能，它把转化的功能都分解到一个个 plugin 里面。因此当我们不配置任何插件时，经过 babel 的代码和输入是相同的。

## @babel/core

`@babel/core`处于babel生命周期的解析阶段，babel的其他工具，包括结合第三方构建器都是调用这个包来进行代码解析的。它允许使用编程的方式来对一段代码进行编译生成ast。

安装：

```js
npm install @babel/core -S
```

我们可以直接使用`babel.transform`来编译

```js
const babel = require('@babel/core')

babel.transform('const obj = {};const copyObj = {...obj}', options)
```

> 输出包含有`{code, ast, mode}`的对象

也可以读取一个文件

```js
// 异步读取
babel.transformFile("filename.js", options, function(err, result) {
  result; // => { code, map, ast }
});
// 同步读取
babel.transformFileSync("filename.js", options);
```

要是已经有一个 Babel AST（抽象语法树）了就可以直接从 AST 进行转换。

```js
babel.transformFromAst(ast, code, options);
```

对于上述所有方法，options 指的都是 [http://babeljs.io/docs/usage/options/](http://babeljs.io/docs/usage/options/)

## @babel/cli

babel的cli工具，允许我们通过命令行编译文件。必须同时安装`@babel/core`

安装：

```js
npm i @babel/cli -D
```

使用：

```bash
# 基本使用
# 将会把结果输出到控制台
npx babel filename.js

# 输出到文件`--out-file`或者`-o`
npx babel filename.js --out-file compile.js

# 实时编译`--watch`、`-w`
npx babel filename.js -w --out-file  compile.js

# 添加sourceMap`--source-maps`、`-s`
npx babel filename.js -w -s --out-file  compile.js

# 如果希望使用内联映射表，添加`inline`参数
npx babel filename.js -w -s inline --out-file  compile.js

# 编译整个目录`--out-dir`、`-d`
npx babel src -d lib

# 编译整个 src 目录下的文件并将输出合并为一个文件。
npx babel src -d compile.js

# 忽略规范和测试文件
npx babel src --out-dir lib --ignore "src/**/*.spec.js","src/**/*.test.js"
```

[更多参考](https://www.babeljs.cn/docs/babel-cli)

## @babel/node

与`node`的功能是一样的，直接执行指定的文件，只不过多了一个转换的步骤。一般用于开发环境

## @babel/register

引入`@babel/register`以后，会重写require函数，所以在此之后require调用的包，都会经过babel编译，但不包括当前文件

## 开始操作

上面，再了解了使用babel的几种方式以后，我们使用`@babel/cli`工具来了解babel的转换结果

首先在`src/index.js`中写下如下语句

```js
const func = (num) => console.log(num)
```

添加script命令到`package.json`

```json
  "scripts":{
    "compile": "babel src -d -w dist"
  }
```

然后执行命令`npm run compile`，结果输出：

```js
const func = num => console.log(num);
```

跟源文件没有任何区别，是不是babel执行失败的。其实不是的，因为babel的转换过程依赖plugin执行，如果没有plugin，就会原样输出。所以如果我们要想编译arrow function，需要添加相应的plugin-`@babel/plugin-transform-arrow-functions`

```bash
npm install @babel/plugin-transform-arrow-functions -D
```

修改script

```json
"scripts":{
    "compile": "babel --plugins @babel/plugin-transform-arrow-functions src -w -d dist"
}
```

执行命令以后，结果如下：

```js
const func = function (num) {
  return console.log(num);
};
```

arrow-function 正确的编译成了普通函数

除了支持在命令行中添加插件以外，babel还支持配置文件

1、 在`package.json`中添加babel字段

2、 新增`.babel.rc`文件

3、 新增`babel.config.js`文件

以`.babelrc`为例,编写代码如下：

```json
{
  "plugins":[
     "@babel/plugin-transform-arrow-functions"
  ]
}
```

或者带参数的形式

```json
{
  "plugins":[
     [
       "@babel/plugin-transform-arrow-functions",
       {
          spec: true
        }
      ]
  ]
}
```

现在我们已经能够编译`arrow function`新语法了，如果还需要支持其他特性，就必须添加其他相应的插件。但是，在我们的项目中，往往有许许多多的特性需要转化，那么光是维护插件集就是一项费事的工作了。所以就不得不提到预设(presets)了。

babel的转换工作都是通过添加插件来进行，而presets就是一个插件的集合，这样我们只需要添加一个preset就可以包含很多个插件的功能了。现在，我们只需要关注一个`@babel/preset-env`的包就可以了，至于其他的`preset-es201x`或者`preset-stage-x`可以不用关注了，因为它们在`babel7`中已经被移除[](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)

## @babel/preset-env

首先我们要安装包

```bash
npm install @babel/preset-env -S
```

修改`.babelrc`

```json
{
  "presets":[
    "@babel/preset-env"
  ]
}
```

更多详情可以查看[文档](https://babeljs.io/docs/en/babel-preset-env)

### polyfill

在继续理解之前先来说一下什么是ployfill。

polyfill的意思是垫片，它的作用是使我们的代码在各种版本的浏览器中都能使用到相同的API。

试想一个这样的场景，当你编译好一个文件，然后拿到chrome、firefox等现代浏览器里面去运行，发现效果不错。然后高高兴兴的就把代码提交到了版本库。过了一会就有人来找你了，说你刚才提交的代码在它的浏览器中无法运行。你接受了他的bug邀请，赶赴战场并熟练的按下`F12`，发现一个绚丽的场景。其中又一个error引起了你的注意:`... is not a function`。你想起了这是你调用的一个新方法，恰好这个新方法在这个浏览器里面还不支持。

怎么办？升级浏览器？不现实。我们无法判断用户运行代码的环境，所以只能从代码层面入手。这个时候就是polyfill大显身手的时候了，它通过在项目中引入别人写好的方法，让你写的新方法能够在低版本浏览器中也能够运行起来。

不过要注意的是，polyfill包含的内容非常多，不是里面所有的方法我们都有用到，但是也会被一起打包进项目代码，导致产物体积过大。

### useBuiltIns

useBuiltIns选项有3个可选值:`entry`、`usage`、`false`，主要用于处理代码中`import '@babel/polyfill'`或者`require('@babel/polyfill')`的地方

- entry: 全局值引入一次ployfill，编译的结果中用`core-js`相应包替换。如果引入多次将可能导致冲突

- usage: 在使用到特定API的文件中引入`core-js`的相应包

- false: 不替换

#### **entry**

在entry模式下，要求在代码中只写入一次polyfill，一般写在项目的入口文件

```js
// index.js
import '@babel/ployfill'
```

编译结果如下

```js
"use strict";

require("core-js/modules/es6.array.copy-within");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es7.array.flat-map");

// 总共130个包的引入

require("regenerator-runtime/runtime");
```

可以看到即使我们什么都没做，依然引入了如此数量的包

#### **usage**

在usage模式下，不需要显示的去引入`@babel/polyfill`。而是当发现文件中使用到新API的时候，会自动在文件头部引入对应的包

```js
var p = new Promise();
```

输出：

```js
require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var p = new Promise(); 
```

## runtime与transform-runtime

`@babel/runtime`与`@babel/plugin-transform-runtime`两个包是最容易让人混淆的，根据名字也只能猜出后一个是插件，至于区别更是不知道是什么

我们在写一些新特性的时候，比如

```js
class Foo {
    method() { }
}
```

其对应的编译结果是：

```js
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Foo =
/*#__PURE__*/
function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createClass(Foo, [{
    key: "method",
    value: function method() {}
  }]);

  return Foo;
}();
```

发现编译之后，文件中会多出几个方法来，很显然，这些方法都是用于辅助那个class的方法。目前来看，这样的编译结果没有任何问题，可一旦文件多了起来就会发现，在每一个使用到class的文件，头部都会多几个这样的方法，而且一摸一样。这样也会导致在最后的产物中有重复的东西。

解决这个问题的方法就是引入`@babel/plugin-transform-runtime`插件，安装、修改配置、走起

```js
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
```

现在头部的几个方法都变成了对`@babel/runtime`包的引入，而不是直接定义一个方法，那么所有的文件也都同样的引入包，不在去定义方法的话，产物自然就变小了

可以看到`@babel/runtime`包括了很多辅助性的函数，所以它其实是一个工具包。而`@babel/plugin-transform-runtime`插件，是用于直接导入辅助函数，而不是定义一个个的函数

## 与第三方工具结合

常用的第三方构建工具例如`webpack`、`gulp`等都有相应的介入babel的包，webpack中对应的是`babel-loader`，gulp中对应的是`gulp-babel`
通过这些包我们就可以直接最构建器中启动babel编译文件，而不需要手动调用cli工具


## 总结

简单讲述了一下关于bebel的使用方法、以及配置。而babel还有更多其他配置和选项需要去学习，现在只是有了一个大概的印象，至于更高阶的babel原理留待以后探索


