---
title: 安卓打包RN出现资源重复的问题
date: "2021-06-01 22:42:43"
categories:
  - 前端
tags:
  - react-native
lang: zh-cn
---

## 安卓打包 RN 出现资源重复的问题

找到`node_modules/react-native/react.gradle`文件，找到`doFirst`定义的地方，在后面添加

```gradle
doLast {
    def moveFunc = { resSuffix ->
        File originalDir = file("$buildDir/generated/res/react/release/drawable-${resSuffix}");
        if (originalDir.exists()) {
            File destDir = file("$buildDir/../src/main/res/drawable-${resSuffix}");
            ant.move(file: originalDir, tofile: destDir);
        }
    }
    moveFunc.curry("ldpi").call()
    moveFunc.curry("mdpi").call()
    moveFunc.curry("hdpi").call()
    moveFunc.curry("xhdpi").call()
    moveFunc.curry("xxhdpi").call()
    moveFunc.curry("xxxhdpi").call()
}
```

然后在菜单中找到 Buile>clean Project，清理一下项目，重新构建

<!-- more -->
