---
title: 全屏API-FullScreen
date: "2021-04-24 11:19:33"
categories:
  - cate
tags:
  - tag
lang: zh-cn
---

> 全屏 API 可以让你作用于特定的元素，而不是整个页面。同时，可以利用 CSS 特殊选择器显示特定的样式

## requestFullscreen

<div id='fs' style="background: red;display: flex; justify-content: center; align-items: center">全屏元素
<span>123</span>
</div>
<button id='btn'>toggle fullscreen</button>
<script>
  const el = document.getElementById("fs");
  const btn = document.getElementById("btn");
btn.addEventListener('click', () => {
  if(!document.fullscreenElement){
    el.requestFullscreen();
  }else{
    document.exitFullscreen()
  }
})

</script>

::: details 查看代码

```js
// <div id='fs' style="background: red;display: flex; justify-content: center; align-items: center">全屏元素</div>
// <button id='btn'>toggle fullscreen</button>
// <script>
const el = document.getElementById("fs");
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  // 在这里用document.fullscreenElement，来检测页面中是否有全屏元素存在
  if (!document.fullscreenElement) {
    el.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// </script>
```

:::

## document.fullscreenEnabled

用于检测浏览器是否支持全屏 API，用户可能禁用全屏显示，或者浏览器可能不支持全屏显示

## :fullscreen

`:fullscreen`用于匹配全屏元素

<style>
  #fs:fullscreen{
    color: white;
  }
  #fs:fullscreen span{
    color: blue;
    font-size: 30px;
  }
</style>

::: details 查看代码

```
<style>
  #fs:fullscreen{
    color: white;
  }
  #fs:fullscreen span{
    color: blue;
    font-size: 30px;
  }
</style>
```

:::

可以看到全屏之后文字颜色变成了白色

### 私有前缀

```css
#fs:-webkit-full-screen {
  background-color: yellow;
}

#fs:-moz-full-screen {
  background-color: yellow;
}
```

## 全屏元素默认伪元素

<style>
  #fs::backdrop{
    background-color: skyblue;
  }
</style>

```css
#fs::backdrop {
  background-color: skyblue;
}
```
