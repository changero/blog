---
title: python文件操作手册
date: "2021-08-15 20:47:27"
categories:
  - python
lang: zh-cn
---

## python 文件操作手册

### 创建和解压压缩包

#### 读取压缩包

```python
import zipfile
with zipfile.ZipFile('压缩包', 'r') as zipobj:
  print(zipobj.namelist())
  # 如果出现中文乱码
  for file in zipobj.namelist():
    print(file.encode('cp437').decode('gbk'))
    info = zipobj.getinfo(file)
```

<!-- more -->

#### 解压

```python
import zipfile
with zipfile.ZipFile('压缩包', 'r') as zipobj:
  zipobj.extract('filename', '解压的位置')
  # 解压所有文件
  zipobj.extractall(path="解压路径", pwd='解压密码')
```

#### 创建压缩包

```python
import zipfile
file_list = ["1.txt", "2.txt"]

with zipfile.ZipFile("压缩包.zip", 'w') as zipobj:
  for file in file_list:
    zipobj.write(file)
# 往压缩包添加文件
with zipfile.ZipFile("压缩包.zip", 'a') as zipobj:
  for file in file_list:
    zipobj.write(file)
```

### 文件和文件夹

```python
import os
import time
import datetime

# 获取当前工作路径
print(os.getcwd())

# 路径拼接
os.path.join('path1', 'file1')
# path1/file1

# 列出所有文件
os.listdir("查看的目录")
os.path.isdir(filename)

filelist = os.scandir("查看的目录")
for file in filelist:
  print(file.isdir())
  stat = file.stat();
  mtime = stat.st_mtime
  print(time.ctime(mtime))
  print(datetime.datetime.fromtimestamp(mtime))

# 直接查询文件的stat信息
os.stat("文件")
```

### 查询文件源数据

```python
import os
import glob
import fnmatch

# 层级遍历文件
for dirpath, dirnames, filenames in os.walk("遍历的目录")
	print()

# 文件匹配
# 搜索所有python文件
print(glob.glob("*.py", recursive = True))

# 判断字符串是否符合某个匹配
fnmatch.fnmatch("lesson.py", "le*.py")
fnmatch.fnmatch("lesson1.py", "le*[0-9].py")
```

### 临时文件

```python
# 读取文件
f=open('file.txt', 'r')
text = f.readlines()
print(text)
f.close()
# 读取文件
# 自动关闭
with open('file.txt', 'r') as f:
  print(f.readlines())
# 写入文件
with open('file.txt', 'w') as f:
  f.write('添加第一行内容')
with open('file.txt', 'a') as f:
  f.write('添加一行内容')
```

```python
from tempfile import TemporaryFile, TemporaryDirectory

f = TemporaryFile("w+")
f.write("123")
f.seek(0)
print(f.readlines())
f.close()

with TemporaryFile('w+') as f:
  f.write('222')
  f.seek(0)
  print(f.readlines())
# 程序结束会自动删除
with TemporaryDirectory() as tp:
  pass

```

### **批量创建、复制、移动、删除、重命名文件及文件夹**

shutil

```python
import shutil
import os
# 当文件夹存在的时候会报错
os.makedir("创建的新文件夹")
if not os.path.exist("dirname"):
  os.makedir('dirname')

# 层级创建
os.makedirs("1/2/3/4/")
# 重命名
os.rename('file', 'newfile')
# 删除文件
os.remove('filename')

# 复制文件
shutil.copy('file1', 'file2')
# 复制文件夹
shutil.copytree('dir1', 'dir2')
# 移动文件或文件夹
shutil.move('dir1', 'dir2')
# 删除文件夹
shutil.rmtree("删除的文件夹")

```

### 操作 excel

- openpyxl
  - pip3 install openpyxl
- xlrd
- xlwt
- xlutil

```python
from openpyxl import load_workbook

workbook = load_workbook(filename="1.xlsx")
print(workbook.sheetnames)
sheet = workbook['sheetname']
# 或者
sheet = workbook.active
print(sheet.dimensions)
print(sheet['A1'])
# 所有A列
print(sheet['A'])
# A列到C列
print(sheet['A:C'])
print(sheet.cell(row = 1, column = 1))
cell = sheet['A1']
cell.value = "写入的值"
# 插入一行数据
sheet.addend(['a', 1])
# 插入公式
sheet["F1"] = "AVERAGE(F2:F1001)"
# 插入一列
# 在idx的左边插入
sheet.insert_cols(idx=5, amount = 插入的数量)
sheet.insert_rows(idx=5, amount = 插入的数量)
# 删除行列
sheet.insert_cols(idx=5, amount = 删除的数量)
sheet.insert_rows(idx=5, amount = 删除的数量)
# 移动
# 表示把C1到D4区域的表格往下移动2行，往左移动2列
sheet.move_range("C1:D4", row=2, col=-2)
# 固定
sheet.freeze_panes = 'G2'
workbook.save(filename="1.xlsx")
for row in sheet.itr_rows(min_row = 1, max_row = 3, min_col = 1, max_col = 3):
  print(row)
  for cell in row:
    pass

for col in sheet.itr_cols(min_row = 1, max_row = 3, min_col = 1, max_col = 3):
  print(col)
  for cell in col:
    pass
```

- 删除 sheet:workbook.remove()
- 复制一个 sheet：workbook.copy_worksheet()

```python
from openpyxl import Workbook
# 新创建的workbook
wb = Workbook()

wb.save("2.xlsx")
```

### 爬虫相关

- requests
- bs4 BeautifulSoup
- scrapy
- Selenium 无头浏览器
- pyOpenssl
- twisted
- pyquery

```python
from selenium import webdriver

browser = webdriver.Chrome("chromedriver的路径地址")
# puppeteer phantomjs
browser.get('url')
ele = browser.find_element_by_id('id')
ele.send_keys("输入框文字")
ele.click()
```

### 数据分析相关
