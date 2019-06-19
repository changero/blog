---
title: 零件俱乐部总结
date: 2019-05-31
categories:
  - 心得
tags:
  - 总结
---

零件俱乐部React版本的重构，是我加入甘棠的第一个项目，自`18年12月10日`开始到今天，算来也有半年的时间了。经过4、5位同事的共同努力，也总算是取得了阶段性胜利。

**在项目中，我主要负责的部分有**

[**1、设计项目基础请求方法，对接后端返回的数据**](#设计项目基础请求方法)

[**2、编写项目基础可读写表单组件。目前，会将这些组件重构以后放到公司的私有镜像上**](#可读写表单组件)

[**3、重构了一下项目中的全局搜索组件**](#全局搜索组件)

[**4、工作空间列表的数据管理**](#工作空间列表)

[**5、处理面包屑以及动态加载面包屑**](#动态面包屑)

**6、moment国际化处理**

**7、图片缓存处理**

**8、iconfont自动获取链接的脚本编写**

**9、页面访问历史记录**

10、编写部分业务页面

<!-- more -->

等等。

项目是采用的`ant-design-pro`的架子，因此也用到了`umi`以及`dva`。在整个重构过程中，也在不断的学习，如何编写具有可读性的代码，也越来越注重所写代码的性能。在学习高阶组件的过程中，接触到了`recompose`，也让我对`函数式编程`有了一个认识，这对于学习和阅读`redux`有极大的帮助。接下来分别简单的阐述一下上面提到的几点工作

## 设计项目基础请求方法

如果说设计请求方法仅仅是去对接后端返回的数据的话，实在没有必要单独拿出来说一下。只因为在所有的请求中，有一个非常重要的参数需要处理，所以单独提出来说一说，记录一下。

问题很简单，就是在所有的请求中，有一个初始请求，会返回一个请求都需要的参数，这个参数会被处理到header中。但是我们并没有使用`axios`这样的请求库，有`Intercept`这样的API可以使用，而是使用的fetch，所以只能手动的去处理这个拦截。毕竟请求是异步的，我们不能手动去控制先请求哪个，后请求哪个。

那么，接下来一步一步的来设计一个方法来解决这个问题

首先，我们有一个基础的请求方法，这个基础请求方法，处理options，然后调用`fetch`，并处理`response`之后的逻辑，它看起来像这样

```js
function basicRequest(url, config){
    // config transform options ...
    return fetch(url, options).then(checkStatus).then(checkResponse)
}
```

其中，`checkStatus`是校验HTTP状态码的方法，必要的时候将消息反馈到界面上。`checkResponse`就主要是处理后端返回的消息及数据，根据`state`字段，展示不同的反馈和消息

接下来就是request部分

```js
// serviceId是调用后端业务模块的ID
function request(serviceId, url, options, data, conf){
    const headers = {
        serviceId
    }

    return new Promise(resolve =>{

    }).then(()=>{
        // resolve options and data
        basicRequest(url, config)
    })
}
```

在这里我们不能直接调用`basicRequest`，因为一旦调用就没法达到拦截的目的了。于是在这里采用了Promise的异步特性(当然也可以采用async/await语法，因为不过是一种语法糖而已)，来使程序暂停下来。暂停的条件就是判断时候有哪个id参数(与serviceId不同，记为spaceId)。但是又不能全部都拦截，因为初始的请求是一定可以执行的。所以我在options对象里面添加了一个`needId`的标志，来标记是否需要哪个Id。所以request现在像这样

```js
// serviceId是调用后端业务模块的ID
function request(serviceId, url, options, data, conf){
    const headers = {
        serviceId
    }
    const { need, ...extra } = options

    return new Promise(resolve =>{
        if(!need){
            resolve()
        }
    }).then(()=>{
        // resolve options and data
        basicRequest(url, config)
    })
}
```

这样初始请求就能够正常的执行了。

那么现在就是处理非初始请求了，需要去判断spaceId是否存在。如果有，则执行resolve，如果没有则需要将resolve暂存起来，保留现场。所以我们需要创建一个结构来存储这个spaceId，与暂存的待处理的数组

```js
const store = {
    spaceId: null,
    taskes: []
}

function request(serviceId, url, options, data, conf){
    // some code
    return new Promise(resolve=>{
        if(!need || store.spaceId){
            resolve()
        }else {
            store.taskes.push(resolve) // 等待被恢复
        }
    }).then(()=>{
        // somecode
    })
}
```

到这里，拦截的工作就已经做完了，其实来看原理很简单，就是利用Promise的异步特性，根据条件暂存resolve，来达到拦截的目的。通过在外部创建一个所有方法共享的数组去管理暂存的数组

好了，这一步就要思考如何来告知store去遍历taskes恢复每一个请求了。既然是通知，很自然的就想到了事件模块，通过订阅发布模式来控制。我们可以自己构造一个事件模块，也可以采用node中的events模块

```js
// request.js
import event from './event'
event.on('spaceIdOk', id => {
    store.taskes.formEach(r => r(id))
    store.taskes = []
})
// index.js
import event from './event'
request().then(spaceId => event.emit('spaceIdOk', spaceId))
```

到这里，基本主要的功能就完成了，接下来就是关于保存spaceId，让往后的请求也能够使用到这个Id了。

当然也可以不采用store.taskes数组，可以直接在push操作的地方改换成事件监听，只是这样做的不好的一点就是如果暂存的请求很多，无法控制请求的节奏，而通过数组统一集中管理所有的暂存可以来控制这个节奏

## 可读写表单组件

项目中的组件都是基于antd组件库来编写的。对于这个需求，最开始是设计一个基类组件来处理所有公共功能，其他组件通过继承的方式来重写特殊的业务逻辑。但是发现继承是形式是不很好，尤其是重写的方法无法执行的时候，更让我选择了放弃继承的方式来组合。

所以后面的项目里面打算通过HOC的形式来重构所有的表单组件。而不采用Hooks的原因是其目前还无法做到渲染拦截，一个场景就是根据props和state计算某个结果，判断时候显示组件，以及组件的哪个形态，而Hooks还没有关于对Porps的支持。但是这个事情不绝对，自定义Hooks或许可以使用

## 全局搜索组件

最开始的全局搜索组件，组件的值通过model管理，所以在`onChange`的时候，每次都使用dispatch传递，然后经由props，更新到组件。我发现这一过程是比较缓慢的，如果电脑性能稍差一点，便出现了卡顿的现象。于是我把值的管理从model中提出来，放到State里面（在实际中，我是通过HOC来进行管理），change时候的相应速度得到了不错的提升

另一个问题是，需要搜索功能的页面如何得到输入框的反馈。我沿用了之前代码里面的注册机制，只是把注册是能力交由event模块来处理。这样，在业务页面中，只需要通过dispatch，将回调函数传递过去就可以了，至于什么时候调用，就完全由searchModel决定了。而之所以不在page中直接通过event注册，只是因为不想将event暴露出去，增加API量。这样，在输入框搜索的时候，便能触发相应页面所注册的回调函数，以达到搜索的目的了。

优化的目的，是较少effect的调用，因为这个过程真的很慢，尤其是在effect中，通过select拿取特定数据的时候同步执行异步函数，又增加了等待的时间。而这些仅仅只需优化state数据的结构，来减少不必要的操作，就可以达到效果

## 工作空间列表

因为项目中多处使用到工作空间列表的数据，而在此之前，所有的数据都是零散的分布在各个model中，难以集中管理，无法有效的完成某些功能。比如修改详情无法及时同步到其他模块的数据上去，于是决定，单独建立一个管理工作空间的model。在这个过程当中，我也渐渐意识到，功能的完成不能仅仅已实现为唯一目标，还应该关注在我们所写的代码的执行效率如何。尤其是像工作空间列表这样数据量较大的情况，而且还是试图关联的数据，方法的执行效率显得更为重要，往往这个时候我会选择以空间换取时间的办法来处理。

所有的列表数据都来自一个请求接口，这也是统一管理想法的来源。但是在这数据中，又有展示位置的不同，有的表示可用的，有的表示关闭的，有的是展示当前的搜索结果，所以只能针对不同的状态，和展现的位置来进一步分化。于是，将所有需要分化的结果，在一次循环中完成，避免多次循环，造成浪费。

```js
    const filter = ''
    const result = {
        IN_USE:[],
        CLOSED:[]
    }
    const available = []

    for(const item of list){
        if(filter){
            const reg = new RegExp(filter)
            if(reg.test(item.name)){
                result[item.status].push(item) // 根据搜索条件
            }
        }else{
            result[item.status].push(item) // 根据状态分离
        }
        if(item.status === 'IN_USE'){ //可用
            available.push(item)
        }
    }
```

这样，就初步完成了初始化的过程中，数据的分离。分离的目标有三个，开启与关闭的，同时也受搜索条件的影响。可用列表仅仅表示当前可用的数据，不受搜索条件的影响。当改变搜索条件的时候，我们只会更新前两个数组，对于可用数据是不需要更新的。于是，在此基础上，我们只需要添加一个参数标记当前是否是初始化的执行即可

## 动态面包屑

ant-design-pro中有专门处理面包屑的组件，但是它需要提前在router.config中配置好相应路径的name，以展示在面包屑上。但是这对于访问详情页面来说十分不友好，因为我们希望在访问到对应物件的详情上的时候，面包屑上应该显示物件对应的名称，而不是一个固定的名称。尤其是在系统中还有历史记录的情况下，名称更有助于我们去区分不同的物件。

于是动态更新面包屑名称的需求就显得很重要了。通过在获取详情信息之后提交一个action，actio中包含有需要更新的路径以及更新的名称。通过遍历就能找到更新的位置，并传递新数据到面包屑组件上去

## 总结

在项目的重构过程当中遇到的许多问题，都通过自己的思考或者别人提供的工具来进行解决。当然，更多的是增长了自己的经验，包括技能方面的增长、明确自己在团队当中的作用，努力的输出。写好注释，保证他人能有效的阅读。代码要以尽量简单的写法去完成功能。还有就是要保持自己谦虚的学习心态，有好多好多有意思的东西等着去学习，在下一个项目中需要用到的工具又要好好从头复习一下了，less、webpack、babel、jest等等