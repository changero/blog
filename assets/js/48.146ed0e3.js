(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{100:function(e,s,a){"use strict";a.r(s);var v=a(0),_=Object(v.a)({},function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h2",{attrs:{id:"组件重构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组件重构","aria-hidden":"true"}},[e._v("#")]),e._v(" 组件重构")]),e._v(" "),a("p",[e._v("花了一周的时间，把原本写在零件俱乐部项目中，所用到的表单组件迁移到了"),a("code",[e._v("gant-design")]),e._v(",并使用高阶组件重构了一下。高阶主要复用的逻辑仅仅是对可读模式的维护，以及读写模式的切换。而采用compose通过高阶组件来达到逻辑复用的原因是，目前compose有足够的api来应付这样的场景，而如果采用hooks，那么自定义hooks编写的代码量就够花些时间了。而且最关键的一点是，通过"),a("code",[e._v("recompose")]),e._v("里面的branch方法可以很好的分离读状态的显示和写状态的显示，这样可以达到的效果就是被组合的组件只需要实现写模式下的状态以及逻辑，我觉得这是hooks还无法做到的。")]),e._v(" "),a("p",[e._v("组件完成以后，一个非常重要的问题就是发布的问题。研究了一下"),a("code",[e._v("ant-design")]),e._v("的构建方式，可以发现是由"),a("code",[e._v("ant-tools")]),e._v("维护的，通过"),a("code",[e._v("gulp")]),e._v("来实现。于是决定重走gulp路。")]),e._v(" "),a("h2",{attrs:{id:"gulp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gulp","aria-hidden":"true"}},[e._v("#")]),e._v(" gulp")]),e._v(" "),a("p",[e._v("gulp还是我在刚入行的时候接触的一个任务管理工具，接触后不久，就被webpack替代，因为webpack的功能实在太强。这俩也经常被拿来比较，我的使用感受就是两者之间并没有必然的关联，实在没有可比性，甚至可以通过来gulp控制webpack的配置及启用。")]),e._v(" "),a("p",[e._v("在前端的远古时候，我们是直接通过编写三剑客来完成任务，过程繁琐而且低效。后来有些搞事的哥们弄出了各种各样的编译器，比如编译js的"),a("code",[e._v("babel")]),e._v("和"),a("code",[e._v("ts")]),e._v("，编译css的postCss或者是css的预编译器，图片的处理工具，各种文件压缩工具等等等。而每一种编译工具都有对应的命令行使用方式或者通过配置文件的使用方式。这虽然让我们coding的效率和体验增加了，但也带来了其他烦恼。这个时候gulp的出现解决了这些繁琐的操作，而只需要把这些操作转化成一个个的任务定义在gulp中交给gulp来执行就可以了。所以这就是gulp的作用，帮我们从繁琐的工具的使用中解脱。")]),e._v(" "),a("p",[e._v("而"),a("strong",[e._v("webpack")]),e._v("也能做到这些工作，不过webpack不是定义一个个的任务去处理，webpack带来的更大的价值是它的模块化加载系统，在此之前也有一个模块化系统叫"),a("code",[e._v("browserify")]),e._v("，或者浏览器端的require.js。webpack的工作是从entry出发，所遇到的所有资源都当作一个module去处理，内部都是通过js来吧资源加载到内存，比如加载css,图片,csv文件等等。如果发现了这些资源，就会去module中匹配是否有对应的loader来处理。比如js用babel-loader调用babel内核来处理。css文件就用css-loader、style-loader等等来处理，插入到html中。")]),e._v(" "),a("p",[e._v("总的说来各有有特点，一般情况下使用webpack是一个不错的选择，不过这次的项目中的编译任务是只编译js而不做模块化处理，并且输出到各自对应的文件夹中，互不影响，保持原有的文件结构不变。于是跟ant-tools一样采用gulp。")]),e._v(" "),a("p",[a("strong",[e._v("一些改变：")])]),e._v(" "),a("p",[e._v("1、 gulp升级到"),a("code",[e._v("^4.0.0")]),e._v("以后，新增了2个用于处理任务队列的方法,"),a("code",[e._v("series")]),e._v("和"),a("code",[e._v("parallel")]),e._v("。")]),e._v(" "),a("p",[e._v("series用于同步执行任务，依据传入的顺序。")]),e._v(" "),a("p",[e._v("parallel用于并行执行任务，所有任务都完成以后才完成。")]),e._v(" "),a("p",[e._v("2、 另一个改变是gulpfile可以直接使用babel或者ts来编写。只需要做一小点改动")]),e._v(" "),a("p",[e._v("如果是ts爱好者，修改文件名为"),a("code",[e._v("gulpfile.ts")]),e._v(",并安装"),a("code",[e._v("ts-node")])]),e._v(" "),a("p",[e._v("如果使用babel，修改文件名为"),a("code",[e._v("gulpfile.babel.js")]),e._v("，并安装"),a("code",[e._v("@babel/register")]),e._v("解析器")]),e._v(" "),a("p",[e._v("3、 定义任务的方式，除了通过task定义任务，现在也可以直接通过exports、或者export来导出方法，方法名就是任务名")]),e._v(" "),a("h2",{attrs:{id:"less"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#less","aria-hidden":"true"}},[e._v("#")]),e._v(" less")]),e._v(" "),a("p",[e._v("less的编译没有什么好说的，使用gulp-less就可以了，其他的语言特性查看"),a("a",{attrs:{href:"https://www.html.cn/doc/less/features/",target:"_blank",rel:"noopener noreferrer"}},[e._v("文档"),a("OutboundLink")],1),e._v("，只是在autoprefixer中，不在支持browsers参数了，而是建议写在package.json中。")]),e._v(" "),a("p",[e._v("另一个需要注意的问题就是如果组织好less文件的目录结构。因为不像在webpack中，写应用程序一样，一个less-loader搞定。如果来less中乱引用，可能造成文件体积的爆炸，因为，每一个less去引用其他less文件都会复制一份css样式过来，导致重复的样式定义。经过的研究得出，mixin和变量的定义以及公共样式的定义需要在不同的文件内完成。这样当有其他组件在有需要的时候，基本上只需要引入mixin和不定义变量的文件就可以了，公共样式只会输出在他自己的位置")]),e._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结","aria-hidden":"true"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),a("p",[e._v("gulp和less使用起来还是比较简单，只是对于这个只是体系的工具使用较少，还不熟练，还需要学习更多的工具来辅助工作")])])},[],!1,null,null,null);s.default=_.exports}}]);