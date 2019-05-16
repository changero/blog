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
                text: '前端',
                items: [
                    { text: 'react', link: '/front/react/' },
                    { text: 'vue', link: '/front/vue/' },
                    { text: 'tools', link: '/front/tools/' },
                    { text: 'rxjs', link: '/front/rxjs/' },
                ]
            },
            {
                text: '好有券',
                link: 'http://quan.changero.win'
            }
        ],
        displayAllHeaders: false, // 这个选项开启将会在侧边栏上显示所有页面的标题链接
        sidebar: {
            "/share/": [
                // 'how-to-create-github-pages.md',
                // "常用的chrome扩展.md",
                '/share/',
                {
                    title: '工具分享',
                    collapsable: false,
                    children: [
                        "常用的chrome扩展.md",
                        'how-to-create-github-pages.md',
                    ]
                },
            ]
        },
        lastUpdated: '最后更新于'
    }
}