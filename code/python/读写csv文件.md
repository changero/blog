---
title: 读写csv文件
date: "2021-08-28 23:04:31"
categories:
  - python
lang: zh-cn
---

导入`csv`模块

## 读取

首先获取文件句柄，朴素`open`或者`with open`

```python
import csv

with open(path, 'r', encoding= 'utf-8') as f:
  reader = csv.reader(f)
  for row in reader:
    print(row) # a list like ['1', '2']
```

## 写入

```python
def write_csv(path):
    with open(path, 'w', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['1', '2'])
        writer.writerow(['3', '4'])
```

## 问题

- 写入乱码的问题

当通过 python 写入文本到 csv 文件中的时候，用文本格式打开文件，其中的文字显示正常，但通过 excel 打开的时候出现中文乱码

**解决方法**：是在打开文件的时候将`encoding`设置为`utf-8-sig`，具体原理可以参见[UTF-8 和 UTF-8-SIG 的区别](https://www.cnblogs.com/brady-wang/p/12492457.html)
