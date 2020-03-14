---
title: ubuntu容器设置启动脚本
date: 2020-03-14
categories:
  - docker
---

一开始，是准备使用ubuntu中的常规方法去设置开机脚本，比如`update-rc.d`，或者设置`rc.local`文件等等方法，结果这些方法都一律失效。接着经过不屑的努力去google，发现一个博客上是这样描述的

> 在执行 update-rc.d 任务的时候，会先运行一下 /usr/sbin/policy-rc.d 任务。果返回值是 0，那么 OK，执行任务，如果返回值是 101，那么不好意思，任务不执行。事实上 Docker 在容器里面就直接返回了个 101，所以执行 update-rc.d 的时候根本没用。为了放行服务的自启动，我们需要修改一下这个脚本，看下面，我们只需要将原来的 exit 101 改成 exit 0 即可。

结果发现还是不行

最终，才学习到原来是这样的

> Docker 不是虚拟机，容器中的应用都应该以前台执行，而不是像虚拟机、物理机里面那样，用 systemd 去启动后台服务，容器内没有后台服务的概念

所以，无论以那种方式去执行脚本，如果容器开启之后，进程跑完了，那容器也就停止了。所以关键不在于去启动脚本，而是怎么让进程挂起

### 解决办法就是修改启动之后的执行命令，也就是CMD

方法有两种：

#### 方法一

在创建容器的时候指定

```bash
docker run -it -d [image] /bin/bash -c "file"
```

#### 方法二

通过DOckerfile来创建一个新的镜像

Dockerfile:

```
FROM imageName

MAINTAINER youname<email>

CMD node /opt/index.js
```

创建镜像

```bash
docker build -t imagesName2:tag [Dockerfile所在目录]
```

这样就可以在创建容器的时候不需要手动指定启动脚本

e.g

```bash
docker run -it -d imagesName2:tag
```

#### 其他问题

以上，都是在启动容器的时候直接执行node来创建服务，但是这种方法有一个缺点就是，当你再次通过`exec`命令进入到已启动的容器中的`/bin/bash`环境时，无法查看到启动容器时开启的服务，也就是说，这个时候服务是无法在容器创建之后手动停止或修改的

解决的办法是创建一个脚本去启动node程序，并让脚本最后进入`/bin/bash`环境

```bash
#! /bin/bash
cd [folder]

npm start
/bin/bash
```

注意最后的`/bin/bash`,这保证容器启动之后是停留在bash环境下，而不会因为进程结束，导致容器关闭。

另外，这里`npm start`，替换成`node index.js`的话，猜测可能会出现容器停留在node环境下，而不会进入bash，导致出现之前提到的问题.

实际上我采用了pm2来管理node程序，保证pm2执行完成以后，最终会进入bash环境

最后，只需要把之前的CMD改为执行这个脚本文件就可以了
