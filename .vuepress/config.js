module.exports = {
    title: 'Changero',
    description: "记录一些想法，前端技术学习",
    base: '', // base路径，用于将网站部署到非根目录下，在vue文件和md文件中通过$withBase函数访问
    configureWebpack: {

    },
    evergreen: true, // 禁止转译到ES5,并且不会添加IE的polyfill
    markdown: {
        lineNumbers: true
    },
    plugins: [
        "@vuepress/back-to-top"
    ],
    themeConfig: {
        // 配置导航
        nav: [
            { text: '首页', link: '/' },
            { text: '分享', link: '/share/' },
            { text: '读书', link: '/read/' },
            {
                text: '编程',
                items: [
                    { text: 'javascript', link: '/code/javascript/' },
                    { text: 'react', link: '/code/react/' },
                    { text: 'vue', link: '/code/vue/' },
                    { text: 'tools', link: '/code/tools/' },
                    { text: 'rxjs', link: '/code/rxjs/' },
                ]
            },
            {
                text: '日常',
                link: '/daily/'
            },
            {
                text: '好有券',
                link: 'http://quan.changero.win'
            },
            {
                text: '📧 联系我',
                link: 'mailto://changero@126.com'
            }
        ],
        displayAllHeaders: false, // 这个选项开启将会在侧边栏上显示所有页面的标题链接
        sidebar: {
            "/share/": [
                {
                    title: '分享',
                    collapsable: false,
                    children: [
                        '/share/',
                        'cookie、session和token.md',
                        'tools.md',
                    ]
                },
                {
                    title: '工具分享',
                    collapsable: false,
                    children: [
                        'how-to-create-github-pages.md',
                    ]
                },
                {
                    title: '编码工具',
                    collapsable: false,
                    children: [
                        'node-commander.md'
                    ]
                },
                {
                    title: '趣味',
                    collapsable: true,
                    children: [
                        'aboutearth.md'
                    ]
                }

            ],
            '/read/': [
                {
                    title: '读书',
                    collapsable: false,
                    children: [
                        '/read/',
                        '学习的方法.md'
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
            "/daily/": [
                "/daily/",
                {
                    title: "2019年5月",
                    collapsable: false,
                    children: [
                        "2019年5月20日.md",
                        "2019年5月19日.md",
                        "2019年5月18日.md",
                    ]
                }
            ],
            "/code/javascript/": [
                {
                    title: 'ES6+',
                    collapsable: false,
                    children: [
                        "理解Unicode与UTF-8.md"
                    ]
                }
            ]
        },
        lastUpdated: '最后更新于'
    }
}