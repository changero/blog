---
title: python操作excel
date: "2021-08-26 23:03:33"
categories:
  - python
lang: zh-cn
---

## 操作 excel

- openpyxl
  - pip3 install openpyxl
- xlrd
- xlwt
- xlutil

<!-- more -->

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
