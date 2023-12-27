---
title: 解决electron下载问题
date: 2020-03-22
categories:
  - 前端
  - electron
tags:
  - 配置
---

## 安装 electron 失败的解决方法

通过 npm 仓库（不管是官方仓库还是通过淘宝镜像）安装 electron 失效的解决方法：

> npm config set ELECTRON_MIRROR=https://registry.npmmirror.com/-/binary/electron/

或者

> npm config set electron_mirror=https://registry.npmmirror.com/-/binary/electron/

报错信息:

> (node:15164) UnhandledPromiseRejectionWarning: HTTPError: Response code 404 (Not Found) for https://registry.npmmirror.com/-/binary/electron/v19.0.9/electron-v19.0.9-win32-x64.zip

通过上面的链接是无法找到 electron 包的，原因是再淘宝镜像里面的实际链接是`https://registry.npmmirror.com/-/binary/electron/19.0.9/electron-v19.0.9-win32-x64.zip`
注意到在版本号前面多了一个 v，而淘宝镜像上是没有的

先删除`node_modules/electron`

### 修改代码

在第一次安装失败的前提下，打开`node_modules > @electron > get > cjs > artifact-utils.js`

找到`getArtifactRemoteURL`方法：

```js
function getArtifactRemoteURL(details) {
  const opts = details.mirrorOptions || {};
  let base = mirrorVar('mirror', opts, BASE_URL);
  if (details.version.includes('nightly')) {
    base = mirrorVar('nightly_mirror', opts, NIGHTLY_BASE_URL);
  }
  // const path = mirrorVar('customDir', opts, details.version).replace('{{ version }}', details.version.replace(/^v/, ''));
  // 将path修改为如下形式：
  const path = details.version.replace(/^v/, '');
  const file = mirrorVar('customFilename', opts, getArtifactFileName(details));
  return `${base}${path}/${file}`;
}
```

保存之后再重新`npm i`

如果是全局安装，则需要找到 electron 的全局安装位置，修改其`node_modules下的@electron`，再`npm i`

### 也可以不修改代码

查看[如何设置镜像](https://www.electronjs.org/docs/tutorial/installation#%E9%95%9C%E5%83%8F)

其他镜像地址：

```yaml
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
electron_mirror=https://cdn.npmmirror.com/binaries/electron/
```



## 如何获得管理员权限

在开发模式下，可以设置 start 脚本为`sudo electron .`。如果要以管理元模式启动打包完成的可执行文件，也需要以`sudo`来执行。

如果是使用`electron-builder`进行打包，要获取 windows 平台下的管理员权限，可以设置 build 项:

```json
{
  "build": {
    "win": {
      "requestedExecutionLevel": "requireAdministrator"
    }
  }
}
```

## electron_builder 下载缓慢的解决办法

使用`electron_builder`进行打包的时候，会下载一些文件，默认是从 github 上下载。如果网络环境不佳的情况下，经常性的失败。可以通过设置代理来解决

在`.zshrc/.bashrc`中添加

```bash
export http_proxy="socks5://127.0.0.1:1080"
export https_proxy="socks5://127.0.0.1:1080"
alias setproxy="export ALL_PROXY=socks5://127.0.0.1:1080"
alias unsetproxy="unset ALL_PROXY"
```

或者在 bash 中设置临时代理

```bash
export http_proxy="socks5://127.0.0.1:1080"
export https_proxy="socks5://127.0.0.1:1080"
```

无法使用代理，可以添加镜像。在 package.json 的 build 中添加 electron 的镜像

```json
"electronDownload": {
    "mirror": "https://registry.npmmirror.com/-/binary/electorn"
  },
```

## Tips

rebuild 如果很慢，可能是要翻墙，可尝试 cnpmjs.org 提供的镜像，`electron-rebuild -d=https://gh-contractor-zcbenz.cnpmjs.org/atom-shell/dist/`
