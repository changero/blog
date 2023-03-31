---
title: centos搭建k8s
date: '2021-11-17 20:56:07'
categories:
  - linux
tags:
  - k8s
lang: zh-cn
---

配合[参考](https://www.cnblogs.com/tianleblog/p/12108391.html)

## 配置网络

分配好各节点 ip

```bash
vi /etc/sysconfig/network-scripts/ifcfg-***
```

注意修改如下几行的信息：

```
BOOTPROTO=static
ONBOOT=yes
IPADDR=10.10.10.242
NETMASK=255.255.255.0
GATEWAY=10.10.10.1
DNS1=10.10.10.1
DNS2=61.139.2.69
```

## 设置 hostname

```bash
hostnamectl set-hostname master01
```

设置好各主机的 hostname，然后配置 dns，将名称解析到对应的 ip 上。机器数量不多的情况可以直接修改 hosts 文件

<!-- more -->

## 生成 ssh 认证信息

```bash
ssh-keygen -t rsa
```

分别将信息复制到其他主机上，实现免密访问

```bash
ssh-copy-id root@node01
```

如果要配置别名访问，需要修改`~/.ssh/config`文件，没有则创建一个，内容格式如下:

```sh
Host node01
    HostName node01
    User root
    IdentityFile ~/.ssh/id_rsa
```

## 配置 yum 源

```
# 备份
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

# 阿里源
 wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

# 163源
wget http://mirrors.163.com/.help/CentOS7-Base-163.repo

yum clean all
yum makecache
yum update
```

## 设置防火墙

```bash
systemctl stop firewalld && systemctl disable firewalld
```

设置防火墙为 Iptables，并设置空规则

```bash
yum -y install iptables-services && systemctl start iptables && systemctl enable iptables  && iptables -F && service iptables save
```

## 关闭 selinux 和 swap 分区

```bash
setenforce 0
sed -i 's/^SELINUX=enforcing$/SELINUX=disable/' /etc/selinux/config

swapoff -a && sysctl -w vm.swappiness=0
sed -i 's/.*swap.*/#&/g' /etc/fstab
```

## 调整内核参数

```
cat > kubernetes.conf <<EOF
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
net.ipv4.ip_forward=1
net.ipv4.tcp_tw_recycle=0
vm.swappiness=0 # 禁用swap
vm.overcommit_memory=1 # 不检查物理内存是否够用
vm.panic_on_oom=0 # 开启OOM
fs.inotify.max_user_instances=8192
fs.inotify.max_user_watches=1048576
fs.file-max=52706963
fs.nr_open=52706963
net.ipv6.conf.alldisable_ipv6=1
net.netfilter.nf_conntrack_max=2310720
EOF
cp kubernetes.conf /etc/sysctl.d/kubernetes.conf
sysctl -p /etc/sysctl.d/kubernetes.conf
```

## 调整时区

```bash
# 设置系统时区为 中国/上海
timedatectl set-timezone Asia/Shanghai
# 将当前的UTC时间写入硬件时钟
timedatectl set-local-rtc 0
systemctl restart rsyslog
systemctl restart crond
```

## 关闭其他服务

```bash
systemctl stop postfix && systemctl disable postfix
```

## 升级内核到 4.44

```bash
rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-3.el7.elrepo.noarch.rpm
# 安装完成后检查/boot/grub2/grub.cfg 中对应内核menuentry 中是否包含initrd16配置，如果没有，再安装一次
yum --enablerepo=elrepo-kernel install -y kernel-lt
# 设置开机从新内核启动
grub2-set-default "CentOS Linux (4.4.182-1.e17.elrepo.x86_64) 7 (Core)"

1.获取源
rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-4.el7.elrepo.noarch.rpm

2.安装，装完成后检查 /boot/grub2/grub.cfg中对应内核menuentry中是否包含 initrd16 配置，如果没有，再安装一次！
yum --enablerepo=elrepo-kernel install -y kernel-lt

3.查看系统的全部内核
rpm -qa | grep kernel

4.设置开机从新内核启动
grub2-set-default 'CentOS Linux (5.4.158-1.el7.elrepo.x86_64) 7 (Core)’
5.重启使配置有效
reboot
6.查看正在使用的内核
uname -a
```

## 安装 docker

```
yum install -y yum-utils device-mapper-persistent-data lvm2

yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

yum update -y && yum install -y docker-ce
```

或者通过一键脚本安装

```bash
curl -fsSL https://get.docker.com -o get-docker.sh & sh get-docker.sh
wget https://cdn.jsdelivr.net/gh/zhegeshijiehuiyouai/RoadToDevOps@master/01-installation-scripts/04-Docker/01-install-docker.sh
```

配置 docker

```bash
systemctl start docker && systemctl enable docker

mkdir /etc/docker

cat > /et/docker/daemon.json <<EOF
{
	"exec-opts": ["native.cgroupdriver=systemd"],
	"log-driver": "json-file",
	"log-opts": {
		"max-size": "100m"
	}
}
EOF

mkdir -p /etc/systemd/system/docker.service.d

systemctl daemon-reload && systemctl restart docker
```

## 开始部署

```
cat > /etc/yum.repos.d/kubernetes.repo <<EOF
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

```bash
yum install -y kubelet-1.17.0 kubeadm-1.17.0 kubectl-1.17.0
systemctl enable kubelet
```

部署 master

```bash
kubeadm init \
--apiserver-advertise-address=10.10.10.240 \
--image-repository registry.aliyuncs.com/google_containers \
--service-cidr=10.96.0.0/12 \
--pod-network-cidr=10.244.0.0/16
# 下面的可以不要
--kubenetes-version v1.17.0 \
```

按照打印的日志，再执行一些操作

并得到加入节点的命令如下

```
kubeadm join 10.10.10.240:6443 --token 3zee4f.0wfbttfejdc7b9ag \
    --discovery-token-ca-cert-hash sha256:f3bd1ad6db205cbbc8218704c6d3aebb79b81040e72d9f749e55d3aa28d43aa5
```

或按如下手动设置

使用默认配置生成配置文件

```
kubeadm config print init-defaults > k8s-init-master01.yaml
```

需要修改`advertiseAddress`为当前主节点的 ip，同时在`networking`下面添加 pod 的网段

```
podSubnet: "10.244.0.0/16"
```

最后在文件结尾添加

```
---
apiVersion :Kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
featureGates:
  SupportIPVSProxyMode: true
mode: ipvs
```

其他

```
kubeadm config print init-defaults
kubeadm config print init-defaults --component-configs
kubeadm config print join-defaults
kubeadm config print join-defaults --component-configs
```

提前拉取镜像

```
kubeadm config images pull --config k8s-init-master01.yaml
```

初始化安装

```
kubeadm init --config k8s-init-master01.yaml --experimental-upload-certs | tee kubeadm-init.log
```

安装 pod 网络插件

```bash
kubectl apply -f https://cdn.staticaly.com/gh/flannel-io/flannel/master/Documentation/kube-flannel.yml
# 或者
kubectl apply -f https://cdn.jsdelivr.net/gh/flannel-io/flannel@master/Documentation/kube-flannel.yml
```

添加节点

上面执行`kubeadm init`的结果会给出添加节点的命令，到 node 节点中去执行

最后就是登陆 harbor 就行了
