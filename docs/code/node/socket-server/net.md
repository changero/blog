---
title: 消息服务器之net
date: '2022-06-26 19:30:25'
categories:
  - node
tags:
  - 消息服务器
lang: zh-cn
---

## 概述

1. TCP/IP 协议是传输层协议，主要解决数据如何在网络中传输的问题
2. Socket 是对 TCP/IP 协议的封装和程序化实现
3. Http 是应用层协议，主要解决如何包装数据
4. 七层网络模型 - 物理层、数据链路层、网络层、（传输层、会话层、表示层）、应用层

<!-- more -->

## 单向通信

现在我们就用 net 模块，分别开发一个简易的 server 端和 client 端

### server 端

::: details server 端

```js
import net from 'net';

const server = net.createServer();

server.on('connection', (socket) => {
  socket.write('Hello');
  socket.write('\n');
  socket.end();
});

server.listen(8000, () => {
  console.log('server started');
});
```

:::

在 server 端代码写好以后，我们通过`node server.mjs`将服务启动起来，在屏幕中看到

> server started

表示服务启动成功了。那我们如何验证这个服务，我在这里提供两种方式

1. 直接通过浏览器访问`http://localhost:8000`
2. 如果终端支持`curl`，可以打开终端，输入`curl http://localhost:8000`

如果服务启动正常，我们将得到`Hello`的响应

### client 端

上述两种访问 server 的方式，并不能满足我们一些复杂的处理，尤其是要将客户端发给客户去使用的情况下。因此我们还要编写一个 client 端

::: details client 端

```js
import net from 'net';

const client = net.connect({
  port: 8000,
});

client.on('data', (chunk) => {
  console.log(chunk.toString());
});
```

:::

通过`node client.mjs`启动客户端，可以看到在终端也打印了`Hello`，我们也得到了服务端的响应
