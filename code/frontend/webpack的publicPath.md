---
title: 关于publicPath
date: 2021-01-26
categories:
tags:
  - webpack
lang: zh-cn
---

## webpack 的 publicPath

publicPath 的含义是表示当前的这个资源在服务端的哪个位置。

例如：有一个资源的路径是`/img/1.png`，如果设置`publicPath：'/public/'`表示客户端在请求的时候会找`/public/img/1.png`这个资源，只要服务器能正确返回这个资源，就表示请求成功

### 开发时如何设置

#### devServer

devServer 配置如下:

```js
export const devServerConfig = {
  publicPath: "/",
  port: defaultPort,
  historyApiFallback: true,
  headers: { "Access-Control-Allow-Origin": "*" },
  proxy: devServerProxyConfig,
  hot: true,
  overlay: false,
  host: devServerHost,
  contentBase: appPublic,
};
```

在这里，devServer 将所有资源放到了`/`下面，那么在 output 上也配置成`/`

```js
output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: isDevServer ? '[name].[fullhash].js' : '[name].[contenthash].js',
 },
```

客户端会通过`output.pubcliPath`去访问`devServer.public`里的资源

如果把`output.public`设置为`/public/`，就表示请求的资源都是 public 里面的，那么 devServer 在提供服务的时候也就要返回`/public/`的资源。

注意到这里还有一个`contentBase`，可以表示静态资源，这个文件夹下面的文件可以直接访问。同时还有一个属性`contentBasePublicPath`指定访问这些静态资源的公有路径

#### 构建

构建的时候是没有 devServer 所有的设置的，所以我们需要设置我们的服务器以便能正确响应请求的资源

假设`output.publicPath：'/public/'`，此时打包出来的所有静态资源在 html 中的访问路径都是以`/public/`开头的。

在 express 中就可以这样设置

```js
app.use("/public/", express.static("dist"));
```

这样访问`/public/`下的资源都转到了 dist 目录中去。

那 contentBase 目录的资源呢。

因为这些资源是静态的，所以只要能保证访问就可以了。

如果我们设置了 contentBasePublicPath:'/static/'，也即我们在代码中也是通过 static 去访问这些静态资源的，那么在构建完成以后如此。

在 express 中就可以这样设置

```js
app.use("/static/", express.static("dist/static"));
```

static 目录是怎么来的呢。其实只需要一个 copy-webpack-plugin 就可以了

将开发时的所有资源 copy 到 static 目录就可以了

```js
const config = {
  patterns: [{ from: join(rootDir, "./public"), to: "static" }],
};

export const copyPlugin = new CopyPlugin(config);
```

但是一般不会单独设置一个 static，而是将构建出来的资源和这些静态资源输出到同一个文件夹

```js
[
  { from: join(rootDir, "./public/js"), to: "js" },
  { from: join(rootDir, "./public/css"), to: "css" },
  { from: join(rootDir, "./public/img"), to: "img" },
];
```

在服务端也就只需要配置

```js
app.use("/public/", express.static("dist"));
```

就可以了
