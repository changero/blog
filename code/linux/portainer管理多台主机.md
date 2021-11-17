---
title: portainer管理多台主机
date: "2021-11-17 21:02:35"
categories:
  - linux
tags:
  - docker
  - portainer
lang: zh-cn
---

修改`/usr/lib/systemd/system/docker.service`文件

修改行`ExecStart= xxxx -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock`

xxx 是代表原有的参数，追加`-H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock`内容

重启

```bash
systemctl daemon-reload
systemctl restart docker
```

检查是否生效

<!-- more -->

```bash
ss -unlpt | grep 2375
```

在一台主机上创建 portainer 容器

```bash
docker run -d -p 9000:9000 --name portainer --restart=always  -v /var/run/docker.sock:/var/run/docker.sock -v  portainer_data:/data portainer/portainer
```

打开`ip:9000`，一定要选择`remote`模式

- name 填 ip
- Endpoint URL：ip:2375

要加入的主机同样要修改`/usr/lib/systemd/system/docker.service`文件

访问`ip:9000/#/endpoints/new`，type 选 docker
