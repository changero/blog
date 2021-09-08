---
title: 微信小程序传递FormData格式的数据
date: "2021-09-07 23:06:18"
categories:
  - 前端
tags:
  - 小程序
lang: zh-cn
---

## 微信小程序传递 FormData 格式的数据

小程序本身没有提供`FormData`结构，所以只能在发送数据的时候手动构造，分为一下几个步骤

- 修改请求头
- 构造多参数结构

### 修改请求头

传递 formdata 格式的数据需要在请求头上修改`Content-Type`

```json
{
  "header": {
    "Content-Type": "multipart/form-data; boundary=XXX"
  }
}
```

**其中 boundary 的参数 XXX 是任意指定的，但是在构造数据的时候需要用到，所以最好抽离出来单独赋值给一个常量**

<!-- more -->

### 构造参数结构

formdata 格式的数据在原始 http 的请求提当中的格式是这样的

```
--XXX
Content-Disposition: form-data; name="字段名"

字段值
--XXX
// 如果由多个字段值就继续在下面添加
```

**注意在字段值上面还有一个空行**，在原始字符串中，所有的换行用\r\n 表示，所以如果我们用一个 json 格式来转换就可以用如下的方式

```json
const data = {
    key1: 'value1',
    key2: 'value2'
}
formDataRaw = []
for(const [key, value] of Object.entries(dataObj)) {
    formDataRaw.push("--XXX")
    formDataRaw.push(`Content-Disposition: form-data; name="${key}"`)
    formDataRaw.push("")
    formDataRaw.push(value)
  }
  formDataRaw.push("--XXX")

str = formDataRaw.join('\r\n')

```

在请求的时候就可以直接将 str 扔到 data 上

```js
wx.request({
  url: url,
  data: str,
  method: "POST",
  header: {
    "Content-Type": "multipart/form-data; boundary=XXX",
  },
  success() {},
  fail() {},
});
```

这样就完成了在小程序提交 formdata 格式的数据
