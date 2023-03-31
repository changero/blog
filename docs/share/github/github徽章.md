---
title: github徽章
date: '2022-03-01 21:12:12'
categories:
  - github
lang: zh-cn
---

## 前言

github 的徽章可以给查看的人展示更多的信息，比如当前包版本、测试覆盖率、ci 构建情况，以及各种连接等等。

我们除了利用各种平台的徽章以外，还可以通过[shields](https://shields.io/)网站来创建自定义的徽章

## 测试覆盖率

我们利用`jest`等测试工具对项目中的测试用例进行测试过后，可以生成一份测试报告，但是这份测试报告只能在本地查看，并不能实时的查看到。所以我们需要将我们的测试报告提交到一些平台来完成，`codecov`就是一个很好的工具

首先在`Marktplace`中找到[codecov](https://github.com/marketplace/codecov)安装并授权登录

<!-- more -->

就这就可以在对应仓库的`setup repo`中找到 token

接着在项目中安装`codecov`

```bash
npm install codecov -D
```

当使用`jest`进行测试并生成测试报告以后

```bash
npx codecov --token=<token>
```

报告上传以后，就可以在`repo -> settings -> Badge`中找到徽章

```
[![Codecov Coverage](https://img.shields.io/codecov/c/github/<Github Username>/<Repository Name>/<Branch Name>.svg?style=flat-square)](https://codecov.io/gh/<Github Username>/<Repository Name>/)
```

其他平台如：`coveralls`

### 使用 workflow 自动构建

自动构建的好处就不说了，通过 ci 我们可以自动将测试报告推送到`codecov`,例如: Travis, CircleCI, AppVeyor, Azure Pipelines 或者 GitHub Actions

通过这些平台推送到`codecov`可以无需 token

这里就介绍[github actions](https://docs.github.com/cn/actions)

首先在项目中创建`.github/workflow/<name>.yml`，名字随便去。我们可以通过官方文档获得[demo](https://docs.github.com/cn/actions/automating-builds-and-tests/building-and-testing-nodejs-or-python)

```yaml
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        # 需要运行那些node版本
        node-version: [14.x, 15.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install dependencies
        # run: npm ci # 如果项目中有package-lock.json
        run: npm install # 否则用install 安装
      - run: npm run build --if-present
      - run: npm test
```

修改`npm scripts`

```json
{
  "scripts": {
    "coverage": "jest --coverage && codecov && rm -rf coverage"
  }
}
```

这样当我们提交代码以后就可以自动构建了

构建完成以后也能得到一个徽标`https://github.com/<OWNER>/<REPOSITORY>/workflows/<WORKFLOW_FILE>/badge.svg`

或者通过[shields](https://shields.io/)平台搜索`actions`来获取，不过这种方式获取的徽章没有 github 的官方图标

#### 问题

这里在使用`actions`的环境下有一个 jest 的问题，如果我们通过`testPathIgnorePatterns`设置了要忽略的测试文件夹，会出现不能被忽略的问题。

解决方法是直接在命令行上添加参数

```bash
jest --coverage --testPathIgnorePatterns=\"/node_modules/|/__ignore__/\"
```
