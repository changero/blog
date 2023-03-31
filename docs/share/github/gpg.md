---
title: gpg认证
date: '2022-03-01 23:53:24'
categories:
  - github
lang: zh-cn
---

## 前言

gpg 认证用于签名我们的 git commit,以此认定这个 commit 确实是本人提交，而不是他人冒充了邮箱提交。

如果在提交的时候，使用了别人的邮箱，在 github 的 commit 记录上就会显示别人的头像，给人造成误解。[了解一下](https://www.zhihu.com/question/280774106)

<!-- more -->

## 安装

在 Settings 中找到 ssh and gpg keys 标签，这里就是添加 gpg 的地方。

以 windows 为例，其他系统查看[官方文档](https://docs.github.com/cn/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)

1. 打开 git bash

2. 执行`gpg --full-generate-key` 或者`gpg --default-new-key-algo rsa4096 --gen-key`

3. 选择秘钥类型，直接回车默认

4. 指定想要的密钥大小，或按 Enter 键接受默认值

5. 输入密钥的有效时长。 按 Enter 键将指定默认选择，表示该密钥不会过期

6. 输入 github 账号的邮箱，一定要是验证过的邮箱

7. 输入安全码，也就是密码。以后每次 commit 会用到

8. 接着通过`gpg --list-secret-keys --keyid-format=long`可以查看当前安装的 gpg key

9. 复制 ID, 在此例中，GPG 密钥 ID 是 `3AA5C34371567BD2`

```
$ gpg --list-secret-keys --keyid-format=long
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot
ssb   4096R/42B317FD4BA89E7A 2016-03-10
```

10. 执行命令`gpg --armor --export 3AA5C34371567BD2`，ID 替换成自己的 ID

11. 复制 GPG 秘钥，从 -----BEGIN PGP PUBLIC KEY BLOCK----- 开始，到 -----END PGP PUBLIC KEY BLOCK----- 结束

12. 添加到上述 gpg 的地方

这样 gpg 就和 github 账号关联起来了，类似 ssh 和 github 关联

## gpg 关联本地 git

[官方文档](https://docs.github.com/cn/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key)

1. 打开 git bash

2. 执行`gpg --list-secret-keys --keyid-format=long`,查看 key

3. 配置 key，注意替换成自己的

```bash
git config --global user.signingkey 3AA5C34371567BD2
# 或者添加到单个仓库
git config --local user.signingkey 3AA5C34371567BD2
```

## 对提交签名

最后，当我们在创建一个 commit 的时候，要告诉 git，创建一个带签名的 commit

```bash
$ git commit -S -m 'commit message'
```

输入生成 GPG 秘钥时的密码，则创建成功，

最后`git push`

这样，在 github 的 commit 记录上就能看到一个`Verified`的标志
