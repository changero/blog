---
title: node命令行工具
---

本篇博客主要介绍了如何使用commander, inquirer以及chalk从零开始，创建属于自己的命令行工具。[原文链接](https://zhuanlan.zhihu.com/p/66130343)、[参考1](http://blog.gdfengshuo.com/article/27/)

## 开始

首先我们先花一分钟的时间，体验一下创建自己的命令行cli工具是什么感觉。

### 新建项目目录

假如我们的项目名称叫hello-cli，使用如下命令新建项目目录。

```bash
mkdir hello-cli && cd hello-cli
```

### 初始化项目

接下里使用npm-init命令来初始化一个简单的package.json文件。

```bash
npm init -y
```

> `-y`参数表示接受npm的一切默认参数设置。

接着安装依赖

``` bash
npm install chalk commander inquirer shelljs -S
```

### 新建入口文件

在项目根目录下新建名为hello的文件，不需要任何后缀，值得注意的是此时的文件名就是你的cli工具第一个键入的命令，例如npm install，那么hello就等价于npm。并将代码替换如下。

```js
#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

program
  .command('init')
  .alias('i')
  .description('初始化项目')
  .action(option => {
    // 该对象用于存储所有与用户交互的数据
    let config = {
      // 假设我们需要用户自定义项目名称
      projectName: null
    };
    // 使用chalk打印美化的版本信息
    console.log(chalk.default.bold('hello v1.0.0'));

    // 用于存储所有的交互步骤，例如让用户输入项目名称就是其中一个步骤
    let promps = [];
    if (config.projectName === null) {
      promps.push({
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称',
        validate: input => {
          if (!input) {
            return '项目名称不能为空';
          }
          // 更新对象中属性的数据
          config.projectName = input;
          return true;
        }
      });
    }

    // 至此，与用户的所有交互均已完成，answers是收集到的用户所填的所有数据
    // 同时，这也是你开始操作的地方，这个cli工具的核心代码应该从这个地方开始
    inquirer.prompt(promps).then(async (answers) => {
      // do something here
      console.log(answers);
    });
  });

program.parse(process.argv);
```

对比原文链接，此外还需要多2个步骤：

1、 增加当前脚本可执行权限

```sh
 chmod +x hello
```

2、 修改package.json，增加bin字段

```json
{
    // ... 
    "bin":{
        "hello" : "hello"
    }
    // ... 
}
```

> 注意，在`bin`中的key值将作为链接后的文件名，value指代对应执行命令的实际文件

链接后的文件名表示的是通过`npm link`命令链接，以及通过`npm install`安装之后在bin目录下的文件名


## npm link

那么问题来了， 在你的项目根目录下使用npm link，然后在你本地上就相当于安装了名为hello-cli这样的一个全局npm包了。其原理是将你本地的项目在全局的node_modules中做了一个软链接，拿此项目举例，全局的hello命令已经指向了你的本地目录。如果你想取消测试项目在全局中的映射，同样的进入项根目录，输入命令npm unlink即可。

然后搭配以下命令食用你的第一个cli工具吧。如果报错提示没有权限，在命令前加上sudo即可。

```bash
hello init
# 或者 hello i
```

关于`npm link`,[参考](https://github.com/atian25/blog/issues/17)

## commander

[*commander*](https://github.com/tj/commander.js)是一个Node.js环境下的命令行接口解决方案。在上面的一分钟体验例子中，我们用到了`command`，`alias`，`description`，`action`这四个API。

- **command** command代表了这个cli工具向用户暴露的命令行指令。我们还是拿npm install来举例子，command('init')声明了一个叫init的命令，在此处，init等价于install
- **alias** alias是对于当前命令行指令的更短的指令。例如大家都知道，npm install可以简写为npm i。i就是定义的alias
- **description** description是对当前命令行指令的描述，commander会自动的生成当前cli工具的帮助文档，而该描述就会在hello -h中展示，如果你的一分钟体验项目还在的话，在命令行中输入hello -h就可以看到自动生成的帮助文档了
- **action** action是我们注册我们自己回调函数的地方
- **parse** parse命令则是解析命令行

下面是一分钟体验项目中没有使用的命令，option。还是举一个例子。如果有用过hexo的应该熟悉这个命令。

```bash
hexo new post $YOUR_POST_NAME
```

没用过也没关系，这个命令是用于创建一个可以自定义名字的Markdown的文档的。大家可能会发现，上面的命令包含了4个单词，而我们的例子中只有两个。那是因为一分钟项目中没有使用commander的optionAPI。

如果你想在hello项目中实现一样的命令，那么只需要在program中调用该API即可。`.option('-p, --post', 'add post')`，然后就可以通过option参数获取到-p后面，用户输入的参数的值。

## inquirer

大家也发现了，在命令行输入init命令后，我们需要不停地与命令行进行交互拿到数据，但是在代码里并没有怎么体现，这是因为我们用了inquirer来帮我们做这些事情。

通过inquirer，我们可以实现输入框，获取用户的输入数据，还可以实现选择框。举个例子，用过antd-design-pro应该熟悉创建项目的流程。在命令行中输入命令`yarn create umi`，在之后的流程中就会出现一个可选择的list。只需要将步骤中的代码替换成如下即可。

```js
promps.push({
    type: 'list',
    name: 'projectName',
    message: '请输入项目名称',
    choices: [
      {
        name: 'ant-design-pro',
        value: 'ant-design-pro'
      },
      {
        name: 'dva',
        value: 'dva'
      }
    ]
});
```

在项目中，还使用了`validate`来对用户的输入数据进行验证，如果不需要验证的话，直接把validate整个代码删除掉就好。

## chalk

[chalk](https://github.com/chalk/chalk)没有什么好介绍的，官网上的文档已经写的很详细了。给大家列一下项目中使用的例子就好。

```js
// 使用默认的字体颜色，加粗字体
console.log(chalk.default.bold('hello v1.0.0'));
// 打印蓝色的提示信息
console.log(chalk.blue('hello v1.0.0'));
// 字符串模板用法，在同一行中打印不同样式的信息
console.log(chalk`{white.bold [1/3]} 🔍` + chalk`{default.bold Clone project into local path...}`);
```

### 其他参考

- [React可以写命令行，你知道吗？](https://zhuanlan.zhihu.com/p/67331073)

