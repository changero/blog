---
title: js中的this
date: "2021-03-22 22:34:20"
categories:
  - 前端
lang: zh-cn
---

js 中的 this 指向时长让人觉得困惑，下面将尽量用简单的描述来说明如何判断 this 的指向，读起来就像是`如果...或者`。[原文链接](https://web.dev/javascript-this/)

## 1、如果是箭头函数

### 始终指向父级作用域的 this

```js
const fn = () => {
  console.log(this === globalThis);
};

// logs true
fn();
```

### 无法通过 bind、call、apply 改变 this 的指向

```js
const fn = () => {
  console.log(this === globalThis);
};

// logs true
fn.bind({ name: "fnn" })();
// logs true
fn.apply({ name: "fnn" });
// logs true
fn.call({ name: "fnn" });
```

### 无法通过以成员变量的方式调用来改变 this

```js
const obj = { fn };
// logs true
obj.fn();
```

### 不能作为构造函数使用

```js
// Uncaught TypeError: fn is not a constructor
const o = new fn();
```

### 在 class 类中、始终指向实例对象

```js
class Whatever {
  fn = () => {
    // 指向实例对象
    console.log(this);
  };
}
```

可以把这种形式的写法当作是在构造函数中申明成员函数的语法糖

```js
class Whatever {
  constructor() {
    this.fn = () => {
      // 指向实例对象
      console.log(this);
    };
  }
}
// 或者
class Whatever {
  fn = (() => {
    const outerThis = this;
    return () => {
      console.log(this === outerThis);
    };
  })();
}
```

## 2、通过构造函数调用

### this 将被设置为 Object.create(class.prototype)

```js
class MyClass {
  constructor() {
    console.log(
      this.constructor === Object.create(MyClass.prototype).constructor
    );
  }
}

function MyClassFn() {
  console.log(
    this.constructor === Object.create(MyClassFn.prototype).constructor
  );
}

// Logs `true`:
new MyClass();

// Logs `true`:
new MyClassFn();
```

### 无法通过 bind 修改

```js
const BoundMyClass = MyClass.bind({ foo: "bar" });
// Logs `true` - bound `this` value is ignored:
new BoundMyClass();
```

### 无法通过成员变量修改

```js
const obj = { MyClass };

new obj.MyClass();
```

### 疑问

- 用 class 声明的类哪些属性会在原型上、哪些属性会在实例属性上
- 通过 new 创建对象、与 Object.create(class.prototype)有什么不同

## 3、通过 bind 绑定了一个对象

### 指向 bind 的对象

```js
function someFunction() {
  return this;
}

const boundObject = { hello: "world" };
const boundFunction = someFunction.bind(boundObject);

console.log(boundFunction() === boundObject);
```

::: warning
避免使用 bind 将函数绑定到其外部 this。相反，请使用箭头函数，因为它们 this 从函数声明中可以清楚地看出来，而不是在代码稍后的部分中使用。

不要使用 bind 设置 this 为与父对象无关的值；这通常是出乎意料的，这就是为什么 this 获得如此糟糕的声誉。考虑将值作为参数传递；它更加明确，并且可以使用箭头功能
:::

### 无法通过 call、apply 修改

```js
// Logs `true` - called `this` value is ignored:
console.log(boundFunction.call({ foo: "bar" }) === boundObject);
// Logs `true` - applied `this` value is ignored:
console.log(boundFunction.apply({ foo: "bar" }) === boundObject);
```

> 如果要使用外部环境的 this，优先使用箭头函数

## 4、通过 call、apply 调用

### 指向对应的对象

```js
function someFunction() {
  return this;
}

const someObject = { hello: "world" };

// Logs `true`:
console.log(someFunction.call(someObject) === someObject);
// Logs `true`:
console.log(someFunction.apply(someObject) === someObject);
```

如果是作为事件处理的回调函数，尽量避免使用 this 来访问目标对象，可以直接通过原始对象访问

```js
element.addEventListener("click", (event) => {
  console.log(element);
  // 避免使用this访问
  // console.log(this)
});
```

## 5、通过成员变量访问

### 指向调用的对象

```js
const obj = {
  someMethod() {
    return this;
  },
};

// Logs `true`:
console.log(obj.someMethod() === obj);
```

### 如果将函数赋值给其他变量调用，则符合其他规则

```js
const obj = function() {
  return {
    someMethod: () => {
      return this;
    },
  };
}.call({ name: "123" });

// Logs `true`:
const fn = obj.someMethod;
console.log(fn() === globalThis);
```

试试下面的例子，将出现非法调用的错误，原因是\$调用的时候，其 this 并不指向 document 了

```js
const $ = document.querySelector;

const ele = $("body");
// Uncaught TypeError: Illegal invocation
```

## 6、严格模式下

### 指向 undefined

```js
(function() {
  "use strict";
  // undefined
  console.log(this);
})();
```

## 作为普通函数调用

### 指向 window、globalThis

例如：通过 function 声明，并传递给 setTimeout 调用

```js
function fn() {
  console.log(this);
}

setTimeout(fn, 500);
```
