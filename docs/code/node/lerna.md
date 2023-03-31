---
title: lerna
date: 2020-07-26
categories:
  - 工具
tags:
  - lerna
  - 包管理
---

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

上述徽章:

```
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
```


> Lerna 是一种工具，针对 使用 git 和 npm 管理多软件包代码仓库的工作流程进行优化

### monorepo

先了解一下`monorepo`，它是一种将所有子项目都放下一起的项目管理方式，[lerna](https://github.com/lerna/lerna#readme)就是其具体实现，其他还包括`yarn`的workspace

<!-- more -->

### 怎么运作

---

引用官方的说法：

> Lerna允许您使用以下两种模式之一来管理项目：固定或独立。
>
> ### 固定/锁定模式（默认）
>
> 固定模式的Lerna项目在单个版本行上运行。版本位于密钥`lerna.json`下项目根目录下的文件中`version`。当您运行时`lerna publish`，如果某个模块自上次发布以来已被更新，它将被更新为您要发布的新版本。这意味着您仅在需要时才发布软件包的新版本。
>
> > 注意：如果您的主要版本为零，则所有更新均[视为中断](https://semver.org/#spec-item-4)。因此，`lerna publish`以主要版本零运行并选择任何非预发行版本号将导致为所有软件包发布新版本，即使自上次发行以来并非所有软件包都已更改。
>
> 这是[Babel](https://github.com/babel/babel)当前使用的模式。如果要自动将所有软件包版本捆绑在一起，请使用此选项。这种方法的一个问题是，对任何软件包进行重大更改都会导致所有软件包都具有新的主要版本。
>
> ### 独立模式
>
> ```
> lerna init --independent
> ```
>
> 独立模式Lerna项目允许维护者彼此独立地增加软件包的版本。每次发布时，都会提示您已更改的每个软件包，以指定是补丁，次要，主要还是自定义更改。
>
> 独立模式使您可以更具体地更新每个软件包的版本，并使一组组件有意义。将此模式与[语义释放](https://github.com/semantic-release/semantic-release)等功能相结合，将使其痛苦减轻。（有关此问题，请[参见atlassian / lerna-semantic-release](https://github.com/atlassian/lerna-semantic-release)）。
>
> > 设置`version`在关键`lerna.json`要`independent`在独立模式下运行。



### 开始

***

全局安装

```bash
npm i lerna -g
```

或者局部安装

```bash
npm i lerna
# 执行的时候需要通过npx调用
npx lerna init
```

初始化项目：

```bash
lerna init
```

lerna需要有一个远程仓库与之关联，可以clone了之后在执行init的操作，也可以在初始化之后执行`git remote add [repo url]`。

初始化完成以后，lerna会自动创建一个`packages`目录夹，我们以后的项目都新建在这里面。同时还会在根目录新建一个`lerna.json`配置文件

```json
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0" // 共用的版本，由lerna管理，或者用independent表示包都是独立版本
}
```

#### 创建包

***

手动创建：

```bash
cd packages && mkdir package-1  && mkdir package-2
cd package-1 && npm init -y
cd package-2 && npm init -y
```

通过create命令创建

```bash
lerna create package-1
lerna create package-2
```

#### 添加依赖

***

```bash
lerna add [package name]
# 例如 lerna add axios

# 只添加package-1的依赖
lerna add axios --scope=package-1
```

如果package-2依赖package-1，有两种方法可以添加依赖：

**方式一**：直接修改package-2的`package.json`

```json
{
  "devDependencies":{
    "package-1": "0.0.0"
  }
}
```

然后执行`lerna bootstrap`，这个命令会扫描所有包的依赖并安装，

**方式二**：通过add命令添加

```bash
lerna add package-1 --scope=package-2
```

如果依赖的某个包是lerna管理的项目，那么会直接在`node_modules`下创建软连接，作用类似`npm link`

#### 列出当前项目所有包

***

**`lerna list`**

- `lerna ls `，可以当作learn list的别名
- `lerna ll`，相当于`lerna ls -l`
- `lerna la`，相当于`lerna ls -a`

##### 用法

```sh
$ lerna ls
package-1
package-2
```

##### 选项

- --json，以json格式输出包及依赖
- --ndjson，以行内json格式输出
- -a，--all，
- -l，--long，显示版本号
- -p，--parseable，显示包的完整路径
- --toposort
- --graph，图形化格式输出


#### 显示当前环境

---

```sh
➜  lerna-demo git:(master) ✗ lerna info
lerna notice cli v3.22.1
lerna info versioning independent

 Environment info:

  System:
    OS: macOS 10.15.5
    CPU: (4) x64 Intel(R) Core(TM) i5-7360U CPU @ 2.30GHz
  Binaries:
    Node: 12.18.1 - ~/.nvm/versions/node/v12.18.1/bin/node
    Yarn: 1.22.4 - ~/.yarn/bin/yarn
    npm: 6.14.5 - ~/.nvm/versions/node/v12.18.1/bin/npm
  Utilities:
    Git: 2.24.3 - /usr/bin/git
  npmPackages:
    lerna: ^3.22.1 => 3.22.1

```

#### 符号链接

---

> 将所有项目依赖的软件包通过符号链接起来

##### 用法

```bash
$ lerna link
```

##### 强制使用本地包

```bash
$ lerna link --force-local
```

强制使用本地包的时候不会考虑包的版本，在手动添加项目中其他包的依赖之后，可以通过此命令将依赖包链接过来

##### `publishConfig.directory`

```json
{
  "publishConfig":{
    "directory": "dist"
  }
}
```

在此示例中，当链接此程序包时，该`dist`目录将是源目录（例如`package-1/dist => node_modules/package-1`）。

#### clean

---

> 清除所有packages下面的`node_modules`包，不影响根目录下的node_modules

##### 用法

```bash
$ lerna clean
# 默认同意
$ lerna clean --yes
```

#### diff

---

> 查看变更，类似git diff

##### 用法

```bash
$ lerna diff
$ lerna diff package-1
```

#### changed

---

> 输出能被`version`、`publish`命令作用的软件包列表

##### 用法

```sh
$ lerna changed
package-1
package-2
```

##### 选项

支持`ls`的选项，以及：

- [`--conventional-graduate`](https://github.com/lerna/lerna/tree/master/commands/version#--conventional-graduate).
- [`--force-publish`](https://github.com/lerna/lerna/tree/master/commands/version#--force-publish).
- [`--ignore-changes`](https://github.com/lerna/lerna/tree/master/commands/version#--ignore-changes).
- [`--include-merged-tags`](https://github.com/lerna/lerna/tree/master/commands/version#--include-merged-tags).

#### version

---

> 提交版本，使用该命令，要保证拥有一个远程仓库并已经关联远程分支

##### 用法

```bash
$ lerna version # 会提示选择每个包的版本
$ lerna version 1.0.1 # 显示申明版本
$ lerna version [major | minor | patch | premajor | preminor | prepatch | prerelease] #自动为每个包升级对应的版本号
```

> 当执行该命令的时候，会先后执行以下步骤：
>
> - 识别自上个版本以来变更过的package，基于commit来识别
> - 提示新的版本号，基于`lerna.json`中的version字段，如果是独立包模式，将会询问每个包的版本
> - 修改软件包元数据以反映新版本，在根目录和每个软件包中运行适当的生命周期脚本
> - 创建commit、和tag
> - push到远程

##### 选项

- `--allow-branch`，允许提交的分支，也可以用`lerna.json`来配置:

```json
{
  "command":{
    "version":{
      "allowBranch": "master" | ["master", "feature/*"],
    }
  }
}
```

- `--conventional-commits`，常规提交，生成CHANGELOG.md

  传递[`--no-changelog`](https://github.com/lerna/lerna/tree/master/commands/version#--no-changelog)将禁用文件的生成（或更新）`CHANGELOG.md`

- `--conventional-graduate`，发布已预发行的包

- `--force-publish`

  ```bash
  lerna version --force-publish = package-2，package-4 
  ＃强制对所有软件包进行版本控制 
  lerna version --force-publish
```
  
使用此标志运行时，`lerna version`将强制发布指定的程序包（以逗号分隔）或所有程序包`*`。
  
  > 这将跳过对`lerna changed`已更改软件包的检查，并强制`git diff`更新没有更改的软件包。

#### 发布

---

```bash
$ lerna publish 				 			＃发布自上一个发行版以来发生更改的软件包 
$ lerna publish from-git 			＃明确发布当前提交中标记的软件包 
$ lerna publish from-package  ＃明确发布注册表中没有最新版本的软件包
```

运行时，此命令将执行以下操作之一：

- 发布自上一个版本以来更新的软件包（`lerna version`在后台调用）。
  - 这是lerna 2.x的遗留行为
- 发布在当前提交（`from-git`）中标记的软件包。
- 在最新提交中发布软件包，其中注册表中不存在该版本（`from-package`）。
- 发行在上一次提交中更新的未版本化的“ canary”发行版软件包（及其依赖）。

[更多查看](https://github.com/lerna/lerna/tree/master/commands/publish#readme)

#### 引导

---

> 将本地软件包链接在一起并安装剩余的软件包依赖项

##### 用法

```bash
$ lerna bootstrap
```

在当前的Lerna存储库中引导软件包。安装它们的所有依赖关系并链接任何交叉依赖关系。

运行时，此命令将：

1. `npm install` 每个软件包的所有外部依赖项。
2. 将所有`packages`相互依赖的Lerna链接在一起。
3. `npm run prepublish`在所有自举程序包中（除非`--ignore-prepublish`通过）。
4. `npm run prepare` 在所有自举程序包中。

[更多查看](https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme)

