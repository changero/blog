---
title: React18
date: "2021-09-09 20:14:50"
categories:
  - 前端
tags:
  - react
lang: zh-cn
---

## React18

### 并发渲染模式

- legacy

  ```js
  ReactDOM.render(<h1>title</h1>, document.getElementById("root"));
  ```

- concurrent Mode

  ```js
  ReactDOM.createRoot(document.getElementById("root")).render(<h1>title</h1>);
  ```

<!-- more -->

### react18 以前的异步更新原理

在一般的合成事件当中，调用`setState`，进入 work 阶段的时候，`isBatchedUpdates`变量是 true，会结束当前阶段，并且会进入`queueUpdate`阶段，与当前时间片中的更新数据做合并更新，所以此时在`setState`之后获取到的 state 仍然是旧数据

如果想要使得合成事件中的 setState 表现为同步方法，可以使用`setTimeout`，`requestAnimationFrame`等浏览器 API 或者 flushSync 来实现，此时的`isBatchedUpdates`变量值为 false，则不会进入`queueUpdate`阶段，而是直接处理当前要更新的状态

最后，如果遇到需要在浏览器 API 中实现异步更新的形态，需要使用`ReactDOM.unstable_batchedUpdates`方法来实现批量更新，避免因多次修改 state 导致的多次渲染

```js
/**
 * react16setState原理简易实现
 */
let state = 0;

let isBatchedUpdates = false;

const queueUpdates = [];

function setState(newState) {
  if (isBatchedUpdates) {
    queueUpdates.push(newState);
    setTimeout(() => {
      state = queueUpdates.shift();
    });
  } else {
    state = newState;
  }
}

function handleClick(event) {
  isBatchedUpdates = true;
  setState(state + 1);
  console.log(state);
  setState(state + 2);
  console.log(state);
  setTimeout(() => {
    setState(state + 1);
    console.log(state);
    setState(state + 1);
    console.log(state);
  });
  isBatchedUpdates = false;
}

handleClick();
```

### ConcurrentMode

批量更新是通过优先级机制来实现，也就是说，无论是不是在浏览器 API 中执行`setState`，都将合并所有更新

### Suspense

通过`componentDidCatch`，`getDerivedStateFromError`捕获字数抛出的异常，等待加载完成，在渲染时等待，显示 fallback 的内容。Suspense 内子树比其他部分的更新优先级更低

```jsx
<Suspense fallback={<div>加载中</div>}>
  <User />
</Suspense>
```

suspense 初次渲染 user 组件的时候，通过在 user 中`throw`一个 promise，通知 suspense，user 组件还没有准备好，先显示 fallback 的内容。等到 promise 状态扭转了之后，再次渲染 user 组件，此时正常的返回数据

```jsx
function createRequest() {
  let status = "pending";
  let result = null;
  return () => {
    if (status === "pending") {
      throw fetch().then((data) => {
        success = "success";
        result = data;
      });
    } else {
      return result;
    }
  };
}
const fetchData = createRequest();

function User() {
  const result = fetchData();
  if (result.success) {
    return <h1>{result.name}</h1>;
  } else {
    return null;
  }
}
```

> 查看 React.lazy 的[使用](https://reactjs.org/docs/code-splitting.html#reactlazy)

### SuspenseList

通过编排向用户显示这些组件的顺序，来协调许多可以挂起的组件

```jsx
<SuspenseList revealOrder="together">
  <Suspense fallback={<div>加载中1</div>}>
    <User />
  </Suspense>
  <Suspense fallback={<div>加载中2</div>}>
    <User />
  </Suspense>
</SuspenseList>
```

> revealOrder：
>
> - together，等待所有的 suspense 完成之后才显示
> - forwards，从前往后依次显示
> - backwards，从后往前一次显示

### ErrorBoundary

通过`componentDidCatch`,`getDerivedStateFromError`来获取子树中抛出的错误

### startTransition

接收一个回调函数，告诉 react 需要推迟的 state，创建一个低优先级的更新任务。比如更新一个长列表的数据的时候

```js
startTransition(() => {
  setState(list);
});
```

### useDeferredValue

在内部会调用一次 setState 触发一次更新，单此更新的优先级比较低

### useTransition

允许组件在切换到下一个界面之前等待内容加载，从而避免不必要的加载状态

也允许将速度较慢的数据获取更新推迟到随后渲染，以便能够立即渲染更重要的更新

使得当数据变化引起界面转场的过程中出现的，状态丢失的问题

```jsx
const [isPending, startTransition] = useTransition()

<Button onClick={() => {
    startTransition(() => {
        setState(fetchData())
    })
}}></Button>
```
