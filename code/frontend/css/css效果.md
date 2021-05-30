---
title: css效果
date: "2021-05-09 19:11:00"
categories:
  - 前端
tags:
  - css
lang: zh-cn
---

## 霓虹灯

<div id='neon-btn'>
    <button class='btn one' >Hover me</button>
    <button class='btn two' >Hover me</button>
    <button class='btn three' >Hover me</button>
</div>

<style>
    #neon-btn{
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color:#031628;
    }

    .btn{
       border: 1px solid ;
       background-color: transparent;
        text-transform: uppercase;
        font-size: 14px;
        padding: 10px 20px;
        font-weight: 300;
    }

    .one{
        --var-color: #4cc9f0;
        color: var(--var-color);
    }

    .two{
        --var-color: #f038ff;
        color: var(--var-color);
    }

    .three{
        --var-color: #b9e739;
        color: var(--var-color);
    }

    .btn:hover{
        color: white;
        border-color: var(--var-color);
    }

    .one:hover{
        background-color: #4cc9f0;
        box-shadow: 10px 10px 99px 6px var(--var-color);
    }

    .two:hover{
        background-color: #f038ff;
        box-shadow: 10px 10px 99px 6px var(--var-color);
    }

    .three:hover{
        background-color: #b9e739;
        box-shadow: 10px 10px 99px 6px var(--var-color);
    }
</style>

::: details 查看代码

```html
<div id="neon-btn">
  <button class="btn one">Hover me</button>
  <button class="btn two">Hover me</button>
  <button class="btn three">Hover me</button>
</div>

<style>
  #neon-btn {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #031628;
  }

  .btn {
    border: 1px solid;
    background-color: transparent;
    text-transform: uppercase;
    font-size: 14px;
    padding: 10px 20px;
    font-weight: 300;
  }

  .one {
    --var-color: #4cc9f0;
    color: var(--var-color);
  }

  .two {
    --var-color: #f038ff;
    color: var(--var-color);
  }

  .three {
    --var-color: #b9e739;
    color: var(--var-color);
  }

  .btn:hover {
    color: white;
    border-color: var(--var-color);
  }

  .one:hover {
    background-color: #4cc9f0;
    box-shadow: 10px 10px 99px 6px var(--var-color);
  }

  .two:hover {
    background-color: #f038ff;
    box-shadow: 10px 10px 99px 6px var(--var-color);
  }

  .three:hover {
    background-color: #b9e739;
    box-shadow: 10px 10px 99px 6px var(--var-color);
  }
</style>
```

:::

<!-- more -->

## 边框效果

<div id='draw-border'>
    <button>hover me</button>
</div>

<style>
    #draw-border{
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #031628;
        --var-color: #4366ee;
    }

    button{
        border: 0;
        outline: none;
        background: none;
        text-transform: uppercase;
        color: var(--var-color);
        font-weight: bold;
        position: relative;
        padding: 10px 20px;
        box-sizing: border-box;
    }
    button:before,
    button:after{
        content: '';
        box-sizing: inherit;
        position: absolute;
        border: 2px solid transparent;
        width: 0;
        height: 0;
    }

    button:after{
        bottom: 0;
        right: 0;
    }
    button:before{
        top: 0;
        left: 0;
    }

    button:hover::before, button:hover::after{
        width: 100%;
        height: 100%;
    }

    button:hover::before{
        border-top-color: var(--var-color);
        border-right-color: var(--var-color);
        transition: width .3s ease-out, height .3s ease-out .3s;
    }

    button:hover::after{
        border-left-color: var(--var-color);
        border-bottom-color: var(--var-color);
        transition: border-color 0s ease-out .6s, height .3s ease-out 1s, width .3s ease-out .6s;
    }
</style>

::: details 查看代码

```html
<div id="draw-border">
  <button>hover me</button>
</div>

<style>
  #draw-border {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #031628;
    --var-color: #4366ee;
  }

  button {
    border: 0;
    outline: none;
    background: none;
    text-transform: uppercase;
    color: var(--var-color);
    font-weight: bold;
    position: relative;
    padding: 10px 20px;
    box-sizing: border-box;
  }
  button:before,
  button:after {
    content: "";
    box-sizing: inherit;
    position: absolute;
    border: 2px solid transparent;
    width: 0;
    height: 0;
  }

  button:after {
    bottom: 0;
    right: 0;
  }
  button:before {
    top: 0;
    left: 0;
  }

  button:hover::before,
  button:hover::after {
    width: 100%;
    height: 100%;
  }

  button:hover::before {
    border-top-color: var(--var-color);
    border-right-color: var(--var-color);
    transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
  }

  button:hover::after {
    border-left-color: var(--var-color);
    border-bottom-color: var(--var-color);
    transition: border-color 0s ease-out 0.6s, height 0.3s ease-out 1s,
      width 0.3s ease-out 0.6s;
  }
</style>
```

:::

## 圆形效果

<div id='circle'>
    <div class="circle-container">
        <div class='trigger'></div>
        hover me
    </div>
</div>

<style>
#circle{
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #031628;
    --var-color-left: #f72585;
    --var-color-right: #5f55af;
}
.circle-container{
    width: 200px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    color: white;
    text-transform: uppercase;
    position: relative;
    border: 0;
    outline: none;
    background-color: var(--var-color-right);
    background-image: linear-gradient(to right, var(--var-color-left) 50%, var(--var-color-right) 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 2s ease-in-out;
}
.trigger{
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: var(--var-color-left)
}
.circle-container:hover{
    background-position: left bottom;
}
</style>

::: details 查看代码

```html
<div id="circle">
  <div class="circle-container">
    <div class="trigger"></div>
    hover me
  </div>
</div>

<style>
  #circle {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #031628;
    --var-color-left: #f72585;
    --var-color-right: #5f55af;
  }
  .circle-container {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    color: white;
    text-transform: uppercase;
    position: relative;
    border: 0;
    outline: none;
    background-color: var(--var-color-right);
    background-image: linear-gradient(
      to right,
      var(--var-color-left) 50%,
      var(--var-color-right) 50%
    );
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 2s ease-in-out;
  }
  .trigger {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: var(--var-color-left);
  }
  .circle-container:hover {
    background-position: left bottom;
  }
</style>
```

:::

## 输入框的指针效果

<div class="wrapper">
    <div class="typing-demo">
      This is a typing demo.
    </div>
</div>

<style>
.wrapper {
  width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #031628;
}

.typing-demo {
    color: white;
  width: 22ch;
  animation: typing 2s steps(22), blink .5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  font-family: monospace;
  font-size: 2em;
}

@keyframes typing {
  from {
    width: 0
  }
}
    
@keyframes blink {
  50% {
    border-color: transparent
  }
}
</style>

::: details 查看代码

```html
<div class="wrapper">
  <div class="typing-demo">
    This is a typing demo.
  </div>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #031628;
  }

  .typing-demo {
    color: white;
    width: 22ch;
    animation: typing 2s steps(22), blink 0.5s step-end infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid;
    font-family: monospace;
    font-size: 2em;
  }

  @keyframes typing {
    from {
      width: 0;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
</style>
```

:::

## drop-shadow

<div class="wrapper2">
  <div class="mr-2">
    <div class="mb-1 text-center">
      box-shadow
    </div>
    <img class="box-shadow" src="https://markodenic.com/man_working.png" alt="Image with box-shadow">
  </div>
    
  <div>
    <div class="mb-1 text-center">
      drop-shadow
    </div>
    <img class="drop-shadow" src="https://markodenic.com/man_working.png" alt="Image with drop-shadow">
  </div>
</div>

<style>
.wrapper2{
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mr-2 {
  margin-right: 2em;
}

.mb-1 {
  margin-bottom: 1em;
}

.text-center {
  text-align: center;
}

.box-shadow {
  box-shadow: 2px 4px 8px #585858;
}

.drop-shadow {
  filter: drop-shadow(2px 4px 8px #585858);
}
</style>

::: details 查看代码

```html
<div class="wrapper2">
  <div class="mr-2">
    <div class="mb-1 text-center">
      box-shadow
    </div>
    <img
      class="box-shadow"
      src="https://markodenic.com/man_working.png"
      alt="Image with box-shadow"
    />
  </div>

  <div>
    <div class="mb-1 text-center">
      drop-shadow
    </div>
    <img
      class="drop-shadow"
      src="https://markodenic.com/man_working.png"
      alt="Image with drop-shadow"
    />
  </div>
</div>

<style>
  .wrapper2 {
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mr-2 {
    margin-right: 2em;
  }

  .mb-1 {
    margin-bottom: 1em;
  }

  .text-center {
    text-align: center;
  }

  .box-shadow {
    box-shadow: 2px 4px 8px #585858;
  }

  .drop-shadow {
    filter: drop-shadow(2px 4px 8px #585858);
  }
</style>
```

:::

有了`drop-shadow`，我们也可以很容易的根据一个图标做出一个不同颜色的图标来

## 自定义鼠标指针

<div class="wrapper3">
  <div class="tile">
    Default
  </div>
  
  <div class="tile tile--image-cursor">
    Image Cursor
  </div>
  
  <div class="tile tile--emoji-cursor">
    Emoji Cursor
  </div>
</div>

<style>
.wrapper3{
  display: flex;
  height: 30vh;
  align-items: center;
  justify-content: center;
  background: #4776e6;
  background: -webkit-linear-gradient(to right, #4776e6, #8e54e9);
  background: linear-gradient(to right, #4776e6, #8e54e9);
  padding: 0 10px;
}

.tile {
    width: 200px;
    height: 200px;display: flex;
    align-items: center;
    justify-content: center;
    background-color: #de5448;
    margin-right: 10px;color: #fff;
    font-size: 1.4em;
    text-align: center;
  }

.tile--image-cursor {
  background-color: #1da1f2;
  cursor: url(https://picsum.photos/20/20), auto;
}

.tile--emoji-cursor {
  background-color: #4267b2;
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🚀</text></svg>"), auto;
}
</style>

::: details 查看代码

```html
<div class="wrapper3">
  <div class="tile">
    Default
  </div>

  <div class="tile tile--image-cursor">
    Image Cursor
  </div>

  <div class="tile tile--emoji-cursor">
    Emoji Cursor
  </div>
</div>

<style>
  .wrapper3 {
    display: flex;
    height: 30vh;
    align-items: center;
    justify-content: center;
    background: #4776e6;
    background: -webkit-linear-gradient(to right, #4776e6, #8e54e9);
    background: linear-gradient(to right, #4776e6, #8e54e9);
    padding: 0 10px;
  }

  .tile {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #de5448;
    margin-right: 10px;
    color: #fff;
    font-size: 1.4em;
    text-align: center;
  }

  .tile--image-cursor {
    background-color: #1da1f2;
    cursor: url(https://picsum.photos/20/20), auto;
  }

  .tile--emoji-cursor {
    background-color: #4267b2;
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🚀</text></svg>"),
      auto;
  }
</style>
```

:::

## 文字省略显示

<div class="wrapper3">
  <div class="overflow-ellipsis">
    This text is truncated, because there is not enough space to display it completely.
  </div>
</div>

<style>
.overflow-ellipsis {
  width: 200px;
  background-color: #fff;
  padding: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

::: details 查看代码

```html
<div class="wrapper3">
  <div class="overflow-ellipsis">
    This text is truncated, because there is not enough space to display it
    completely.
  </div>
</div>

<style>
  .overflow-ellipsis {
    width: 200px;
    background-color: #fff;
    padding: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
```

:::

## 多行省略

This text is trimmed to 3 lines

<div class="tile">
  <p class="line-clamp">
    You can use <code>-webkit-line-clamp</code> property to truncate the text to the specific number of lines.
    An ellipsis will be shown at the point where the text is clamped.
  </p>
</div>

This text is trimmed to 4 lines

<div class="tile">
  <p class="line-clamp line-clamp--four">
    You can use <code>-webkit-line-clamp</code> property to truncate the text to the specific number of lines.
    An ellipsis will be shown at the point where the text is clamped.
  </p>
</div>

This text is not trimmed

<div class="tile">
  <p>
    You can use <code>-webkit-line-clamp</code> property to truncate the text to the specific number of lines.
    An ellipsis will be shown at the point where the text is clamped.
  </p>
</div>

<style>
    .tile {
  background: linear-gradient(to right, #2B32B2, #1488CC);
  padding: 15px;
  margin-bottom: 15px;
  padding: 15px;
  width: 300px;
  color: #fff;
}

.line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Change this line if you want. In this case it trimmed the text to 3 lines. */
  overflow: hidden;
}

.line-clamp--four {
  -webkit-line-clamp: 4; /* Trimmed the second tile to four lines. */
}
</style>

::: details 查看代码

```html
This text is trimmed to 3 lines

<div class="tile">
  <p class="line-clamp">
    You can use <code>-webkit-line-clamp</code> property to truncate the text to
    the specific number of lines. An ellipsis will be shown at the point where
    the text is clamped.
  </p>
</div>

This text is trimmed to 4 lines

<div class="tile">
  <p class="line-clamp line-clamp--four">
    You can use <code>-webkit-line-clamp</code> property to truncate the text to
    the specific number of lines. An ellipsis will be shown at the point where
    the text is clamped.
  </p>
</div>

This text is not trimmed

<div class="tile">
  <p>
    You can use <code>-webkit-line-clamp</code> property to truncate the text to
    the specific number of lines. An ellipsis will be shown at the point where
    the text is clamped.
  </p>
</div>

<style>
  .tile {
    background: linear-gradient(to right, #2b32b2, #1488cc);
    padding: 15px;
    margin-bottom: 15px;
    padding: 15px;
    width: 300px;
    color: #fff;
  }
  .tile p {
    line-height: 24px;
  }

  .line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* Change this line if you want. In this case it trimmed the text to 3 lines. */
    overflow: hidden;
  }

  .line-clamp--four {
    -webkit-line-clamp: 4; /* Trimmed the second tile to four lines. */
  }
</style>
```

:::

## 文字选中:selection

<div class="wrapper3">
  <div class='sele'>
    <p>
      This is default highlighting. Try it out.
    </p>
    <p class="custom-highlighting">
      This is customized highlighting. Try it out.
    </p>
  </div>
</div>

<style>
.sele p {
  font-size: 2rem;
  font-family: sans-serif;
}

.custom-highlighting::selection {
  background-color: #8e44ad;
  color: #fff;
}
</style>

::: details 查看代码

```html
<div class="wrapper3">
  <div class="sele">
    <p>
      This is default highlighting. Try it out.
    </p>
    <p class="custom-highlighting">
      This is customized highlighting. Try it out.
    </p>
  </div>
</div>

<style>
  .sele p {
    font-size: 2rem;
    font-family: sans-serif;
  }

  .custom-highlighting::selection {
    background-color: #8e44ad;
    color: #fff;
  }
</style>
```

:::

## 可缩放

```html
<style>
  .resize {
    resize: both;
  }
</style>
```

## css modal

<div class="wrapper3">
    <a href="#demo-modal">Open Demo Modal</a>
</div>

<div id="demo-modal" class="modal">
    <div class="modal__content">
        <h1>CSS Only Modal</h1>
        <p>
            You can use the :target pseudo-class to create a modals with Zero JavaScript. Enjoy!
        </p>
        <div class="modal__footer">
            Made with <i class="fa fa-heart"></i>, by <a href="https://twitter.com/denicmarko" target="_blank">@denicmarko</a>
        </div>
        <a href="#" class="modal__close">&times;</a>
    </div>
</div>

<style>
.wrapper3 a {
  display: inline-block;
  text-decoration: none;
  padding: 15px;
  background-color: #fff;
  border-radius: 3px;
  text-transform: uppercase;
  color: #585858;
  font-family: 'Roboto', sans-serif;
}

.modal {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(77, 77, 77, .7);
  transition: all .4s;
}

.modal:target {
  visibility: visible;
  opacity: 1;
}

.modal__content {
  border-radius: 4px;
  position: relative;
  width: 500px;
  max-width: 90%;
  background: #fff;
  padding: 1em 2em;
}

.modal__footer {
  text-align: right;
  a {
    color: #585858;
  }
  i {
    color: #d02d2c;
  }
}
.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
}

</style>

::: details 查看代码

```html


<div class="wrapper3">
    <a href="#demo-modal">Open Demo Modal</a>
</div>

<div id="demo-modal" class="modal">
    <div class="modal__content">
        <h1>CSS Only Modal</h1>
        <p>
            You can use the :target pseudo-class to create a modals with Zero JavaScript. Enjoy!
        </p>
        <div class="modal__footer">
            Made with <i class="fa fa-heart"></i>, by <a href="https://twitter.com/denicmarko" target="_blank">@denicmarko</a>
        </div>
        <a href="#" class="modal__close">&times;</a>
    </div>
</div>

<style>
.wrapper3 a {
  display: inline-block;
  text-decoration: none;
  padding: 15px;
  background-color: #fff;
  border-radius: 3px;
  text-transform: uppercase;
  color: #585858;
  font-family: 'Roboto', sans-serif;
}

.modal {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(77, 77, 77, .7);
  transition: all .4s;
}

.modal:target {
  visibility: visible;
  opacity: 1;
}

.modal__content {
  border-radius: 4px;
  position: relative;
  width: 500px;
  max-width: 90%;
  background: #fff;
  padding: 1em 2em;
}

.modal__footer {
  text-align: right;
  a {
    color: #585858;
  }
  i {
    color: #d02d2c;
  }
}
.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
}
```

:::

## :empty

匹配任何内部没有元素和节点的标签

<div class="wrapper3">
  <div class="box"></div>
  <div class="box">With Content</div>
</div>

<style>
.box {
  display: inline-block;
  background: #999;
  border: 1px solid #585858;
  height: 200px;
  width: 200px;
  margin-right: 15px;
}

.box:empty {
  background: #fff;
}
</style>

::: details 查看代码

```html
<div class="wrapper3">
  <div class="box"></div>
  <div class="box">With Content</div>
</div>

<style>
  .box {
    display: inline-block;
    background: #999;
    border: 1px solid #585858;
    height: 200px;
    width: 200px;
    margin-right: 15px;
  }

  .box:empty {
    background: #fff;
  }
</style>
```

:::

## 自定义滚动条

<div class="wrapper3">
    <div>
      <div class="tile mr-1">
        <div class="tile-content">
          default scrollbar
        </div>
      </div>
      <div class="tile tile--custom-scrollbar">
        <div class="tile-content">
          custom scrollbar
        </div>
      </div>
    </div>
</div>

<style>


.mr-1 {
  margin-right: 1em;
}

.tile {
  overflow: auto;
  display: inline-block;
  background-color: #ccc;
  height: 200px;
  width: 180px;
}

.tile--custom-scrollbar::-webkit-scrollbar {
  width: 12px;
  background-color: #eff1f5;
}

.tile--custom-scrollbar::-webkit-scrollbar-track{
  border-radius: 3px;
  background-color: transparent;
}

.tile--custom-scrollbar::-webkit-scrollbar-thumb{
  border-radius:5px;
  background-color:#515769;
  border:2px solid #eff1f5
}

.tile-content {
  padding: 20px;
  height: 500px;
}
</style>

::: details 查看代码

```html
<div class="wrapper3">
  <div>
    <div class="tile mr-1">
      <div class="tile-content">
        default scrollbar
      </div>
    </div>
    <div class="tile tile--custom-scrollbar">
      <div class="tile-content">
        custom scrollbar
      </div>
    </div>
  </div>
</div>

<style>
  .mr-1 {
    margin-right: 1em;
  }

  .tile {
    overflow: auto;
    display: inline-block;
    background-color: #ccc;
    height: 200px;
    width: 180px;
  }

  .tile--custom-scrollbar::-webkit-scrollbar {
    width: 12px;
    background-color: #eff1f5;
  }

  .tile--custom-scrollbar::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: transparent;
  }

  .tile--custom-scrollbar::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #515769;
    border: 2px solid #eff1f5;
  }

  .tile-content {
    padding: 20px;
    height: 500px;
  }
</style>
```

:::

## 滚动黏贴

```html
<section class="section">
  <div class="section__header">
    <h2>
      Section #1 Header
    </h2>
  </div>

  <div class="section__content">
    <div>
      <h3>
        Section #1
      </h3>
      <p>
        The element is positioned according to the normal flow of the document,
        and then offset relative to its nearest scrolling ancestor and
        containing block (nearest block-level ancestor), including table-related
        elements, based on the values of top, right, bottom, and left. The
        offset does not affect the position of any other elements.
      </p>
      <p>
        This value always creates a new stacking context. Note that a sticky
        element "sticks" to its nearest ancestor that has a "scrolling
        mechanism" (created when overflow is hidden, scroll, auto, or overlay),
        even if that ancestor isn't the nearest actually scrolling ancestor.
        This effectively inhibits any "sticky" behavior (see the Github issue on
        W3C CSSWG).
      </p>
    </div>
  </div>
</section>

<section class="section">
  <div class="section__header">
    <h2>
      Section #2 Header
    </h2>
  </div>

  <div class="section__content">
    <div>
      <h3>
        Section #2
      </h3>
      <p>
        The element is positioned according to the normal flow of the document,
        and then offset relative to its nearest scrolling ancestor and
        containing block (nearest block-level ancestor), including table-related
        elements, based on the values of top, right, bottom, and left. The
        offset does not affect the position of any other elements.
      </p>
      <p>
        This value always creates a new stacking context. Note that a sticky
        element "sticks" to its nearest ancestor that has a "scrolling
        mechanism" (created when overflow is hidden, scroll, auto, or overlay),
        even if that ancestor isn't the nearest actually scrolling ancestor.
        This effectively inhibits any "sticky" behavior (see the Github issue on
        W3C CSSWG).
      </p>
    </div>
  </div>
</section>
<section class="section">
  <div class="section__header">
    <h2>
      Section #3 Header
    </h2>
  </div>

  <div class="section__content">
    <div>
      <h3>
        Section #3
      </h3>
      <p>
        The element is positioned according to the normal flow of the document,
        and then offset relative to its nearest scrolling ancestor and
        containing block (nearest block-level ancestor), including table-related
        elements, based on the values of top, right, bottom, and left. The
        offset does not affect the position of any other elements.
      </p>
      <p>
        This value always creates a new stacking context. Note that a sticky
        element "sticks" to its nearest ancestor that has a "scrolling
        mechanism" (created when overflow is hidden, scroll, auto, or overlay),
        even if that ancestor isn't the nearest actually scrolling ancestor.
        This effectively inhibits any "sticky" behavior (see the Github issue on
        W3C CSSWG).
      </p>
    </div>
  </div>
</section>

<section class="section">
  <div class="section__header">
    <h2>
      Section #4 Header
    </h2>
  </div>
  <div class="section__content">
    <div>
      <h3>
        Section #4
      </h3>
      <p>
        The element is positioned according to the normal flow of the document,
        and then offset relative to its nearest scrolling ancestor and
        containing block (nearest block-level ancestor), including table-related
        elements, based on the values of top, right, bottom, and left. The
        offset does not affect the position of any other elements.
      </p>
      <p>
        This value always creates a new stacking context. Note that a sticky
        element "sticks" to its nearest ancestor that has a "scrolling
        mechanism" (created when overflow is hidden, scroll, auto, or overlay),
        even if that ancestor isn't the nearest actually scrolling ancestor.
        This effectively inhibits any "sticky" behavior (see the Github issue on
        W3C CSSWG).
      </p>
    </div>
  </div>
</section>
```

```less
.section {
  font-size: 1.4em;
  letter-spacing: 0.05em;
  line-height: 1.5em;
  h2,
  h3 {
    text-align: center;
    margin: 0;
    font-weight: normal;
  }
  &__header {
    position: sticky;
    top: 0;
    padding: 1em;
    color: #a99160;
    background: #171717;
  }
  &__content {
    padding: 1em;
    display: flex;
    justify-content: center;

    & > div {
      max-width: 992px;
    }
  }
}
```

## 滚动捕捉

<div style="height: 40vh; overflow: hidden">
    <div class="wrapper4">
        <div class="section">
            Content 1
        </div>
        <div class="section bg-blue">
            Content 2
        </div>
        <div class="section bg-green">
            Content 3
        </div>
        <div class="section">
            Content 4
        </div>
        <div class="section bg-blue">
            Content 5
        </div>
    </div>
</div>

<style>
.wrapper4 {
  height: 40vh;
  overflow: auto;
  scroll-snap-type: y mandatory;
}
.section {
  scroll-snap-align: center;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #de5448;
  color: #fff;
  font-size: 3em;
}

.bg-blue {
  background: #4267b2;
}

.bg-green {
  background: #4CAF50;
}
</style>

::: details 查看代码

```html
<div style="height: 40vh; overflow: hidden">
  <div class="wrapper4">
    <div class="section">
      Content 1
    </div>
    <div class="section bg-blue">
      Content 2
    </div>
    <div class="section bg-green">
      Content 3
    </div>
    <div class="section">
      Content 4
    </div>
    <div class="section bg-blue">
      Content 5
    </div>
  </div>
</div>

<style>
  .wrapper4 {
    height: 40vh;
    overflow: auto;
    scroll-snap-type: y mandatory;
  }
  .section {
    scroll-snap-align: center;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #de5448;
    color: #fff;
    font-size: 3em;
  }

  .bg-blue {
    background: #4267b2;
  }

  .bg-green {
    background: #4caf50;
  }
</style>
```

:::

## tooltip

<h1>
  HTML/CSS tooltip
</h1>
<p>
  Hover <span class="tooltip" data-tooltip="Tooltip Content">Here</span> to see the tooltip.
</p>
<p>
  You can also hover <span class="tooltip" data-tooltip="This is another Tooltip Content">here</span> to see another example.
</p>

<style>
.tooltip {
  position: relative;
  border-bottom: 1px dotted black;
}

/* Tooltip box */
.tooltip:before {
  content: attr(data-tooltip); 
  position: absolute;
  width: 100px;
  background-color: #062B45;
  color: #fff;
  text-align: center;
  padding: 10px;
  line-height: 1.2;
  border-radius: 6px;
  z-index: 1;
  opacity: 0;
  transition: opacity .6s;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  font-size: 0.75em;
  visibility: hidden;
}

/* Tooltip arrow */
.tooltip:after {
  content: "";
  position: absolute;
  bottom: 75%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  opacity: 0;
  transition: opacity .6s;
  border-color: #062B45 transparent transparent transparent;
  visibility: hidden;
}

.tooltip:hover:before, .tooltip:hover:after {
  opacity: 1;
  visibility: visible;
}
</style>

::: details 查看代码

```html
<h1>
  HTML/CSS tooltip
</h1>
<p>
  Hover <span class="tooltip" data-tooltip="Tooltip Content">Here</span> to see
  the tooltip.
</p>
<p>
  You can also hover
  <span class="tooltip" data-tooltip="This is another Tooltip Content"
    >here</span
  >
  to see another example.
</p>

<style>
  .tooltip {
    position: relative;
    border-bottom: 1px dotted black;
  }

  /* Tooltip box */
  .tooltip:before {
    content: attr(data-tooltip);
    position: absolute;
    width: 100px;
    background-color: #062b45;
    color: #fff;
    text-align: center;
    padding: 10px;
    line-height: 1.2;
    border-radius: 6px;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.6s;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    font-size: 0.75em;
    visibility: hidden;
  }

  /* Tooltip arrow */
  .tooltip:after {
    content: "";
    position: absolute;
    bottom: 75%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    opacity: 0;
    transition: opacity 0.6s;
    border-color: #062b45 transparent transparent transparent;
    visibility: hidden;
  }

  .tooltip:hover:before,
  .tooltip:hover:after {
    opacity: 1;
    visibility: visible;
  }
</style>
```

:::

## 改变 input 输入框指针的颜色

```html
<style>
  input {
    caret-color: red;
  }
</style>
```

## 伪元素:in-range、:out-of-range

用于`type=number`的输入框

<input type='number' min='1' max='5' value='3'>
<input type='number' min='1' max='5' value='8'>

<style>

input[type='number']{
    width: 80px;
    height: 22px;
}
input:in-range{
    background: rgba(0,255,0,.25)
}
input:out-of-range{
    background: rgba(255,0,0,.25)
}
</style>

::: details 查看代码

```html
<input type="number" min="1" max="5" value="3" />
<input type="number" min="1" max="5" value="8" />

<style>
  input[type="number"] {
    width: 80px;
    height: 22px;
  }
  input:in-range {
    background: rgba(0, 255, 0, 0.25);
  }
  input:out-of-range {
    background: rgba(255, 0, 0, 0.25);
  }
</style>
```

:::

## 文字效果

<h1 class='tx'>CSS IS AWESOME</h1>

<style>
.tx {
  background: blue url('https://picsum.photos/id/1015/200/300');
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-top: 20px;
  font-size: 120px !important;
}
</style>

::: details 查看代码

```html
<h1 class="tx">CSS IS AWESOME</h1>

<style>
  .tx {
    background: blue url("https://picsum.photos/id/1015/200/300");
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    margin-top: 20px;
    font-size: 120px !important;
  }
</style>
```

:::
