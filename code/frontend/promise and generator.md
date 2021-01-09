---
title: promise and generator
date: 2020-04-02
categories:
  - frontend
tags:
  - promise
  - generator
---

```js
function spawn(generatorFunc) {
  // 获取到迭代器
  const gen = generatorFunc();
  function getResult(behavior, args) {
    var result;
    try {
      result = gen[behavior](args);
    } catch {
      return Promise.reject();
    }
    if (result.done) {
      return result.value;
    } else {
      return Promise.resolve(result.value).then(onFilFull, onFail);
    }
  }

  var onFilFull = getResult.bind(getResult, "next");
  var onFail = getResult.bind(getResult, "throw");
  return onFilFull();
}

spawn(function*() {
  for (var i = 1; i < 20; i++) {
    const k = yield i;
    console.log(k);
  }
});
```
