---
title: nginx配置spa
date: '2022-08-10 22:34:14'
categories:
  - nginx
lang: zh-cn
---

```conf
server{
    listen 8111;

    root /www/server/nginx/html/lottery;
    index index.html;

    location / {
        try_files $uri $uri/ @router;
        index index.html;
    }

    location @router {
        rewrite ^.*$ /index.html break;
    }
}
```
