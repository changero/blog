---
title: yargs
date: 2020-07-26
categories:
  - 工具
tags:
  - yargs
  - node命令行解析
---

> 解析nodejs命令行参数

[API](https://github.com/yargs/yargs/blob/master/docs/api.md)地址

### 安装

```bash
$ npm i yargs -D
$ npm i yargs@next -D
$ yarn add yarn
```

<!-- more -->

### API

首先将index文件添加执行权限

```sh
chmod +x ./index.js
```

不需要配置，直接获得命令行参数

```js
console.log(require('yargs').argv)
```

```bash
➜  yargs-demo ./index.js name --a=1 -l
{ _: [ 'name' ], a: 1, l: true, '$0': 'index.js' }
```

也可以解析自定义的参数

```js
require('yargs')(['-x', '1', '-y', '2']).argv
```

相当于

```js
require('yargs').parse(['-x', '1', '-y', '2'])
```

输出

```sh
➜  yargs-demo ./index.js
{ _: [], x: 1, y: 2, '$0': 'index.js' }
```

调用`parse`而不传递参数相当于`yargs.argv`

**Note**：如果传递`process.argv`到yargs去解析，要把前面两个额外的参数去掉，一般是`node`的路径和`文件`路径，使用`process.argv.slice(2)`

### alias(key, alias)

设置别名

```js
yargs.alias('a', 'alias').argv
```

输出

```sh
➜  yargs-demo ./index.js name --alias=1 -l -n 5
{ _: [ 'name' ], alias: 1, a: 1, l: true, n: 5, '$0': 'index.js' }
➜  yargs-demo ./index.js name -a=1 -l
{ _: [ 'name' ], a: 1, alias: 1, l: true, '$0': 'index.js' }
```

#### argv

> 将参数转化为一个普通对象，对于没有标志位的参数将显示在`_`字段种，如上例中的**name**字段，`$0`表示脚本名称

#### array(key)

将指定的`key`已数组的形式来解析，例如：

```js
yargs.array('food').argv
```

输入

```sh
➜  yargs-demo ./index.js --food apple oriange
{ _: [], food: [ 'apple', 'oriange' ], '$0': 'index.js' }
➜  yargs-demo ./index.js --food apple --food oriange
{ _: [], food: [ 'apple', 'oriange' ], '$0': 'index.js' }
```

如果是第一种使用形式，在后面使用`--`符号告知yargs结束接受该参数，或者是其他参数

```sh
➜  yargs-demo ./index.js --food apple oriange name
{ _: [], food: [ 'apple', 'oriange', 'name' ], '$0': 'index.js' }
➜  yargs-demo ./index.js --food apple oriange -- name
{ _: [ 'name' ], food: [ 'apple', 'oriange' ], '$0': 'index.js' }
➜  yargs-demo ./index.js --food apple oriange --name
{ _: [], food: [ 'apple', 'oriange' ], name: true, '$0': 'index.js' }
```

如果不加`--`将被认为是下一个参数

#### boolean(key)

将指定的key解析为boolean值，如果参数为数组，将数组内所有key解析为boolean

```js
yargs.alias('s', 'is-show').boolean('s').argv
```

输出

```sh
➜  yargs-demo ./index.js --is-show
{ _: [], 'is-show': true, s: true, isShow: true, '$0': 'index.js' }
➜  yargs-demo ./index.js --no-is-show
{ _: [], 'is-show': false, s: false, isShow: false, '$0': 'index.js' }
```

#### check(fn,[global = true])

> 检查参数

fn接收两个参数，argv和options，如果fn抛出错误或者返回的是非真值，yargs将退出，除非后面调用了`.exitProcess()`。

`global`参数表示check方法是否在除了最开始执行以外，在每一个`sub-command`也执行。

```js
const argv = require('yargs')
  .check((argv, options) => {
    const filePaths = argv._
    if (filePaths.length > 1) {
      throw new Error("Only 0 or 1 files may be passed.")
    } else {
      return true // tell Yargs that the arguments passed the check
    }
  })
  .argv
```

输出

```sh
➜  yargs-demo ./index.js --no-s name
{ _: [ 'name' ], s: false, '$0': 'index.js' }
{ _: [ 'name' ], s: false, '$0': 'index.js' }
➜  yargs-demo ./index.js --no-s name.js name.d.ts
{ _: [ 'name.js', 'name.d.ts' ], s: false, '$0': 'index.js' }
选项：
  --help     显示帮助信息                                                 [布尔]
  --version  显示版本号                                                   [布尔]

Only 0 or 1 files may be passed.
```

