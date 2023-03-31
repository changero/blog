---
title: 理解commonJS模块加载以及循环依赖的问题
date: 2019-06-29
categories: 
  - 前端
  - 编程
tags: 
  - js
  - nodejs
  - commonjs
---


## commonjs模块的加载机制

commonjs中，一个脚本文件就是一个模块，通过`exports`、或者`module.exports`来导出变量或数据，其实这两者本质上是同一个对象，也即`module.exports === exports`。

当我们通过`require`导入一个模块的时候，如果这个模块没有被加载过，就会被立即执行，并且在内存中生成一个模块对象：

```js
{
    id: '...',
    exports: { ... },
    loaded: true,
}
```

`id`就是模块名，`exports`就是导出的数据对象，`loaded`表示当前模块是否加载完成

<!-- more -->

举个🌰：

```js
// main.js
const a = require('./a')
const a1 = reuqire('./a')

// a.js
console.log('this is module "a"');
```

执行`main.js`之后，发现控制台中只打印了一句。表明，在第二句`require`执行的时候，a文件并没有被再次执行，而是直接返回了内存中的模块对象。我们进一步证明一下

```js
a === a1 // true
```

### module.exports和exports

在模块的初始化定义当中，`exports`就是`module.exports`，只是使用的形式不同，require引入一个模块的时候将返回该模块的`module.exports`变量

```js
module.exports === exports
```

因此在导出变量的时候要小心，不能直接对`exports`重新赋值，否则，会切断跟module的联系

```js
exports.a = 'a' ✅
module.exports.b = 'b'  ✅

exports = {  ❌
    c: 'c'
}
```

这样将会导致c导出失败，而只会有a、b两个变量

 ## 循环依赖

 循环依赖指的是在a模块中依赖b模块，而在b模块中又返回来依赖a模块。虽然在项目中应该避免出现循环依赖，但当项目足够大的时候，也不能完全避免这样的问题发生。a依赖b,b依赖c，c依赖a也同样是循环依赖。

 commonjs解决循环依赖的策略是这样的，在被依赖模块(b)中，引入依赖模块(a)，导入的依赖模块只会包含已经输出的部分，而不会包含未输出的部分

 ```js
// a.js
exports.name = 'a.js'

const b = require('./b');
exports.age = 1

// b.js

const a = require('./a')
console.log(a)
```

在上面的例子中，a模块依赖了b模块，b模块也依赖了a模块，所以很明显存在循环依赖的问题。而实际代码的执行过程是

1、 首先初次加载a模块，会执行a模块中的代码，导出一个name变量

2、 引入b模块，初次加载b模块会执行b模块的代码

3、 在b模块中，又引入a模块，因为a模块已经加载到内存中，所以直接导入module.exports变量

4、 此时导入的a模块中只有name属性，所以打印出来的变量里面也只有name属性

5、 b模块加载完成，a模块中继续追加age属性，所以，此后访问或导入a模块就能访问age属性了

在第5点中，只要a模块加载完成就能访问age属性了，所以，在b模块中，只要等待a模块加载完成就可以了，可以添加一个settimeout函数做个测试

```js
// b.js
setTimeout(()=>{
    console.log(a.age) // 1
}, 1000)
```

证明上面的理解是正确的

**以上就是我对commonjs模块加载的理解**

参考：

- [模块依赖](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)

- [require源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)





