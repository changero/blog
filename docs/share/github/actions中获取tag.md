---
title: actions中获取tag
date: "2022-08-20 17:18:00"
categories:
  - github
lang: zh-cn
---

创建 release 的时候，需要给 release 添加一个 tag 作为标识，有以下两种方法可以在 yml 文件中获取 tag

方法一：

通过 step 获取 tag, 在需要使用的地方使用 `steps.get_version.outputs.VERSION`,
其中 get_version 是 step 的 id.

```yml
name: Build and Deploy
on:
  push:
    tags:
      - "v*"
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Get Version
        id: get_version
        run: echo ::set-output name=VERSION::${GITHUB_REF/refs\/tags\//}
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.MY_GITHUB_TOKEN }}
        with:
          tag_name: ${{ steps.get_version.outputs.VERSION }}
          release_name: ${{ steps.get_version.outputs.VERSION }}
          draft: false
          prerelease: false
```

方法二：

直接通过`github.ref`来获取，不过这种方法只能通过 tag 触发

如果是其他触发条件, github.ref 可能就不是 tag 了

```yml
name: Build and Deploy
on:
  push:
    tags:
      - "v*"
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: ${{ github.ref }}
          draft: false
          prerelease: false
```
