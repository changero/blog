---
title: Rclone挂载网盘
date: "2021-11-17 21:16:15"
lang: zh-cn
---

## 挂载 dropbox

配置

> rclone config

如果还没有应用，到[开发者中心](https://www.dropbox.com/developers/apps)创建一个应用

输入 app key 和 app secret

会提示打开一个连接

linux 下没有默认的浏览器

1. 用 curl 命令拿到返回，是一个 a 标签,比如

   > curl http://127.0.0.1:53682/auth?state=7HejVNzrg9iGUQ2x7B09qw

<!-- more -->

2. 复制下来添加到一个网页中访问，获取授权，得到 dropbox 的回调链接

3. 这个回调链接在浏览器里面访问一下，复制它的 curl(bash)请求

4. 再到服务器里面去执行

**以上步骤也适用于 onedrive**

最后显示`all done`

回到执行`rclone`的 shell, 拿到 token 以后，将它放到配置文件里面

> nano ~/.config/rclone/rclone.conf

```
[dropbox-remote]
type = dropbox
client_id = <app-key>
client_secret = <app-secret>
token = {"access_token":"redacted","token_type":"bearer","expiry":"2020-08-05T16:10:21.28527-07:00"}
```

如果要再次认证

> rclone authorize "dropbox" -- "fd2gdwt35oksfrf" "u4i3lsxs1u4yvwf"

## 挂载

首先要创建一个目录

> rclone mkdir drop:files

在 dropbox 创建一个 files 目录,目录的实际存在位置在对应的应用目录下

在本机创建一个空目录，挂载

> rclone mount drop:files /opt/dropbox --daemon

## 操作

可以直接 mount 的目录操作

### 复制文件,或者

> rclone copy ~/1.txt drop:files

### 删除文件

> rclone delete drop:files/1.txt

## 参考

[rclone 文档](https://rclone.org/dropbox/#:~:text=Rclone%20supports%20Dropbox%20for%20business%20and%20Team%20Folders.,you%20all%20Team%20Folders%20and%20your%20User%20Folder.)

[dropbox 的文档](https://hpcrcf.atlassian.net/wiki/spaces/TCP/pages/1529511937/Dropbox+access+using+rclone)

[rclone 命令文档](https://rclone.org/commands/)

[rclone 挂载 google drive](https://www.unvone.com/72825.html)

挂载 google

> rclone mount GoogleDrive: /GoogleDrive \
>  --umask 0000 \
>  --default-permissions \
>  --allow-non-empty \
>  --allow-other \
>  --buffer-size 32M \
>  --dir-cache-time 12h \
>  --vfs-read-chunk-size 64M \
>  --vfs-read-chunk-size-limit 1G &

挂载 onedrive

> rclone mount onedrive: /opt/drive/onedrive --copy-links --no-gzip-encoding --no-check-certificate --allow-other --allow-non-empty --umask 000 --vfs-cache-mode full --daemon

## 配置 UI 界面访问

使用的是[rclone-webui-react](https://github.com/rclone/rclone-webui-react)项目

首先执行

> rclone rcd --rc-web-gui --rc-user=<user> --rc-pass=<pass>

开启访问:http://localhost:5572

rclone rcd --rc-web-gui --rc-user=admin --rc-pass=qq00TC93

### 使用托管版本

> rclone rcd --rc-user=abc --rc-pass=abcd --rc-allow-origin="https://rclone.github.io"

rclone rcd --rc-user=admin --rc-pass=qq00TC93 --rc-allow-origin="https://rclone.github.io"
