## 创建github pages的3种方法

### 1.username.github.io方法

1. 首先创建一个新的仓库，并命名为username.github.io,其中username替换成当前github用户的名称
2. 在仓库中新建一个index.html或者index.md。添加一些内容，并提交
3. 访问[username].github.io

### 2.通过已有模版创建

1. 新建一个仓库，命名随意
2. 在setting中找到github pages。点击choose themes按钮，选择一款主题
3. 提交之后便可以通过[username].github.io/[reponame]， 访问

### 3.自定义页面

1. 新建一个仓库，命名随意
2. 在setting中找到github pages。在source选择需要展示的分支，然后点击save
3. 保存成功以后通过[username].github.io/[reponame]

> 如果还没有创建[username].github.io，那么可以通过custom domain的方式访问，具体就是需要有自己的域名，接着添加CNAME解析到[username].github.io
。这样通过自己的域名就可以访问当前仓库了
