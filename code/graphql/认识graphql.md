---
title: 认识graphql
date: 2020-12-18
---

## 认识 graphql

- facebook 开发
- 多个查询，一次请求，减少 http 请求数

### 创建 express 服务

> "express": "^4.17.1",
>
> "express-graphql": "^0.7.1",
>
> "graphql": "^14.0.2"

```js
const app = require('express')()
const gHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// 创建schema
const schema = buildSchema(``)
// 创建处理器
const root = {

}
app.use('/graphql', gHTTP({
  schema,
  rootValue: root
  graphiql: true,// 开发环境下启动调试环境
})).listen(3000)
```

最主要的部分就是创建 Schema，一个 Schema 用字符串定义，形式如下

```js
// 定义一个获取服务端版本的接口，返回值是一个字符串
buildSchema(`
	type Query{
		getServerVersion: String
	}
`);
```

schema 结构中最主要的就是定义一个查询结构，在上面的定义中，定了一个获取服务端版本的接口，接下来就是实现

```js
// 处理器只是一个普通的对象，对象的属性就是在schema中接口
// 每一个接口的处理器都是一个方法，
const root = {
  getServerVersion: () => "0.0.1",
};
```

通过访问上面定义的路径，我们可以看到结果如下：

![](https://pic.downk.cc/item/5fdb221e3ffa7d37b37fc322.png)

### 类型

graphql 中内置了几种类型：`Strinng`、`Int`、`Float`、`Boolean`、`ID`以及数组类型，`[类型]`

### 自定义类型

在定义 schema 的时候除了内置的查询，还可以自定义数据类型

```js
buildSchema(`
	type Account {
		name: String
		age: Int
	}
	type Query{
		getServerVersion: String
		info: Account
	}
`);

const root = {
  getServerVersion: () => "0.0.1",
  info: () => ({
    name: "张三",
    age: 18,
  }),
};
```

> 注意：在 schema 中，是不需要逗号，或者分号来分割的

![](https://pic.downk.cc/item/5fdb25153ffa7d37b3820c0b.png)

甚至可以只查询部分字段，但此时在处理器上，仍然是需要返回全部字段来跟定义的类型相对应的

![](https://pic.downk.cc/item/5fdb25713ffa7d37b382561c.png)

### 传参

为了要给接口传参，需要修改 schema 的定义，

```js
buildSchema(`
	type Account {
		name: String
		age: Int
	}
	type Query{
		getServerVersion: String
		info(id: Int): Account
	}
`);
const users = [
  {
    id: 1,
    name: "张三",
    age: 18,
  },
  {
    id: 2,
    name: "里斯",
    age: 23,
  },
];
const root = {
  getServerVersion: () => "0.0.1",
  info: ({ id }) => users.find((u) => u.id === id),
};
```

- schame 中添加对参数的声明，形式与`typescript`相似
- 在处理器上通过对象解构获取参数
- 调用接口的时候需要生命传递的参数名

结果如下：

![](https://pic.downk.cc/item/5fdb26803ffa7d37b3835e9d.png)

> 在处理器上获取参数、在调用的时候声明参数名，与 dart 中对象的构造函数的命名参数相似

**在 schema 上定义的参数类型后添加一个叹号表示参数必传**

```graphql
info(id: Int!): Acount
```

#### 二级参数

在刚才的自定义类型 Account 上添加一个带参数的属性，类型为一个返回整数的方法

```js
buildSchema(`
	type Account {
		name: String
		age: Int
		// 添加的属性
    salary(city: String): Int
	}
	type Query{
		getServerVersion: String
		info(id: Int): Account
	}
`);
```

然后需要实现这个 salary

```JS
// 实现一个方法，作为account中的一个属性
const salary = ({ city }) => {
  if (["北京", "上海", "广州", "深圳"].includes(city)) return 10000;
  return 8000;
};

const users = [
  {
    id: 1,
    name: "张三",
    age: 18,
    salary,
  },
  {
    id: 2,
    name: "里斯",
    age: 23,
    salary,
  },
];
```

在查询的时候获取 salary，graphql 会自动根据 salary 计算他的返回值

执行效果如下：

![](https://pic.downk.cc/item/5fdb29ec3ffa7d37b385f79f.png)

## 客户端访问

之前的例子中都是通过 graphql 的调试界面来获取数据的，现在编写前端代码来获取 graphql 数据

- 创建`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button onclick="getData()">获取数据</button>
    <div>
      <pre id="code"></pre>
    </div>
    <script>
      const code = document.querySelector("#code");
      function getData() {
        const query = ``;
        const variables = {};

        fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((json) => {
            code.innerText = JSON.stringify(json);
          });
      }
    </script>
  </body>
</html>
```

- 设置静态文件

```js
app.use(express.static("./public"));
```

查询的时候最主要的就是生成 query 查询语句

以服务端定义的 info 接口为例，查询语句如下：

```js
const query = `
	query Info($id: Int) {
		info(id: $id){
      name
		}
	}
`;
```

query 语句分内外两部分：

- 外层：query 加 查询接口的大驼峰写法，然后定义参数，与服务端的 schema 形式一样，唯一的区别是这里的参数名以`$`符号开头
- 内层：接口名称+参数声明+返回值字段。与在调试环境的写法一致，参数来自外层的变量

接下来是参数 variable 部分

```js
const variables = {
  id: 1,
};
```

variable 中的 id 属性会被 query 语句中的`$id`参数所捕获，并传递给 info 接口:

完整代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button onclick="getData()">获取数据</button>
    <div>
      <pre id="code"></pre>
    </div>
    <script>
      const code = document.querySelector("#code");
      function getData() {
        const query = `
          query Info($id: Int){
            info(id: $id){
              name
            }
          }
        `;
        const variables = {
          id: 1,
        };

        fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            code.innerText = JSON.stringify(json, null, 2);
          });
      }
    </script>
  </body>
</html>
```

最终效果如下：

![](https://pic.downk.cc/item/5fdb3e383ffa7d37b397340b.png)

我们还可以添加获取 salary 数据：

```js
const query = `
  query Info($id: Int){
    info(id: $id){
      name
			salary(city: "北京")
    }
  }
`;
```

或者把城市参数声明到 Info 上

```js
const query = `
  query Info($id: Int, $city: String){
    info(id: $id){
      name
      salary(city: $city)
    }
  }
`;
const variables = {
  id: 1,
  city: "成都",
};
```

最后，也可以把 query 修改成调试环境一样的形式：

```js
const query = `
  query{
    info(id: 1){
      name
      salary(city: "北京")
    }
  }
`;
```

结果都是一样的

这样，就可以直接把参数添加到 query 中

```js
const query = `
  query{
    info(id: ${id}){
      name
      salary(city: "${city}")
    }
  }
`;
```

> 一定要注意字符串符号的拼接，city 变量外面需要加引号

## 更新操作

我们在定义查询语句的 schema 的时候用的是`Query`，查询语句则用的`Mutation`

```js
const schema = buildSchema(`
 	type Account{
    name: String
    age: Int
    sex: String
    salary(city: String): Int
  }
	input AccountInput{
    name: String
    age: Int
    sex: String
  }
	type Mutation{
		updateUser(id: Int!, input: AccountInput): Account
	}
`);
```

有以下几点是需要注意的:

1. 作为查询参数存在的类型，在声明的时候使用`input`来声明
2. 哪怕这个结构已经用 type 声明也需要用 input 再声明一次，因为 type 声明的结构用于查询结构
3. 如果 schema 中没有声明 Query 结构，将会引起异常

然后需要实现 updateUser

```js
const resolver = {
  updateUser({ id, input }) {
    const index = users.findIndex((u) => u.id === id);
    if (index < 0) {
      return input;
    }
    users[index] = Object.assign({}, users[index], input);
    return users[index];
  },
};
```

操作结果如下：

![](https://pic.downk.cc/item/5fdb48933ffa7d37b39f035b.png)

在客户端请求就不赘述了，代码如下：

```js
function updateData() {
  const query = `
  mutation Update($id: Int!, $input: AccountInput){
    updateUser(id: $id, input:$input){
      name
      age
    }
  }
`;
  const variables = {
    id: 1,
    input: {
      age: 88,
    },
  };

  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
    code.innerText = JSON.stringify(json, null, 2);
  });
```

## 构造函数式声明

使用构造函数来声明类型的时候需要更多的代码量，但是可以带来更好的可维护性

### 创建 schema

```js
const { GraphQLSchema } = require("graphql");
const schema = new GraphQLSchema({
  query,
});
```

### 创建 query

```js
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const Account = new GraphQLObjectType({
  name: "Account",
  fields: {
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const users = [
  {
    id: 1,
    name: "张三",
    age: 18,
  },
  {
    id: 2,
    name: "里斯",
    age: 23,
  },
];

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    info: {
      type: Account,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve(_, { id }) {
        return users.find((u) => u.id === id);
      },
    },
  },
});
```

使用起来是一样的。

如何实现之前用 buildSchema 所声明的 salary 一样的二级方法呢

首先要在 Account 中声明 salary，其返回值是一个整数类型，所以直接声明其 type 为 GraphQLInt

```js
const Account = new GraphQLObjectType({
  name: "Account",
  fields: {
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    salary: { type: GraphQLInt },
  },
});
```

然后是跟之前一样，在 account 对象中返回你要处理的方法

```js
const salary = ({ city }) => {
  if (["北京", "上海", "广州", "深圳"].includes(city)) return 10000;
  return 8000;
};
const users = [
  {
    ...salary,
  },
];
```

接着在查询的时候表明 salary 参数，及可获取

那 salary 的参数呢？

这个时候就需要在声明 salary 的时候声明其 args

```json
salary: {
  type: GraphQLInt,
  args:{
    city:{
      type: GraphQLString
    }
  }
}
```

最终代码如下：

```js
const Account = new GraphQLObjectType({
  name: "Account",
  fields: {
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    salary: {
      type: GraphQLInt,
      args: {
        city: {
          type: GraphQLString,
        },
      },
    },
  },
});
const salary = ({ city }) => {
  if (["北京", "上海", "广州", "深圳"].includes(city)) return 10000;
  return 8000;
};

const users = [
  {
    id: 1,
    name: "张三",
    age: 18,
    salary,
  },
  {
    id: 2,
    name: "里斯",
    age: 23,
    salary,
  },
];

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    info: {
      type: Account,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve(_, { id }) {
        return users.find((u) => u.id === id);
      },
    },
  },
});

const InputUser = new GraphQLInputObjectType({
  name: "InputUser",
  fields: {
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    updateUser: {
      type: Account,
      args: {
        id: {
          type: GraphQLInt,
        },
        input: {
          type: InputUser,
        },
      },
      resolve(_, { id, input }) {
        const index = users.findIndex((u) => u.id === id);
        if (index < 0) {
          return input;
        }
        users[index] = Object.assign({}, users[index], input);
        return users[index];
      },
    },
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

app
  .use(
    "/graphql",
    graphHTTP({
      schema,
      graphiql: true,
    })
  )
  .use(require("express").static("./public"))
  .listen(3000, "as");
```

![](https://pic.downk.cc/item/5fdc1bef3ffa7d37b323f82b.png)
