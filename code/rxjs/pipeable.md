---
title: pipeable
---

在上一篇RxJs的创建器一文中，简单的说了一下pipeable的来历，和它的作用，在这里就结合我的思考简单的实现一个pipeable操作符，[参考](https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md#build-your-own-operators-easily)

## 作为Observable的属性

pipe操作符作为Observable的属性，也就是说pipe所在的对象是吐出数据的一方，那么我们可以将pip方法挂载到`Observable.prototype`上。

```js
    Observable.prottotype.pipe = function pipe(){
        // ...
    }
```

pipe就接受我们的pipeable作为参数

假设我们创建一个叫`get`的操作符，那么这个get需要是一个方法，它接受一个source作为参数，而这个source就是我们可以用来过去上游数据的数据源。而在方法中，我们需要返回一个新的Observable

🌰

```js
    function getEven(source$){
        return new Observable()
    }
```

接下来就要实现我们返回的Observable的逻辑了

这里的`new Observable`其实与之前说的通过`Observable.create`创建是一样的，都接受一个observer作为参数

🌰

```js

    function getEven(source$){
        return new Observable(
            observer = >[
                source$.subscribe(
                    next: v => {

                    },
                    error:observer.error,
                    complete: observer.complete
                )
            ]
        )
    }
    
```

可以看到，我们在自己实现的pipeable中通过`subscribe`，来得到上游数据。接下来就是真正的逻辑部分

关于subscribe的实用自行百谷

🌰

```js
    function getEven(source$){
        return new Observable(
            observer =>{
                source$.subscribe(
                    {
                        next: v => {
                            if(v%2 === 0){
                                observer.next(v)
                            }
                        },
                        error:observer.error,
                        complete: observer.complete
                    }
                )
            }
        )
    }
```

一个简单的逻辑，实现当上游的数据是偶数的时候才吐出，推送给下游。也就实现了一个过滤奇数的功能

那么我们的方法就可以这样来使用了

🌰

```js
    of(1,2,3,4).pipe(
        getEven
    ).subscribe(console.log)

```

> 输出: 2, 4

但是这样我们只是实现了过滤奇数的功能，那如果我们还需要过滤偶数怎么办，如果新增一个相同的方法未免太重复了

于是，我们将getEven修改成一个高阶函数，这样我们在调用的时候就可以去自定义筛选条件了

首先我们的方法需要接受一个条件判断的函数作为参数

🌰

```js
    function get(condition){
        return source$ => {

        }
    }
```

现在将我们刚才的逻辑再放过来

🌰

```js {7}
    function get(condition){
        return source$ =>  new Observable(
            observer =>{
                source$.subscribe(
                    {
                        next: v => {
                            if(condition(v)){
                                observer.next(v)
                            }
                        },
                        error:observer.error,
                        complete: observer.complete
                    }
                )
            }
        )
    }
```

注意我们修改的高亮的部分，利用传递进来的condition函数判断当前数据是否符合要求

现在我们重新调用一次

```js
    const source$ = of(1,2,3,4)

    source$.pipe(
        get(x => x % 2 === 0)
    ).subscribe(console.log)

    source$.pipe(
        get(x => x % 2 !== 0)
    ).subscribe(console.log)

```

> 输出: 2，4
> 输出: 1，3

还记得冷热Observable的概念吗

终于我们实现了一个自己的pipeable操作符

关于pipe内部是如何处理这个pipeable的，




