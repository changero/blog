---
title: matpoltlib
date: "2023-03-24 21:40:06"
categories:
  - python
lang: zh-cn
---

python的画图工具，下面是一个最基本的示例

1. 画出从-10到10之间10000个点的平方数

```python
import numpy as np
import matplotlib.pyplot as plt


x = np.linspace(-10, 10, 10000).reshape((100, 100))
y = x ** 2

plt.plot(x, y)
plt.show()
```

2. 画出0到1000的开方数

```python
x = np.linspace(0, 1000, 1000000)
y = np.sqrt(x)

plt.plot(x, y)
plt.grid(True) # 添加格子
plt.show()
```

## 属性

- `xlabel`: 给x轴取一个名字。`plt.xlabel('number', fontsize=16)`，同样的还有`ylabel`
- plot的第三个参数表示画图的符号，比如：`plt.plot(x, y, '--')` 表示用虚线，或者`:`表示点线。支持通过color参数指定颜色

| 字符 | 类型       | 字符 | 类型      |
| ---- | ---------- | ---- | --------- |
| '-'  | 实现       | '--' | 虚线      |
| '-.' | 虚点线     | ':'  | 点线      |
| '.'  | 点         | ','  | 像素点    |
| 'o'  | 圆点       | 'v'  | 下三角点  |
| '~'  | 上三角点   | '<'  | 左三角点  |
| '>'  | 右三角点   | '1'  | 下三叉点  |
| '2'  | 上三叉点   | '3'  | 左三叉点  |
| '4'  | 右三叉点   | 's'  | 正方点    |
| 'p'  | 五角点     | '*'  | 星型点    |
| 'h'  | 六边形点1  | 'H'  | 六边形点2 |
| '+'  | 加号点     | 'x'  | 乘号点    |
| 'D'  | 实心菱形点 | 'd'  | 瘦菱形点  |
| '_'  | 横线点     |      |           |

plot还支持一次性画多条线

```python
x = np.linspace(0, 10, 10000)
plt.plot(x, x**2,
         x, np.sqrt(x)
)

plt.plot(x, x**2, 'r-',
         x, np.sqrt(x), 'g-',
)
```

- linewidth指定画线的宽度`plt.plot(x, y, linewidth=2.0)`，也可以是小数
- marker，画出关键点，值为上表中的可选值
- markerfacecolor
- markersize

## 图像标注方法

- `plt.title()`：图像标题
- `plt.xlabel()`：x轴名称
- `plt.ylabel()`：y轴名称
- `plt.xlim()`：x轴范围
- `plt.ylim()`：y轴范围
- `plt.xticks()`：x轴刻度
- `plt.yticks()`：y轴刻度
- `plt.legend()`：曲线图例，需要关联plot的`label`参数

## 子图

在同一个绘图区域中画多个图

```python
plt.subplot(211)
plt.plot(x, y)

plt.subplot(212)
plt.plot(x, y)
```

> 211表示要画的图是2行1列的，最后表示是子图中的第一个图
>
> 前两个参数对整个图进行区域的划分，最后一个参数指定当前这个子图在哪个区域中

也可以创建一个fig，在fig中添加subplot

```python
fig = plt.figure()

x1 = fig.add_subplot(2, 1, 1)
x1.plot(...)

x2 = fig.add_subplot(2, 1, 2)
x2.plot(...)

fig.show()
```

调整子图间距

```python
x1.subplot_adjust(left, bottom, right, top, wspace, hspace)
```



## 标注

```python
plt.annotate(
    '备注的文字', 
    xy = (-5, 0), # 箭头指向的位置
    xytext = (-2, 0.3), # 文字绘制的位置
    arrowprops=dict(facecolor='red',shrink=0.05) # 箭头的属性
)
```

## 绘图风格

```python
# 查看有哪些风格
plt.style.available
# 切换风格
plt.style.use('dark_background')
```

手绘风格

```python
plt.skcd()
plt.plot(x, y)
plt.show()
```

## 其他绘图类型

| 函数           | 说明          |
| -------------- | ------------- |
| plt.plot()     | 坐标图        |
| plt.boxplot()  | 箱型图        |
| plt.bar()      | 条形图        |
| plt.bar()      | 横向条形图    |
| plt.polar      | 极坐标图      |
| plt.pie()      | 饼图          |
| plt.psd()      | 功率谱密度图  |
| plt.specgram() | 谱图          |
| plt.cohere     | X-Y相关性函数 |
| plt.scatter    | 散点图        |
| plt.step       | 步阶图        |
| plt.hist       | 直方图        |

## K线图

> matplotlib.finanace子包包含许多绘制金融相关图的函数接口
>
> 绘制K线图：matplotlib.finanace.candlestick_ochl
>
> 上述包已经从新版matplotlib子移除了，更换为其他入口