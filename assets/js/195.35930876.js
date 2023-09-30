(window.webpackJsonp=window.webpackJsonp||[]).push([[195],{550:function(t,s,e){"use strict";e.r(s);var a=e(14),n=Object(a.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"前言"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[t._v("#")]),t._v(" 前言")]),t._v(" "),s("p",[t._v("gpg 认证用于签名我们的 git commit,以此认定这个 commit 确实是本人提交，而不是他人冒充了邮箱提交。")]),t._v(" "),s("p",[t._v("如果在提交的时候，使用了别人的邮箱，在 github 的 commit 记录上就会显示别人的头像，给人造成误解。"),s("a",{attrs:{href:"https://www.zhihu.com/question/280774106",target:"_blank",rel:"noopener noreferrer"}},[t._v("了解一下"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),s("p",[t._v("在 Settings 中找到 ssh and gpg keys 标签，这里就是添加 gpg 的地方。")]),t._v(" "),s("p",[t._v("以 windows 为例，其他系统查看"),s("a",{attrs:{href:"https://docs.github.com/cn/authentication/managing-commit-signature-verification/generating-a-new-gpg-key",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),s("OutboundLink")],1)]),t._v(" "),s("ol",[s("li",[s("p",[t._v("打开 git bash")])]),t._v(" "),s("li",[s("p",[t._v("执行"),s("code",[t._v("gpg --full-generate-key")]),t._v(" 或者"),s("code",[t._v("gpg --default-new-key-algo rsa4096 --gen-key")])])]),t._v(" "),s("li",[s("p",[t._v("选择秘钥类型，直接回车默认")])]),t._v(" "),s("li",[s("p",[t._v("指定想要的密钥大小，或按 Enter 键接受默认值")])]),t._v(" "),s("li",[s("p",[t._v("输入密钥的有效时长。 按 Enter 键将指定默认选择，表示该密钥不会过期")])]),t._v(" "),s("li",[s("p",[t._v("输入 github 账号的邮箱，一定要是验证过的邮箱")])]),t._v(" "),s("li",[s("p",[t._v("输入安全码，也就是密码。以后每次 commit 会用到")])]),t._v(" "),s("li",[s("p",[t._v("接着通过"),s("code",[t._v("gpg --list-secret-keys --keyid-format=long")]),t._v("可以查看当前安装的 gpg key")])]),t._v(" "),s("li",[s("p",[t._v("复制 ID, 在此例中，GPG 密钥 ID 是 "),s("code",[t._v("3AA5C34371567BD2")])])])]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$ gpg --list-secret-keys --keyid-format=long\n/Users/hubot/.gnupg/secring.gpg\n------------------------------------\nsec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]\nuid                          Hubot\nssb   4096R/42B317FD4BA89E7A 2016-03-10\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br")])]),s("ol",{attrs:{start:"10"}},[s("li",[s("p",[t._v("执行命令"),s("code",[t._v("gpg --armor --export 3AA5C34371567BD2")]),t._v("，ID 替换成自己的 ID")])]),t._v(" "),s("li",[s("p",[t._v("复制 GPG 秘钥，从 -----BEGIN PGP PUBLIC KEY BLOCK----- 开始，到 -----END PGP PUBLIC KEY BLOCK----- 结束")])]),t._v(" "),s("li",[s("p",[t._v("添加到上述 gpg 的地方")])])]),t._v(" "),s("p",[t._v("这样 gpg 就和 github 账号关联起来了，类似 ssh 和 github 关联")]),t._v(" "),s("h2",{attrs:{id:"gpg-关联本地-git"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#gpg-关联本地-git"}},[t._v("#")]),t._v(" gpg 关联本地 git")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://docs.github.com/cn/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),s("OutboundLink")],1)]),t._v(" "),s("ol",[s("li",[s("p",[t._v("打开 git bash")])]),t._v(" "),s("li",[s("p",[t._v("执行"),s("code",[t._v("gpg --list-secret-keys --keyid-format=long")]),t._v(",查看 key")])]),t._v(" "),s("li",[s("p",[t._v("配置 key，注意替换成自己的")])])]),t._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global user.signingkey 3AA5C34371567BD2\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 或者添加到单个仓库")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --local user.signingkey 3AA5C34371567BD2\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("h2",{attrs:{id:"对提交签名"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#对提交签名"}},[t._v("#")]),t._v(" 对提交签名")]),t._v(" "),s("p",[t._v("最后，当我们在创建一个 commit 的时候，要告诉 git，创建一个带签名的 commit")]),t._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -S -m "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'commit message'")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("输入生成 GPG 秘钥时的密码，则创建成功，")]),t._v(" "),s("p",[t._v("最后"),s("code",[t._v("git push")])]),t._v(" "),s("p",[t._v("这样，在 github 的 commit 记录上就能看到一个"),s("code",[t._v("Verified")]),t._v("的标志")])])}),[],!1,null,null,null);s.default=n.exports}}]);