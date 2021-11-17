---
title: JS实现中缀表达式转后缀表达式
date: "2021-11-17 20:45:46"
categories:
  - 算法
tags:
  - 栈
lang: zh-cn
---

## 基本结构

```js
const str = "1+(2-3)*4+10-5";

function z2h(s) {
  for (const c of s) {
    console.log(c);
  }
}

z2h(str);
```

以上实现了一个遍历的基本结构，并且打印了每一个字符，约定算式里面只会出现数字，加减乘除和括号

### 遍历到数字

```js
if (/\d/.test(c)) {
  console.log(c);
}
```

如果是数字，直接输出

<!-- more -->

### 遍历到运算符号

创建一个符号数组，方便判断

当遇到运算符号的时候，表示后面还有一个运算数，需要申明一个栈来临时存储

```js
const f = ["+", "-", "*", "/"];
const stack = [];
if (/\d/.test(c)) {
  console.log(c);
} else if (f.includes(c)) {
  stack.push(c);
}
```

### 遇到括号

左括号直接入栈

右括号则要将符号不断出栈并输出，直到出现左括号

```js
if ("(" === c) {
  stack.push(c);
} else if (")" === c) {
  let top = stack.pop();
  while (top !== "(") {
    console.log(top);
    top = stack.pop();
  }
}
```

最后栈里面可能还有顶层运算符，需要出栈并输出

这时候的代码长这样

const l = {
"+": 1,
"-": 1,
"\*": 2,
"/": 2,
"(": 0,
};

```js
const str = "1+(2-3)*4+10/5";
const f = ["+", "-", "*", "/"];
function z2h(s) {
  const stack = [];
  for (const c of s) {
    if (/\d/.test(c)) {
      console.log(c);
    } else if (f.includes(c)) {
      stack.push(c);
    } else if ("(" === c) {
      stack.push(c);
    } else if (")" == c) {
      let top = stack.pop();
      while (top !== "(") {
        console.log(top);
        top = stack.pop();
      }
    }
  }
  while (stack.length) {
    console.log(stack.pop());
  }
}
z2h(str);
```

### 多位数的情况

多位数不能够每一位都单独输出，而是应该整体输出,改一下遍历方式

```
for (let i = 0; i <= s.length - 1; i++) {
    let c = s[i];
    if (/\d/.test(c)) {
      c = s.slice(i).match(/^\d+/)[0];
      i += c.length - 1;
      console.log(c);
    }
}
```

### 处理符号

刚才只是简单的将运算符号入栈，但是还没有出栈的逻辑，除了最终出栈和遇到右括号出栈

栈中除了运算符号还有左括号，需要给每个符号添加权重，当低权重的符号入栈的时候，如果栈顶元素的权重不是比该符号权重低，则需要出栈，而左括号不需要出栈,所以我们需要一个权重表

```js
const l = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "(": 0,
};

if (f.includes(c)) {
  while (stack.length) {
    if (l[c] <= l[stack.slice(-1)[0]]) {
      console.log(stack.pop());
    } else break;
  }
  stack.push(c);
}
```

# 最终的代码

```js
const str = "1+(2-3)*4+10/5";
const f = ["+", "-", "*", "/"];
const l = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "(": 0,
};
function z2h(s) {
  const stack = [];
  for (let i = 0; i <= s.length - 1; i++) {
    let c = s[i];
    if (/\d/.test(c)) {
      c = s.slice(i).match(/^\d+/)[0];
      i += c.length - 1;
      console.log(c);
    } else if (f.includes(c)) {
      while (stack.length) {
        if (l[c] <= l[stack.slice(-1)[0]]) {
          console.log(stack.pop());
        } else break;
      }
      stack.push(c);
    } else if ("(" === c) {
      stack.push(c);
    } else if (")" == c) {
      let top = stack.pop();
      while (top !== "(") {
        console.log(top);
        top = stack.pop();
      }
    }
  }
  while (stack.length) {
    console.log(stack.pop());
  }
}

z2h(str);
```
