---
title: pandas
date: '2023-03-16 22:13:06'
categories:
  - python
lang: zh-cn
---

## 数据读取

pandas需要读取表格类型的数据

> 需要安装openpyxl

| 数据类型      | 说明                            | pandas读取方法         |
| ------------- | ------------------------------- | ---------------------- |
| csv、tsv、txt | 用逗号分割，tab分割的纯文本文件 | pd.read_csv、df.to_csv |
| excel         | 微软的xls或者xlsx文件           | pd.read_excel          |
| mysql         | 关系型数据库表                  | pd.read_sql            |

### 属性

```python
import pands as pd

rating = pd.read_csv('file.csv')

# 查看数据的形状
rating.shape

# 查看列名
rating.columns

# 查看索引列
rating.index

# 查看每一列的数据类型
rating.dtypes

```

### read_csv参数

1. filepath: csv文件的路径
2. sep: 指定csv文件中数据的分隔符，默认是逗号
3. skiprows：跳过前面的几行
4. nrows：读取前面的几行
5. header： 数据中的头部，可以设置为None
6. names：自定义列名（"pdate",'pv', 'uv'）
7. index_col：可以指定作为索引的列，或者索引的序号（0开始）
8. usecols：读取哪些列的数据，不指定的情况下，读取所有列
9. parse_dates：可以通过数组指定要转换为时间对象的列，或者设置为True转换所有时间格式的字符串。如果有警告，可以添加一个`dayfirst` 参数为True
10. error_bad_lines：设置为False跳过错误行的数据
11. na_values：将数据中的出现该值的地方认为是空值

### 属性和方法

- shape
- columns
- index
- dtypes
- head()
- tail()
- sample(n = 3)，取随机三行
- sample(frac=0.5) ，取随机50%的数据
- describe()，描述数据，比如平均，总数

## DataFrame & Series

- DataFrame：代表整个表格对象这个二维数据
- Series：代表一行或者一列，是个一维数据

### Series

> Series是一种类似于一维数组的对象，它由一组数据（不同数据类型）以及一组与之相关的数据标签（即索引）组成

```python
import pandas as pd
import numpy as np

s1 = pd.Series([1, 'a', 5.2])
print(s1)
'''
0      1
1      a
2    5.2
'''

# 自定义索引
s2 = pd.Series([1, 'a', 5.2], index=['a', 'b', 'c'])
print(s2)
'''
a      1
b      a
c    5.2
'''

```

#### 使用字典来创建Series

```python
data={'name': "小名", "age":18, 'address': "中国"}
s3 = pd.Series(data)
print(s3)
'''
name       小名
age        18
address    中国
'''

print(s3['name'])
'''
小名
'''
print(s3[['name', 'age']])
'''
name    小名
age     18
'''
```

当对象中的index是以数字来表示的，比如在没有指定index的情况下

```python
sr=pd.Series(np.arange(20))
sr=sr[5:15].copy()
'''
5 5
6 6
...
14 14
'''
```

这样的Series就是以数字作为index的。

在从这样的数据中通过数字取值的时候，传递的数字是解释为index的

```python
sr[0] # 没有该值
sr[5] # 5
```

为了防止这样的歧义出现，pandas推荐使用两个方法来取值

- loc，传递的值作为index来解释
- iloc，传递的值作为位置序号来解释

```python
sr.loc[5]
sr.iloc[0]
```

### 空值处理

```python
s1 = pd.Series([10, 20 ,30], index=['a', 'b', 'c'])
s2 = pd.Series([11, 14 ,29], index=['a', 'b', 'd'])
sr = s1+s2
'''
a 21
b 34
c NaN
d NaN
'''
```

由于在做加法的时候，c和d在数据项中存在空值，因此结果直接返回NaN。解决办法就是使用add函数，并且做填充处理

```python
s1.add(s2) # 与上面的结果一样
s1.add(s2, fill_value=0)
'''
a 21
b 34
c 30
d 29
'''
```

空值的判断

- sr.isnull()，判断是否为空
- sr.notnull()，判断是否不为空

因此可以利用判断函数做过滤

```python
sr[sr.notnull()]
# 或者
sr.dropna()
```

如果不想去除掉空值，也可以做填充处理

```python
sr.fillna(0) #用0填充空值
sr.fillna(sr.mean()) #用平均值填充空值
```

### rolling

rolling用于在数据中滚动选值，也就是一个滑动窗口

```python
sr.rolling(5) # 指定一个5个数据大小的窗口
```

指定`min_periods`参数补全空值

### shift

移位操作

用法：`df['新的一列'] = df['旧的一列'].shift(1)` 

解释：将旧的一列的数据向下移动一位，作为新的一列的数据。例如把昨天的收盘价，向下移动一位，之后作为新的列。这样在同一行中，就同时存在了昨天的收盘价和今天的收盘价，方便运算

### diff

计算本行数据与其他行数据的差值

用法：`df['涨跌幅']=df['收盘价'].diff(-1)`

用收盘价减去下一行数据的收盘价，作为本行的涨跌幅。如果要与上面行的数据比较，diff就要接收正数

### pct_change

与diff类似，不过求的结果是比值

### cum的一类函数

- cumsum：累加，比如成交量，`df['累计成交量'] = df['成交量'].cumsum()`
- cumprod：累乘

### rank

输出排名信息

用法：`df['排名']=df['收盘价'].rank(ascending=True)` 

还可以指定pct参数，为True的情况下，将输出排名的百分比

### value_counts

统计某一列中，值出现的次数

用法：`df['股票代码'].value_counts()`

### expanding

从前到后统计某一列的所有数据，结果是一个统计数据，可以调用其他方法

例如：max()、min()、std()等等

### DataFrame

> DataFrame是一个表格类型的数据结构
>
> - 每列可以是不同的值类型
> - 既有行索引index，也有列索引columns
> - 可以被看做由Series组成的字典

```python
data = {
    'state': ['open', 'close'],
    'year': [2022, 2023],
    'name': ['a1', 'b2']
}
df = pd.DataFrame(data)
'''
   state  year name
0   open  2022   a1
1  close  2023   b2
'''

# 自定义index
df = pd.DataFrame(data, index=['xiaoming', 'xiaohong'])
'''
          state  year name
xiaoming   open  2022   a1
xiaohong  close  2023   b2
'''
```

#### 如何查询出Series

```python
df['year']
'''
xiaoming    2022
xiaohong    2023
'''

# 查询行
df.T['xiaoming']
'''
state    open
year     2022
name       a1
'''
# 或者
print(df.loc['xiaoming'])

# 如果没有指定index，可以用切片来得到多行
print(df.loc[1:2])
'''
   state  year name
1  close  2023   b2
'''

# 如果查询结果是多列或者多行，就仍然是DataFrame结构
df[['year', 'name']]
'''
          year name
xiaoming  2022   a1
xiaohong  2023   b2
'''
```

## 数据查询

1. `df.loc` 根据行、列的标签值查询
2. `df.iloc` 根据行、列的数字位置查询
3. `df.where` 
4. `df.quer`

> loc方法既能查询，又能覆盖写入

```python
cpu_list = pd.read_excel('./cpu.xlsx')

# 将cpu名称列设置为索引
cpu_list.set_index('cpu', inplace = True)

# 得到单个值，传index以及列的名字
score = cpu_list.loc['Intel Core i7-4770TE @ 2.30GHz', '得分']
# 查询2个cpu的得分
score_list = cpu_list.loc[['Intel Core i7-4770TE @ 2.30GHz', 'Intel Core i5-6500TE @ 2.30GHz'], '得分']


# 区间查询
cpu_list.loc['Intel Core i7-4770TE @ 2.30GHz':'Intel Core i7-4770TE @ 2.30GHz', '得分']
cpu_list.loc['Intel Core i7-4770TE @ 2.30GHz', '得分':'地址']



# 条件查询，先将所有行的“得分”修改为数字
cpu_list.loc[:, '得分'] = cpu_list['得分'].str.replace(',', '').astype('int32')
cpu_list.loc[df['得分'] > 4000]

# 组合查询, 找到得分在3000以上，性价比高于100，价格小于200的所有cpu，并显示他们的得分，性价比，以及价格
print(cpu_list.loc[(cpu_list['得分'] >3000) & (cpu_list['性价比']> 100) & (cpu_list['价格'] < 100), ['得分', '性价比', '价格', ]])
'''
                              得分         性价比    价格
cpu                                               
Intel Xeon W5580 @ 3.20GHz  3386  112.866667  30.0
Intel Xeon L5609 @ 1.87GHz  3298  131.920000  25.0
Intel Xeon X5667 @ 3.07GHz  4551  133.852941  34.0
Intel Xeon X5560 @ 2.80GHz  3100  206.666667  15.0
Intel Xeon X5570 @ 2.93GHz  3270  218.000000  15.0
Intel Xeon W3565 @ 3.20GHz  3346  223.066667  15.0
Intel Xeon L5640 @ 2.27GHz  4591  306.066667  15.0
Intel Xeon L5638 @ 2.00GHz  3225  248.076923  13.0
Intel Xeon X5550 @ 2.67GHz  3009  300.900000  10.0
Intel Xeon W3540 @ 2.93GHz  3031  303.100000  10.0
Intel Xeon W3530 @ 2.80GHz  3047  304.700000  10.0
Intel Xeon L5639 @ 2.13GHz  4419  339.923077  13.0
Intel Xeon W3550 @ 3.07GHz  3203  355.888889   9.0
Intel Xeon X5647 @ 2.93GHz  4394  488.222222   9.0
'''
```

如果要查询的数据是表格中某一个单位数据，可以用`loc['index', 'column']`实现，此时也可以用at方法替代：`at['index', 'column']`。同样的与`iloc`对应的是`iat` 

### 调用函数查询

```python
print(cpu_list.loc[lambda cpu : (cpu['得分'] > 4000) & (cpu['价格'] < 100), ['得分', '性价比', '价格', ]])
'''
                                 得分         性价比    价格
cpu                                                  
Intel Core i5-3340S @ 2.80GHz  4088   43.031579  95.0
Intel Core i5-2500 @ 3.30GHz   4103   50.654321  81.0
Intel Xeon X5667 @ 3.07GHz     4551  133.852941  34.0
Intel Xeon L5640 @ 2.27GHz     4591  306.066667  15.0
Intel Xeon L5639 @ 2.13GHz     4419  339.923077  13.0
Intel Xeon X5647 @ 2.93GHz     4394  488.222222   9.0
'''
```

## 新增数据

数据分析的时候，经常需要按照一定的条件创建新的数据列，然后进一步分析

1. 直接赋值
2. `df.apply` 
3. `df.assign` 
4. 按条件选择分组分别赋值

### 直接赋值

在上面数据查询的条件查询部分已有的示例

```python
cpu_list.loc[:, '得分'] = cpu_list['得分'].str.replace(',', '').astype('int32')
```

将所有的得分列，去掉逗号并转换成`int32` 类型

新增列

```python
cpu_list.loc[:, '新增列'] = cpu_list['得分'] / cpu_list['价格']
```

### apply

```python
def new_column(x):
    if x['得分'] > 3500:
        return '高性能'
    else if x['得分'] < 1500:
        return '低性能'
    return '一般性能'
cpu_list.loc[:, '新增列'] = cpu_list.apply(new_column, axis=1) # axis为1表示新增列
```

```python
# cpu_list.loc['Intel Core I5-10400 @2.9G', :] = cpu_list.apply()
```

### assign

添加列，可以添加多个列

```python
cpu_list.assign(
	new_col = lambda x: x['得分'] > 4000,
    new_col = lambda x: x['价格'] < 100
)
```

### 条件选择赋值

```python
cpu_list['性能'] = ''
cpu_list.loc[
    cpu_list['得分'] > 4000, '高性能',
    cpu_list['得分'] < 2000, '低性能',
    cpu_list['得分'] <= 4000 or cpu_list['得分'] >= 2000, '一般性能',
]
```

## 数据统计函数

### 提取所有数字列

```python
cpu_list.describe()
'''
                得分           排行          价格         性价比          主板       综合性价比
count   608.000000   608.000000  186.000000  186.000000    5.000000  186.000000
mean   2886.898026  1806.847039  170.389247   63.838557  129.120000   58.111248
std     952.611311   340.351623  173.395397   82.399720   52.205862   74.515185
min    1501.000000  1250.000000    7.000000    4.343878   82.800000    4.343878
25%    2090.250000  1500.750000   28.250000   13.392586   82.800000   13.392586
50%    2694.500000  1801.500000  120.000000   31.745108  110.000000   28.706250
75%    3590.500000  2093.250000  261.250000   72.748538  185.000000   63.335526
max    4988.000000  2455.000000  980.000000  488.222222  185.000000  426.428571
'''
```

结果中包含：

1. 数量
2. 平均数
3. 标准差
4. 最小值
5. 25百分位
6. 50百分位
7. 75百分位
8. 最大值

查看单个列的信息

```python
cpu_list['得分'].mean() # 得分的平均值
cpu_list['价格'].max() # 价格的最大值
```

对于非数字类型的列，可以通过`unique` 得到所有的枚举值，`value_counts` 得到所有值出现的次数

```python
cpu_list['地址'].unique()
cpu_list['地址'].value_counts()
```

### 协方差和相关系数

1. 协方差，衡量同向反向程度，如果为正，说明两个因素同向变化，值越大说明同向程度越高。如果为负值，说明两个因素反向变化，协方差越小说明反向程度越高
2. 相关系数，衡量相似度程度。当相关系数为1时，说明两个变量变化时的正向相似度最大，当相关系数为-1时，说明两个变量变化的相反相似度最大

```python
# 协方差矩阵
cpu_list.cov()
cpu_list['得分'].cov(cpu_list['价格'])

# 相关系数矩阵
cpu_list.corr()
cpu_list['得分'].cov(cpu_list['价格'])
```

## 缺省值处理

1. isnull和notnull，检测是否为空值
2. dropna：丢弃、删除缺失值
3. fillna：填充空值

```python
# 删除所有值都为空的一列
cpu_list.dropna(axis='columns', how='all', inplace=True)
# 删除所有值都为空的一行
cpu_list.dropna(axis='index', how='all', inplace=True)
# 只看某些列的值，any表示只有有一个值是空的就删除该行
cpu_list.dropna(subset=['价格', '得分'], how='any', inplace=True)

cpu_list.fillna({'价格': 0})
# 等价于
cpu_list.loc[:, '价格'] = cpu_list['价格'].fillna(0)
cpu_list['价格'].fillna(0, inplace=True)

# 使用前面的不为空的值填充
cpu_list.loc[:, '价格'] = cpu_list['价格'].fillna(method='ffill') 
# 使用后面的不为空的值填充
cpu_list.loc[:, '价格'] = cpu_list['价格'].fillna(method='bfill') 
```

保存excel

```python
cpu_list.to_excel('./new.xlsx', index=False) # 不要索引列
# 或者重置index
cpu_list.reset_index(inplace=True)

# 将索引列写入DataFrame
cpu_list['cpu'] = pd.Series(list(cpu_list.index), index=cpu_list.index)
```

## 排序

1. Series排序： `Series.sort_values(ascending=True, inplace=False)`
2. DataFrame排序：`DataFrame.sort_values(by, ascending=True, inplace=False)`

```python
cpu_list['得分'].sort_values() # 默认升序
cpu_list['得分'].sort_values(ascending = False)

# df单列排序
cpu_list.sort_values('得分')
cpu_list.sort_values('得分', ascending = False)

# 多列排序
cpu_list.sort_values(by=['得分', '价格'])
# 按得分降序，价格升序进行排列
cpu_list.sort_values(by=['得分', '价格'], ascending=[False, True])

# 按索引排序
cpu_list.sort_index()
```

## 关于str

在前面使用过str属性操作得分这一列，可以看到其使用方式，关于其特性如下：

1. str只存在于Series，不在DataFrame上
2. 只能作用于字符串列
3. 不是原生的python字符串，但大部分与原生方法都相似
4. 支持正则
5. 可以用str.startswith和str.contains方法来进行筛选
6. 方法的结果也是一个Series，所以要实现链式调用，必须重新获取str属性再调用其他方法

## 合并DataFrame

`pd.merge(left, right, how='inner', on=None, left_on=None, right_on=None, left_index=False, right_index=False, sort=True, suffixes=('_x', '_y'), copy=True, indicator=False, validate=None)`

- left、right：要merge得dataframe或者有name的Series
- how，join的类型，'left'、'right'、'outer'、'inner'
- on：join的key，left和right都需要有这个key
- left_on: left的key
- right_on: right的key
- left_index、right_index：使用index而不是普通的column做join
- suffixes：两个元素的后缀，如果列有重名，自动添加后缀



`concat`方法

`append` 方法，只有按行合并，相当于concat按行的简写

查看教程：[[Panda实现数据Concat合并_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1UJ411A7Fs/?p=14&spm_id_from=pageDriver&vd_source=0378a9e3f5b84b2b1dbec59d705dc995)]([Panda实现数据Concat合并_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1UJ411A7Fs/?p=14&spm_id_from=pageDriver&vd_source=0378a9e3f5b84b2b1dbec59d705dc995))

```python
pd.concat([df1, df2]) # 默认是按outter模式合并
pd.concat([df1, df2], join='inner', ignore_index=True) # 忽略掉原有的index，生成新的index
# 按列合并，也就是添加一个新的列
pd.concat([df1, df2], axis =1)
```

### 合并之后去重

`df.drop_duplicates()` 

- subset：指定根据哪类数据来判断是否重复
- keep：去重时，保留上一行还是下一行，可选值：`first` 、`last`、`False(删除所有重复的行)` 

## 时间对象处理

```python
import datetime

datetime.datetime.strptime('2010-01-01', '%Y-%m-%d')

import dateutil

dateutil.parser.parse('2001-01-01')
dateutil.parser.parse('2001/01/01')
dateutil.parser.parse('01/01/2001')
```

pandas转换时间对象

```python
pd.to_datetime(['2001-01-01', '2010/01/01'])
```

生成时间范围

```python
pd.date_range('2010-01-01', '2010-05-1') # 闭区间，生成每一天的日期

pd.date_range('2010-01-01', periods=60) # 生成60天的日期

pd.date_range('2010-01-01', periods=60, freq='H') # 按小时生成60天的日期

pd.date_range('2010-01-01', periods=60, freq='B') # 按工作日生成

pd.date_range('2010-01-01', periods=60, freq='W') # 按周生成，默认是W-SUN，也就是星期天，也可以是W-MON，生成星期一的所有日期
# freq其他可选值：H(our)、W(eek)、B(usiness),S(emi-)M(onth),(min)T(es),S(econd),A(year)

pd.date_range('2010-01-01', periods=60, freq='1h20min')
```

date_range方法返回的是一个Index对象，也就是说可以拿这个对象作为Series或者DataFrame的index

```python
sr = pd.Series(np.arange(100), index=pd.date_range('2010-01-1', periods=100))

sr['2010-03'] # 返回所有3月份的数据
sr['2010-02-1':'2010-02-21'] # 选取范围

# 按月做统计数据
sr.resample("M").sum()
sr.resample("M").mean()
```

## 绘制

```python
df.plot()
plt.show()
```

