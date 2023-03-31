---
title: 破解CSDN无法复制代码
date: "2021-11-17 21:07:56"
lang: zh-cn
---

## stylish

首先在浏览器安装**stylish**插件，具体根据使用的浏览器选择安装方式，只需要添加如下 CSSWG

```css
#content_views pre,
#content_views pre code {
  user-select: auto;
}
```

保存即可

<!-- more -->

## 非插件安装

如果对 CSDN 用得不多，可以在每次需要复制的时候使用该方法

- 打开控制台

- 输入`content_views`,并回车

- 在控制台输出的元素上面双击修改 id 即可，比如修改成`content_views1`
