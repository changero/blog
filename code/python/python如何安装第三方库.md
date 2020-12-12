---
title: python如何安装第三方库
date: 2020-12-12
categories:
  - python
---

## python 如何安装第三方库

### pip

pip 是大部分情况下选择安装第三方库的方式，其使用方式如下：

```bash
# 安装
pip install [packageName]
# 或者
pip install [name].zip
# 仅下载，不安装，一般用于给没有联网的设备来安装
pip download [packageName]
# 升级
pip install -U [packageName]
# 卸载
pip uninstall [packageName]
# 搜索，会找到所有名字里面，或者简介里面包含关键字的第三方包
pip search [keyword]
# 显示包的信息
pip show [packageName]
# 显示已安装的第三方包列表
pip list
```

### Anaconda

是一个集成安装三方包的环境，对于某一个领域的应用特别有用。比如一个环境下需要安装好几百个第三方包。

### UCI

安装 windows 上无法编译的包

### 自动化安装

```python
import os;
list = { "werobot", 'numpy',.... };

try:
  for pag in list:
    os.system("pip install "+ pag);
  print('install successly');
except:
  print('install error');
```
