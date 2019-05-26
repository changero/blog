---
title: 理解Unicode与UTF-8
---

昨天在复习ES6的时候，看到ES6加强了对unicode码的支持，可以直接用`\uxxxx`的形式来直接表示一个字符，其中`xxxx`代表这个unicode符的码点。
之前一直对这个知识点感到困惑，到底一个字符是怎么表示出来的，与`UTF-8`又有什么关系。于是决定细致的了解一下，做个记录

## 什么是Unicode

关于什么是Unicode、以及Unicode的起源，在网上都能够很好的查到。可以查看[百度百科](https://baike.baidu.com/item/Unicode)。

在这里简单的解释一下：

Unicode的出现主要是为了统一在这个星球上所有的符号，为他们在计算机系统中都分配一个数字来表示，这个数字就是码点(code point)，Unicode就好比是一个电话本，上面记录了每个字符的码点。但是Unicode只负责定义和记录，并不负责显示。在Unicode中用统一使用2个字节表示一个字符，于是就总共有65536种表示法，对于一些常用的符号已经足够了。而实际上Unicode定义的符号范围是`0x0000 ~ 0x10ffff`，他总共有17个平面，每一个平面都能够`0x0000 ~ 0xffff`，即65536个数字

> 注意：常用汉字的码点是`0x4e00 ~ 0x9fa5`，易经六十四卦的符号表示是`0x4DC0 ~ 0x4DFF`

## Unicode在ES6中

ES6中表示Unicode的方式很简单，只需要在码点(十六进制)前面添加`\u`符号即可，比如

```js
    '\u4e2d' === '中' // true
```

这就表示汉字的`中`的Unicode码是`4e2d`

## 如何获得一个字符的Unicode码

在ES5中获取字符的方法有一下几种

```js
    '汉字'.charAt(0) // 汉
    '汉字'.charCodeAt(0) // 27721
```

ES6中新增方法如下

```js
    '汉字'.at(0)        // 获取字符，未实现
    '汉字'.codePointAt(0) // 27721
```

如上所示，`charCodeAt`和`codePointAt`可以获取到码点，对于`汉`，他们都能获得相同的码点，那他们有什么区别呢。

> `charCodeAt()` 方法返回0到65535之间的整数，表示给定索引处的UTF-16代码单元 (在 Unicode 编码单元表示一个单一的 UTF-16 编码单元的情况下，UTF-16 编码单元匹配 Unicode 编码单元。但在——例如 Unicode 编码单元 > 0x10000 的这种——不能被一个 UTF-16 编码单元单独表示的情况下，只能匹配 Unicode 代理对的第一个编码单元) 。如果你想要整个代码点的值，使用 `codePointAt()`。[原文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)

> codePointAt() 方法返回 一个 Unicode 编码点值的非负整数 [原文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)

所以最大的区别就是所能表示的返回不同，`charCodeAt`只能识别小于0xffff的码点，而codepoint能够识别超过0xffff的码点

首先我们要知道`\u`无法表示超过0xffff的符号，比如

```js
  '\u1f680'  // "Ὠ0"
  '\u{1f680}'   // "🚀"
```

在码点外面加上`{}`，就可以了

```js
    '\u{1f680}'.charCodeAt(0)   // 55357 
    '\u{1f680}'.codePointAt(0)  // 128640
```

charCodeAt只识别出了第一个码点，而codePointAt可以识别整个码点。疑问：为什么codePointAt能够识别。[参考](https://segmentfault.com/q/1010000010112070)

另外，js还提供了从方法用于显示码点对应的字符

```js
String.fromCharCode(0x1f680) //""
String.fromCodePoint(0x1f680) //"🚀"
```

从上面可以知道`fromCharCode`与`fromCodePoint`的区别也是是否能识别大于`0xffff`的码点

最后，一个字符在计算机中存储的，不是Unicode码点，不是Unicode码点，不是Unicode码点。而是经过字符编码集编码之后的字节码。比如UTF-8、UTF-16。

### escape、encodeURI、encodeURIComponent

```js
    escape('\u{1f680}')       // "%uD83D%uDE80"    获得UTF-16编码
    // 对应的解码函数
    unescape("%uD83D%uDE80")    //"🚀"



    encodeURI('\u{1f680}')    // "%F0%9F%9A%80"    获得UTF-8编码
    // 对应的解码函数
    decodeURI("%F0%9F%9A%80")   // "🚀"


    encodeURIComponent('\u{1f680}') // "%F0%9F%9A%80"
    // 对应的解码函数
    decodeURIComponent("%F0%9F%9A%80") // "🚀"
```

## UTF-8

在这里直接引入百度百科的解释：

> UTF-8以字节为单位对Unicode进行编码。从Unicode到UTF-8的编码方式如下：
> |Unicode编码(十六进制)|UTF-8 字节流(二进制)|
> |:-|:-|
> |000000-00007F| 0xxxxxxx|
> |000080-0007FF| 110xxxxx 10xxxxxx|
> |000800-00FFFF| 1110xxxx 10xxxxxx 10xxxxxx|
> |010000-10FFFF| 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx|

UTF-8 就是在互联网上使用最广的一种 Unicode 的实现方式，他用来规定Unicode码点如何在计算机中存储，其他实现还包括UTF-16和UTF-32。

**UTF-8 的编码规则很简单，只有二条：**

1、对于单字节的符号，字节的第一位设为0，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。

2、对于n字节的符号（n > 1），第一个字节的前n位都设为1，第n + 1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。

以`汉`字举个🌰：

其码点是27721，转化为16进制是`6c49`，对应的UTF-8模版是`1110xxxx 10xxxxxx 10xxxxxx`，对应的二进制是`110110001001001`，将其按照模版分组是` 110  110001  001001`，如果对应位数不够的在前面补0，将其带入模版中得到`11100110  10110001  10001001`。于是它的UTF-8就是`e6 b1  89`。也就是说`汉`在计算几种的存储是`e6b189`

在上面的表里面，可以发现大于`0xffff`，也即其他16个面的码点都是以4字节存储的

那么那些大于`0xffff`的码点是如何存储的呢？我们继续以`1f680`为🌰，试着转化成UTF-8

首先它的模版是`11110xxx 10xxxxxx 10xxxxxx 10xxxxxx`，二进制是` 11111 011010 000000`

带入--> ` 11110000 10011111 10011010 10000000` ---> 十六进制`f09f9a80`

通过js方法验证

```js
    encodeURIComponent('\u{1f680}') // %F0%9F%9A%80

    '\u{1f680}' === decodeURIComponent("%F0%9F%9A%80") // true
```


## '\u{1F680}' === '\uD83D\uDE80'?

最开始看到这个式子的时候感到十分的困惑，尤其是`\uD83D\uDE80`这个用2个Unicode码点表示的字符

原来这是UTF-16表示法

先来说一下什么是UTF16:

> 如果U<0x10000，U的UTF-16编码就是U对应的16位无符号整数（为书写简便，下文将16位无符号整数记作WORD）。

> 如果U≥0x10000，我们先计算U'=U-0x10000，然后将U'写成二进制形式：yyyy yyyy yyxx xxxx xxxx，U的UTF-16编码（二进制）就是：110110yyyyyyyyyy 110111xxxxxxxxxx。

很抽象，还是以`1f680`作为🌰，因为在UTF-16编码中，小于0x10000的编码就是它的Unicode码点：

首先执行`0x1f680 - 0x10000 = 0xf680`，二进制是`1111 0110 1000 0000`，补足20位`0000 1111 0110 1000 0000`,带入之后得到`11011000 00111101 11011110 10000000`，将结果转化为十六进制

```js
    (0b 11011000 00111101 11011110 10000000).toString(16) // d83dde80
```

而这正是字符`\ud83d\ude80`

继续了解UTF-16：

> 按照上述规则，Unicode编码0x10000-0x10FFFF的UTF-16编码有两个WORD，第一个WORD的高6位是110110，第二个WORD的高6位是110111。可见，第一个WORD的取值范围（二进制）是11011000 00000000到11011011 11111111，即0xD800-0xDBFF。第二个WORD的取值范围（二进制）是11011100 00000000到11011111 11111111，即0xDC00-0xDFFF。

换句话说，`D800 ~ DFFF`，是Unicode为UTF-16提供的保留字，它没有具体对应的符号，而是在UTF-16编码中有特殊意义

## 总结

Unicode只是定义字符码点的一个规范、规则，而如何将这些浮点表示在计算机里面需要其他字符编码集来处理，例如UTF-8、UTF-16

UTF-8或者其他编码集都有自己的规则去识别计算机中的二进制码

根据上述定义我们可以得知：

**在UTF-8规则下**

1、 当遇到一个字节的最高位是0的时候，直接表示其Unicode码

2、 当一个字节前3位是110的时候，会将后面一个字节也包含进来一起计算Unicode码点

3、 当字节前4位是1110的时候，与后面的2个字节共3个字节来计算Unicode码点

4、 当字节前5位是111110的时候，与后面的3个字节共4个字节来计算Unicode码点

**在UTF-16规则下：**

当发现一个字符是以`110110XX`开头，或者`0xd800 ~ 0xdfff`的时候，会与后面一个字符（2个字节）一起计算Unicode码点。否则这个字符的Unicode码点就是它本身

而js的字符编码规则正是UTF-16，所以现在回过头来看`\ud83d\ude80`。因为它的高位0xd83d大于0xd800所以才会把后面的字符拉进来一起参与计算

```
    0xd83d - 0xd800 = 0x003d   0b111101
    0xde80 - 0xdc00 = 0x0280   0b1010000000
```

将不足10位的在前面补0

`0b1111 01 = 0b0000 1111 01`，`0b10 1000 0000 = 0b10 1000 0000`，组合起来就是`0b 0000 1111 0110 1000 0000`，它的十六进制是`f680`，所以其Unicode码点就是`1f680`

正确


参考：

- [阮一峰 - 字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
