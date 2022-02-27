---
title: diff算法
date: '2022-02-27 12:13:57'
categories:
  - 算法
tags:
  - diff
  - react
lang: zh-cn
---

## 背景

在学习 react 的过程当中，无可避免的一个东西就是 diff 算法，可以说 diff 算法是 react 的核心之一，这也是其高效的原因。在 react 的整个 diff 的过程当中，通过以下前提来优化算法

- 只在同级节点中比较

- 两个不同类型的元素会产生出不同的树

- 利用 key 或者标签对比，决定要删除还是更新该节点

目前在这里，只涉及到 diff 列表算法本身，不与 react 做任何绑定

## 朴素 diff 算法

朴素 diff 算法是基于元素的变化操作来分类的。元素的变化无非这 3 种，`新增`、`删除`、`移动`，根据这三种操作来分别找到变化的节点，就是朴素 diff 算法

该思路的实现，参见[github](https://github.com/changero/list-diff)

<!-- more -->

> 以下示例，通过如下的结构来演示

```js
var oldList = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }, { id: 'e' }];
// var newList = [  {id: "b"},{id: "e"},{id: "a"},{id: "c"},  {id: "f"}];
var newList = [{ id: 'b' }, { id: 'e' }, { id: 'a' }, { id: 'c' }, { id: 'f' }];
```

### 元素散列表

为了方便的查找到元素及其位置，我们首先将元素进行散列化

```js
function mapListKey(list, key = 'id', itemMap = false) {
  return list.reduce((res, item, index) => {
    res[item[key]] = itemMap ? item : index;
    return res;
  }, {});
}

const oldKeyMap = mapListKey(list); // {a: 0, b: 1}
const keyMap = mapListKey(newList);

// 保存所有的操作
const handles = [];
```

### 删除

删除节点是最好找的，我们只需要比较在旧的结构中，比较新的结构，如果没有在新的结构中出现，那就是需要删除的节点

```js
let deleteCount = 0;
Object.keys(oldKeyMap).forEach((key) => {
  const index = oldKeyMap[key];
  if (!keyMap.hasOwnProperty(key)) {
    // 标记删除元素
    handles.push(createRemoveHandle(list[index], index));
    deleteCount++;
    delete oldKeyMap[key];
  } else {
    oldKeyMap[key] = index - deleteCount;
  }
});
```

就这样`handles`中就收集到了删除的操作

注意`deleteCount`的作用，他是用来标记在当前元素之前，已经有多少个元素被删除。那么在新的结构中，当前元素的索引就会向前移动`deleteCount`个位置，然后在更新其索引。

在这里更新索引之后，与在原始结构中的位置就会出现偏差。所以我们最好保存一份原始节点的一个散列表

```js
const itemMap = mapListKey(list, 'id', true); // { a: { id: 'a'}, b: {id: 'b'} }
```

### 新增、移动

`新增`、`移动`是新的结构基于旧的结构比较而来，所以在这个时候我们需要遍历的是新结构

新增相对比较简单，与删除相似，只要在新结构中出现，而没有在旧的结构中的元素，就是新增的元素

```js
Object.keys(keyMap).forEach((key) => {
  // 当前索引
  const index = keyMap[key];
  if (!oldKeyMap.hasOwnProperty(key)) {
    // 标记新增元素
    handles.push(createAddHandle(newList[index], index));
  }
});
```

接下来收集移动的元素，分析一下，移动的元素无非就是向前移动，和向后移动。

对于一个向前移动的元素而言，一定有元素向后移动，所以这是一组相互的操作，我们就只需要收集其中一个方向移动的元素就可以了，比如向前移动

所以我们在对新的结构进行遍历的时候，当前位置的元素，在原始结构中的位置，一定是在当前索引位置之后的。

基于这样一种分析，我们就可以只需要判断元素在新旧结构中的所以位置就可以了

如果当前位置比就得位置更小，那么它就是一个移动的元素

完整代码如下：

```js
// 动态变化的过程
// 记录下变化的行为
let addCount = 0;
const moveArray = [];
Object.keys(keyMap).forEach((key) => {
  // 当前索引
  const index = keyMap[key];
  if (!oldKeyMap.hasOwnProperty(key)) {
    // 标记新增元素
    handles.push(createAddHandle(newList[index], index));
    addCount++;
  } else {
    const oldIndex = oldKeyMap[key];
    const moveBack = moveArray.reduce((count, [from, to]) => {
      if (from > oldIndex && to <= oldIndex) {
        count++;
      }
      return count;
    }, 0);
    const currentOldIndex = oldIndex + moveBack + addCount;
    if (currentOldIndex > index) {
      handles.push(createMoveHandle(itemMap[key], currentOldIndex, index));
      moveArray.push([currentOldIndex, index]);
    }
  }
});
```

在上面，我们选择收集的移动方向的时候，是随机选择向前移动。其实选择向前移动是更好的策略。

原因在于，在新结构的遍历过程中，我们能更早的遇到需要移动的元素。否则，在每一次收集到移动的操作之后，我们还要回头重新收集其他元素

考虑如下结构:

```js
/**
 * a  b  c
 * c  a  b
 * c  b  a
 * 或者
 * b  c  a
 * b  a  c
 * /
```

### 合并移动

当我们将所有操作都放到`handles`数组中之后，如果其中有连续出现的`move`操作，满足以下条件，则可以合并:

- 起始位置，和目标位置都是连续的

- 移动的步长都是相同的

- 移动的元素个数，大于前进的步数，也就是大于向后移动的元素个数

合并的目的是减少操作的次数。比如：连续两个元素向前移动一个位置，可以看做是前面的一个元素，向后移动 2 个位置

操作如下：

- 收集要合并的操作

- 找到起始位置，也就是这一组操作中第一个元素的目标位置。这个也就是我们要移动的第一个元素

- 找到目标位置，也就是这一组操作中最后一个元素的开始位置。

我们所有的操作都是把元素从上述的起始位置移动到目标位置，移动的次数就是`move`操作的步长

另一种需要合并的操作是，在上述的结果上，出现连续相同元素的移动，可以合并为一次移动

比如：

```json
[
  {
    "item": "b",
    "from": 0,
    "to": 4
  },
  {
    "item": "b",
    "from": 4,
    "to": 3
  }
]
```

就可以合并为

```json
[
  {
    "item": "b",
    "from": 0,
    "to": 3
  }
]
```

最后就可以得到一个较为精简的 diff 数据

## 总结

收集变化因为只管，所以比较简单。难点在于合并操作，一方面是合并连续的移动操作，另一方面是合并相同元素的连续操作。

这一版本的实现只是添加了合并的操作，其他实现可以[参考 list-diff](https://github.com/abell123456/list-diff)

对于同样一组数据

```js
var oldList = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }, { id: 'e' }];
var newList = [{ id: 'c' }, { id: 'd' }, { id: 'e' }, { id: 'b' }, { id: 'a' }];
```

合并之后只有 2 步操作

```bash
[
  { item: { id: 'a' }, key: 'a', handle: 'move', from: 0, to: 4 },
  { item: { id: 'b' }, key: 'b', handle: 'move', from: 0, to: 3 }
]
```

而不合并，则有 6 步操作

```bash
[
  { type: 'insert', item: { id: 'c' }, index: 0 },
  { type: 'insert', item: { id: 'd' }, index: 1 },
  { type: 'insert', item: { id: 'e' }, index: 2 },
  { item: { id: 'a' }, index: 3, type: 'delete' },
  { type: 'insert', item: { id: 'a' }, index: 4 },
  { item: { id: 'e' }, index: 5, type: 'delete' }
]
```

当然步数不是 diff 算法的衡量标准，其影响只在于后续的 patch 操作上。只是更少的步数更符合人的思维逻辑
