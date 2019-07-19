---
title: 确定页面rem大小的两种思路
date: 2019-07-19
categories:
  - 前端
tags:
  - css
---

### 1、将页面宽度等比例划分

我们可以通过将页面宽度分成10或者100等分来确定一个rem，公式如下：
```js
document.documentElement.style = `font-size: ${window.innerWidth/100}px`
```
或者
```css
html{
    font-size: 1vw
}
```
于是对应于设计稿上面，也同样的分成100等分，每一份就标识1rem。所以，**通过设计图上面的标注得到占设计稿宽度的百分比就能确定出它的rem大小**

### 2、通过设计稿与当前浏览器的比例来计算

假设设计稿的宽度是`375px`，浏览器的宽度通过`window.innerWidth`得到的是`750px`，我们将比例`750/375`记为`i`。

那么设计稿上一个宽度是100px的节点在页面上应该呈现`i = x/100`,也就是说宽度应该是`100ipx`。

如果我们将`ipx`设置为`1rem`的大小，那么可以得到`x = 100rem`，这样我们就可以根据设计稿上的标注100,得到宽度的rem值。

如果我们将`ipx`扩大100倍，也即`font-size: 100ipx`，那么我们的标注就要除以100，来得到正确的rem值,这个时候`x = 1rem`。

公式化以后就是这样：

```js
window.documentElement.style = `font-size: ${window.innerWidth/设计稿的宽度 * 100}px`
```

### 总结

两种方法根据标注得到的rem值是不一样的

第一种需要口算。`标注的尺寸/设计稿的宽度*100`，得到rem值

第二种,`标注的尺寸/100`，得到rem值

可以看到，2种不同的方式得到的结果都是`标注的尺寸/设计稿的宽度*window.innerWidth`,单位是像素。如果是在less里面，也可以自定义一个函数来处理
```css
html{
    font-size: calc(100vw / 750px)
}
```


