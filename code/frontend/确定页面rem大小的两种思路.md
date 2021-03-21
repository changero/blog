---
title: 确定页面rem大小的两种思路
date: 2019-07-19
categories:
  - 前端
tags:
  - css
---

### 1、将页面宽度等比例划分

我们可以通过将页面宽度分成 10 或者 100 等分来确定一个 rem，公式如下：

```js
document.documentElement.style = `font-size: ${window.innerWidth / 100}px`;
```

或者

```css
html {
  font-size: 1vw;
}
```

于是对应于设计稿上面，也同样的分成 100 等分，每一份就标识 1rem。所以，**通过设计图上面的标注得到占设计稿宽度的百分比就能确定出它的 rem 大小**

### 2、通过设计稿与当前浏览器的比例来计算

假设设计稿的宽度是`375px`，浏览器的宽度通过`window.innerWidth`得到的是`750px`，我们将比例`750/375`记为`i`。

那么设计稿上一个宽度是 100px 的节点在页面上应该呈现`i = x/100`,也就是说宽度应该是`100ipx`。

如果我们将`ipx`设置为`1rem`的大小，那么可以得到`x = 100rem`，这样我们就可以根据设计稿上的标注 100,得到宽度的 rem 值。

如果我们将`ipx`扩大 100 倍，也即`font-size: 100ipx`，那么我们的标注就要除以 100，来得到正确的 rem 值,这个时候`x = 1rem`。

公式化以后就是这样：

```js
window.documentElement.style = `font-size: ${(window.innerWidth /
  设计稿的宽度) *
  100}px`;
```

### 总结

两种方法根据标注得到的 rem 值是不一样的

第一种需要口算。`标注的尺寸/设计稿的宽度*100`，得到 rem 值

第二种,`标注的尺寸/100`，得到 rem 值

可以看到，2 种不同的方式得到的结果都是`标注的尺寸/设计稿的宽度*window.innerWidth`,单位是像素。如果是在 less 里面，也可以自定义一个函数来处理

```css
html {
  font-size: calc(100vw / 750px);
}
```

### 参考

- [移动端适配](http://www.html-js.com/article/Mobile-terminal-H5-mobile-terminal-HD-multi-screen-adaptation-scheme%203041)
