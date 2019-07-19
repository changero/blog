---
title: gulp-less处理antd中的less引用
date: 2019-07-19
categories:
  - 前端
tags:
  - gulp
  - less
---

### 背景

在webpack中通过`less-loader`处理less文件的引用，在less文件中可以通过`~`符号去引用来自`node_modules`中的包，但是在`gulp-less`处理less文件的过程中并不具有这个功能

### gulp-less的实现

通过安装`less-plugin-npm-import`这个less的插件来扩展功能

```js
import LessNpmImport from 'less-plugin-npm-import'
gulp.src(/*less file*/)
.pipe(
    less({
        plugins:[new LessNpmImport({ prefix: '~' })]
    })
)
```

如此便可以了 

### 引入antd

在引入antd的样式的时候，要注意开启`javascriptEnabled: true`,在`ts-loader`中


```js
// webpack
modules.exports = {
    module:{
        rules:[
            {
                test: /\.less$/,
                use:[
                'style-loader', // 将处理之后的样式通过style标签插入
                'css-loader',   // 将css文件的引用转换为js模块
                    {
                        loader: 'less-lodaer',
                        optiopns:{
                            javascriptEnabled: true
                        }
                    } // 处理less文件
                ]
            }
        ]
    }
}
```

```js
// gulp
import LessNpmImport from 'less-plugin-npm-import'
gulp.src(/*less file*/)
.pipe(
    less({
        plugins:[new LessNpmImport({ prefix: '~' })],
        javascriptEnabled: true
    })
)
```



