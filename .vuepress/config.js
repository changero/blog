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
                    { text: 'react', link: '/code/react/' },
                    { text: 'vue', link: '/code/vue/' },
                    { text: 'tools', link: '/code/tools/' },
                    { text: 'rxjs', link: '/code/rxjs/' },
                    { text: '每日', link: '/code/daily/' },
                ]
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
                '/share/',
                'collect.md',
                {
                    title: '工具分享',
                    collapsable: false,
                    children: [
                        "常用的chrome扩展.md",
                        'how-to-create-github-pages.md',
                    ]
                },
                {
                    title: '编码工具',
                    collapsable: false,
                    children: [
                        'node-commander.md'
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
            "/code/daily/": [
                "/code/daily/",
                {
                    title: "2019年5月",
                    collapsable: false,
                    children: [
                        "2019年5月18日.md"
                    ]
                }
            ]
        },
        lastUpdated: '最后更新于'
    }
}