---
title: js实现一个栈
date: 2020-12-28
categories:
  - 算法
tags:
  - 栈
---

## 什么是栈

## 栈的特点

## 栈的要素

## js 实现一个栈

::: details

```js
class Stack extends Array {
  constructor(capacity = 0) {
    super();
    this.capacity = capacity;

    return new Proxy(this, {
      get(target, key) {
        if (typeof key === "string") {
          if (key * 1 == key) return;
          else if (key.match(/^__\d{1,}/)) key = Number(key.slice(2));
        }
        return Reflect.get(target, key);
      },
    });
  }
  get isEmpty() {
    return this.length === 0;
  }
  get isFull() {
    return this.length === this.capacity;
  }
  push(...args) {
    if (this.isFull) return;
    super.push.apply(this, args);
  }

  pop() {
    if (this.isEmpty) return null;
    const tail = this.peek();
    super.pop();
    return tail;
  }

  peek() {
    if (this.isEmpty) return null;
    return this["__" + (this.length - 1)];
  }

  clear() {
    if (this.isEmpty) return;
    this.length = 0;
  }
}
```

:::

使用

```js
// 创建一个栈结构
const s = new Stack(50);
// 添加几条数据
s.push(1);
s.push(2);
s.push(3);
s.push(4);
// 获取栈顶冤死
console.log(s.peek());
// 取出栈顶元素
s.pop();
console.log(s.peek());
// 清空栈
s.clear();
console.dir(s);

s.push(3);
s.push(9);
console.dir(s);
while (!s.isEmpty) {
  console.log(s.pop());
}
```
