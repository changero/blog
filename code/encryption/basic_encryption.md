---
title: basic_encryption
date: 2020-04-19
categories:
  - encryption
---

[learn from ](https://www.youtube.com/user/sunnylearning)

## Private Key Encryption - 私钥加密(对称密钥)

`加解密过程中，只是用一个密钥`

基本过程：`发送方`使用密钥加密数据，`接收放`使用密钥解密得到数据

### 流密码 stream cipher

一个字节一个字节的加密(rc4加密)

### 块加密-分组加密

一块一块的加密，块大小通常匙64位或者128位、256位

DES、Triple DES、IDEA、RC5、AES、BLowfish等方式

## Public Key Encryption - 共钥加密(对称加密)

在此过程中，有两个不同的密钥分别用于加密数据和解密数据、这两个不同的key在数学上匙相关的，一个称为公钥、另一个称为私钥。公钥加密中使用的公钥对任何人都是公开的，私钥只属于创建密钥对的人

- step 1: receiver 创建一个密钥对，包括公钥和私钥

- step 2: sender获取公钥，并使用公钥加密发送的数据

- step 3: receiver使用私钥解密数据得到信息

## how hash function work

**哈希算法的作用主要是用于比较、而不是加密**

哈希算法具有的特征：

1、 安全 - 算法是不可逆的，是一种无法获得摘要的单向函数

2、 固定大小 - 无论原始数据大小，最终生成的hash长度固定

## Tricks to hack hashed passwords(破解哈希密码的技巧)

[https://crackstation.net/](https://crackstation.net/)

## 字典攻击、暴力破解

从字典中选取候选摘要并生成其对应的密钥、与得到的密文数据进行穷举比较

> 为了保护信息，我们的密码必须满足几个条件：1）至少12位的长度、2）每一个账号都应该是一个唯一的账号、3）三个月更新一次密码


## Kerberos

应用于C/S应用程序的身份验证协议

客户端访问服务器，需要经过第三方的验证

- step 1、客户端向身份验证服务器发送请求，得到一个加密的key

- step 2、客户端用加密key获得token

- step 3、服务器利用密钥对token加密，进行验证。客户端由此可以访问令牌特定时间段内的资源

## salt(加盐)

利用特定排序或者关键字对明文密码做进一步处理，再获取其hash值

salt可以使相同的密码对于不用的用户产生不用的hash