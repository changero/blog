---
title: python中的时间模块
date: "2021-09-02 21:56:48"
categories:
  - python
lang: zh-cn
---

## time 模块

在使用之前需要先引用该模块:`import time`

- 获取时间戳 - `time.time()`：包含小数部分

- 将时间戳转为时间元组 - `time.localtime(timestamp)`：

  > time.struct_time(tm_year=2021, tm_mon=9, tm_mday=2, tm_hour=22, tm_min=8, tm_sec=39, tm_wday=3, tm_yday=245, tm_isdst=0)

- 将时间元组转为时间戳 - `time.mktime(struct_time)`

  > 1630591830.0

<!-- more -->

- 将时间字符串转为时间元组 - `time.strptime('2021-09-02', '%Y-%m-%d')`

  > 结果同 localtime

- 格式化时间 - `time.strftime('%Y-%m', 时间元组)`
  > '2021-09'

## datetime 模块

在使用之前需要先引用该模块:`import datetime`

- 获取当前时间的 datetime 对象 - `datetime.datetime.now()`

  > 返回 datetime 格式的时间元组，datetime.datetime(2021, 9, 2, 22, 18, 50, 609507)

- 指定时间创建 datetime 对象 - `datetime.datetime(year=2021,month=9,day=2)`

  > datetime.datetime(2021, 9, 2, 0, 0)

- 获取日期 - `[datetime对象].date()`

  > datetime.date(2030, 3, 4)

- 获取时间 - `[datetime对象].time()`

  > datetime.time(0, 0)

- 获取时间戳 - `[datetime对象].timestamp()`

  > 1898784000.0

- 格式化 - `[datetime对象].strftime('%Y-%m-%d')`

  > '2021-09-02'

- 格式化 - `datetime.datetime.strftime([datetime对象], '%Y-%m-%d')`

  > 同上

- 用时间戳创建对象 - `datetime.datetime.fromtimestamp()`

  > 返回 datetime 时间对象

- 创建一个时间差 - `datetime.timedelta(day=7)`
  > 创建一个 7 天的时间差
  > d+datetime.timedelta(day=7) 得到一个 7 天以后的时间
  > d-datetime.timedelta(day=7) 得到一个 7 天以前的时间

## 日历模块

在使用之前需要先引用该模块:`import calendar`

- 显示 1 年的日历 - `calendar.calendar(2021)`

- 显示 1 个月的日历 - `calendar.month(2020, 8)`

- 判断是否是闰年 - `calendar.isleap(2021)`

- 根据年份段获取闰年的数量 - `calendar.leapdays(1900, 2020)`

- 月份的列表化显示 - `calendar.monthcalendar(2021, 8)`

  > [[0, 0, 0, 0, 0, 0, 1], [2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15], [16, 17, 18, 19, 20, 21, 22], [23, 24, 25, 26, 27, 28, 29], [30, 31, 0, 0, 0, 0, 0]]

- 第一天的日期码和该月的总天数 - `calendar.monthrange(2021, 8)`
  >
