---
title: 工具分享
date: 2019-05-19
sidebarDepth: 2
categories:
  - 工具
---

## 命令行上传工具

> [网址](https://bashupload.com),上传的时候需要用到 curl 工具，下载的时候用到 wget 工具。当然也可以直接在网站上去操作。最多保存 7 天，其间不限次数下载

> windows 上可以通过[choco](https://chocolatey.org)安装`curl`和`wget`

1、 上传

```bash
> curl https://bashupload.com/[filename] --data-binary @text.txt

Uploaded 1 file, 3 bytes

wget https://bashupload.com/aDH9y/myfile.txt
```

上传之后会返回相关的下载链接

<!-- more -->

2、 下载

> 直接用上面的链接就可以下载

```bash
wget https://bashupload.com/aDH9y/myfile.txt
```

## 命令行生成二维码

```bash
curl -L qrgo.elsesiy.com/test
curl -L qrgo.elsesiy.com/http://cblog.changero.win
```

## 网站分享

### 免费接码平台

- [https://www.freeonlinephone.org/](https://www.freeonlinephone.org/)

- [http://sms.sellaite.com/](http://sms.sellaite.com/)

- [http://receivefreesms.com/](http://receivefreesms.com/)

- [https://receive-a-sms.com/](https://receive-a-sms.com/)

- [https://smsnumbersonline.com/](https://smsnumbersonline.com/)

- [https://sms-online.co/receive-free-sms](https://sms-online.co/receive-free-sms)

- [https://receive-sms.com/](https://receive-sms.com/)

- [http://receive-sms-online.com/](http://receive-sms-online.com/)

- [http://receive-sms-now.com/](http://receive-sms-now.com/)

- [https://smsreceivefree.com](https://smsreceivefree.com)

- [https://www.receive-sms-online.info/](https://www.receive-sms-online.info/)

- [https://www.textnow.com/](https://www.textnow.com/)

- [https://www.pinger.com/text-free/](https://www.pinger.com/text-free/)

- [https://www.twilio.com/](https://www.twilio.com/)

- [http://www.heywire.com/](http://www.heywire.com/)

- [http://www.lleida.net/en](http://www.lleida.net/en)

- [https://www.pinger.com/content/home.html](https://www.pinger.com/content/home.html)

- [http://sellaite.com/smsreceiver/](http://sellaite.com/smsreceiver/)

- [http://receivesmsonline.com/](http://receivesmsonline.com/)

- [http://www.receivefreesms.com/](http://www.receivefreesms.com/)

- [https://www.virtualphoneline.com/login/](https://www.virtualphoneline.com/login/)

- [http://sonetel.com/](http://sonetel.com/)

- [http://pinger.com/tfw/](http://pinger.com/tfw/)

### 搜索资源站

- [史莱姆搜索](http://www.slimego.cn/)

- [呆木瓜](http://www.daimugua.com)

### 网盘搜索汇总

#### ★★★★★

- [鸠摩搜书](https://www.jiumodiary.com/)

- [\*盘多多](http://www.panduoduo.net/)

- [\*去转盘](http://www.quzhuanpan.com/)

- [\*Bdsola](http://www.3134.cc/)

- [\*西林街](http://www.xilinjie.com/)

#### ★★★★

- [\*探索云盘搜索](http://tansuo233.com/)

- [\*BDY 搜](http://www.bdysou.com)

- [\*盘窝窝](http://www.panww.com)

- [\*百度网盘搜索](http://uzi8.cn)

- [\*网盘 007](https://wangpan007.com)

#### ★★★

- [\*盘搜搜](http://www.pansoso.com)

- [\*番茄搜索](https://www.fqsousou.com)

- [\*微友搜索](http://www.weiyoou.com)

- [\*凌风云](https://www.lingfengyun.com)

- [\*盘优搜](http://www.panuso.comsoso)

- [\*云盘](http://www.sosoyunpan.com)

- [\*特百度](http://www.tebaidu.com)

- [\*搜百度盘](http://www.sobaidupan.com)

- [\*pan115](http://www.pan115.com)

- [\*鸵鸟搜索](http://www.tuoniao.me)

- [\*我的盘](http://www.wodepan.com)

- [\*搜网盘](http://www.swangpan.com)

- [\*51 菜场](http://wx01.51caichang.com)

- [\*网盘之家](http://www.wangpanzhijia.net)

- [\*及搜盘](http://www.jisoupan.com)

- [\*众人搜索](http://wangpan.renrensousuo.com)

- [\*行笑网](http://www.walksmile.com)

- [\*史莱姆搜索](http://www.slimego.cn)

- [\*百度云盘](http://www.baiduyunpan.com)

- [\*300 搜](http://www.3bsou.com)

- [\*58 网盘搜索](http://www.58wangpan.com)

- [\*56 网盘搜索](http://www.56wangpan.com)

- [\*我搜云](http://www.wosouyun.com)

- [\*坑搜](http://www.kengso.com)

## 磁盘刻录工具

### iso 文件

|      软件       | 跨平台  |                           github                            |                           官网                            | choco | 支持 img |
| :-------------: | :-----: | :---------------------------------------------------------: | :-------------------------------------------------------: | :---: | :------: |
|     etcher      |   是    |   [github](https://github.com/balena-io/etcher/releases)    |           [官网](https://www.balena.io/etcher/)           |  是   |    是    |
|      rufus      | windows |         [github](https://github.com/pbatard/rufus)          |                 [官网](https://rufus.ie/)                 |  是   |    是    |
|   unetbootin    |   是    | [github](https://github.com/unetbootin/unetbootin/releases) |           [官网](https://unetbootin.github.io/)           |  是   |    是    |
|     软碟通      | windows |                              -                              |        [官网](https://cn.ultraiso.net/xiazai.html)        |   -   |    -     |
| win32diskimager | windows |                              -                              | [官网](https://sourceforge.net/projects/win32diskimager/) |  是   |    -     |
|     tuxboot     | ubuntu  |                              -                              |           [官网](https://tuxboot.org/download/)           |  是   |    -     |
|    poweriso     |   是    |        [github](https://github.com/thioshp/poweriso)        |       [官网](https://www.poweriso.com/download.php)       |  是   |    -     |
|  autobootdisk   |  linux  |   [github](https://github.com/EvilSourcerer/AutoBootDisk)   |             [官网](https://www.simpodex.com/)             |  是   |    -     |
|   isorecorder   | windows |                              -                              |       [官网](http://isorecorder.alexfeinman.com/#/)       |  是   |    -     |

## 在线视频

- [五号站](http://www.wuhaozhan.net)

- [两个 BT](http://www.bttwo.com)

- [新版 6v 影院](https://www.66s.cc)

- [哗嘀影视](https://www.mp4er.com/)

- [酸枣电影网（66 影视）](https://www.suanzao.tv)

- [4K 屋](http://www.kkkkwu.net/)

- [私人官网](http://shoujizhan.cn/)

- [全能影视](http://www.qnvod.net/)

- [94 神马电影网](http://www.9rmb.com/)

- [好恐怖](https://www.haokongbu1.com/)
- [火鸟影视](http://huoniaoys.com/)
- [片吧](https://www.pianba.net/)
- [西瓜电影](https://www.xigua110.com/)
- [人人影视](http://www.yyetss.com/)
- [速影 TV](https://suyingtv.com/)
- [云播 TV](https://www.yunbtv.com/)
- [奈非影视](https://www.nfmovies.com/)
- [五杀电影院](https://www.lol5s.com/)
- [蓝马影视](https://www.lanmays.com/)
- [v 部落](http://www.vbuluo99.com/)
- [钉子电影](http://www.dingziyc.com/)
- [葡萄影视](https://www.putaoys.com/)
- [太初电影](https://www.tcmove.com/)
- [完美看看](https://www.wanmeikk.me/)
- [Gimy TV 剧迷](https://gimy.tv/)
- [91 美剧](https://91mjw.com/)
- [韩剧集网](https://www.juji.tv/)
- [Zzzfun](http://www.zzzfun.com/)
- [妮可动漫](http://www.nicotv.me/)
- [动漫岛](http://www.dmd55.com/)
- [ADC 电影网](https://www.adcmove.com/)
- [青鸟影视](https://www.qingniao.me/)

## 在线音乐

1、「用得最多」墨灵音乐：官网 https://yinyue.qugeek.com/
特点：① 海量音乐搜索，试听，下载 ② 无广告，无需注册登陆，完全免费
③ 在线白噪音，转码，编辑 MP3 标签，FM ④ 支持部分音乐无损下载

2、「可播放 vip、下架歌曲」网易云音乐、QQ 音乐、咪咕音乐http://tool.liumingye.cn/music/
http://47.112.23.238/
http://music.jsososo.com/

3、「基于麦聪音乐搜索器搭建的网站」一般使用酷狗、酷我。
http://www.xieqian.vip/music
http://tool.wotula.com/t/web/music-master/
http://www.lxh5068.com/music

4、「基于 mkonlineplayer 搭建的在线音乐播放器」支持主流音乐平台搜索试听下载。
http://music.itmxue.cn
http://guozhivip.com/yinyue/
https://music.postgraduate.top
http://tool.wotula.com/t/web/mkplayer/
https://www.mosq.cn/yy/music/
http://vip.xcsee.cn/music
http://ayy.ayxhk.com
http://tool.yiixue.com/Tools/mk_music

5、「不错的音乐在线试听网站」将 QQ 音乐、网易云音乐和虾米音乐上的歌添加到一个列表来播放
http://tongzhong.xyz
http://mini.tongzhong.xyz

6、「免费音乐搜索大全」
mmplayer 在线音乐播放器：ui 美观，支持网易音乐
https://www.postgraduate.top/app.php/music
http://music.mtnhao.com/

7、摩声音乐搜索：搜索歌曲速度很快，支持网易云、QQ、虾米、酷狗、百度免费搜索试听下载。
http://moresound.tk/music/

8、解锁网易云音乐灰色链接
https://github.com/nondanee/UnblockNeteaseMusic

<iframe src="https://www.gettoby.com/e/99d3rnacsjj8" width="690" height="350" frameBorder="0">Collection: VPS (62 tabs)<a href="https://www.gettoby.com/p/99d3rnacsjj8" target="_blank"></a></iframe>

<iframe src="https://www.gettoby.com/e/76vggkacyvnl" width="690" height="350" frameBorder="0">Collection: 工具 (88 tabs)<a href="https://www.gettoby.com/p/76vggkacyvnl" target="_blank"></a></iframe>
