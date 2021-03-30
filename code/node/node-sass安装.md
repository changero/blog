---
title: node-sass安装
date: "2021-03-30 20:38:40"
categories:
  - npm
lang: zh-cn
---

node-sass 的安装依赖 python2 环境

## 方式一:设置 sass 环境变量

```bash
export sass_binary_site=https://npm.taobao.org/mirrors/node-sass
# 或者通过npm配置
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
# 或者配置到当前项目的.npmrc文件中
sass_binary_site=https://npm.taobao.org/mirrors/node-sass
```

<!-- more -->

## 方式二：在 package.json 中配置

```json
{
  "nodeSassConfig": {
    "binarySite": "https://npm.taobao.org/mirrors/node-sass/"
  }
}
```

## 方式三：手动下载[binding.node](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fsass%2Fnode-sass%2Freleases%2Fdownload%2Fv4.13.1%2Fdarwin-x64-11_binding.node)文件

在[https://github.com/sass/node-sass/releases](https://github.com/sass/node-sass/releases)或者[https://npm.taobao.org/mirrors/node-sass](https://npm.taobao.org/mirrors/node-sass)页面下载对应系统的二进制文件，并将文件放到 /home/当前用户/.npm/node-sass/\${version}/下（如果没有目录需新建）。

最后执行安装

```bash
npm install node-sass@${version}--unsafe-perm-D
```

或者

```bash
npm install node-sass --sass_binary_path=/path/xx_binding.node
```
