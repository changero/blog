---
title: python模块
date: "2021-08-15 19:21:41"
categories:
  - python
lang: zh-cn
---

## python 模块

一个 python 文件就是一个模块，模块中的变量和方法不需要显式导出

### 导入

```python
def log():
    print("log.log方法")
```

```python
# 方式一
import log
log.log()
# 方式二，部分导入
from log import log
log()
# 方式三，别名导入
from log import log as l
l()
# 方式四，从包中导入模块
import utils.log
utils.log.log()
# 或者
from utils import log
log.log()
```

<!-- more -->

### 包

包是一系列模块的集合，在包中创建`__init__.py`文件，表示当前目录是一个包，可以做一些初始化包的操作，也可以是一个空文件

#### 发布包

创建`setup.py`文件，用以描述这个包

```python
from distutils.core import setup

setup(
	name='my_package',
    version='1.0.0',
    author='作者',
    author_email='',
    url='包的主页',
    download_url='下载链接',
    description='描述',
    py_modules=['1.py', '2.py'], # 描述哪些包能被打包进最终的包
)
```

### 构建

只会将`py_modules`中声明过的模块打包到`build`目录下

```bash
$ python setup.py build
```

打包成压缩包

```bash
$ python setup.py sdist
```

### 安装

通过 pip 安装

```bash
$ pip install requests
```

离线安装

去[https://pypi.org](https://pypi.org)下载对应包的`whl`文件，然后通过 pip 进行安装

```bash
$ pip install requests_xxx.whl
```

源码安装

下载到 tar.gz 文件，并解压

```bash
$ python setup.py install
```

### 项目依赖

[python—项目依赖管理\_pentiumCM 的博客-CSDN 博客](https://blog.csdn.net/pentiumCM/article/details/104288735)

[Python 依赖管理\_monday 的博客-CSDN 博客\_python 依赖管理](https://blog.csdn.net/vbirdbest/article/details/104055486)

### FAQ

- 如何查看模块的路径:
  > print(random.\_\_file\_\_)
- 如何查看模块的查找路径
  > print(sys.path)
