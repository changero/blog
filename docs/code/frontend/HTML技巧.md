---
title: HTML技巧
date: "2021-06-21 22:12:29"
categories:
  - 前端
lang: zh-cn
---

## HTML 技巧

### 图片懒加载

优化性能，你可以延迟图片的加载时机，直到图片显示到屏幕上

```html
<img src="image.jpg" loading="lazy" />
```

<!-- more -->

### 电子邮件、电话和短信

在 APP 上，我们能通过 Intent 或者 url schema 来打开系统功能。在网页中可以这样做

```html
/**顶部导航栏上采用的就是这个做法*/ /** 发送邮件 */
<a href="mailto:123@qq.com?subject=打个招呼&body=你好">联系我</a>
/ ** 打电话
<a href="tel:1660000000">联系我</a>
/**发送短信*/
<a href="sms:1660000000?body=你好">发送短信</a>
```

### meter 元素

<div class="container1">
  <label for="value1">Low</label>
  <meter
    id="value1"
    min="0"
    max="100"
    low="30"
    high="75"
    optimum="80"
    value="25"
  ></meter>

<label for="value2">Medium</label>
<meter
  id="value2"
  min="0"
  max="100"
  low="30"
  high="75"
  optimum="80"
  value="50"> </meter>

<label for="value3">High</label>
<meter
id="value3"
min="0"
max="100"
low="30"
high="75"
optimum="80"
value="80"> </meter>

</div>

<style>
  .container1 {
    padding: 40px 20px;
  }

  .container1 label {
    display: block;
    margin-top: 15px;
  }

  .container1 meter {
    width: 300px;
    height: 20px;
  }
</style>

::: details 查看代码

```html
<div class="container">
  <label for="value1">Low</label>
  <meter
    id="value1"
    min="0"
    max="100"
    low="30"
    high="75"
    optimum="80"
    value="25"
  ></meter>

  <label for="value2">Medium</label>
  <meter
    id="value2"
    min="0"
    max="100"
    low="30"
    high="75"
    optimum="80"
    value="50"
  ></meter>

  <label for="value3">High</label>
  <meter
    id="value3"
    min="0"
    max="100"
    low="30"
    high="75"
    optimum="80"
    value="80"
  ></meter>
</div>

<style>
  .container {
    padding: 40px 20px;
  }

  label {
    display: block;
    margin-top: 15px;
  }

  meter {
    width: 300px;
    height: 20px;
  }
</style>
```

:::

### 本地搜索

<div class="wrapper">
  <h1>
    Native HTML Search
  </h1>

  <input list="items" />

  <datalist id="items">
    <option value="Marko Denic"> </option>
    <option value="FreeCodeCamp"> </option>
    <option value="FreeCodeTools"> </option>
    <option value="Web Development"> </option>
    <option value="Web Developer"> </option>
  </datalist>
</div>

<style>
  .wrapper {
    padding-top: 30px;
    text-align: center;
    h1 {
      font-weight: normal;
    }
    input {
      padding: 10px;
      font-size: 1.2em;
    }
  }
</style>

::: details 查看代码

```html
<div class="wrapper">
  <h1>
    Native HTML Search
  </h1>

  <input list="items" />

  <datalist id="items">
    <option value="大象"> </option>
    <option value="脑虎"> </option>
    <option value="大😹"> </option>
  </datalist>
</div>

<style>
  .wrapper {
    padding-top: 30px;
    text-align: center;
    h1 {
      font-weight: normal;
    }
    input {
      padding: 10px;
      font-size: 1.2em;
    }
  }
</style>
```

:::

### base 元素

可以使文档中所有链接都打开新的标签

```html
<head>
  <base target="_blank" />
</head>
```

### 手风琴效果

<div class="wrapper1">
  <details>
    <summary>
      Click me to see more details
    </summary>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eum
      perferendis eius. Adipisci velit et similique earum quas illo odio rerum
      optio, quis, expedita assumenda enim dicta aliquam porro maxime minima sed
      a ullam, aspernatur corporis.
    </p>

  </details>
</div>
<style>
  .wrapper1{
    padding: 30px;
    display: flex;
    justify-content: center;
  }
  .wrapper1 details {
    width: 100%;
    max-width: 500px;
  }
  .wrapper1 summary {
    background: #f2f2f2;
    cursor: pointer;
    padding: 15px;
  }
  .wrapper1 p {
    padding: 15px;
    margin: 0;
    background: #f2f2f2;
  }
</style>

::: details 查看代码

```html
<div class="wrapper">
  <details>
    <summary>
      Click me to see more details
    </summary>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eum
      perferendis eius. Adipisci velit et similique earum quas illo odio rerum
      optio, quis, expedita assumenda enim dicta aliquam porro maxime minima sed
      a ullam, aspernatur corporis.
    </p>
  </details>
</div>
<style>
  .wrapper {
    padding: 30px;
    display: flex;
    justify-content: center;
  }

  details {
    width: 100%;
    max-width: 500px;
  }

  summary {
    background: #f2f2f2;
    cursor: pointer;
    padding: 15px;
  }

  p {
    padding: 15px;
    margin: 0;
    background: #f2f2f2;
  }
</style>
```

:::
