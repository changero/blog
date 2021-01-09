---
title: 认识webworker和websocket
date: 2021-01-09
tags:
  - webworker
  - websocket
lang: zh-cn
---

## 认识 webworker 和 websocket

### Worker

worker 是在浏览器端创建，创意一个 worker 也很简单

```js
const worker = new Worker(jsurl);
```

jsurl 是一个 js 文件的 url 地址，也可以通过`URL.createObjectURL`来创建，如果是一个 url 地址，直接返回 js 的静态文件路径就可以，说下用 URL 创建，方法是把 js 代码写在字符串中

```js
const workerCOntent = `console.log('this is worker')`;
const url = URL.createObjectURL(
  new Blob([workerContent], { type: "text/plain" })
);
const worker = new Worker(url); // url -> blob:http://xxxx
```

#### 如何通信

worker 线程内与主线程通过 postmessage 通信

```js
// main.js
const worker = new Worker(url);
worker.addEventListener("message", (e) => {
  console.log("主线程收到消息：%s", e.data);
});
// 向worker线程发送消息

worker.postMessage("message send from main");

// worker.js
// 监听主线程的消息
self.addEventListener("message", (e) => {
  console.log("worker收到消息：%s", e.data);
});
// 向主线程发送消息
self.postMessage("message send from worker");
```

#### 关闭 worker

```js
// main.js
worker.terminate();
// 或者在worker中自己关闭
close();
```

注意在 worker 中无法操作 DOM

[更新信息](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)

### WebSocket

```js
// client
const ws = new WebSocket("ws://http://XXX");
// 收到消息
ws.onmessage = () => {};
// 打开链接
ws.onopen = () => {};
// 链接关闭
ws.onclose = () => {};
ws.send("问候");

// server
// npm i ws
const ws = require("ws");
const socket = new ws.Server({ port: 18080 });
// 启动的时候
socket.on("open", () => {});
// 关闭事件
socket.on("close", () => {});
// 客户端链接事件
socket.on("message", (client, req) => {
  console.log(req.connection.remoteAddress, req.connection.remotePort);
  // 发送问候
  client.send("hello");
});
```
