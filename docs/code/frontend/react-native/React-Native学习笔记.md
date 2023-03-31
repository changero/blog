---
title: React-Native学习笔记
date: "2021-06-24 22:10:47"
categories:
  - 前端
tags:
  - react-native
lang: zh-cn
---


### 需要注意的点

- `ScrollView`与`FlatList`和`SectionList`的区别

  - ScrollView会直接渲染内部所有元素，这对于元素较多的视图而言，会影响加载速度
  - FlatList和SectionList初次渲染的时候不会渲染屏幕以外的元素

- Animated

  - 不是所有动画都支持原生加速`useNativeDrive`，只有非布局属性才有用，比如`transform`和`opacity`

    > but flexbox and position properties will not

  - 当使用`Animated.event`的时候，只会作用在直接元素上，而不会响应冒泡事件

  - 当一个动画运行的时候，它可以阻止`VirtualizedList`组件呈现更多行，所以当用户在滑动列表的时候，如果你需要执行一个长事件持续的动画的时候，可以使用`isInteraction: false`来解决这个问题

<!-- more -->

  - 在安卓上，某些`transform`相关的属性需要通过添加`perspecive`来启动

    ```jsx
    <View 
    	style={{
            transform: [
                {scale: this.state.scale},
                {rotateY: this.state.rotateY},
                { perspective: 1000 }
            ]
        }}    
    />
    ```

- FlatList

  - 当某行滑出视图之后，其内部状态将不会保留
  - 因为异步渲染的原因，滑动过快的话，会出现短暂的白屏





### 一个元素如何成为手势响应者

只要实现了正确的协商方法，就可以成为触摸事件的响应者。

#### 发起询问

- 在用户开始触摸的时候，手指接触屏幕的瞬间，是否愿意成为响应者：**onStartShouldSetResponder: () => true**
- **onStartShouldSetResponderCapture**在捕获阶段夺权
- 如果不是响应者，在每一个触摸点移动的时候在询问一下： **onMoveShouldSetResponder: () => true**
- **onMoveShouldSetResponderCapture**：在捕获阶段夺权

#### 成为响应者之后，触发以下事件之一

- `View.props.onResponderGrant: (evt) => {}` - View 现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里
- `View.props.onResponderReject: (evt) => {}` - 响应者现在“另有其人”而且暂时不会“放权”，请另作安排

#### 开始响应，下面的事件将会一一触发

- `View.props.onResponderMove: (evt) => {}` - 用户正在屏幕上移动手指时（没有停下也没有离开屏幕）。
- `View.props.onResponderRelease: (evt) => {}` - 触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）。
- `View.props.onResponderTerminationRequest: (evt) => true` - 有其他组件请求接替响应者，当前的 View 是否“放权”？返回 true 的话则释放响应者权力
- `View.props.onResponderTerminate: (evt) => {}` - 响应者权力已经交出。这可能是由于其他 View 通过`onResponderTerminationRequest`请求的，也可能是由操作系统强制夺权（比如 iOS 上的控制中心或是通知中心）

`evt`是一个合成事件，它包含以下结构：

- **nativeEvent**
  - `changedTouches` - 在上一次事件之后，所有发生变化的触摸事件的数组集合（即上一次事件后，所有移动过的触摸点）
  - `identifier` - 触摸点的 ID
  - `locationX` - 触摸点相对于当前元素的横坐标
  - `locationY` - 触摸点相对于当前元素的纵坐标
  - `pageX` - 触摸点相对于根元素的横坐标
  - `pageY` - 触摸点相对于根元素的纵坐标
  - `target` - 触摸点所在的元素 ID
  - `timestamp` - 触摸事件的时间戳，可用于移动速度的计算
  - `touches` - 当前屏幕上的所有触摸点的集合