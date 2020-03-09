---
title: openwrt调教历程
date: 2019-09-15
categories:
  - openwrt
tags:
  - tag
---

## 编译

编译采用的Lean的源[github](https://github.com/coolsnowwolf/lede)，按照步骤基本能编译成功，要注意编译环境需要保证40-50G的空间。

h3编译:

- Target System选择Allwinner A1x/A20/A3x

- Subtarget选择Allwinner A20/A3x

- Target Profile选择FriendlyARM NanoPi NEO

[参考](https://blog.csdn.net/wb4916/article/details/78227022)

我主要用到的几个额外的包的github地址

```bash
# aliddns
git clone https://github.com/honwen/luci-app-aliddns.git

# baidupcs-web
git clone https://github.com/KFERMercer/openwrt-baidupcs-web.git
git clone https://github.com/KFERMercer/luci-app-baidupcs-web.git

# 解锁网易云音乐
git clone https://github.com/maxlicheng/luci-app-unblockmusic

# ssr-plus
# 用的leo大的魔改版

# 主题
git clone https://github.com/openwrt-develop/luci-theme-atmaterial.git
```

## 安装

我选择的安装环境的virtualbox，网页[下载](https://www.virtualbox.org/wiki/Downloads)virtualBox及其Extension Pack。或者备用[下载](http://download.virtualbox.org/virtualbox/)

所以需要编译出来vdi格式的虚拟机格式。如果嫌编译之后的空间小，可以修改

> Target Image -> Root filesystem partition size 选项（一般情况下是倒数第二个）

还是那句话，修改这一项要注意编译空间的大小

如果使用的是别人提供的固件，也就是一个img格式的文件，可以在安装完成virtualBox之后在命令行下转换

```bash
VBoxManage convertfromraw --format VDI openwrt-x86-64-combined-squashfs.img openwrt-x86-64-combined-squashfs.vdi    
```

如果报错，用dd命令重新整合一下，[参考](https://openwrt.org/zh/docs/guide-user/virtualization/virtualbox-vm)

> dd if=openwrt-x86-64-combined-squashfs.img of=openwrt.img bs=128000 conv=sync

- 创建虚拟机

选择刚才生成的vdi文件，这一步网上都有教程。在设置中添加网卡，选择桥接模式，高级设置中混杂模式改为全部允许。

添加一块额外的vdi磁盘

- 启动虚拟机

大概一分钟启动好了之后，通过`vi /etc/config/network`修改lan口地址。

这样基本就安装好了

## 配置

### 镜像源

```
# 中科大
https://openwrt.proxy.ustclug.org/
# 韩国
https://mirror.0x.sg/openwrt/
清华大学的LEDE镜像站
https://mirrors.cnnic.cn/lede/releases/
浙江大学 | OPENWRT | 开源镜像站地址
http://mirrors.zju.edu.cn/openwrt/
```

### 挂载硬盘

参考这一篇[文章](https://blog.csdn.net/xiexievv/article/details/50525783)，将多添加的磁盘挂载到虚拟机

### 联网

在`网络 > 接口`下选择wan口，进行拨号上网，lan口不需要太多的设置

如果不能上网，在`网络 > 防火墙 > 自定义规则`下添加`iptables -t nat -I POSTROUTING -j MASQUERADE`

#### 单臂主路由

- 接线方法：没有交换机的情况下，可以利用多网口路由器代替。

`光猫`和软路由都连接`路由器lan口`或者`交换机`

- 软路由设置

进入到网络-接口，设置LAN口，去掉桥接，物理设置中选择eth0。设置WAN口，选择刚才LAN口的接口

### aliddns

使用aliddns的一个前提是拨号需要得到一个公网IP，没有公网IP就放弃吧，改用frp

购买阿里云域名之后，还需要创建Access Key ID。

### SSR plus + 

看指示就行，运行模式选择GFW就行，解析模式选则dnsforwarder UDP

### netdata

一般固件内没有包含，需要手动安装

```bash
opkg install netdata
```

安装完成之后打开端口19999端口查看

看上去就像这样

![](./assets/netdata.png)

### aria2配置

附加选项添加一项，`check-certificate=false`，用户组选择root用户，任务设置中`单服务器最大链接数`填13。

bt配置，[tracker list](https://newtrackon.com/list)，[trackerslist](https://github.com/ngosang/trackerslist)。加快下载速度

如果下载不了，就重启一下aria2。在`系统 -> 启动项`中选择重启，或者在命令行中执行`arai2c -c --conf-path=/tmp/etc/aria2/aria2.conf.main`

参考橘子大神的[视频](https://www.youtube.com/watch?v=nMIVGr_mhQg&t=1428s)

### acc网络加速

在[地址](https://www.shurouwang.com/article/214.html)获取

上游DNS`114.114.114.114,114.114.115.115,114.114.114.119,114.114.115.119,114.114.114.110,114.114.115.110,223.5.5.5,223.6.6.6,180.76.76.76,101.198.198.198,101.198.199.200,119.29.29.29,119.28.28.28,182.254.118.118,182.254.116.116,1.2.4.8,210.2.4.8,117.50.11.11,117.50.22.22,117.50.10.10,117.50.20.20,101.226.4.6,218.30.118.6,123.125.81.6,140.207.198.6,202.141.162.123,202.141.178.13,202.38.93.153,202.141.176.93,101.132.183.99,193.112.15.186,63.223.94.66,123.206.61.167,119.29.105.234,101.236.28.23,120.77.212.84,123.207.137.88,115.159.220.214,115.159.146.99,123.206.21.48,101.6.6.6,40.73.101.101,115.159.154.226,47.99.165.31,182.254.242.15,101.101.101.101,101.102.103.104,203.80.96.10,203.80.96.9,202.55.11.100,202.55.21.85,112.121.178.187,168.95.192.1,168.95.1.1,202.45.84.58,1.1.1.1,1.0.0.1,176.103.130.130,176.103.130.131,176.103.130.132,176.103.130.134,8.8.8.8,8.8.4.4,4.2.2.1,4.2.2.2,9.9.9.9,8.26.56.26,8.20.247.20,199.91.73.222,178.79.131.110,208.67.222.222,208.67.220.220,208.67.222.123,208.67.220.123,156.154.70.1,156.154.71.1,199.85.126.10,199.85.127.10,64.6.64.6,64.6.65.6,216.146.35.35,216.146.36.36,80.80.80.80,80.80.81.81,77.88.8.8,77.88.8.1,77.88.8.8,77.88.8.2,77.88.8.7,77.88.8.3,103.197.104.178,103.197.106.75,203.189.136.148,74.82.42.42,66.220.18.42,203.112.2.4,84.200.69.80,84.200.70.40,195.46.39.39,195.46.39.40,109.69.8.51,168.126.63.1,168.126.63.2,168.126.63.1,168.126.63.2,210.220.163.82,219.250.36.130,164.124.101.2,203.248.252.2,164.124.107.9,203.248.242.2,207.148.107.4,185.222.222.222,185.184.222.222`

### 可道云

### JetBrains 授权服务器


更多[参考](https://www.mivm.cn/?s=openwrt)

## 安装npm

1、 从[淘宝镜像](https://npm.taobao.org/mirrors/npm/)上下载包

```bash
wget https://npm.taobao.org/mirrors/npm/v6.9.2.tar.gz
```

2、解压后，修改包中`bin/npm`文件，

```bash
#!/bin/sh
(set -o igncr) 2>/dev/null && set -o igncr; # cygwin encoding fix

basedir=`dirname "$0"`

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

NODE_EXE="$basedir/node.exe"
if ! [ -x "$NODE_EXE" ]; then
  NODE_EXE=node
fi

# 修改成绝对路径
NPM_CLI_JS="/download/npm/bin/npm-cli.js"

case `uname` in
  *MINGW*)
    NPM_PREFIX=`"$NODE_EXE" "$NPM_CLI_JS" prefix -g`
    NPM_PREFIX_NPM_CLI_JS="$NPM_PREFIX/node_modules/npm/bin/npm-cli.js"
    if [ -f "$NPM_PREFIX_NPM_CLI_JS" ]; then
      NPM_CLI_JS="$NPM_PREFIX_NPM_CLI_JS"
    fi
    ;;
  *CYGWIN*)
    NPM_PREFIX=`"$NODE_EXE" "$NPM_CLI_JS" prefix -g`
    NPM_PREFIX_NPM_CLI_JS="$NPM_PREFIX/node_modules/npm/bin/npm-cli.js"
    if [ -f "$NPM_PREFIX_NPM_CLI_JS" ]; then
      NPM_CLI_JS="$NPM_PREFIX_NPM_CLI_JS"
    fi
    ;;
esac

"$NODE_EXE" "$NPM_CLI_JS" "$@"
~                               
```

> 如果出现无法保存的问题，可能是因为磁盘空间不够，将包拷贝到一个剩余空间足够的分区下编辑

3、创建软连接

```bash
ln -s /npm/bin/npm /usr/bin
```

4、修改npm全局安装模式的路径

```bash
npm config set prefix "D:\Software\nodejs\node_global"
npm config set cache "D:\Software\nodejs\node_cache"
```

## nanopi-wrt

### 设置静态地址

#### 方法1：不使用NetworkManager管理，手动设置

以下文字介绍不使用 NetworkManager 来管理网络，改为手动设置，设置静态IP更灵活：
编辑 NetworkManger.conf，将ifupdown中的managed设置为false，如下所示：

```bash
sudo vi /etc/NetworkManager/NetworkManager.conf

[ifupdown]
managed=false
```

再将网络设置加入 /etc/network/interfaces 即可：

```bash
vi /etc/network/interfaces
```

/etc/network/interfaces文件内容如下：

```bash
# The loopback network interface
auto lo
iface lo inet loopback
 
# network interface not managed by Network Manager
allow-hotplug eth0
iface eth0 inet static
address 192.168.2.199
netmask 255.255.255.0
gateway 192.168.2.1
dns-nameservers 192.168.2.1
```


## docker记录

> 单独使用一个硬盘挂在到/opt/docker记录

> docker ps -a # 查看正在运行的镜像

> docker exec -it containerID /bin/bash   进入容器交互  containerID:镜像ID

### 加速站点

https://registry.docker-cn.com

http://hub-mirror.c.163.com

https://3laho3y3.mirror.aliyuncs.com

http://f1361db2.m.daocloud.io

https://mirror.ccs.tencentyun.com

```bash
vi /etc/docker/daemon.json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```


- 安装kodexplorer

> docker run --restart=always -d -p 8081:80 --name kodexplorer -v /download/kod:/code baiyuetribe/kodexplorer:latest

- jellyfin

因为之前已经安装过kodexplorer，所以直接哪kod里面的路径做一个软连接到/download/jellyfin/video

> docker run --restart=always -d -p 8096:8096 -v /download/jellyfin/config:/config -v /download/jellyfin/videos:/videos jellyfin/jellyfin:latest -name jellyfin 

- dos游戏

> docker run -d --name dosgame -p 262:262 oldiy/dosgame-web-docker:latest

- 临时邮箱

> docker run --name forsaken-mail -itd -p 25:25 -p 3000:3000 rockmaity/forsaken-mail

- docker-pan
    
> docker run --name=pan -v /opt/data:/var/www/html/system/data/default_home_folder  -dti -p 8082:80 -p 6800:6800 jaegerdocker/pan

- 人人影视

> docker run -d --name rrshare -p 3001:3001 -v /videos:/opt/work/store oldiy/rrshare64:latest

- syncthing

> docker run -it  -p 8384:8384 -p 22000:22000 -v /opt/data/syncthing/config:/var/syncthing/config -v /opt/data/syncthing:/var/syncthing syncthing/syncthing:latest

> aria2
- docker run -d --name aria2 -p 5003:80 -v /opt/data/aria2:/data -v /opt/data/aria2:/conf -e PUID=1000 -e PGID=1000 -e EXTERNAL_PORT=5003 -e USER_NAME=bianqu -e PASSWORD=123123 sanjusss/aria2-ariang-docker
    
- docker run -d --name aria2 -p 5003:80 -v /opt/data/aria2:/data sanjusss/aria2-ariang-docker 用户名、密码默认admin

### 解除容器网络占用

> docker network disconnect --force bridge [name]

查看网络占用

> docker network inspect bridge

