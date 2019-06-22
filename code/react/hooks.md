---
title: React Hooks
date: 2019-06-02
categories:
  - 编程
tags:
  - js
  - react
---

> *Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。*

使用Hooks一定要记住一下几点：

1、 **完全可选的**。你无需重写任何已有代码就可以在一些组件中尝试 Hook。但是如果你不想，你不必现在就去学习或使用 Hook。

2、 **100% 向后兼容的**。 Hook 不包含任何破坏性改动。

3、**Hooks发布于`React>=16.8.0`**

Hooks将使构建一个组件变得更加简单，无需再把逻辑写到`ComponentDidMount`、`ComponentDidUpdate`使逻辑变得难以理解。也不需要再在组件中大量的使用setState函数。我不喜欢setState的原因是，无法从概念上分离不同的变量，所有的变量都通过一个函数去更新UI。

<!-- more -->

而Hooks正是解决这些问题的，每一个变量都有自己的专属更新函数，使开发人员及维护人员使用的时候更加清楚的知道当前做的是什么操作。在Hooks以前，我会使用`recompose`库提供的`withState`方法，与`useState`相比，简直有异曲同工之妙

在以前，组件间复用逻辑，往往采用`HOC`、或者`props render`的方法，现在多了一个`Hooks`的选择

## Hook 使用规则

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

1、 只能在函数**最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。

2 、**只能在 React 的函数组件中调用 Hook**。不要在其他 JavaScript 函数中调用。（另外就是在自定义的 Hook 中）

## useState

Hooks使用起来非常简单

```jsx
import React, { useState } from 'react';

function Example() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
      </button>
        </div>
    );
}

export default Example
```

在这里，使用了useState函数，它接收一个值作为参数，这个参数表示返回的state的初始值。在返回值中，通过解构就可以得到一个count变量，以及修改count的方法，在jsx中，就可以像使用任何变量一样使用count。

setState还可以接受一个方法作为参数，组件第一次加载的时候会调用，相当于组件生命周期中的`componentDidMount`,返回值作为State的数据返回

```js
useState(()=>{
  // some code
  return 'initial data'
})
```

setCount有2种调用方式，一种是直接传入要更新的值，另一种是传入一个update函数，函数将接收count当前值作为参数，并返回新的值

```js
setCount(2)
setCount(count => count+1)
```

当调用setCount之后，将自动更新count到视图。与setState一样，会合并多次调用，并返回最后一次调用的结果。

当视图更新的时候，useState会自动判断是否是第一次调用，如果是第一次调用，就会返回初始值，如果不是就返回当前值。如果初始值是一个变量，useState并不会根据更新后的值重新计算，这个时候可能需要用到自定义Hooks

## useEffect

useState是用于维护state变量的，那么useEffect就是维护mount与update阶段的钩子函数。看看它是如何使用的

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

useEffect接收一个回调函数作为参数，将在每一次`render`之后适当的时候调用。在这一阶段不能取用其他Hooks，否则将引起死循环，但是可以去执行访问Dom，调用异步接口等等操作，所以才被称为副作用

useEffect第二个接受一个数组，表示调用该Effect的依赖属性，当这些依赖属性发生变化的时候，就会调用当前effect。当然，依赖属性指的是props中的属性

## 自定义Hooks

自定义Hooks也是一个普通函数，在其中使用Hooks遵循一样的规则，只不过它的返回值完全由自己决定。我们约定所有的自定义Hooks都用use开头

```js
    function useEdit(props){
        const { edit , setEdit} = useState(false)
        const computedEdit = props.edit || edit

        return [
            computedEdit,
            setEdit
        ]
    }
```

在自定义Hooks内部调用其内部定义的state hooks,也会引起外部组件的更新。更新同样不是通过diff data的，所以即使前后值一样，也会触发update
