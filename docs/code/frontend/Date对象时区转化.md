---
title: Date对象时区转化
date: 2019-07-10
categories:
  - 前端
tags:
  - js
---

```js
var date = new Date()
```

Date对象创建的都是当前时区的时间对象、但是同一时间不同时区创建的时间对象的时间戳是一样的

1、获取当前时区
```javascript
    // 单位：小时
    const offset = date.getTimeoutOffset()/60
```
> offset的值表示格林威治时间与当前时区的时间差值，因此东区是负数，因为东区的时间再格林威治时间之前，比如东八区的offset值是-8

<!-- more -->

2、转化当前时间到为指定时区的时间
```js
    // 先将时间转化到格林威治，在+8转化到东八区
    date.setHours(date.getHours() + offset + 8)
```

3、转化指定时间到当前时区时间
比如将东八区时间转化到当前时区

```js
    const date8 = new Date('2019-03-19 14:22:22')
    date8.setHours(date8.getHours() - 8 - offset )
    
    // 转化的等式,利用时区差相等
    (-8) - offset = hour8 - getHours()
    
    //或者
    date = new Date('2019-03-19 14:22:22 +0800')
```

方法 | 结果
---  | ---
new Date | Mon Feb 13 2017 00:00:00 GMT+0800 (CST)
toDateString | Mon Feb 13 2017
toGMTString | Sun, 12 Feb 2017 16:00:00 GMT
toISOString | 2017-02-12T16:00:00.000Z
toJSON | 2017-02-12T16:00:00.000Z
toLocaleDateString | 2/13/2017
toLocaleTimeString | 12:00:00 AM
toLocaleString | 2/13/2017, 12:00:00 AM
toString | Mon Feb 13 2017 00:00:00 GMT+0800 (CST)
toTimeString | 00:00:00 GMT+0800 (CST)
toUTCString | Sun, 12 Feb 2017 16:00:00 GMT

[MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)


对于使用moment而言，moment方法创建的也是当前时区的时间
```js
    moment('2019-03-14 14:22:22')
    // 将当前时间转到东八区的时间可以用utcOffset、utc方法
    moment('2019-03-14 14:22:22').utcOffset(480)
    moment('2019-03-14 14:22:22').utcOffset(8) // 8hours
    // 或者
    moment('2019-03-14 14:22:22').utcOffset('+08:00') // '+0800'
    // 将当前时区的事件转到UTC上可以使用UTC方法
    moment.utc() // moment().utc()
    
    // 将东八区时间转到当前时区
    moment('2019-03-14 14:22:22').subtract(8 - moment().utcOffset()/60, 'hour')
    // 或者直接将时区添加到对应的字符串中
    moment('2019-03-14 14:22:22+0800')
```