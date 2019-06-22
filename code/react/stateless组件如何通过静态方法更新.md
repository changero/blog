---
title: stateless组件如何通过静态方法更新
date: 2019-06-21
categories:
  - 前端
tags:
  - react
  - hooks
---

一般在中后台系统中，都会维护自己的图标库，我们公司通过[iconfont.cn](https://www.iconfont.cn/)对图标进行管理，并使用`ant-design`作为前端UI框架。但是在最近的一个项目中，有一个需求需要对Icon组件作出对iconfontUrl作出响应动作，通过一个静态方法的调用，达到更新组件图标的效果

在Icon组件上有一个静态方法`createFromIconfontCN`，通过他可以得到一个新的IconFont组件，这个组件中就包含了参数中指代的图标库信息

我们可以这样来定义我们的组件

```jsx
// DynamicAntIcon.js
import React from 'react'
import { Icon as AntIcon } from 'antd'
const DynamicAntIcon = props => {

    return <AntIcon {...props} />
}
export default DynamicAntIcon

// App.js
import React from 'react'
import DynamicIcon from './DynamicAntIcon.js'
export default () => {
    return <DynamicIcon type='read' />
}
```

通过`AntIcon.createFromIconfontCN`方法，可以得到一个新的Icon，用于更新返回的`Icon`组件，所以我们需要将最终返回的组件做到State中

```js
// DynamicAntIcon.js
const DynamicAntIcon = props => {
    const [ Icon, setIcon ] = React.useState(()=>AntIcon)
    return <Icon {...props} />
}
```

注意useState接受的参数不是组件本身，而是一个方法，因为组件本身就是一个方法，所以，如果直接传递到useState里面的话会被调用，这样得到的Icon就不是AntIcon，因此要用一个方法包装一下

现在来定义更新操作，通过useEffect钩子函数,去响应外部传入的iconfontUrl，那么就先要定义一个方法接收url参数的静态方法，并且，每当静态方法调用的时候能通知组件更新，代码如下：

```js
// DynamicAntIcon.js
// 记录当前使用的是那个组件
let dynamicicon = AntIcon
// icon的更新历史
const iconHistory = [dynamicicon]
const chain = []
const DynamicAntIcon = props => {

    const [ chainId, setCahinId ] = useState()
    const [ url, setUrl ] = useState()
    const [Icon, setIcon] = React.useState(() => dynamicicon)
    React.useState(() => {
        // 每当初始化一个组件的时候将更新url方法push到数组
        const id = chain.push(setIcon)
        setCahinId(id)
    })
    useEffect(() => {
        return () => {
            // 卸载的时候删除数组中的项
            chain.splice(chainId, 1)
        }
    })
    return <Icon {...props} />
}
// 更新所有使用该组件的图标
DynamicAntIcon.current = 0
DynamicAntIcon.update = url => {
    // 获得新Icon
    const IconFont = AntIcon.createFromIconfontCN({ scriptUrl: url })
    // 更新当前Icon
    dynamicicon = IconFont
    // 添加到历史记录
    iconHistory.push(IconFont)
    // 更新current辅助属性
    DynamicAntIcon.current = iconHistory.length - 1
    // 通知所有icon更新
    chain.forEach(setIcon => setIcon(() => IconFont))
}
// 回退到之前的某个图标库
DynamicAntIcon.reset = index => {
  if(index< history.length){
    dynamicicon = history[index]
    chain.forEach(setIcon => setIcon(() => history[index]))
    DynamicAntIcon.current = index
  }
}
const history = Symbol('history')
DynamicAntIcon.history = iconHistory
```

实现的主要原理是通过维护一个内部数组来管理所有setIcon方法，当update调用的时候所有setIcon都被加载，达到更新的目的。

同时需要保存上每次调用更新之后得到的那个图标组件，保证下一次初始化图标的时候能够正确的加载图标库

但是这样还是无法达到一个项目中维护多个图标库的目的，我们需要保存每次更新url方法得到的那个图标组件

```js
const iconmap = {
  "default": AntIcon
}
DynamicAntIcon.get = (key, url) =>{
  let computedKey = key.slice(0).toUpperCase()+key.slice(1)
  if(iconmap[computedKey]){
    return iconmap[computedKey]
  }else if(url){
    iconmap[computedKey] = AntIcon.createFromIconfontCN({ scriptUrl: url })
    DynamicAntIcon[computedKey] = iconmap[computedKey]
    return iconmap[computedKey]
  }
  return dynamicicon
}

// 追加history属性
const map = Symbol('iconmap')

DynamicAntIcon[map] = iconmap
```

这样就可以实现在项目中管理多套图标组件的功能
