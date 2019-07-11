---
title: 生成d.ts
date: 2019-07-11
categories:
  - 前端
tags:
  - ts
---

### 命令行方式

```bash
npm install typescript
```

安装typescript之后，就可以使用tsc命令了

```bash
tsc -d --emitDeclarationOnly --allowJs false --declarationDir ./lib/@types
```

> 注意：一定要设置`--allowJs false`

### gulp-typescript

```js
// gulpfile.babel.js
import ts form 'gulp-typescript'

const tsConfig = ts.createProject('tsconfig.json', {
    allowJs: false,
    declaration: true
})

const tsResult = gulp.src('tsfile').pipe(tsConfig)
tsResult.dts.pipe(gulp.dest('lib'))
tsResult.js.pipe(gulp.dest('lib'))
```

### ts-loader

> 还没用过

### @babel/preset-typescript
利用babel编译ts,可惜不能生成d.ts