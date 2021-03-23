const path = require("path");
const Copyplugin = require("copy-webpack-plugin");

module.exports = {
  title: "编程小兵",
  description: "路漫漫其修远兮，吾将上下而求索",
  base: "", // base路径，用于将网站部署到非根目录下，在vue文件和md文件中通过$withBase函数访问
  chainWebpack: (config, isServer) => {
    const isProduction = process.env.NODE_ENV === "production";

    if (isProduction) {
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
  ],
  // evergreen: true, // 禁止转译到ES5,并且不会添加IE的polyfill
  markdown: {
    lineNumbers: true,
  },
  theme: "reco",
  themeConfig: {
    type: "blog",
    logo: "/hero.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "最后更新于",
    // 博客头像
    authorAvatar: "/hero.png",
    record: "xxxx",
    // 备案
    // record: 'ICP 备案文案',
    // recordLink: 'ICP 备案指向链接',
    // cyberSecurityRecord: '公安部备案文案',
    // cyberSecurityLink: '公安部备案指向链接',
    startYear: "2019",
    author: "Changero",
    huawei: false,
    socialLinks: [
      // 信息栏展示社交信息
      { icon: "reco-github", link: "https://github.com/changero" },
      { icon: "reco-npm", link: "https://www.npmjs.com/~reco_luan" },
    ],
    friendLink: [
      // {
      //   title: "午后南杂",
      //   desc: "Enjoy when you can, and endure when you must.",
      //   email: "1156743527@qq.com",
      //   link: "https://www.recoluan.com",
      // },
    ],
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
          { text: "数据库", link: "/code/db/" },
          { text: "计算机网络", link: "/code/network/" },
          {
            text: "linux相关教程和笔记",
            link: "/code/linux/史上最牛的Linux视频教程",
          },
        ],
      },
      {
        text: "TimeLine",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        text: "好有券",
        link: "http://quan.changero.win",
        icon: "reco-other",
      },
      {
        // text: '📧 联系我',
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
          collapsable: false,
          children: [
            "/share/",
            "cookie、session和token.md",
            "tools.md",
            "how-to-create-github-pages.md",
            "node-commander.md",
            "partClub总结.md",
            "gant-design小结.md",
            "记又一次重装系统的历程.md",
            "破解wetool历程.md",
            "https证书.md",
            "部署Heroku.md",
            "iterm2git别名.md",
            "一句话技巧",
          ],
        },
        {
          title: "工具",
          collapsable: false,
          children: [
            "tools/youtube-dl.md",
            "tools/croc",
            "tools/VSCode插件自备",
            "tools/chrome插件",
          ],
        },
        {
          title: "openwrt",
          collapsable: false,
          children: ["openwrt调教历程.md"],
        },
      ],
      "/read/": [
        {
          title: "记录",
          collapsable: false,
          children: [
            "/read/",
            "学习的方法.md",
            "记录想说的话.md",
            "富爸爸穷爸爸.md",
            "《走吧，张小研》读后感.md",
            "note.md",
            "2021离职感想",
          ],
        },
      ],

      "/code/android/": ["/code/android/", "问题集合"],
      "/code/basic/": [
        {
          title: "基础",
          collapsable: false,
          children: ["理解Unicode与UTF-8.md"],
        },
        {
          title: "算法",
          collapsable: false,
          children: ["线性表.md", "全排列算法.md", "二叉堆", "js实现一个栈"],
        },
        {
          title: "加解密",
          collapsable: false,
          children: ["basic_encryption"],
        },
      ],
      "/code/db/": [
        {
          title: "mongodb",
          collapsable: false,
          children: ["mongodb/基础命令.md"],
        },
        {
          title: "graphql",
          collapsable: false,
          children: ["graphql/认识graphql.md"],
        },
      ],
      "/code/rxjs/": [
        "/code/rxjs/",
        {
          title: "学习心得",
          collapsable: false,
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
            "Object禁止对象扩展的方法比较.md",
            "promise and generator.md",
            "创建scope包.md",
            "使用JS访问摄像头.md",
            "认识webworker和websocket",
            "webpack的publicPath",
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
          title: "react",
          collapsable: true,
          children: [
            "react/hooks.md",
            "react/stateless组件如何通过静态方法更新.md",
            "react/useCallBack和useMemo.md",
          ],
        },
        {
          title: "react-native",
          collapsable: true,
          children: [
            "react-native/mac搭建react-native开发环境.md",
            "react-native/mac下安卓开发环境搭建.md",
            "react-native/安卓调试.md",
          ],
        },
        {
          title: "web.dev",
          collapsable: true,
          children: ["webdev/js中的this"],
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
          collapsable: false,
          children: ["nvm.md"],
        },
        {
          title: "工具",
          collapsable: false,
          children: ["lerna.md", "yargs.md"],
        },
      ],
      "/code/git/": [
        {
          title: "git经验分享",
          collapsable: false,
          children: [
            "git常用命令.md",
            "git撤销操作.md",
            "git子模块.md",
            "git代理设置.md",
            "指定跟踪分支",
            "自己搭建git服务器",
            "git服务器接受到更新",
          ],
        },
      ],
      "/code/docker/": [
        {
          title: "遇到过的问题",
          collapsable: false,
          children: ["ubuntu容器设置启动脚本.md"],
        },
      ],
      "/code/electron/": [
        {
          title: "electron",
          collapsable: false,
          children: ["解决electron下载问题.md"],
        },
      ],
      "/code/linux/": [
        {
          title: "linux相关教程",
          collapsable: false,
          children: ["史上最牛的Linux视频教程.md"],
        },
      ],
      "/code/python/": [
        {
          title: "python",
          collapsable: false,
          children: ["python如何安装第三方库.md"],
        },
      ],
      "/code/flutter/": [
        {
          title: "flutter",
          collapsable: false,
          children: ["mac下Flutter开发环境搭建.md"],
        },
      ],
      "/code/network/": [
        {
          title: "计算机网络",
          collapsable: false,
          children: ["图解计算机网络.md"],
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
