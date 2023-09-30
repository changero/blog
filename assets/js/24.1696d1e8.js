(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{294:function(t,s,a){t.exports=a.p+"assets/img/$type.78d3139a.png"},390:function(t,s,a){"use strict";a.r(s);var e=a(14),n=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"数据库命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据库命令"}},[t._v("#")]),t._v(" 数据库命令")]),t._v(" "),s("h3",{attrs:{id:"查看所有数据库"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#查看所有数据库"}},[t._v("#")]),t._v(" 查看所有数据库")]),t._v(" "),s("blockquote",[s("p",[t._v("show dbs")])]),t._v(" "),s("h3",{attrs:{id:"指定数据库"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#指定数据库"}},[t._v("#")]),t._v(" 指定数据库")]),t._v(" "),s("blockquote",[s("p",[t._v("use testbd")])]),t._v(" "),s("h3",{attrs:{id:"删除数据库"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#删除数据库"}},[t._v("#")]),t._v(" 删除数据库")]),t._v(" "),s("blockquote",[s("p",[t._v("db.dropDatabase()")])]),t._v(" "),s("h2",{attrs:{id:"集合命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#集合命令"}},[t._v("#")]),t._v(" 集合命令")]),t._v(" "),s("h3",{attrs:{id:"创建用户"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#创建用户"}},[t._v("#")]),t._v(" 创建用户")]),t._v(" "),s("blockquote",[s("p",[t._v('db.createUser({ user: "admin", pwd: "admin", roles: ["readWrite", "dbAdmin"] })')])]),t._v(" "),s("h3",{attrs:{id:"创建集合"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#创建集合"}},[t._v("#")]),t._v(" 创建集合")]),t._v(" "),s("blockquote",[s("p",[t._v('db.createColection("testcoll")')])]),t._v(" "),s("h3",{attrs:{id:"删除集合"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#删除集合"}},[t._v("#")]),t._v(" 删除集合")]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.drop()")])]),t._v(" "),s("h3",{attrs:{id:"插入数据"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#插入数据"}},[t._v("#")]),t._v(" 插入数据")]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.insert({index: 1})")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.insert([{index: 2}, {index: 3}])")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.save({index: 3})")])]),t._v(" "),s("p",[s("strong",[t._v("save 方法，如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据")])]),t._v(" "),s("h3",{attrs:{id:"查询数据"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#查询数据"}},[t._v("#")]),t._v(" 查询数据")]),t._v(" "),s("p",[t._v("通过 find 可以查询符合条件的数据")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 找到所有年龄大于12的数据")]),t._v("\ndb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("testcoll"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("age")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("$gt")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 只查找一个")]),t._v("\ndb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("testcoll"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("findOne")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("index")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br")])]),s("p",[t._v("通过 project 过滤返回数据的字段")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 找到所有年龄大于12的数据,只包含name字段")]),t._v("\ndb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("testcoll"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("age")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("$gt")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 找到所有年龄大于12的数据,不包含age字段")]),t._v("\ndb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("testcoll"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("age")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("$gt")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("age")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br")])]),s("p",[t._v("默认返回的数据中都包含"),s("code",[t._v("_id")]),t._v("字段")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("$or 指定查询的多个条件")])])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.find({ $or:[{inde: 2}, {index: 3}] })")])]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("$lt、$lte、$gt、$gte 表示小于大于")])])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testbd.find({index: { $gt: 2 }})")])]),t._v(" "),s("ul",[s("li",[t._v("$in 表示值的范围")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.find({ likes: { $in: [200, 300] } })")])]),t._v(" "),s("ul",[s("li",[t._v("$exists 筛选是否包含某个字段的文档")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.find({ istop: { $exists: true } })")])]),t._v(" "),s("ul",[s("li",[t._v("嵌套查询")])]),t._v(" "),s("blockquote",[s("p",[t._v('db.testcoll.find({ "address.city":"Boston" })')])]),t._v(" "),s("ul",[s("li",[t._v("使用正则")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.find({ title: /^我/})")])]),t._v(" "),s("ul",[s("li",[t._v("$type 操作符")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.col.find({ title: { $type: 2 } })")])]),t._v(" "),s("p",[s("img",{attrs:{src:a(294),alt:"查看type对应数字"}})]),t._v(" "),s("h4",{attrs:{id:"更新数据"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#更新数据"}},[t._v("#")]),t._v(" 更新数据")]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.update({index: 2}, {index: 2, updated: true})")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.update({index: 2}, { $set: {updated: true} })")])]),t._v(" "),s("p",[s("strong",[t._v("$set直接替换，$inc 可实现数字累加，$unset 删除某个字段")])]),t._v(" "),s("p",[t._v("e.g")]),t._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# $set")]),t._v("\ndb.testcoll.insert"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("index: "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v(", age: "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# { index: 4, age: 12 }")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# $inc")]),t._v("\ndb.testcoll.update"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("index: "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(", "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$inc")]),t._v(":"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("age: "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# {index: 4, age: 17 }")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# $unset")]),t._v("\ndb.testcoll.update"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("index: "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(", "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$unset")]),t._v(":"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gae: "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# {index: 4}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br")])]),s("ul",[s("li",[t._v("修改数组中的某一项")])]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("db"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("testcoll"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("update")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("index")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("$set")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'list.0'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'newItem'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("ul",[s("li",[t._v("在不存在的时候插入，存在的时候更新")])]),t._v(" "),s("blockquote",[s("p",[t._v('db.testcoll.update({index: 5}, {index: 5, addr: "qqq"}, { upsetrt: true })')])]),t._v(" "),s("ul",[s("li",[t._v("更新找到的多条数据")])]),t._v(" "),s("blockquote",[s("p",[t._v('db.testcoll.update({index: 5}, { $set:{addr: "qq"} }, { multi: true })')])]),t._v(" "),s("ul",[s("li",[t._v("字段更名")])]),t._v(" "),s("blockquote",[s("p",[t._v('db.testcoll.update({index: 5}, { $rename: { addr: "address" } })')])]),t._v(" "),s("h3",{attrs:{id:"删除数据"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#删除数据"}},[t._v("#")]),t._v(" 删除数据")]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.remove({index: 5})")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.remove({index: 5}, {justOne: true})")])]),t._v(" "),s("p",[t._v("remove() 方法 并不会真正释放空间。 需要继续执行 db.repairDatabase() 来回收磁盘空间。")]),t._v(" "),s("p",[t._v("官方推荐使用 deleteOne() 和 deleteMany() 方法")]),t._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("db.testcoll.deleteMany"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\ndb.testcoll.deleteMany"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" age: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$lte")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("18")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\ndb.testcoll.deleteOne"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" age: "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("18")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("h3",{attrs:{id:"排序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#排序"}},[t._v("#")]),t._v(" 排序")]),t._v(" "),s("ul",[s("li",[t._v("1 升序")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.find().sort({ index: 1})")])]),t._v(" "),s("ul",[s("li",[t._v("-1 降序")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.find().sort({ index: -1 })")])]),t._v(" "),s("h3",{attrs:{id:"数量"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数量"}},[t._v("#")]),t._v(" 数量")]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.find().count()")])]),t._v(" "),s("ul",[s("li",[t._v("获取前 4 条")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.find().limit(4)")])]),t._v(" "),s("p",[t._v("e.g 找到大于且离 3 最近的一条数据")]),t._v(" "),s("blockquote",[s("p",[t._v('db.testcoll.find({ index: { "gte": 3 } }).sort({ index: 1 }).limit(1)')])]),t._v(" "),s("ul",[s("li",[t._v("跳过前面几条数据")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.find().skip(2)")])]),t._v(" "),s("h3",{attrs:{id:"聚合"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#聚合"}},[t._v("#")]),t._v(" 聚合")]),t._v(" "),s("h4",{attrs:{id:"键值去从"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#键值去从"}},[t._v("#")]),t._v(" 键值去从")]),t._v(" "),s("p",[t._v("返回值以数组形式呈现")]),t._v(" "),s("blockquote",[s("p",[t._v('db.testcoll.distinct("user")')])]),t._v(" "),s("h4",{attrs:{id:""}},[s("a",{staticClass:"header-anchor",attrs:{href:"#"}},[t._v("#")])]),t._v(" "),s("h3",{attrs:{id:"foreach"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#foreach"}},[t._v("#")]),t._v(" forEach")]),t._v(" "),s("blockquote",[s("p",[t._v('db.testcoll.find().forEach(function(doc){ print("index is: " + doc.index) })')])]),t._v(" "),s("h3",{attrs:{id:"索引"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#索引"}},[t._v("#")]),t._v(" 索引")]),t._v(" "),s("ul",[s("li",[t._v("创建索引")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.createIndex({ title: 1, description: -1 })")])]),t._v(" "),s("ul",[s("li",[t._v("查看索引")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.getIndexes()")])]),t._v(" "),s("ul",[s("li",[t._v("查看集合索引大小")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.totalIndexSize()")])]),t._v(" "),s("ul",[s("li",[t._v("删除集合所有索引")])]),t._v(" "),s("blockquote",[s("p",[t._v("db.testcoll.dropIndexes()")])]),t._v(" "),s("ul",[s("li",[t._v("删除指定索引")])]),t._v(" "),s("blockquote",[s("p",[t._v('db.col.dropIndex("索引名称")')])]),t._v(" "),s("h3",{attrs:{id:"备份恢复"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#备份恢复"}},[t._v("#")]),t._v(" 备份恢复")]),t._v(" "),s("blockquote",[s("p",[t._v("mongodump -d testcoll")])]),t._v(" "),s("blockquote",[s("p",[t._v("mongorestore --drop")])]),t._v(" "),s("h2",{attrs:{id:"导出"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#导出"}},[t._v("#")]),t._v(" 导出")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("mongodump --port 27017 --out ./backup  --db school --collection users\n# 全部备份\nmongodump --port 27017 --out ./backup\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("h2",{attrs:{id:"恢复"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#恢复"}},[t._v("#")]),t._v(" 恢复")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("mongorestore ./backup\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])])])}),[],!1,null,null,null);s.default=n.exports}}]);