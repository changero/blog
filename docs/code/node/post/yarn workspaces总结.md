---
title: yarn workspaces总结
date: '2022-08-10 21:14:59'
categories:
  - yarn
tags:
  - monorepo
lang: zh-cn
---

详细描述可以查看[文章](https://juejin.cn/post/7011024137707585544)，这里仅描述使用事项

## 创建项目

再任意目录下创建一个`package.json`文件，内容如下：

```json
{
  "name": "project name",
  "private": true,
  "workspaces": ["project1", "project2"]
}
```

注意`private: true`，这是必要的。`workspaces`的值还可以是另一种形式

```json
{
  "workspaces": ["projects/*"]
}
```

接着创建 2 个项目`project1`、`project2`，并分别创建`package.json`文件

```json
{
  "name": "project1",
  "version": "1.0.0",
  "dependecies": {}
}
```

> 注意 name 字段的值一定要与文件夹名字相同

## 安装依赖

> 需要 workspaces 下项目中的 package.json 中已经有 dependecies

再项目中安装的时候，可以在任意目录下通过`yarn`安装。安装的时候会将所有的依赖安装在`workspaceroot`目录下，这样可以避免重复安装。如果过整个项目依赖了相同包的不同版本，才会在某个项目目录下安装特定的版本

## 命令

### workspace

##### yarn workspace

命令格式：

> yarn workspace [workspace_name] [command]

作用：在指定的 workspace 下执行 command，即 command 作用域为某个 workspace。示例：

```bash
# 为app1安装react
yarn workspace app1 add react --save

# 执行app1中的start脚本
yarn workspace app1 run start
```

##### yarn workspaces info [--json]

作用：此命令将显示当前项目的工作空间依赖关系树。示例：

```bash
yarn workspaces info
```

##### yarn workspaces run [command]

作用：将在每个工作区中运行所选择的 Yarn 命令，即遍历所有 workspace 执行 command 命令，示例：

```bash
# 在所有workspace中执行yarn start命令
yarn workspaces run start

# 在所有workspace中执行yarn test命令
yarn workspaces run test
```

##### [2.x 新增]yarn workspaces focus

> 要使用此命令，请先安装 workspace-tools 插件：yarn plugin import workspace-tools

作用：安装单个工作区及其依赖项。

##### [2.x 新增]yarn workspaces foreach [command]

> 要使用此命令，请先安装 workspace-tools 插件：yarn plugin import workspace-tools

作用：在所有工作空间上运行 command 命令(有点类似 Yarn 1.x 中的 yarn workspaces)。示例：

```bash
yarn workspaces foreach run start
```

##### yarn workspaces list

> 注意：需要在 workspace-root 下执行。 作用：列出所有可用的工作区。示例：

```bash
yarn workspaces list
```
