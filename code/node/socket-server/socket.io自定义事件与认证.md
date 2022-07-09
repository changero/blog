---
title: socket.io自定义事件与认证
date: '2022-06-29 22:53:01'
categories:
  - node
tags:
  - 消息服务器
  - socket.io
lang: zh-cn
---

现在我们要来改写一个 socket 服务和 http 服务共存的服务，在这里我们采用 express。与 socket 协同只需要将 httpserver 传给 socket 就可以了。首先引入必要的包

```js
const express = require('express');
const { Socket } = require('socket.io');
const http = require('http');
const path = require('path');
```

接着创建相应的服务，首先是 expressjs

```js
const app = express();

// 创建静态文件目录
app.use(express.static(path.resolve(__dirname, 'public')));
```

<!-- more -->

创建 http 服务

```js
const httpServer = http.Server(app);

httpServer.listen(8000);
```

此时，我们就已经创建好了一个 http 服务，现在已经可以正常使用了。接下来就创建 socket 服务

```js
const sockerServer = new Socker(httpServer);
```

done！！！完成

然后将上一节创建的 html 文件移动到`public/index.html`，访问`http://localhost:8000`就可以直接访问到这个 html 文件了

代码如下：

```js
const client = io.connect('http://localhost:8000', {
  transports: ['websocket'],
  auth: {
    token: 'abc',
  },
});
client.on('wellcome', (data) => {
  console.log(data);
});
```

注意这里创建 socket 多传了一个 auth 参数，将用在 server 去匹配

## 认证

在 server 端添加认证，通过中间件来完成

```js
socketServer.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token === 'abc') {
    next();
  }
});
```

我们通过去匹配`handshake.auth.token`的值来判断是否通过，在实际场景中，我们可以通过`socket.handshake.headers.cookie`获取客户端的 cookie 来完成认证
