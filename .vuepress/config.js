const Copyplugin = require("copy-webpack-plugin");
const build = require("./build/index");
const { isProduction, buildWithSUrge } = require("./build/env");

module.exports = {
  title: "编程小兵",
  description: "路漫漫其修远兮，吾将上下而求索",
  base: "", // base路径，用于将网站部署到非根目录下，在vue文件和md文件中通过$withBase函数访问
  dest: build.true.dest,
  chainWebpack: (config, isServer) => {
    build.rewriteCname(build.true.cname);
    if (buildWithSUrge) {
    } else if (isProduction) {
      let publicPath = "/blog/";
      publicPath = "https://cdn.jsdelivr.net/gh/changero/blog@gh-pages/";
      config.output.publicPath(publicPath);
    }
    config.plugin("copy").use(Copyplugin, [
      [
        { from: "./.vuepress/static", to: "./static" },
        { from: "./.vuepress/public", to: "." },
      ], // from 是命令的执行路径，to是生成的文件夹路径
    ]);
  },
  head: [
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
    // [
    //   'script',
    //   {
    //     defer: true,
    //     src: `https://static.cloudflareinsights.com/beacon.min.js`,
    //     'data-cf-beacon': '{"token": "d9b6c38544c04c558105cf38304c4277"}',
    //   },
    // ],
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    type: "blog",
    logo: "/hero.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "最后更新于",
    // 博客头像
    authorAvatar: "/hero.png",
    startYear: "2019",
    author: "Changero",
    huawei: false,
    nav: [
      { text: "首页", link: "/", icon: "reco-home" },
      { text: "分享", link: "/share/", icon: "reco-up" },
      { text: "记录", link: "/read/", icon: "reco-search" },
      {
        text: "编程",
        icon: "reco-menu",
        items: [
          { text: "基础", link: "/code/basic/" },
          { text: "frontend", link: "/code/frontend/" },
          { text: "node", link: "/code/node/" },
          { text: "tools", link: "/code/tools/" },
          { text: "rxjs", link: "/code/rxjs/" },
          { text: "git", link: "/code/git/" },
          { text: "docker", link: "/code/docker/" },
          { text: "electron", link: "/code/electron/" },
          { text: "python", link: "/code/python/" },
          { text: "android", link: "/code/android/" },
          { text: "flutter", link: "/code/flutter/" },
          { text: "其他", link: "/code/other/" },
          { text: "数据库", link: "/code/db/" },
          { text: "计算机网络", link: "/code/network/" },
          {
            text: 'linux',
            link: '/code/linux/linux学习笔记',
          },
        ],
      },
      {
        text: "资源导航",
        link: "/navs/",
      },
      {
        text: "联系我",
        link: "mailto://changero@126.com",
        icon: "reco-message",
      },
    ],
    subSidebar: "auto",

    sidebar: {
      "/share/": [
        {
          title: "分享",
          collapsable: true,
          children: [
            "/share/",
            "cookie、session和token.md",
            "tools.md",
            "partClub总结.md",
            "gant-design小结.md",
            "记又一次重装系统的历程.md",
            "破解wetool历程.md",
            "iterm2git别名.md",
            "一句话技巧",
            "破解CSDN无法复制代码",
            "editplus激活码",
          ],
        },
        {
          title: "白嫖的知识",
          collapsable: true,
          children: [
            "白嫖的知识/利用tunnel穿透家中的服务",
            "白嫖的知识/利用cloudflare+backblaze实现免费图库",
            "白嫖的知识/利用cloudflare实现微信认证",
          ],
        },
        {
          title: "github",
          collapsable: true,
          children: [
            "github/how-to-create-github-pages.md",
            "github/github徽章",
            "github/gpg",
            "github/通过actions部署应用到surge",
            "github/actions中获取tag",
          ],
        },
        {
          title: "工具",
          collapsable: true,
          children: [
            "tools/youtube-dl.md",
            "tools/文件共享",
            "tools/VSCode插件自备",
            "tools/chrome插件",
            "tools/windows包管理工具",
            "tools/Rclone挂载网盘",
          ],
        },
        {
          title: "openwrt",
          collapsable: true,
          children: ["openwrt调教历程.md"],
        },
      ],
      "/read/": [
        {
          title: "记录",
          collapsable: true,
          children: [
            "/read/",
            "学习的方法.md",
            "记录想说的话.md",
            "富爸爸穷爸爸.md",
            "《走吧，张小研》读后感.md",
            "2021离职感想",
            "我叫MT",
          ],
        },
      ],

      "/code/android/": [
        "/code/android/",
        "问题集合",
        "abd命令简介",
        "Android手册",
      ],
      "/code/basic/": [
        {
          title: "基础",
          collapsable: true,
          children: ["理解Unicode与UTF-8.md", "什么是https证书"],
        },
        {
          title: "算法",
          collapsable: true,
          children: [
            "线性表.md",
            "全排列算法.md",
            "二叉堆",
            "js实现一个栈",
            "JS实现中缀表达式转后缀表达式",
            "diff算法",
          ],
        },
        {
          title: "加解密",
          collapsable: true,
          children: ["basic_encryption"],
        },
      ],
      "/code/db/": [
        {
          title: "mongodb",
          collapsable: true,
          children: [
            "mongodb/基础命令.md",
            "mongodb/操作符",
            "mongodb/联表查询",
          ],
        },
        {
          title: "graphql",
          collapsable: true,
          children: ["graphql/认识graphql.md"],
        },
      ],
      "/code/rxjs/": [
        "/code/rxjs/",
        {
          title: "学习心得",
          collapsable: true,
          children: ["creator.md", "pipeable.md"],
        },
        {
          title: "别人的资源",
          collapsable: true,
          children: [],
        },
      ],
      "/code/frontend/": [
        {
          title: "前端",
          collapsable: true,
          children: [
            "/code/frontend/",
            "简单实现一个函数柯里化.md",
            "babel7入门级指南",
            "两种函数组合方式.md",
            "理解commonJS模块加载以及循环依赖的问题.md",
            "IFC.md",
            "Date对象时区转化.md",
            "自定义标签.md",
            "确定页面rem大小的两种思路.md",
            "css/gulp-less处理antd中的less引用.md",
            "浏览器table布局策略.md",
            "promise and generator.md",
            "创建scope包.md",
            "使用JS访问摄像头.md",
            "认识webworker和websocket",
            "全屏API-FullScreen",
            "前端工程化-代码规范",
            "css/css效果",
            "HTML技巧",
            "使用ShapeDetectionAPI完成人脸识别",
            "微信小程序传递FormData格式的数据",
            "文件系统",
            "正则断言速记",
          ],
        },
        {
          title: "js系列",
          collapsable: true,
          children: [
            "javascript/JS实现复制文字加版权",
            "javascript/Object禁止对象扩展的方法比较.md",
            "javascript/PromiseA+实现",
            "javascript/js沙箱",
            "javascript/手写实现bind,apply方法",
            "javascript/微前端基础架构实现",
            "javascript/浏览器2020",

            "javascript/运行时",
            "javascript/v8引擎",
            "javascript/内存管理-如何处理常见的内存泄露",
          ],
        },
        {
          title: "webpack系列",
          collapsable: true,
          children: [
            "webpack/webpack",
            "webpack/如何编写一个webpack的loader",
            "webpack/webpack的publicPath",
            "webpack/HMR",
            "webpack/webpack之Dll技术",
          ],
        },
        {
          title: "typescript",
          collapsable: true,
          children: [
            "typescript/收集的部分问题及解决方法.md",
            "typescript/生成d.ts.md",
          ],
        },
        {
          title: "vue",
          collapsable: true,
          children: ["vue/vue项目实战课笔记", "vue/手写mini-vue"],
        },
        {
          title: "react",
          collapsable: true,
          children: [
            "react/hooks.md",
            "react/stateless组件如何通过静态方法更新.md",
            "react/useCallBack和useMemo.md",
            "react/React18.md",
            "react/hooks简易实现",
            "react/新的react-jsx转换器",
          ],
        },
        {
          title: "react-native",
          collapsable: true,
          children: [
            "react-native/搭建开发环境（windows篇）.md",
            "react-native/搭建开发环境（mac篇-IOS）.md",
            "react-native/搭建开发搭建（mac篇-安卓）.md",
            "react-native/native必知必会.md",
            "react-native/pod安装.md",
            "react-native/CodePush.md",
            "react-native/MutilEnvironment.md",
            "react-native/安卓打包RN出现资源重复的问题.md",
            "react-native/解决XCode12不兼容rn的问题",
            "react-native/RN根据环境加载babel插件",
            "react-native/React-Native学习笔记",
            "react-native/RN第三方包",
            "react-native/上架苹果应用方式的对比",
            "react-native/adb连接第三方模拟器",
            "react-native/调试FAQ",
          ],
        },
        {
          title: "web.dev",
          collapsable: true,
          children: ["webdev/js中的this", "webdev/用js读取文件"],
        },
        {
          title: "2分钱学前端图形学",
          collapsable: true,
          children: [
            "graph/前端必懂的数学知识和Canvas",
            "graph/H5游戏开发入门",
          ],
        },
      ],
      "/code/node/": [
        {
          title: "配置",
          collapsable: true,
          children: ["nvm.md", "node-sass安装", "Express"],
        },
        {
          title: "文章",
          collapsable: true,
          children: [
            "post/node-commander",
            "post/Nodejs+OBS直播服务器搭建总结",
            "post/pm2入门指北",
            "post/yarn workspaces总结",
            "post/使用yarn搭建一个能同时跑vue2、vue3、react的monorepo项目",
            "post/关于nusage的说明",
            "post/什么是Bundless",
          ],
        },
        {
          title: "工具",
          collapsable: true,
          children: [
            "lerna.md",
            "yargs.md",
            "husky",
            "lint-staged",
            "nexe介绍",
          ],
        },
        {
          title: "消息服务器开发",
          collapsable: true,
          children: [
            "/code/node/socket-server/",
            "socket-server/net",
            "socket-server/tcp双向通信",
            "socket-server/简易聊天室",
            "socket-server/socket.io入门",
            "socket-server/socket.io自定义事件与认证",
            "socket-server/socket命名空间",
            "socket-server/消息推送",
          ],
        },
      ],
      "/code/git/": [
        {
          title: "git经验分享",
          collapsable: true,
          children: [
            "git常用命令.md",
            "git撤销操作.md",
            "git子模块.md",
            "git代理设置.md",
            "如何关联指定分支",
            "自己搭建git服务器",
            "git服务器接受到更新",
          ],
        },
      ],
      "/code/docker/": [
        {
          title: "遇到过的问题",
          collapsable: true,
          children: ["docker安装及加速器和镜像", "ubuntu容器设置启动脚本.md"],
        },
      ],
      "/code/electron/": [
        {
          title: "electron",
          collapsable: true,
          children: ["解决electron下载问题.md"],
        },
      ],
      "/code/other/": [
        {
          title: "其他",
          collapsable: true,
          children: ["nginx配置spa"],
        },
      ],
      "/code/linux/": [
        {
          title: '学习笔记',
          collapsable: true,
          children: [
            'linux学习笔记',
            '史上最牛的Linux视频教程.md',
          ],
        },
        {
          title: '备忘录',
          collapsable: true,
          children: [
            'harbor搭建及证书生成',
            'centos搭建k8s',
            'portainer管理多台主机',
            'linux修改系统时区',
          ],
        },
      ],
      "/code/python/": [
        {
          title: "python",
          collapsable: true,
          children: [
            "python如何安装第三方库.md",
            "python模块",
            "python文件操作手册",
            "python操作excel",
            "单例模式",
            "读写csv文件",
            "python中的时间模块",
          ],
        },
        {
          title: '相关库',
          collapsable: true,
          children: [
            "numpy"
          ]
        }
      ],
      "/code/flutter/": [
        {
          title: "flutter",
          collapsable: true,
          children: ["mac下Flutter开发环境搭建.md"],
        },
      ],
      "/code/network/": [
        {
          title: "计算机网络",
          collapsable: true,
          children: ["图解计算机网络.md"],
        },
      ],
      "/code/tools/": [
        {
          title: "工具",
          collapsable: true,
          children: ["/code/tools/", "Deno"],
        },
      ],
    },
    lastUpdated: "最后更新于",
    blogConfig: {
      category: {
        location: 2,
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
      },
    },
  },
};
