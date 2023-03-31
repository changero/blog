---
title: numpy
date: '2023-03-12 19:25:40'
categories:
  - python
lang: zh-cn
---

## numpy 是什么

Numpy 是 Python 开源的科学计算工具包

- 强大的 N 维数组对象
- 对数组结构数据进行运算（不用遍历循环）
- 随机数、线性代数、傅里叶变换等功能

包含内容

1. Numpy 基础数据结构
2. Numpy 通用函数
3. Numpy 索引及切片
4. Numpy 随机数
5. Numpy 数据的输入输出

## 基础方法

### 导入

```python
import numpy as np

# ar = np.array([1,2,3,4])
ar = np.array(
    [
        [1,2],
        [3,4]
    ]
)
# 查看数据的维度
print(ar.ndim) # 2

# 查看数据的形状
print(ar.shape) # (2, 2) 行，列

# 查看数据的个数
print(ar.size) # 4

# 查看元素的类型
print(ar.dtype)

# 查看元素的字节大小
print(ar.itemsize)

# 数据的内存地址
print(ar.data)
```

### 如何创建数组

```python
# 通过数组字面量创建
np.array([1,2])

np.array(range(10))

# 通过arange方法
np.arange(10)

# 随机创建
np.random.rand(10) # 生成10个0-1之前的数据
np.random.rand(10).reshape(2, 5) # 将数组转置为2X5的二维数据

# 在两个数据之间平均创建数字（默认是闭区间）
np.linspace(10, 20, num=20) # 在10到20之间创建20个数字，包括10和20
np.linspace(10, 20, num=20, endpoint=False) # 修改为左闭右开区间
np.linspace(10, 20, num=21, retstep=True) # 返回一个元组，第一个元素与上面的返回值相同，第二个元素是步长

np.zeros( (3, 2) ) # 创建一个3x2的数组，全部以0填充
np.ones( (3, 2) )  # 创建一个3x2的数组，全部以1.0填充
np.ones( (3, 2), dtype=np.int )  # 创建一个3x2的数组，全部以1填充

old_ar = np.ones((2,3))
zero_ar = np.zeros_like(old_ar) # 根据已有的数组形状创建新数组
one_ar = np.ones_like(zero_ar)

# 通过指定的值填充数组
print(np.full(5, fill_value= 122))
print(np.full((3, 2), fill_value= 122))

# 创建一个正方的N*N的单位矩阵，对角线是1，其余为0
np.eye(3)
'''
[[1,0,0],
 [0,1,0],
 [0,0,1]]
'''
```

## 通用函数

```python
a1 = np.arange(10)
a2 = np.zeros((2, 5))

# 转置
print(a1.T) # 一维数组保持不变
print(a2.T) # 变成 5x2的数组
'''
[[0,0],
 [0,0],
 [0,0],
 [0,0],
 [0,0]]
'''

# 调整形状
a1.reshape((2, 5))
 # 转成一个1行10列的二维数组
a2.reshape((1, 10))
# 转成10个元素的一维数组
a2.reshape(10)
```

> `resize` 方法与`reshape` 的区别是，
>
> 1. resize 和 reshape 都会生成新的数组
> 2. resize 之后的 size 变大的时候，会从原数据中 repeat
> 3. resize 之后的 size 变小的时候，会把多余的数据截断
> 4. reshape 前后的 size 必须一致

> 注：最好通过`np.resize` 或者`np.reshape` 的方式来调用

其他常用函数：

- 一元函数：abs、sqrt、exp、log、ceil、floor、rint(与round一样四舍五入)、trunc(舍去小数部分)、modf（拆分成小数部分和整数部分两个数组）、isnan、isinf、cos、sin、tan
- 二元函数：add、substract、multiply、divide、power、mod、maximum（分别取两个数组的最大值）、mininum

### 复制

```python
a1 = np.arange(10)
a2 = a1

a2[2] = 100
print(a1[2]) # 100

a3 = a1.copy()
a3[3] = 200
print(a1[3]) #0
```

### 数值类型改变

```python
ar1 = np.arange(10, dtype=float)
ar2 = ar1.astype(np.int64)

print(ar1.dtype)
print(ar2.dtype)
```

### 数组堆叠

```python
a = np.arange(5)
b = np.arange(5, 9)

# 横向堆叠
print(np.hstack((a, b))) # [0 1 2 3 4 5 6 7 8]

a= np.array([[1], [2], [3]])
b= np.array([[4], [5], [6]])

print(np.hstack((a, b)))
'''
[[1 4],
 [2 5],
 [3 6]]
'''
# 竖向连接
print(np.vstack((a, b)))
'''
[[1]
 [2]
 [3]
 [4]
 [5]
 [6]]
'''

print(np.stack((a, b))) # 会将2个数据连接成一个大数据，并且结果的维度更高一维
print(np.stack((a, b), axis=1)) # 横向连接，并升高维度
```

### 数组拆分

```python
a = np.arange(16).reshape(4, 4)

print(np.hsplit(a, 2)) # 竖着切，生成2个数组
print(np.vsplit(a, 4)) # 竖着切，生成4个数组
```

### 算数运算

```python
ar = np.arange(6).reshape(2, 3)

print(ar + 10) # 加法
print(ar - 1) # 减法
print(ar * 2) # 乘法
print(ar / 2) # 除法
print(ar % 2) # 模运算
print(ar ** 2) # 幂运算

print(ar.mean())  # 求平均值
print(ar.max()) # 求最大值
print(ar.min()) # 求最小值
print(ar.std()) # 求标准差
print(ar.var()) # 求方差，表示数据的离散程度
print(ar.sum()) # 求和
print(np.sum(ar, axis=1)) # 按行求和
print(np.sum(ar, axis=0)) # 按列求和
print(np.sort(np.array([2,3,234,45,6,5,67,67,2,34,12]))) # 按列求和
```

### 切片

```python
# 一维数组的切片与list一样
ar = np.arange(20)
print(ar[:3])
print(ar[::2]) # 步长为2

# 二维数组
ar2 = np.arange(16).reshape(4, 4)
print(ar2[1:3]) # 第一行与第二行
print(ar2[2, 2]) # 第三行第三列，也就是10
# 因此，逗号可以分割行和列
print(ar2[:3, 1:3]) # 前三行的二三列

# 高级切片
print(ar2[[0, 1, 3], [3, 2, 0]]) # 表示获取3个元素，坐标分别为(0, 3)、(1, 2)、(3, 0)

rows = np.array([[0, 1, 2], [3, 3, 2]])
cols = np.array([[0, 3, 0], [0, 3, 0]])
# rows和cols的形状必须一致，在这里表示结果也是一个2行3列的数组
print(ar2[rows, cols])
# 结果中第一行元素的行坐标来自rows的第一个元素数组，列坐标来自cols的第一个元素的数组
# 结果中第二行元素的行坐标来自rows的第二个元素数组，列坐标来自cols的第二个元素的数组
# 比如：结果中第1行第1列的元素在原始矩阵中的坐标就是(0, 0)，第二列的坐标是(1, 3),以此类推
```

### 布尔型索引及切片

```python
ar = np.arange(12).reshape(3, 4)
i = np.array([True, False, True])
j = np.array([True, True, False, False])

print(ar[i, :]) # 取得第一三行
print(ar[i, j]) # 取得第一三行的一二列

print(ar>5) # 得到布尔型的矩阵
print(ar[ar>5]) # 得到一个一维的矩阵
```

### 随机数

```python
print(np.random.normal(size = (4, 4))) # 生成标准正太分布的样本

print(np.random.rand(10)) # 生成10个0-1之间的数字

print(np.random.rand(2, 4))

print(np.random.randn(2, 4)) # 正太分布

print(np.random.rand(10) * 10) # 0-10

# 随机整数
print(np.random.randint(3)) # [0, 1, 2)
print(np.random.randint(2, 10)) # [2, 10)之间的整数

print(np.random.randint(5, size=10)) # 10个0到5之间的整数
print(np.random.randint(5, size=(2, 5))) # 生成一个2x5的包含0到5之间的整数的矩阵

print(np.random.randint(2, 10, size=10)) # 10个[2, 10)之间的整数
```

> rand 函数接收的参数表示矩阵的形状
>
> randint 函数接收的参数表示整数的范围，形状通过 size 参数指定

### Numpy 数据的输入与输出

```python
import os

os.chdir('./')
ar = np.random.rand(5, 5)

# 存储
np.save('test.npy', ar)

# 读取
ar_load = np.load('test.npy')
print(ar_load)

# 存储为文本
np.savetxt('test.txt', ar, delimiter=",") # 以，分割。

# 保存两位小数
np.savetxt('test.txt', ar, delimiter=",", fmt='%.2f')

# 读取
ar_loadtxt = np.loadtxt('test.txt', delimiter=",")

```
