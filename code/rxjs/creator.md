---
title: rxjs中的创建器
date: 2019-05-19
categories:
  - 编程
tags: 
  - js
  - rx
---

## 什么是冷热Observable

在学习创建器以前，首先要明白一个概念，什么是冷热Observable。简单的解释，冷Observable在创建完成以后，每一次有下游需要接收数据的时候，都会产生一份与之前相同的数据。而热Observable，是在创建以后，下游在不同阶段获取到的数据是变化着的，也就是热Observable不会管是否有下游需要接收数据，而只是自顾自的一直在产出。[参考链接](https://rxjs-cn.github.io/RxJS-Ultimate-CN/content/hot-n-cold-observables.html)

接下来就来看看具体有哪些内置的创建器。

<!-- more -->

## 创建器

### 🤔create

`create`方法是最基本的创建Observable的方法，它接收一个creator作为创建器，creator中接收一个内部传递的observe对象作为传递数据的方法。非常类似`Promise`。举个🌰

```js
import { Observable } from 'rxjs/RX'

const source$ = Observable.create(observe => {
    observe.next(1);
    observe.next(2);
    observe.next(3);

    setTimeout(_=>{
        observe.next(4);
    },3000)
})
```

在rxjs中，习惯在变量名后面加一个`$`符号，表示这是一个数据流

这个🌰表示当前创建器会无缝衔接的产生1,2,3这3数，接着，等待3s以后，产生4这个数字

### 🤔subscribe

在上面已有一个Observable的情况下，我们该如何获取到observe生产出来的数据，这时就需要用到subscribe方法。

subscribe方法用于订阅上游生产出来的数据，当上游**推**出一个数据来的时候，subscribe就能立即**接住**这个数据

还是举个🌰

```js
    source$.subscribe(data=>{
        console.log(data) 
        // 1，2，3
        // 等待3s
        // 4
    })
```

**思考一个问题**：在source$创建以后，并没有调用subscribe的时候，是否会产生数据。也就是这个`source$`是冷Observable还是热Observable

### 🤔of

`of`方法接收一组数据，并返回创建的Observable，会一次性将所有数据推送到下游

🌰
```js
import { of } from 'rxjs'

const of$ = of(1,2,3,4,5,5)

```

`of`推送的数据并不会有时间间隔，当调用`subscribe`订阅数据的时候，会不间断的推送给subscribe

```js
    of$.subscribe(console.log) // 1,2,3,4,5,5
```

### 🤔range

of在数据不多的时候还有可用性，但是当需要产生的数据较多的时候，显然，用of会不那么方便。当然用数组的解构也可以办到，但显然不是最佳方式，因为我们还必须要用声明式编程去创建一个数组。range方式就是用来解决这个问题的

range方法接收2个参数，第一个代表起始数据，第二个代表数据的个数，很像`String.prototype.substr`方法

🌰:

```js
import { range } from 'rxjs'

const source$ = range(10, 2)

source$.subscribe(console.log)
```

> 输出: 10,11

### 🤔repeat

如果你需要重复的产生一段数据,repeat可以帮助你，参数表示需要重复的次数

🌰

```js
    import { of } from "rxjs";
    import { repeat } from "rxjs/operators";

    const source$ = of('a', 'b', 'c').pipe(
        repeat(3)
    )

    source$.subscribe(console.log)
```

> 输出: a, b, c, a, b, c, a, b, c

这里有几个需要注意的问题：

1、 repeat的上游数据需要的完结的时候需要触发`complete`状态，否则repeat操作符不会再次订阅上游数据

2、 repeat传递到下游的数据依赖上游数据。在例子中，of的数据是同步传递的，因此repeat传递到下游的数据不会有时间间隔

3、 `pipeable`操作符

什么叫pipeable操作符，简单解释一下它的来历。

> 在早期RxJs的版本中，所有操作符都是挂载在Observable.prototype对象上的。在模块话的今天，这显然不合适，因为这会导致打包生成的文件非常大，里面会有很多我们没有用上的操作符。在有了[TreeShaking](https://webpack.docschina.org/guides/tree-shaking/)的功能之后，RxJs配合此功能，于是将所有操作符单独提了出来，放到了`rxjs/operators`目录下。这样，通过Observable.prtotype.pipe方法，来实现实际的功能

关于pipeable，参考medium上的一篇[文章](https://medium.com/@sachilaranawaka/rxjs-pipeable-operators-773dbbc8b4c1)或者直接食用国内的[译文](https://juejin.im/post/5a5d4df26fb9a01cbb391d8f)

:wink:[去看看](./pipeable.md)我关于pipeable的一点点理解和实现


### 🤔repeatWhen

刚才的repeat只能接受一个固定的参数，表示重复几次。但有的时候我们重复的时机与其他事情相关，这个时候就要靠`repeatWhen`方法了

repeatWhen方法接受一个creator作为参数，这个creator返回一个`Observable`对象，当它吐出一个数据的时候，就是上游数据重复的时候

🌰

```js
import { of, interval } from "rxjs";
import { repeatWhen, take } from "rxjs/operators";

const notifi = () => {
   return Observable.create(ob => {
       ob.next(1)
   })
}

const source$ = of('123', '231', '312').pipe(
   repeatWhen(notifi)
).subscribe(console.log)
```

在内部Observable中，吐出什么数据并不重要，repeatWhen只关注什么时候吐出数据

### 🤔interval、timer

上面介绍的操作符都是一次性产生数据，`interval`的作用是已一定时间间隔产生数据

🌰

```js
    import { interval } from 'rxjs'

    interval(500).subscribe(console.log)
```

> 输出: 每500ms产生0，1，2，3，4，5，6.......

而`timer`的作用与settimeout相似，接受一个毫秒值，等待这么长时间以后像下游吐出一个数据

🌰

```js
    import { timer } from 'rxjs'

    timer(500).subscribe(console.log)
```

> 输出：0

往往timer吐出的数据是什么并不重要，主要是用于控制数据产生的节奏

timer还支持接受第二个参数，表示下一个数据在什么时候吐出

🌰

```js
    import { timer } from 'rxjs'

    timer(1000, 2000).subscribe(console.log)
```

> 输出: 等待1s以后输出0，此后每2s产生一个数字

可以看出，当这2个参数一样的时候，就是interval所实现的功能