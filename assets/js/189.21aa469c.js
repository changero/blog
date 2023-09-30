(window.webpackJsonp=window.webpackJsonp||[]).push([[189],{543:function(v,t,_){"use strict";_.r(t);var a=_(14),r=Object(a.a)({},(function(){var v=this,t=v._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"个人信息"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#个人信息"}},[v._v("#")]),v._v(" 个人信息")]),v._v(" "),t("ul",[t("li",[v._v("陈滢蓼/男/1994")]),v._v(" "),t("li",[v._v("本科/信息与计算科学")]),v._v(" "),t("li",[v._v("工作年限：5年")]),v._v(" "),t("li",[v._v("期望职位：前端开发")])]),v._v(" "),t("h1",{attrs:{id:"联系方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#联系方式"}},[v._v("#")]),v._v(" 联系方式")]),v._v(" "),t("ul",[t("li",[v._v("手机：151-0844-7254")]),v._v(" "),t("li",[v._v("Email：changero@126.com")]),v._v(" "),t("li",[v._v("QQ/微信号：862170589/cr862170589")])]),v._v(" "),t("h1",{attrs:{id:"自我评价"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自我评价"}},[v._v("#")]),v._v(" 自我评价")]),v._v(" "),t("p",[v._v("5年前端开发经验，以围绕React开发为主，有过1年半的vueJs、小程序开发经验。理解AJAX运作机制、对fetch有一定了解，能利用nodejs解决部分开发过程中遇到的问题，也期待未来的工作里有机会将nodejs作为开发的一环。熟练掌握js中的基本概念，理解项目中的工程化、模块化、组件化，暂无SSR经验。熟练使用git,svn版本管理工具。多年的webpack、gulp、ES6、antd、redux、react-redux、react-router等工具的使用经验，但目前更倾向于使用其他工具搭建开发环境。爱好学习和善于思考，能够有意识的在项目中引入新的工具来提高开发效率和开发体验，解决开发过程中遇到的问题")]),v._v(" "),t("h1",{attrs:{id:"工作经历"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#工作经历"}},[v._v("#")]),v._v(" 工作经历")]),v._v(" "),t("h2",{attrs:{id:"甘棠软件系统-上海-有限公司-2018年12月-至今"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#甘棠软件系统-上海-有限公司-2018年12月-至今"}},[v._v("#")]),v._v(" 甘棠软件系统（上海）有限公司 （ 2018年12月 ~ 至今）")]),v._v(" "),t("h3",{attrs:{id:"开源项目-gantd"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开源项目-gantd"}},[v._v("#")]),v._v(" 开源项目(gantd)")]),v._v(" "),t("p",[v._v("主要用于公司项目使用的开源组件库，部分组件基于antd进行二次封装的组件，"),t("a",{attrs:{href:"https://github.com/gantFDT/gant-design",target:"_blank",rel:"noopener noreferrer"}},[v._v("仓库地址"),t("OutboundLink")],1),v._v("。在项目中主要负责开发了表单组件以及表格组件")]),v._v(" "),t("p",[v._v("1、表单组件")]),v._v(" "),t("ul",[t("li",[v._v("实现所有表单组件可读写分离的公共功能")]),v._v(" "),t("li",[v._v("利用iconfont实现的图标选择器")]),v._v(" "),t("li",[v._v("利用本地缓存实现的带有最近选择功能的选择器")]),v._v(" "),t("li",[v._v("其他常规组件，如地址选择器、url输入框(读模式下可直接点击后跳转)、多语言输入框等等")])]),v._v(" "),t("p",[v._v("2、表格组件")]),v._v(" "),t("ul",[t("li",[v._v("可动态缩放的列")]),v._v(" "),t("li",[v._v("行拖拽")]),v._v(" "),t("li",[v._v("虚拟滚动（包括树状结构的虚拟滚动）")]),v._v(" "),t("li",[v._v("单元格编辑功能")]),v._v(" "),t("li",[v._v("其他")])]),v._v(" "),t("p",[v._v("以上功能中，以虚拟滚动尤其是树状结构的虚拟滚动的处理"),t("strong",[v._v("最为困难")]),v._v("。")]),v._v(" "),t("p",[t("strong",[v._v("首要")]),v._v("面临的问题就是"),t("strong",[v._v("高度极限")]),v._v("，往往在数据量极大的情况下（比如模拟一百万条数据），渲染的内容的高度也相应的非常大，可能会超出dom所能表示的最大高度。我所采用的解决办法就是将实际dom的高度按比例缩放成一个虚拟的高度，来模拟整个内容区域的高度，在实际滚动的过程当中，需要将滚动的高度与这个比例计算出一个虚拟的滚动高度，这样才能正确计算实际将要渲染的数据")]),v._v(" "),t("p",[v._v("第二个困难的地方在于如何渲染树状的数据。但总结起来就是三步，首先是将整个树结构按深度优先遍历得到一个平铺结构的列表，然后根据之前计算出来的实际要渲染的数据的序号来得出要渲染的数据，最后将得到的这个列表按照原始结构转化")]),v._v(" "),t("p",[v._v("当然，因为使用table来渲染本身存在性能问题，尤其在数据量大的情况下更显得卡顿，所以antdv3以前的table不适合用来展示大量数据的场景")]),v._v(" "),t("h3",{attrs:{id:"react重构前端主项目"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#react重构前端主项目"}},[v._v("#")]),v._v(" react重构前端主项目")]),v._v(" "),t("p",[v._v("项目采用react+umi+dva+ant+ant-design-pro等工具重构，该项目主要服务于各产品项目组，主要负责并处理以下任务：")]),v._v(" "),t("p",[v._v("1、基于umi/request方法封装基础请求方法，主要处理")]),v._v(" "),t("ul",[t("li",[v._v("根据接口返回的错误代码，以及请求参数，显示对应的成功/错误消息")]),v._v(" "),t("li",[v._v("维护请求队列，尤其是初次进入页面时突发的大量接口请求的情况")])]),v._v(" "),t("p",[v._v("2、获取主菜单数据，并处理为可用的数据结构。在此基础上，实现全屏展示菜单列表，面包屑自动获取及更新，历史记录等相关信息。通过配合主题切换提供不同交互形式\n3、在React Hooks正式发布之前，引入"),t("strong",[v._v("recompose")]),v._v("库重构可读写表单，提高了开发效率和开发体验\n4、设计并编写基于ant-table封装的表格组件，其为开源项目表单组件前身\n5、用于业务的图片、文件上传组件\n6、设计并完成前端缓存模块，例如选择器数据的缓存、图片地址的缓存\n7、完成部分业务页面\n8、页面顶部的全局搜索组件，当页面展示不同的业务对象数据时，搜索该业务对象对应的数据\n9、推广使用typescript，进一步提升开发体验")]),v._v(" "),t("h2",{attrs:{id:"薇信和他的小伙伴们成都信息技术有限公司-2017年3月-2018年9月"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#薇信和他的小伙伴们成都信息技术有限公司-2017年3月-2018年9月"}},[v._v("#")]),v._v(" 薇信和他的小伙伴们成都信息技术有限公司 （ 2017年3月 ~ 2018年9月 ）")]),v._v(" "),t("h3",{attrs:{id:"导购宝"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#导购宝"}},[v._v("#")]),v._v(" 导购宝")]),v._v(" "),t("p",[v._v("该项目主要解决企业管理其组织、员工，以及员工维护自己的客户等需求，项目围绕以下几个平台开发：")]),v._v(" "),t("p",[v._v("1、pc端")]),v._v(" "),t("p",[v._v("常规管理后台，用于企业管理员管理其组织、员工。负责根据UI设计图实现pc端前端效果及交互功能")]),v._v(" "),t("p",[v._v("2、企业微信端")]),v._v(" "),t("p",[v._v("借助企业微信平台开发的工作组件，员工可以在该组件中查看并回复其用户消息，以及其他如设置用户分组、标签，查看用户相应信息等功能")]),v._v(" "),t("p",[v._v("主要负责根据设计图实现前端效果及交互功能，功能包括利用轮训实现的即时消息通信以及新消息提示，员工基本信息展示、包括其小程序二维码展示，将用户引流至小程序，以及用户管理相应功能，")]),v._v(" "),t("p",[v._v("3、微信小程序端\n实际用户入口，通过扫码导购员的二维码，与该导购建立联系，实现在不需要直接添加微信好友的情况下直接沟通。")]),v._v(" "),t("h3",{attrs:{id:"智慧零售后台管理系统-商品模块"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#智慧零售后台管理系统-商品模块"}},[v._v("#")]),v._v(" 智慧零售后台管理系统-商品模块")]),v._v(" "),t("p",[v._v("负责商品模块下商品列表的增删改查，商品详情中对商品是否上架、商品名称、商品描述等属性的编辑操作。以及自定义商品属性生成对应规格，对规格的操作以及价格设置，等等。")]),v._v(" "),t("h3",{attrs:{id:"其他"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[v._v("#")]),v._v(" 其他")]),v._v(" "),t("p",[v._v("开发一些定制小程序，例如名片小程序、图书购物小程序。劫持小程序Page、App方法，以便对小程序中用户的操作行为做统计，等")]),v._v(" "),t("h2",{attrs:{id:"华西公用医疗信息服务有限公司-2015年11月-2017年3月"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#华西公用医疗信息服务有限公司-2015年11月-2017年3月"}},[v._v("#")]),v._v(" 华西公用医疗信息服务有限公司 （ 2015年11月-2017年3月）")]),v._v(" "),t("h3",{attrs:{id:"题库管理系统"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#题库管理系统"}},[v._v("#")]),v._v(" 题库管理系统")]),v._v(" "),t("p",[v._v("该系统由管理员制定好特定的题目并添加进题库中，接着就可以创建调查问卷，创建的调查问卷均通过题库中的题目自由组合而成。问卷在未发布状态下可编辑、查看。发布后，由管理员发布问卷的地址、或者公布问卷的二维码，民众可通过该地址或二维码访问问卷并提交答题")]),v._v(" "),t("p",[v._v("在该项目中主要负责：")]),v._v(" "),t("p",[v._v("1、题库系统前端界面及交互，")]),v._v(" "),t("ul",[t("li",[v._v("管理员通过该系统来创建题目，题目的类型包含常见的表单如输入类型，多选类型、单选类型，管理员可以自己添加选择项。")]),v._v(" "),t("li",[v._v("创建调查问卷，也即从题库中选择题目，在创建好的调查问卷未发布的情况下，可以对问卷重新编辑")])]),v._v(" "),t("p",[v._v("2、问卷的移动端页面")]),v._v(" "),t("h3",{attrs:{id:"其他项目"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#其他项目"}},[v._v("#")]),v._v(" 其他项目")]),v._v(" "),t("p",[v._v("如网络门诊（一个在线就诊系统）、CUBE管理系统（一个统计科室学员、实习生完成情况，生成数据报表的系统），医疗信息指标集系统")]),v._v(" "),t("h1",{attrs:{id:"技能清单"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#技能清单"}},[v._v("#")]),v._v(" 技能清单")]),v._v(" "),t("ul",[t("li",[v._v("基本技能:   Html/CSS/Javascript")]),v._v(" "),t("li",[v._v("前端框架：React")]),v._v(" "),t("li",[v._v("UI框架：Antd")]),v._v(" "),t("li",[v._v("工具、库：Node/Gulp/Webpack/LeSS/umi/dva/redux/lodash/immutablejs")]),v._v(" "),t("li",[v._v("版本管理：Git")]),v._v(" "),t("li",[v._v("其他：Docker/Mongodb/Electron/rxjs")])]),v._v(" "),t("h1",{attrs:{id:"致谢"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#致谢"}},[v._v("#")]),v._v(" 致谢")]),v._v(" "),t("p",[v._v("感谢您花时间阅读我的简历，期待能有机会和您共事。")])])}),[],!1,null,null,null);t.default=r.exports}}]);