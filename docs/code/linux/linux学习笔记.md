---
title: linux学习笔记
date: "2023-03-12 16:25:10"
categories:
	- linux
tags:
	- tag
lang: zh-cn
---

已 centos 为例

## 网络配置

- 查看本机所有网络接口：`ifconfig`
- 查看 eth0 接口的网络情况：`ifconfig eth0`
- 修改接口的 ip 地址:`ifconfig eth0 10.10.10.1`
- 修改接口的 ip 地址及子网掩码:`ifconfig eth0 10.10.10.10 netmask 10.10.10.1`
- 查看网关情况:`route -n`
- 删除默认网关:`route del default gw [网关地址]`
- 添加默认网关:`route add default gw [网关地址]`
- 针对主机走不同的网关：`route add -host [host地址] gw [网关地址]`
- 针对某一个网段添加一个网关：`route add -net 192.168.0.0 netmask 255.255.255.0 gw [网关地址]`

### 故障排除

#### ping

检测当前主机到目标主机的连接情况，`ping 目标主机域名或ip`

#### traceroute

跟踪路由状态，`traceroute -w 1 ip或主机`，每一个节点做多等待 1s

#### mtr

my trace route

#### nslookup

域名解析为 ip 地址，类似 dig
`nslookup ip或域名`

#### telnet

端口检查
`telnet ip或域名 port`

#### tcpdump

`tcpdump -i any`抓取所有网卡的网络包
`-n`表示把域名解析成 ip
`port 80`抓 80 端口
`host 10.10.10.5`抓指定主机的包
`-w filename`保存到文件
`tcpdump -i any -n host 10.10.10.5 and port 80`

#### netstat

`netstat -ntpl`
`-n`解析域名
`-t`显示 tcp
`-p`显示进程 PID
`-l`tcp listen

#### ss

与 netstat 参数基本相同

## 网络服务管理

- 网路服务管理程序分为两种，分别是`SysV`和`systemd`

  - `service network start|stop|restart`
  - `chkconfig --list network`

  - `systemctl list-unit-files NetworkManager.service`
  - `systemctl start|stop|restart NetworkManger`
  - `systemctl enable|disable NetworkManager`

配置文件位置：`/etc/sysconfig/network-scripts/`
主机名：`hostname`、修改 hostname：`hostnamectl set-hostname myhostname`

## 软件管理

centos、redhat 使用 yum 包管理器，软件包格式为 rpm
debian、ubuntu 使用 apt 包管理器，软件包格式为 deb
`rpm -qa`，查询所有安装的软件
`rpm -q 软件名`搜索安装过的软件
`rpm -i rpm包名`安装软件
`rpm -e 软件名`卸载

### yum

centos yum 源：`http://mirror.centos.org/centos/7/`
国内镜像：`https://opsx.alibaba.com/mirror`
yum 配置文件：`/etc/yum.repos.d/CentOS-Base.repo`。也可以获取自动配置脚本：`wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo`

安装：`yum install`
卸载：`yum remove`
更新：`yum update`

## 内核升级

rpm 格式内核
查看内核版本：`uname -r`
升级内核版本：`yum install kernel-3.10.0`
升级其他补丁：`yum update`

## 进程管理

### 进程查看

- ps（process status）：
  - 查看更详细的信息`ps -e | more`、`ps -aux`
  - 显示父进程 ID：`ps -ef`
  - 显示线程：`ps -eLf`
- pstree
- top：查看进程状态及系统信息
  - 按下数字 1 可以显示每个 CPU 内核的状态
  - `top -p PID`查特定的进程状态

### 进程控制

- 优先级调整：nice 从-20 到 19，值越小，优先级越高，抢占资源就越多
  - `nice -n 10 ./a.sh`
- renice：重新设置优先级
  - `renice -n 15 PID`
- 后台运行
  - `./a.sh &`
  - 对正在执行中的命令，执行`ctrl + z`
  - 调回前台：`jobs`显示进程序号，再执行`fg 序号`

### 进程间通信

`kill -l `可以查看所有支持的信号。`ctrl + c`相当于 2 号信号
9 号信号无条件结束进程：`kill -9 PID`

### 守护进程

`nohup`命令使得进程忽略`hangup(挂起)`信号：`nohup [command] &`
screen 命令来管理后台进程

- 创建环境：`screen`
- 退出：`ctrl + a d`
- 查看当前所有的环境： `screen -ls`
- 恢复会话：`screen -r sessionid`

## 服务管理工具

- service
  - 脚本存放位置：`/etc/init.d`
- systemctl
  - 脚本存放位置：`/usr/lib/systemd/system`
  - 常用操作：`start|stop|restart|reload|enable|disable`
  - 在脚本存放位置目录中，有很多的`target`结尾的文件，其中有`runlevel`开头的，表示的是系统的运行等级。通过`systemctl get-default`可以查看当前系统的运行等级，通过`systemctl set-default`可以修改系统的运行等级，重启之后生效

## SELinux

`getenforce`查看 selinux 的状态，状态类型在`/etc/selinux/config`文件中可以看到。
`setenforce` 临时修改 selinux 的状态

## 内存与磁盘管理

查看磁盘和内存的命令：

- free：`free -m`以 MB 为单位显示。`free -g`以 GB 为单位显示
- top

磁盘使用率查看：

- fdisk：`fdisk -l`
- df：`df -h`
- du：`du -sh .`，相比`ls`命令查看的文件大小，du 显示的是文件实际在磁盘里的大小。比如使用 dd 命令输出一个文件，`dd if=/dev/zero bs=4M count=10 seek=20 of=afile`。总共输出了 40M 大小，通过 du 看到的文件大小就是 40M。而文件前面跳过了 20 个块，也就是 80M 的大小，所以通过 ls 命令就看到了 120M 大小的文件

## 常见的文件系统

linux 支持如下的文件系统：

- ext4（centos6）
- xfs（centos7）
- NTFS(需要额外安装软件)

通过`ls -i`可以查看文件的`inode`。
硬链接：`ln afile bfile`二者具有相同的`inode`，共享一个 datablock
软链接：`ln -s afile bfile`二者不具有相同的 inode

### 文件访问控制列表

- `getfacl`获取文件访问控制列表
- `setfacl`设置文件访问控制权限

`setfacl -m u:username:r afile`：`-m`表示赋予权限，`-x`表示回收权限。后面接上要赋予的用户(`u:username`)或组(`g:groupname`)，最后是文件名

## 分区和挂载

常用相关命令

- fdisk
  - `fdisk /dev/sdc` 对设备进行分区，并进入命令模式
  - n 表示创建分区
  - d 表示删除分区
  - w 表示写入分区配置
  - p 查看当前分区信息
- mkfs
  - `mkfs.ext4 /dev/sdc1`分区格式化
- parted
  - 对大于 2G 的设备进行分区
- mount
  - 分区格式化完成以后，需要通过 mount 命令将分区挂载到目录中：`mount /dev/sdc1 /mnt/sdc1`

配置文件：`/etc/fstab`
设置自动挂载，修改配置文件：

```bash
/dev/sdc1 /mnt/sdc1 ext4 defaults 0 0
```

### 交换分区

设置分区为交换分区：`mkswap /dev/sdd1`
添加交换分区：`swapon /dev/sdd1`
关闭交换分区：`swapoff /dev/sdd1`
或者通过 dd 命令分割一块空间出来：

```bash
dd if=/dev/zero bs=4M count=1024 of=/swapfile
mkswap /swapfile
swapon /swapfile
```

修改配置文件：`/etc/fstab`

```bash
/swapfile swap swap defaults 0 0
```

## 系统综合状态查询

1. docker 安装`netdata`
2. sar 命令
3. 第三方命令
   1. yum install epel-release
   2. yum install iftop

## shell 脚本

Linux 的启动过程：`BIOS - MBR - BootLoader(grub) - kernel - systemd - 系统初始化 - shell`
如何查看系统的主引导记录

```bash
dd if=/dev/sda of=mbr.bin bs=446 count=1  #bs=512则包含磁盘分区表信息
hexdump -C mbr.bin
```

mbr 正确之后，将控制权交给 bootloader，在 centos7 中也就是 grub
grub 的位置：`/boot/grub2`。通过`grub2-editenv list`来查看内核的列表

### 执行脚本的方式

1. `bash ./filename.sh`开启子进程
2. `./filename.sh`开启子进程
3. `source ./filename.sh`当前进程
4. `. ./filename.sh`当前进程

### 重定向

- 输出重定向：`ls > a.txt`将 ls 的结果写入到`a.txt`文件中
- 输入重定向：`read var < b.txt`以`b.txt`文件的内容作为变量 var 的值
- 错误重定向：`nocmd 2> error.txt`不存在的命令执行会报错，将错误内容写入到`error.txt`文件中
- 全部重定向：`command $> out.txt`将 command 命令的输出写入到 out.txt 文件中

### 环境变量配置文件

- `/etc/profile`
- `~/.bash_profile`
- `~/.bashrc`
- `/etc/bashrc`
- `/etc/profile.d`

前四个加载顺序从上到下
切换用户的时候要添加`-`，e.g`su - root`，这样才能加载 4 个配置文件，否则新修改的配置可能不会生效

### 数组

```bash
# 定义数组
ipts=( 10.10.10.1 10.10.10.2 10.10.10.3)
# 显示所有数组元素
echo ${ipts[@]}
# 显示数组个数
echo ${#ipts[@]}
# 显示第一个元素
echo ${ipts[0]}
```

### 运算

```bash
let "a=1"
# 等同于
((a=1))
(( a++ ))
echo $((10+20))
```

```bash
expr 4 + 5
num1=`expr 4 +5`
```

区别

```bash
a=4+5
echo $a # 4+5
(( b=4+5 ))
echo $b # 9
c=`expr 4 + 5`
echo $c # 9
```

### 其他特殊符号

#### `()`

1. 可以表示开启一个子 shell

```bash
( a=123)
echo $a # 结果为空
```

2. 也可以表示取命令的结果

```bash
cmd=$(pwd)
```

3. 还可以表示数组，`ipts=(1 2 3)`

#### `(())`

用来做算数运算，`echo $(( 10 +20))`，等同于 let 命令

#### `[]`

等同于 test 命令，`[ 5 -gt 4]`
`[[]]`可以测试表达式，`[[ 5 > 4 ]]`

#### `{}`

表示一个范围

```bash
echo {0..9} # 0 1 2 3 4 5 6 7 8 9
```

或者用于命令的快捷方式

```bash
cp /etc/passwd /ect/passwd.bak
# 等同于
cp /etc/passwd{,.bak}
```

## 条件与分支结构

`if [ 测试条件成立 ]`或命令返回值为 0

```bash
if [ $USER = root ]; then
	echo "root user"
elif [ $USER = admin ]; then
	echo "admin user"
else
	echo "custom user"
fi
# 也可以写作一行
if [ $USER = root ]; then echo "root user"; fi

```

```bash
case "$变量" in
	"start"|"START")
		echo "started"
	;;
	"stop"|"STOP")
  	echo "stoped"
	;;
	*)
  	echo "用法：${0} {start|stop}"
	;;
esac
```

```bash
for 参数 in 列表; do
	命令
done

# e.g 批量改名 a.mp3 b.mp3 c.mp3 改为mp4
for filename in `ls *.mp3`;do
	mv $filename $(basename $filename .mp3).mp4
done
```

```bash
for((变量初始化;循环判断条件;变量变化));
do
	循环语句
done

# e.g
for (( i=1 ; i<=10 ; i++ ))
do
	echo $i
done
```

```bash
while 测试成立
do
	命令
done

# e.g
a=1
while [ $a -lt 10 ];do
	echo $a
  ((a++)) # a=`expr $a + 1` let "a=$a+1"
done
```

until 与 while 的判断逻辑相反，如果条件为假，会执行循环体，直到条件为真

```bash
until [ $a -gt 10 ];do
	echo $a
	((a++))
done
```

通过循环处理命令行参数
参数的获取：

- $0, $1,$2.....${10},$n
- $0 表示脚本的名称
- $*和`$@`表示所有位置参数
- `$#`表示参数的数量

```bash
for pos in $*; do
	if [ "$pos" = "help" ];then
  	echo $pos $pos
  	break;
	fi
done

while [ $# -gt 1 ];do
	if [ "$1" = "help" ];then
		echo $1 $1
	fi
	shift # 参数左移，将第一个参数弹出，第二个参数成为第一个参数
done
```

## 退出与退出状态

- exit 退出当前环境
- `exit 10`退出并返回 10，返回值为非 0 表示不正常退出
- 通过`$?`可以在判断当前 shell 上一条语句是否执行正确

一般用`test`命令做

- 文件测试，是否存在，是文件还是文件夹
- 整数比较测试
- 字符串测试

等同于`[]`，扩展为`[[]]`可以支持逻辑表达式&&、||、<、>

## 函数

```bash
function funcname(){
	命令
}

# e.g
function cdls(){
	cd /var
	ls
}
# 执行
cdls
```

通过`local`在函数内部申明内部变量

```bash
# 可以忽略function
cdls2(){
	local dir=$1
	cd $dir
	pwd
	ls
}

cdls2 /root
```

系统自建的函数位于：`/etc/init.d/functions`

## 捕获信号

当接收到 15 号信号的时候会打印相应的输出，但是程序不会停下来

```bash
trap "echo sign 15" 15 # kill 会发送15号信号
trap "echo sign 2" 2 # 捕获2号信号，Ctrl+C就失效了
```

9 号信号因为是不能阻塞的，所以不能捕获

## 计划任务

### 一次性计划任务

让计算机在指定的时间运行程序
`at 18:30`
随后在终端输入要执行的任务或者脚本

> 需要注意的是，如果是执行命令，最好输入完整的命令路径。另外运行的时候是没有终端，所以如果要输出内容，需要自己添加输出重定向

### 周期性任务

配置方式：`crontab -e`。配置存储位置：`/var/spool/cron`
查看：`crontab -l`
配置格式：`分 时 日 月 周 执行命令`。可以查看[在线工具](https://tool.lu/crontab/)
在`/var/cron`会有计划任务得执行日志
计算机不一定能按时执行任务，所以会出现各种问题
anacontab，延时计划任务，配置文件`/etc/cron.d/0hourly`、`/etc/anacrontab`
flock 锁文件，同一时间某个脚本只运行一次，或者说只有 1 个实例
`flock -xn "/tmp/f.lock" -c "/root/a.sh"`。`/tmp/f.lock`表示锁文件

## 查找命令

### grep

查找文件内容。格式：`grep 找什么 从哪找`。比如

```bash
grep proxy ~/.gitconfig
```

### find

查找文件，格式：`find 目录 -name 文件名字`

```bash
find /etc -name passwd
```

- `-regex`可以通过正则搜索

删除查找到的文件：`find *txt -exec rm -v {} \;`后面的`\;`一般是固定的

### sed

替换指令，格式，`sed '/user1/s/user1/u1' /etc/passwd`。默认逐行处理，每行只进行一次替换

```bash
# sed 's/old/new/' filename

# 多个替换
# sed -e 's/old/new' -e 's/old1/new1' filename filename1
# 等同于
# sed 's/old/new/;s/old1/new1/' filename

# 将替换结果写回到文件
# sed -i 's/old/new' 's/old1/new' filename filename1
# 或者通过重定向符输出到其他文件
# sed 's/old/new/' filename > newfilename

# sed -r 's/扩展正则表达式（+？等）/new' filename
sed -r 's/(a.*b)/\1:\1/' file # 表示找到文件中的从a到b的字串，替换成两遍子串以冒号分割的格式
```

其他模式

```bash
# 替换整行
sed 's/root/!!!!/g' /etc/passwd
# 替换匹配到的第二次
sed 's/root/!!!!/2' /etc/passwd

# 对匹配的行进行打印
sed 's/root/!!!!/p' /etc/passwd
# 只对匹配的行打印
sed -n 's/root/!!!!/p' /etc/passwd
# 将匹配到的结果输出到文件
sed -n 's/root/!!!!/w /tmp/a.txt' /etc/passwd

# 限定
sed '/正则/s/root/!!!!/' /etc/passwd  # 只对满足正则的行进行替换
sed '行号s/root/!!!!/' /etc/passwd # 指定行进行替换
sed '5,10s/root/!!!!/' /etc/passwd # 对第5到10行进行替换，$表示最后一行
```

### awk

一般用于对文本内容进行统计，按需要的格式进行输出。默认已空格符作为分隔符
`cut -d : -f 1 /etc/passwd`
`awk -F':' /正则/{print $1}' /etc/passwd`

- awk 使用`$1`、`$2`...`$n`表示每一个字段
  - `awk '{print $1,$2}' filename`
- `-F`指定自定义的分隔符
  - `awk -F':' '{print $1}' filename`。使用`:`作为分隔符
- 输出内容里面添加序号
  - `awk -F':' '{print x++,$1}' filename`
