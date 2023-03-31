---
title: Express
date: "2021-08-01 22:45:35"
categories:
  - node
tags:
  - express
lang: zh-cn
---

## Express

[express](http://expressjs.com/zh-cn/)是 Nodejs 平台经典的 web 框架。

其他 web 框架参考[nodejs web 框架 - 搜索结果 - 知乎 (zhihu.com)](https://www.zhihu.com/search?type=content&q=nodejs web 框架)

中文网站：[Express - 基于 Node.js 平台的 web 应用开发框架 - Express 中文文档 | Express 中文网 (expressjs.com.cn)](https://www.expressjs.com.cn/)

### 快速开始

创建目录

```bash
$ mkdir express-demo && cd express-demo
```

初始化项目

```bash
$ npm init -y
```

<!-- more -->

#### 安装 express

```bash
npm install express
# 或者
yarn express
```

#### 第一个实例

express 创建实例很简单，只需要在引入之后调用其方法就可以了

```js
const express = require("express");

const app = express();

app.listen(8080, () => {
  console.log("服务启动成功");
});
```

这样就创建了一个最简单的服务

打开浏览器，访问`http://localhost:8080`，出现这样的提示

![](https://pic.imgdb.cn/item/610617515132923bf8ccdb4e.png)

因为我们的服务里面还没有对任何请求做响应

### 中间件

中间件在 express 中非常重要的概念，几乎所有的功能都是通过中间件来完成。中间件分为应用级、路由级、以及错误中间件

现在我们来为上面的请求添加一个响应

```js
const express = require("express");

const app = express();

app.use((req, res) => {
  res.send("hello express");
});

app.listen(8080, () => {
  console.log("服务启动成功");
});
```

再次访问服务地址，发现页面中出现了`hello express`字样，表示我们的服务做出了正确的响应

其中，我们通过 use 方法添加的就是一个中间件，不过这个中间件会对多有请求都做出响应。因为它其实是一个应用级中间件，一般在应用级中间件都是用于改变某些全局变量

当存在多个中间件的时候，如果前一个中间件没有相应该请求，则需要调用 next 方法，前往下一个中间件

#### 路由级中间件

将这个全局中间件修改为路由级中间件也很简单，只需要在 use 的第一个参数，加上一个路径即可

```js
app.use("/welcome", (req, res) => {
  res.send("hello express");
});
```

这样的方式其实还是不够准确的描述如何响应请求，因为无论是`get`请求还是`post`都会进入到这个中间件进行响应

如果要单独对请求方式做不同的处理，express 也提供了非常简便的方法

```js
app.get("/welcome", (req, res) => {
  res.send("hello get express");
});
app.post("/welcome", (req, res) => {
  res.send("hello post express");
});
```

再次打开页面可以看到，现在页面上显示的是`hello get express`了。而 post 请求也同样正确显示

##### 如果路由中间件没有命中怎么办

如果这个时候我们访问`http://localhost:8080/hello`，可以看到页面上会显示`CANNOT GET /hello`，表示没有找到这个路由。这时候我们可以

在所有路由中间件后面添加一个全局路由拦截

```js
app.all("*", (req, res) => {
  res.status(404);
  res.send(`page ${req.url} not found`);
});
```

> 注：res 返回数据的方法可以查看[链接](https://www.expressjs.com.cn/guide/routing.html)

##### 返回 html 文件

```js
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});
```

#### 静态资源

为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，express 内置了一个静态资源处理的中间件`express.static`，默认启用了 etag 和 cache-control

```js
app.use(express.static(path.join(__dirname, "static")));
```

具体使用，查看`03_static`目录

在项目的目录，创建`static`目录，这样就可以直接访问该目录下的资源

> Express 在静态目录查找文件，因此，存放静态文件的目录名不会出现在 URL 中。

如果要配置多个静态目录，则调用多次

```js
app.use(express.static("public"));
app.use(express.static("files"));
```

express 在查找的时候会一次查找，一旦找到就返回。所以，如果多个静态目录中有相同路径的文件，则会返回匹配到的第一个文件

> 参考[链接](https://www.expressjs.com.cn/starter/static-files.html)

最后，也可以给静态文件加上一个路由前缀，形成路由级静态资源目录

### 认证

创建登录页面,`static/login.html`，以及 js 文件，具体查看`04_auth`

- 创建登录页面的路由

```js
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "static/login.html"));
});
```

也可以直接访问`http://localhost:8080/login.html`

- 添加登录接口

  为了解析通过 post 提交过来的参数，安装`body-parser`

  配置 body-parser

  ```js
  // 解析application/x-www-form-urlencoded
  app.use(body.urlencoded({ extended: false }));
  // 解析json
  app.use(body.json());
  ```

  这样在后面的中间件里面才能拿到`req.body`

  安装`pbkdf2-password`库并引入

  ```js
  const hash = require("pbkdf2-password")();
  ```

  创建加密信息

  ```js
  hash({ password: "football" }, (err, pass, salt, hash) => {
    if (err) throw err;
    db.bianqu.salt = salt;
    db.bianqu.hash = hash;
  });
  ```

```js
app.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  const user = db[username];
  if (!user || !user.name) {
    res.send({
      message: "当前未注册",
    });
    return;
  }
  // 校验
  hash({ password, salt: user.salt }, (err, pass, salt, hash) => {
    if (err) throw err;
    if (hash === user.hash) {
      res.redirect("/");
    } else {
      res.send({
        message: "登录失败",
      });
    }
  });
});
```

- session 和 cookie

  - cookie-parser 只用于解析请求中发送过来的 cookie，用法如下

    ```js
    const cookie = require("cookie-parser");

    app.use(cookie("dabulingding"));

    app.use((req, res, next) => {
      console.log("Cookies: ", req.cookies);
      console.log("Signed Cookies: ", req.signedCookies);
      // 清除某个cookie
      res.clearCookie("name");
      next();
    });
    app.post("/login", (req, res) => {
      // 设置cookie
      res.cookie("key", 123123, { maxAge: 1000 * 10 });
    });
    ```

  - express-session，会自动操作 cookie

    [Express session middleware - Express 中文文档 | Express 中文网 (expressjs.com.cn)](https://www.expressjs.com.cn/resources/middleware/session.html)

    ```js
    const session = require('express-session');
    app.use(session({
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
      secret: 'miyao'，
      // cookie: {secure: true}, //推荐在https网站使用，如果是http，则不会设置cookie
    }));

    app.use(function(req, res,next){
        console.log(req.session)
    })
    ```

    结合上面的登录接口，在登录成功以后，我们将生成的信息放到 session 中。

    在登录成功以后，我们将 user 放到 session 中，这样，以后访问其他接口的时候，就能直接从`req.session.user`取得用户信息

    ```js
    if (hash === user.hash) {
      req.session.regenerate(function() {
        req.session.user = user;
        res.redirect("/");
      });
    }
    ```

    只要当前浏览器窗口不关闭，user 信息就会一直存在 session 中。在控制台中可以看到，自动写入了一个 cookie 值

    利用 store 实现 session 的持久化，依赖`connect-mongo`

    ```js
    const Store = require("connect-mongo")(session);
    app.use(
      session({
        ...props,
        store: new Store({
          url: "mongo://url",
        }),
      })
    );
    ```

* 其他中间件如：cookie-session
