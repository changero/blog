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
    themeConfig: {
        // 配置导航
        nav: [
            { text: '首页', link: '/' },
            // { text: '首页', link: '/' },
            {
                text: '2019-05',
                items: [
                    { text: '如何创建github pages', link: '/2019-05/how-to-create-github-pages.md' },
                    { text: '常用的chrome扩展', link: '/2019-05/常用的chrome扩展.md' },
                    {
                        text: '测试分组',
                        items: [
                            { text: 'google', link: 'https://www.google.com.hk' }
                        ]
                    },
                    {
                        text: '测试分组2',
                        items: [
                            { text: 'youtube', link: 'https://www.youtube.com' }
                        ]
                    }
                ]
            },
            {
                text: '好有券',
                link: 'http://quan.changero.win'
            }
        ],
        displayAllHeaders: true,
        sidebar: 'auto',
        // sidebar: [
        //     {
        //         title: '2019-05',
        //         collapsable: false,
        //         children: [
        //             '/2019-05/how-to-create-github-pages.md',
        //             "/2019-05/常用的chrome扩展.md",
        //         ]
        //     },
        //     {
        //         title: '2019-06',
        //         collapsable: false,
        //         children: [

        //         ]
        //     }
        // ],
        lastUpdated: '最后更新于'
    }
}