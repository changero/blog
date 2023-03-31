---
title: 创建scope包
date: 2020-04-15
categories:
  - npm
---

## 为什么要创建scope包

可以将包自动的划归到某个范围下，有点模块化的意思，觉得好玩

## 创建

### 第一步、创建组织

登陆到[npm](https://www.npmjs.com/),点击头像选择`packages`

点击左侧导航上`Organizations`的加号创建组织

输入组织名，并选择套餐来进行创建。

在这里套餐有两类：

- 收费套餐：$7 per month ，可以创建私有包

- 免费套餐：只能创建公共包

毫不犹豫选择free，并创建

### 第二步、创建包

只需要将`package.json`中name字段改成`@scope/name`的形式

### 第三步、发布

直接执行`npm publish`是不会成功的，需要将包的`access`设置为`public`

**方法一**

```bash
npm publish --access public
```

**方法二**

在`package.json`中添加`publishConfig`字段，并配置如下

```json
{
    "publishConfig":{
        "access" : "public"
    }
}

```

### 最后

发布成功以后就可以通过scope来进行安装了

> npm install @scope/name