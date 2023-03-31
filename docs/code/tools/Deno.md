---
title: Deno
date: "2021-05-02 20:24:39"
lang: zh-cn
---

## Deno

### 安装

- 再`git bash`中安装

  ```bash
  $ curl -fsSL https://x.deno.js.cn/install.sh | sh -s v1.0.0
  ```

- 如果使用`chocolatey`包管理工具，在管理员模式下

  ```bash
  $ choco install deno
  ```

  > 推荐安装有`scoop`，之后安装`sudo`命令，通过`sudo choco install deno`来安装

  通过这种方式安装之后，deno 不一定配置在了环境变量的目录下面，比如我的就在`chocolatey`安装目录的`libs\deno`目录，这时候是不能直接在控制台使用 deno 的，有两种可以修改的方式

  - 将`deno.exe`所在目录配置到环境变量中
  - 也可以将`deno.exe`复制到`C:\windows`目录，然后创建一个快捷方式，重命名为`deno`，快捷方式也放回`C:\windows`，这样就可以在控制台比如`git bash`中使用了
  - 或者编辑`~/.bashrc`文件，添加别名`alias deno='winpty /d/software/..../deno.exe'`

- 通过`scoop`安装（版本相比 choco 的要滞后）

  ```bash
  $ scoop install deno
  ```

#### 参考

- [https://x.deno.js.cn/](https://x.deno.js.cn/)
