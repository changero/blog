---
title: hooks简易实现
date: '2021-12-04 13:58:38'
categories:
  - 前端
tags:
  - react
  - hook
lang: zh-cn
---

## 闭包

> 函数能够记住并访问其词法作用域，即使函数在其词法作用域之外调用也是如此

## hook

hook 利用闭包的特性而构建

先实现一个简易的 useState 函数

```js
function useState(initiavValue) {
  var _val = initiavValue;
  function state() {
    return _value;
  }
  function setState(value) {
    _val = value;
  }

  return [state, setStata];
}
```

看上去很像`getter`、`setter`对不对,只是在这里 state 的用法有点不像 getter,再用闭包改造一下，将`_val`和`useState`函数放在同一个闭包环境下

```js
const useState = (function() {
  let _val;
  return function useState(initialValue) {
    _val = _val || initialValue;
    function setState(value) {
      _val = value;
    }
    return [_val, setState];
  };
})();
```

这样不仅保护了内部变量`_val`,value 的使用方式还很简单

## MyReact

将上面的`useState`方法封装在`MyReact`模块中

```js
const MyReact = (function() {
  let _val;
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState(initialValue) {
      _val = _val || initialValue;
      function setState(value) {
        _val = value;
      }
      return [_val, setState];
    },
  };
})();
```

注意，在上面的实现中，将 useState 作为了`MyReact`的一个成员，如此我们就可以来实现一个组件

```js
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  return {
    render() {
      console.log('render count', count);
    },
    click() {
      setCount(count + 1);
    },
  };
}

var Count = React.render(Counter); // render count 0
Count.click();
Count = React.render(Counter); // render count 1
```

注意：我们没有接入 DOM，所以只能在控制台查看结果

这样基本完成了 useState 的功能，但是上面的实现有一个根本问题，就是在一个组件中，只能使用一个 useState,这显然是不合理的。为了能够支持多个 useState 的使用,需要改造一个 MyReact 的实现

## 改造 MyReact

```js
const MyReact = (function() {
  const hooks = [];
  let currentIndex = 0;
  return {
    render(Component) {
      const Comp = Component();
      currentIndex = 0;
      Comp.render();
      return Comp;
    },
    useState(initialValue) {
      hooks[currentIndex] = hooks[currentIndex] || initialValue;
      const contextIndex = currentIndex++;
      function setState(value) {
        hooks[contextIndex] = value;
      }
      return [hooks[contextIndex], setState];
    },
  };
})();
```

在这里，将状态交由一个数组来管理，每次调用 useState 之后都将游标+1，以供下一个 useState 正确使用，并且在重新 render 的时候，重置了游标，所以要记住

> hook 函数只能在顶层调用，不能出现在其他方法，和条件判断语句中

现在就可以在组件中多次使用 useState 了

```js
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  const [name, setName] = MyReact.useState('name');
  return {
    render() {
      console.log('render count', count, name);
    },
    click() {
      setCount(count + 1);
    },
    changeName(name) {
      setName(name);
    },
  };
}

var Count = React.render(Counter); // render count 0 name
Count.click();
Count = React.render(Counter); // render count 1 name
Count.changeName('tony');
Count = React.render(Counter); // render count 1 tony
Count.changeName('anik');
Count = React.render(Counter); // render count 1 anik
```

## useEffect

结合上面 MyReact 的实现，可以很轻松的实现 useEffect

```js
return {
    useEffect(callback, deps){
        hooks[currentIndex] = hooks[currentIndex] || deps
        const nodeps = !deps
        const hasChanged = !deps : true : !deps.every((el, i) => el === hooks[currentIndex][i])
        if(nodeps || hasChanged){
            callback()
            hooks[currentIndex] = deps
        }
        currentIndex++
    }
}
```
