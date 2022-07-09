#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd ./.vuepress/dist

#npx surge --domain changero.surge.sh

# 创建CNAME
# echo "blog.changero.win"> CNAME
# echo "blog.bianqu.cf"> CNAME


# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git remote add origin git@github.com:changero/blog.git
git push -f origin master:gh-pages
# git push -f git@github.com:changero/blog.git master:gh-pages
# git push -f git@gitee.com:changero/blog.git master:gh-pages # gitee需要绑定手机号才能部署
# git push -f git@git.coding.net:changero/blog.git master # codeing只支持部署master分支

# cd -