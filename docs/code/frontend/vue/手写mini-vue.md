---
title: 手写mini-vue
date: '2022-04-23 21:59:08'
categories:
  - vue
lang: zh-cn
---

## rollup

因为项目本身需要采用 ES6 语法，以及其他的模块化管理的功能，这里采用 rollup 来进行管理，首先安装`rollup`

```bash
npm install rollup rollup-plugin-babel @babel/core @babel/preset-env rollup-plugin-serve -D
```

- rollup：项目管理工具本身
- rollup-plugin-babel： 通过该插件调用 babel 对 js 进行语法转义
- @babel/core：babel 核心
- @babel/preset-env：babel 的预设
- rollup-plugin-serve：启动服务

配置 babel，需要创建`.babel.js`

```js
module.exports = {
  presets: ['@babel/preset-env'],
};
```

接着创建 rollup 配置文件`rollup.config.js`

```js
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
  input: './src/index.js',
  output: {
    format: 'umd', // 打包的模块类型，umd、amd、commonjs、esModule等，浏览器环境下优先选择umd
    name: 'Vue', // 全局变量的名字
    file: 'dist/umd/vue.js', // 打包后的文件位置
    sourcemap: true,
  },
  plugins: [
    // 配置babel不解析node_modules下的文件
    babel({
      exclude: 'node_modules/**',
    }),
    // 启动本地服务
    serve({
      // 启动端口
      port: 3000,
      // 已那个文件夹作为根路径
      contentBase: '',
      // 打开那个页面
      openPage: './index.html',
    }),
  ],
};
```

添加一个 html 文件，也就是在 serve 中配置的 openPage，去加载打包后的文件即`dist/umd/vue.js`

最后启动 rollup 加载这个配置文件就可以了

```bash
npx rollup -c -w
```

也或者在`package.json`文件中，配置成一个脚本来执行

```json
{
  "scripts": {
    "dev": "rollup -c -w"
  }
}
```

然后通过 npm 启动，效果是一样的

```bash
npm run dev
```

## Vue 的机制

在 Vue2 中创建一个 Vue 实例是通过如下形式：

```js
new Vue({
  data() {
    return {};
  },
  methods: {},
  template: '',
  watch: {},
  components: {},
});
```

这种形式被称作`optional api`,相对的是 vue3 的 api 形式，叫`composition api`，意思是可组合的 api

创建 Vue 的构建函数

```js
export default function Vue(options) {
  this._init(options); // 入口，做初始化
}
/**
 * 初始化
 * @param {*} options
 */
Vue.prototype._init = function _init(options) {};
```

显然这种形式把`prototype` 的属性写在一起的耦合度是很高的，尤其是当后面需要扩展的函数非常多的时候。因此在这里，我们将原型上的功能拆解出去，做成一个独立的模块，方便维护，通过提供了扩展性

```js
// _init.js
/**
 * 初始化
 * @param {*} options
 */
export default function initMixin(Vue) {
  Vue.prototype._init = function _init(options) {
    const vm = this;
    vm.$options = options;
  };
}
```

在获取到创建是的 options 之后，要做的第一件事就是去建立相应是的数据，也就是拦截数据的操作，我们单独创建一个`state.js`来做这个事

```js
// state.js
export function initState(vm) {
  const opts = vm.$options;
  if (opts.props) {
    initProps(vm);
  }
  if (opts.methods) {
    initMethods(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
}

// _init.js
initState(vm);
```

接下来就是很对每一种属性去做对应的初始化动作

```js
/**
 * 初始化data
 * @param {*} vm
 */
function initData(vm) {
  const data = vm.$options.data;

  const vmData = typeof data === 'function' ? data.call(vm) : data;
  // 拿到data以后就是对data做观测
  observe(vmData);
  // 添加到实例上面
  vm._data = vmData;
}
```

### 对象拦截

在拿到 vmData 以后，就应该去对数据做响应式的动作，我们通过一个 observe 模块来完成

```js
// observe/index.js
class Observe {
  constructor(data) {
    // 使用defineProperty重新定义数据
    this.walk(data);
  }
  walk(data) {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

function defineReactive(data, key, value) {
  let currentValue = value;
  observe(currentValue);
  Object.defineProperty(data, key, {
    get() {
      return currentValue;
    },
    set(newValue) {
      if (newValue === currentValue) return;
      observe(newValue);
      currentValue = newValue;
    },
  });
}

export default function observe(data) {
  // 只对对象数据进行观测
  if (typeof data !== 'object' || data === null) {
    return;
  }
  return new Observe(data);
}
```

### 数组拦截

我们首先需要在`constructor`中判断当前数据是不是数组元素，

```js
constructor(){
  if (Array.isArray(data)) {
      // 观测对象数组
      this.observeArray(data);
    } else {
      // 使用defineProperty重新定义数据
      this.walk(data);
    }
}
```

接着会数组中的元素进行观测

```js
observeArray(){
   data.forEach((item) => {
      observe(item);
    });
}
```

接着我们再对数组中的方法进行拦截，因为在实际开发的时候，我们更多的是使用数组上的方法去实现功能，例如:push、pop 等

```js
// array.js
// 先拿到数组原型
const oldArrayPrototypeMethods = Array.prototype;
// 导出一个以此对象为原型的对象， 这样这个对象就可以调用所有数组原型上的方法
export const arrayMethods = Object.create(oldArrayPrototypeMethods);
```

然后我们就可以将观测的数组的`__proto__`属性指向这个对象

```js
if (Array.isArray(data)) {
  data.__proto__ = arrayMethods;
  // 观测对象数组
  this.observeArray(data);
}
```

接下来就分别对数组方法进行扩展

```js
// array.js
// 主要对这个7个数组的方法进行拦截
const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'reverse',
  'sort',
];

methods.forEach((method) => {
  arrayMethods[method] = function(...args) {
    const result = oldArrayPrototypeMethods[method].apply(this, args);
    let inserted = null;
    // 对新加进来的数据进行观测
    switch (method) {
      case 'push':
      case 'unshift': // 添加的是对象类型，要监测
        inserted = args;
      case 'splice':
        inserted = args.slice(2);
      default:
        break;
    }

    if (inserted) {
      this.__ob__.observeArray(inserted);
    }

    return result;
  };
});
```

如上面代码，当我们在对数组进行操作的时候，添加的元素也可能是对象，因此，我们要对这些对象重新进行观测

这里又使用了 hack 的方式来实现

首先在`constructor`中，对观测的数据原型上添加一个`__ob__`的属性

```js
constructor(data){
Object.defineProperty(data, '__ob__', {
      enumerable: false,
      configurable: false,
      value: this,
    });
}
```

这里为什么要用`Object.defineProperty`方式,原因主要在于，防止对这个数据进行观测的时候，在`walk`阶段将`__ob__`给枚举出来，发现其实一个对象，因此又会对这个对象进行观测，以此导致死循环

回到上面对数据添加一组数据的操作上，当我们拿到新添加的一组数据了之后我们就可以继续观测这个数据，如上所示：`this.__ob__.observeArray(inserted)`

这里为什么`this`上有`__ob__`属性，是因为我们在`Observe`一个数组的时候给他添加的，而当我们在对这个数组进行操作的时候，方法的 this 指向的就是该数组，因此在重写的数组方法上，我们可以拿到`__ob__`，也就是数组的观察对象

### 属性代理

在 initData 阶段，我们将观测的数据绑定到了实例的`_data`属性上，这样用户在使用的时候，需要通过调用实例上的`_data`属性来获得 data 中的值

下面就来实现通过实例本身访问 data 数据的代理方法

```js
// state.js
function initData() {
  vm._data = vmData;
  for (let key in vmData) {
    // 表示通过vm去获取key属性的时候，到_data属性上去找
    proxy(vm, '_data', key);
  }
  observe(vmData);
}
```

快速实现一下 proxy 方法，还是用到`Object.defineProperty`

```js
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key];
    },
    set(value) {
      vm[target][key] = value;
      return true;
    },
  });
}
```

## 渲染逻辑

在 Vue 构造函数中，可以接收`template`或者`render`作为视图层数据，为了保证统一性，template 最终也会变成`render`函数的格式，即：

```js
new Vue({
  render(h) {
    return h('div', {});
  },
});
```

编译过程

- 如果有 render 函数，则使用 render 函数作为视图生成器
- 如果没有，就看有没有 template，将 template 转换成 render 函数
- 如果 template 也没有，就会去找 el 对应元素的内容作为 template 进行转换

```js
// init阶段
if (vm.$options.el) {
  this.$mount(el);
}
// 如果没有el，就需要手动去调用$mount方法

Vue.prototype.$mount = function $mount(el) {
  const vm = this;
  const elem = document.querySelector(el);
  let tem = null;
  if (!vm.$options.render) {
    let template = vm.$options.template;
    if (el && !template) {
      template = el.outerHTML;
    }
    const render = compuileToFunctions(template);
    vm.$options.render = render;
  }
};
```

`compuileToFunctions`方法的实现详见[教程](https://www.javascriptpeixun.cn/course/2932/task/181745/show#)

整体实现是通过正则匹配，拿到开始和结束标签转化成 ast，在通过 ast 将其转化成`createtElement`方法的调用形式

## 挂载到 dom

拿到 render 函数以后，就可以执行挂载的动作

render 函数格式大致如下，通过 with 语法，实现在 this 上查找变量：

```js
vm.$options.render = new Function(`with(this){
  _c('div', {
    style: {},
    name: ''
  },
    "hello _s(adress) _v(text)"
  )
}`);
```

```js
// dom.js
export function renderMixin(Vue) {
  // 用于生成标签
  Vue.prototype._c = function() {
    return createElement();
  };
  Vue.prototype._s = function(value) {
    if (!value) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return value;
  };
  Vue.prototype._v = function(text) {
    return vnode(undefined, undefined, undefined, undefined, text);
  };
  Vue.prototype._render = function() {
    const vm = this;
    const render = vm.$options.render;
    const vnode = render.call(vm);
    return vnode;
  };

  function vnode(tag, data, key, children, text) {
    return {
      tag,
      data,
      key,
      children,
      text,
    };
  }
}
```

```js
// lifecycle.js
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function(vnode) {
    // 实现更新的关键方法
    patch(vm.$el, vnode);
  };
}
export function mountComponent(vm, el) {
  vm._update(vm._render());
}
```

patch 方法

```js
function patch(oldVNode, vnode) {
  // 将vnode,转换成真实dom
  // 遍历vnode，生成element，再插入
}
```
