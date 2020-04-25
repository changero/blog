---
title: Object禁止对象扩展的方法比较
date: 2020-03-29
categories:
  - front
---

### preventExtensions

preventExtensions,禁止扩展新的属性，**不影响现有属性**

```js
var person = { name: 'xiaoming' }

Object.preventExtensions(person)

Object.getOwnPropertyDescriptors(person)
/*
name:
    value: "xiaoming"
    writable: true
    enumerable: true
    configurable: true
*/
person.age = 14

console.log(person)
/*
name: 
    xiaoming
*/

```

### seal

禁止扩展新的属性，**并且会配置已有属性的configurable为false**

```js
var person = { name: 'xiaoming' }

Object.seal(person)

Object.getOwnPropertyDescriptors(person)
/*
name:
    value: "xiaoming"
    writable: true
    enumerable: true
    注意configurable发生了变化
    configurable: false
*/
person.age = 14

console.log(person)
/*
name: 
    xiaoming
*/
```

**因此经过seal处理之后的对象，是没法对已有属性的描述符进行更改的**

### feeeze

禁止扩展新的属性，**并且会配置已有属性的configurable和writable都设置为false**

```js
var person = { name: 'xiaoming' }

Object.freeze(person)

Object.getOwnPropertyDescriptors(person)
/*
name:
    value: "xiaoming"
        writable为为false了
    writable: false
    enumerable: true
        注意configurable发生了变化
    configurable: false
*/
person.age = 14

console.log(person)
/*
name: 
    xiaoming
*/
```
