(window.webpackJsonp=window.webpackJsonp||[]).push([[186],{540:function(v,_,t){"use strict";t.r(_);var p=t(14),a=Object(p.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h2",{attrs:{id:"前言"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[v._v("#")]),v._v(" 前言")]),v._v(" "),_("p",[v._v("闲来无事，搭建了一个我叫 MT 的一键端私服游戏在自己电脑，不过这个版本限制了我只能在本机电脑上玩，也就是我只能在电脑上安装一个安卓虚拟机，在这台虚拟机里面玩这个游戏。")]),v._v(" "),_("p",[v._v("不难发现，其实就是服务端固定了 ip，客户端访问这个固定的 ip，来实现的。服务端虚拟机通过 nat 方式与本机网络互相访问。所以我可以在电脑的浏览器上打开相关的后台网页程序")]),v._v(" "),_("h2",{attrs:{id:"开工"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#开工"}},[v._v("#")]),v._v(" 开工")]),v._v(" "),_("p",[v._v("既然知道了，他的工作方式，那么就可以对症下药")]),v._v(" "),_("p",[v._v("根据游戏的说明，可以知道这个游戏的访问 ip 和端口，那么第一步就是打开 vmware 的网络编辑器，添加一条 nat 映射，将游戏访问端口映射到本机")]),v._v(" "),_("p",[v._v("接着就是在 app 中，找到主机地址，修改成本机 ip 和刚才映射出来的端口上，就可以了")]),v._v(" "),_("p",[v._v("通过 jadx，找到要修改的 ip 所在文件，接着就是需要修改文件并重打包")]),v._v(" "),_("p",[v._v("这里使用的是这篇"),_("a",{attrs:{href:"https://blog.csdn.net/u010889616/article/details/78198822",target:"_blank",rel:"noopener noreferrer"}},[v._v("文章"),_("OutboundLink")],1),v._v("提供的方法。")]),v._v(" "),_("p",[v._v("重新打包之后在自己手机上进行安装")]),v._v(" "),_("p",[v._v("发现然并卵")]),v._v(" "),_("p",[v._v("并没有如期的打开")]),v._v(" "),_("p",[v._v("但是在电脑的安卓虚拟机上，照样是可以游戏的，也就是说修改并没有问题，那么一定是网络上的问题了")]),v._v(" "),_("p",[v._v("接着，就通过抓包的方式，发现 app 仍然在访问原来的 ip")]),v._v(" "),_("p",[v._v("但是在 jadx 中，并没有搜索到相关的字符串")]),v._v(" "),_("p",[v._v("但是在某一个接口中发现了问题，这个接口依然返回了原来的 ip")]),v._v(" "),_("h2",{attrs:{id:"定位服务端"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#定位服务端"}},[v._v("#")]),v._v(" 定位服务端")]),v._v(" "),_("p",[v._v("找到方向了之后，就是去修改相应的服务端的返回，发现这里是 php 文件")]),v._v(" "),_("p",[v._v("首先通过"),_("code",[v._v("lsof -i:port")]),v._v("找到启动服务的程序，发现是 nginx")]),v._v(" "),_("p",[v._v("通过"),_("code",[v._v("ps -aux | grep nginx")]),v._v(" 找到 nginx 启动的配置文件")]),v._v(" "),_("p",[v._v("经过一番搜索，终于找到了对应 port 的 conf 文件，不难找到其接口文件，将所有 ip 和端口修改就完事了")])])}),[],!1,null,null,null);_.default=a.exports}}]);