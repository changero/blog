---
title: mac下Flutter开发环境搭建
date: 2020-12-12
---

### 安装

[下载地址](https://flutter.dev/docs/development/tools/sdk/releases?tab=macos#macos)

- 配置镜像

```bash
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

- 将安装包解压，比如到`/usr/local`

- 配置环境变量

```bash
export PATH="/usr/local/flutter/bin:$PATH"
```

### 检查

```bash
flutter doctor
```

命令还检查必要的开发工具链

### 集成到 VSCode

插件中心搜索 flutter 插件安装

### 集成到 android studio

打开 performce>Plugins，搜索并安装 flutter，重启 AS。
