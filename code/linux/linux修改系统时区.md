---
title: linux修改系统时区
date: '2022-04-23 19:42:07'
categories:
  - linux
lang: zh-cn
---

## ubuntu

### 方法一

通过`tzselect`命令，根据提示，选择`Asia` > `China` > `BeiJing`。会得到提示

```bash
  TZ='Asia/Shanghai'; export TZ
```

我们只需要把上述命令添加到环境变量文件，如`~/.bashrc` 或者`~/.profile`等文件中，然后重新`source`一下就可以了

<!-- more -->
