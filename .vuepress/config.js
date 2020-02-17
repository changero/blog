const Copyplugin = require('copy-webpack-plugin')


module.exports = {
    title: 'Changero',
    description: "技术只是工具，不是目的",
    base: '', // base路径，用于将网站部署到非根目录下，在vue文件和md文件中通过$withBase函数访问
    chainWebpack: (config) => {
        config.plugin('copy').use(Copyplugin, [
            [
                { from: './.vuepress/static', to: './static' },
                { from: './.vuepress/public', to: '.' },
            ] // from 是命令的执行路径，to是生成的文件夹路径
        ])
    },
    evergreen: true, // 禁止转译到ES5,并且不会添加IE的polyfill
    markdown: {
        lineNumbers: true
    },
    plugins: [
        // "@vuepress/back-to-top", // reco中内置了
        '@vuepress/medium-zoom', // A JavaScript library for zooming images like Medium
    ],
    theme: 'reco',
    head: [
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    themeConfig: {
        startYear: '2019',
        author: 'Changero',
        huawei: false,
        nav: [
            { text: '首页', link: '/aboutme/', icon: 'reco-home' },
            { text: '分享', link: '/share/', icon: 'reco-up' },
            { text: '读书', link: '/read/', icon: 'reco-search' },
            {
                text: '编程',
                icon: 'reco-menu',
                items: [
                    { text: 'frontend', link: '/code/frontend/' },
                    { text: 'typescript', link: '/code/typescript/' },
                    { text: 'react', link: '/code/react/' },
                    { text: 'vue', link: '/code/vue/' },
                    { text: 'tools', link: '/code/tools/' },
                    { text: 'rxjs', link: '/code/rxjs/' },
                    { text: 'git', link: '/code/git/' },
                    { text: 'linux相关教程和笔记', link: '/code/linux/史上最牛的Linux视频教程' },
                ]
            },
            {
                text: 'TimeLine',
                link: '/timeline/',
                icon: 'reco-date'
            },
            {
                text: '好有券',
                link: 'http://quan.changero.win',
                icon: 'reco-other'
            },
            {
                // text: '📧 联系我',
                text: '联系我',
                link: 'mailto://changero@126.com',
                icon: 'reco-message'
            }
        ],
        sidebar: {
            "/share/": [
                {
                    title: '分享',
                    collapsable: false,
                    children: [
                        '/share/',
                        'cookie、session和token.md',
                        'tools.md',
                        'how-to-create-github-pages.md',
                        'node-commander.md',
                        'partClub总结.md',
                        'gant-design小结.md',
                        '记又一次重装系统的历程.md',
                        "openwrt调教历程.md",
                        "破解wetool历程.md"
                    ]
                }

            ],
            '/read/': [
                {
                    title: '读书',
                    collapsable: false,
                    children: [
                        '/read/',
                        '学习的方法.md',
                        "记录想说的话.md",
                        "富爸爸穷爸爸.md"
                    ]
                }
            ],
            "/code/react/": [
                {
                    title: 'React学习之路',
                    collapsable: false,
                    children: [
                        "/code/react/",
                        "hooks.md",
                        "stateless组件如何通过静态方法更新.md",
                        "useCallBack和useMemo.md"
                    ]
                }
            ],
            "/code/rxjs/": [
                "/code/rxjs/",
                {
                    title: '学习心得',
                    collapsable: false,
                    children: [
                        "creator.md",
                        "pipeable.md",
                    ]
                },
                {
                    title: "别人的资源",
                    collapsable: true,
                    children: []
                }
            ],
            "/code/frontend/": [
                {
                    title: '前端',
                    collapsable: false,
                    children: [
                        "/code/frontend/",
                        "理解Unicode与UTF-8.md",
                        "babel7入门级指南",
                        "两种函数组合方式.md",
                        "理解commonJS模块加载以及循环依赖的问题.md",
                        "IFC.md",
                        "Date对象时区转化.md",
                        "自定义标签.md",
                        "确定页面rem大小的两种思路.md",
                        "gulp-less处理antd中的less引用.md",
                        "浏览器table布局策略.md"
                    ]
                }
            ],
            "/code/typescript/": [
                {
                    title: 'typescript',
                    collapsable: false,
                    children: [
                        "收集的部分问题及解决方法.md",
                        "生成d.ts.md"
                    ]
                }
            ],
            "/code/git/": [
                {
                    title: "git经验分享",
                    collapsable: false,
                    children: [
                        'git常用命令.md',
                        'git撤销操作.md',
                        "git子模块.md"
                    ]
                }
            ],
            "/code/linux/": [
                {
                    title: 'linux相关教程',
                    collapsable: false,
                    children: [
                        "史上最牛的Linux视频教程.md"
                    ]
                }
            ]
        },
        lastUpdated: '最后更新于',
        blogConfig: {
            category: {
                location: 2,
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
            }
        },
    }
}