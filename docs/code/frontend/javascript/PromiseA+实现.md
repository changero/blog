---
title: PromiseA+规范未完全实现
date: "2021-06-01 23:02:02"
categories:
  - 前端
lang: zh-cn
---

## PromiseA+实现

```js
const PENDING = Symbol("pending");
const FULFILLED = Symbol("fulfilled");
const REJECTED = Symbol("rejected");

function Promise(executor) {
  this.status = PENDING;
  this.value = undefined;
  this.reason = undefined;
  this.onFulfilledCallback = [];
  this.onRejectedCallback = [];
  const target = this;

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (target.status === PENDING) {
        target.status = FULFILLED;
        target.value = value;
        target.onFulfilledCallback.forEach((cb) => cb(value));
      }
    });
  }

  function reject(reason) {
    setTimeout(() => {
      if (target.status === PENDING) {
        target.status = REJECTED;
        target.reason = reason;
        target.onRejectedCallback.forEach((cb) => cb(reason));
      }
    });
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject("Error: 循环调用");
  }

  if (x instanceof Promise) {
    if (x.status === PENDING) {
      x.then(
        (y) => {
          resolvePromise(promise2, y, resolve, reject);
        },
        (reason) => {
          reject(reason);
        }
      );
    } else {
      x.then(resolve, reject);
    }
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      const then = x.then; // thenable
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            resolvePromise(promise2, y, resolve, reject);
          },
          (reason) => reject(reason)
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }
}

Promise.prototype.then = function then(onFulfill, onReject) {
  onFulfill = onFulfill || ((v) => v);
  onReject =
    onReject ||
    ((v) => {
      throw v;
    });
  let target = this;
  if (this.status === FULFILLED) {
    return (newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfill(this.value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  } else if (this.status === REJECTED) {
    return (newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onReject(this.reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  } else if (this.status === PENDING) {
    return (newPromise = new Promise((resolve, reject) => {
      target.onFulfilledCallback.push((value) => {
        try {
          const x = onFulfill(value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      target.onRejectedCallback.push((reason) => {
        try {
          const x = onReject(reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
};

Promise.prototype.catch = function catchy(reject) {
  return this.then(null, reject);
};

Promise.all = function all(promises) {
  const count = promises.length;
  let res = 0;
  const values = [];
  return new Promise((resolve, reject) => {
    function gen(index, value) {
      res++;
      values[index] = value;
      if (res === count) {
        resolve(values);
      }
    }
    promises.forEach((promise, index) => {
      promise
        .then(() => {
          gen(index, value);
        }, reject)
        .catch(reject);
    });
  });
};

Promise.race = function race(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => p.then(resolve, reject));
  });
};

// new Promise((resolve, reject)=>{
//   console.log('exec')
//   setTimeout(()=>{
//     reject( new Error('123'))
//   }, 2000)
// }).then((v)=>{
// console.log(v)
// }, (r) => {
//   console.log('r :>> ', r);
// })
// console.log('a')

Promise.all([
  new Promise((r) => setTimeout(() => r(3), 3000)),
  new Promise((r) => setTimeout(() => r(4), 4000)),
  new Promise((r) => setTimeout(() => r(2), 2000)),
  new Promise((r) => setTimeout(() => r(1), 1000)),
]).then(
  (value) => console.log("value :>> ", value),
  (reason) => console.error(reason)
);

// all
// race
// allSettled
// any
// try
// resolve
// reject
```
