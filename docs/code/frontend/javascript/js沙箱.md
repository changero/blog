---
title: js沙箱
date: "2021-09-10 21:19:29"
categories:
  - 前端
lang: zh-cn
---

## js 沙箱

### 快照沙箱

```js
class SandBox {
  constructor() {
    this.proxy = globalThis;
    this.modifyProps = {};
    this.snapshot = {};
    this.active();
  }
  active() {
    for (let key in globalThis) {
      if (Object.hasOwnProperty.call(globalThis, key)) {
        this.snapshot[key] = globalThis[key];
      }
    }
    Object.keys(this.modifyProps).forEach(
      (key) => (globalThis[key] = this.modifyProps[key])
    );
  }
  inactive() {
    for (let key in globalThis) {
      if (Object.hasOwnProperty.call(globalThis, key)) {
        if (globalThis[key] != this.snapshot[key]) {
          this.modifyProps[key] = globalThis[key];
          globalThis[key] = this.snapshot[key];
        }
      }
    }
  }
}
const box = new SandBox();
((global) => {
  global.a = 1;
  global.b = 2;
  console.log(global.a, global.b); // 1 2
  box.inactive();
  console.log(global.a, global.b); // undefined undefined
  box.active();
  console.log(global.a, global.b); // 1 2
})(box.proxy);
```

这样的实现方案，就需要保证每一个子应用在进入和推出环境的时候都能执行到 active 和 inactive 方法，并且在激活下一个应用之前保证前一个应用正确的失活(inactive)。因此也就不能处理多个子应用共存的应用

### 代理模式

这个时候就需要使用`Proxy`，修改 constructor。["Proxy" | Can I use](https://caniuse.com/?search=Proxy)

```js
class SandBox {
  constructor() {
    const fakeGlobal = globalThis;
    const snapGlobal = {};
    const proxy = new Proxy(snapGlobal, {
      get(target, prop) {
        return target[prop] || fakeGlobal[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        return true;
      },
    });
    this.proxy = proxy;
  }
}
```

来看看在多应用下的表现

```js
globalThis.name = "proxy mode";
const box = new SandBox();
const box2 = new SandBox();
((global) => {
  global.a = 1;
  global.b = 2;
  console.log(global.name); // proxy mode
  global.name = "sand box1";
  console.log(global.name, global.a, global.b); // sand box1 1 2
})(box.proxy);

((global) => {
  global.a = 3;
  global.b = 4;
  console.log(global.name); // proxy mode
  global.name = "sand box2";
  console.log(global.name, global.a, global.b); // sand box2 3 4
})(box2.proxy);
```

与前一种方案相比，就不需要关注是否退出环境，恢复现场了

如果不需要太复杂的处理，`Proxy`方案也可以改成`Object.create`

```js
constructor() {
    const fakeGlobal = globalThis;
    this.proxy = Object.create(fakeGlobal);
}
```

### web worker 模式

几个在 Web Worker 下去实现微前端场景的 JavaScript 沙箱必然会遇到的几个难题：

1. 出于线程安全设计考虑，Web Worker 不支持 DOM 操作，必须通过 postMessage 通知 UI 主线程来实现。
2. Web Worker 无法访问 window、document 之类的浏览器全局对象。

google 出品的`AMP workderDOM`模拟了底层的 DOM API，通过模拟 window、document 全局方法并代理到主线程的方式，做到了与框架无关
