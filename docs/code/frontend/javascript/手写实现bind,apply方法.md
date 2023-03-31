---
title: 手写实现bind,apply方法
date: "2021-09-11 21:01:28"
categories:
  - 前端
lang: zh-cn
---

## bind 方法

```js
Function.prototype.myBind = function() {
  const context = arguments[0];
  const bindProp = [...arguments].slice(1);
  const target = this;
  return function() {
    target.apply(context, [...bindProp, ...arguments]);
  };
};
```

这种方法的缺少的是对原型链的处理，会丢失原始方法的原型链。我们来稍微改进一下

<!-- more -->

```js
Function.prototype.myBind = function() {
  const context = arguments[0];
  const bindProp = [...arguments].slice(1);
  const target = this;
  const result = function() {
    target.apply(context, [...bindProp, ...arguments]);
  };

  result.prototype = target.prototype;
  result.prototype.constructor = result;
  return result;
};
```

现在，解决最后一个问题，当通过`new`关键词创建对象的时候，如何调用原始方法的问题

```js
Function.prototype.myBind = function() {
  const context = arguments[0];
  const bindProp = [...arguments].slice(1);
  const target = this;
  const result = function() {
    if (this instanceof result) {
      target.apply(this, [...bindProp, ...arguments]);
    } else {
      target.apply(context, [...bindProp, ...arguments]);
    }
  };

  result.prototype = target.prototype;
  result.prototype.constructor = result;
  return result;
};
```

<script>
Function.prototype.myBind = function() {
  const context = arguments[0];
  const bindProp = [...arguments].slice(1);
  const target = this;
  const result = function() {
    if(this instanceof result){
      target.apply(this, [...bindProp, ...arguments]);
    }
    else{
      target.apply(context, [...bindProp, ...arguments]);
    }
  };

  result.prototype = target.prototype;
  result.prototype.constructor = result
  return result
};
</script>

## 手写 apply

```js
Function.prototype.myapply = function(context, props) {
  const target = this;
  context.fn = target;
  context.fn(...props);
};
```
