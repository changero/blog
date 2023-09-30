(window.webpackJsonp=window.webpackJsonp||[]).push([[128],{470:function(s,t,a){"use strict";a.r(t);var n=a(14),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h3",{attrs:{id:"git-设置全局代理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#git-设置全局代理"}},[s._v("#")]),s._v(" git 设置全局代理")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global https.proxy http://127.0.0.1:1080\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global https.proxy https://127.0.0.1:1080\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global --unset http.proxy\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global --unset https.proxy\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" config delete proxy\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("h3",{attrs:{id:"只对-github-com"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#只对-github-com"}},[s._v("#")]),s._v(" 只对 github.com")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global http.https://github.com.proxy socks5://127.0.0.1:1080\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 取消代理")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" config --global --unset http.https://github.com.proxy\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h3",{attrs:{id:"ssh-协议"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ssh-协议"}},[s._v("#")]),s._v(" ssh 协议")]),s._v(" "),t("p",[s._v("对于使用 git@协议的，可以配置 socks5 代理\n在~/.ssh/config 文件后面添加几行，没有可以新建一个")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("Host github.com\n    ProxyCommand "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("nc")]),s._v(" -X "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(" -x "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:1080 %h %p\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("ssh 访问\n需要修改~/.ssh/config 文件, 没有的话新建一个. 同样仅为 github.com 设置代理:")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("Host github.com\n    User "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v("\n    ProxyCommand "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("nc")]),s._v(" -v -x "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:1086 %h %p\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("如果是在 Windows 下, 则需要个性%home%.ssh\\config, 其中内容类似于:")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("Host github.com\n    User "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v("\n    ProxyCommand connect -S "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:1086 %h %p\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("需要设置一个环境变量\n如果要设置默认密码：")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("SOCKS5_PASSWD\nHTTP_PROXY_PASSWORD\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("如果要设置默认用户名：")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("SOCKS_USER\nHTTP_PROXY_USER\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h2",{attrs:{id:"参考"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[s._v("#")]),s._v(" 参考")]),s._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://walkedby.com/sshwindowsproxy/",target:"_blank",rel:"noopener noreferrer"}},[s._v("在 Windows 上给 Git SSH 设置代理"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://www.cnblogs.com/chenkeyu/p/10440798.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("git 指定要提交的 ssh key"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://www.cnblogs.com/xjnotxj/p/5845574.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("一台电脑上的 git 同时使用两个 github 账户"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=e.exports}}]);