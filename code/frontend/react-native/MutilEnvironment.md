---
title: React-Native Mutil Environment文字版
date: "2021-06-01 22:31:25"
categories:
  - 前端
tags:
  - react-native
lang: zh-cn
---

## 如何在 RN 项目中使用 env 文件

安装[react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv)。创建对应环境的.env 文件，比如.env.test、.env.staging

在使用的时候分情况

#### 1、开发、热更

开发的时候只需要通过设置环境变量就可以实现让 dotenv 加载对应环境的配置文件，推荐安装 cross-env

e.g.

```bash
cross-env APP_ENV=staging react-native start
```

<!-- more -->

#### 2、打包 bundle

打包与开发时一样的，设置 APP_ENV 环境变量就可以了

#### 3、构建 app

因为在构建 app 的时候无法向 dot-env 传递环境变量（或者说没有找到实现的方法，找到了再更新）

所以需要再构建以前通过复写.env 文件来达到效果

比如构建 test 环境的 app

```bash
cp .env.test .env
```

这种方式的确定是每次在构建、打包、热更之前都需要确认一次当前环境，尤其是打包 APP 之前。更好的是采用下面的 native 的方式

## native 方式创建多环境

### IOS

ios 采用多 scheme 的方式

#### 1. **创建环境**

- 使用 Xcode 打开项目，双击左侧目录导航栏第一级（蓝色图标），选中对应项目的 Info 标签
- 添加 Configurations，分别对应 3 个环境，dev、staging、prod
  - DebugDev
  - DebugStaging
  - DebugProd
  - ReleaseDev
  - ReleaseStaging
  - ReleaseProd

#### 2. **修改项目名的显示**

- 双击打开`info.plist`文件，修改`Bundle display name`为`$(PRODUCT_NAME)`
- 回到`targets>Build Settings`，搜索`product name`，给每个配置修改对应的名称，这个名称将显示到安装的 APP 上
- 再搜索`identifier`，给每一个配置设置 bundle id，也可以都一样，只是这样不容易区分，还是建议区别一下。比如：com.xx.yy.dev 以及 com.xx.yy.staging

#### 3. **创建 scheme**

- 选中导航栏`Product>Scheme>Manage Schemes`，通过弹出框口左下角的加号，依次创建对应环境的 scheme
  - ProjectDev
  - ProjectStaging
  - ProjectProd
- 修改 scheme，选中导航栏`Product>Scheme>Edit Schemes`，或者再上一步的窗口中双击对应的 scheme，例如选中 staging 这个 scheme
- 在弹出的窗口中，修改**Run**项目的`Build Configuration`为`DebugStaging`
- 在弹出的窗口中，修改**Test**项目的`Build Configuration`为`DebugStaging`
- 在弹出的窗口中，修改**Profile**项目的`Build Configuration`为`ReleaseStaging`
- 在弹出的窗口中，修改**Analyze**项目的`Build Configuration`为`DebugStaging`
- 在弹出的窗口中，修改**Archive**项目的`Build Configuration`为`ReleaseStaging`

#### 4. **修改`Podfile`**

在`require_relative`语句下面添加

```
project 'projectname',
	"DebugDev" => :debug,
	"DebugStaging" => :debug,
	"DebugProd" => :debug,
	"ReleaseDev" => :release,
	"ReleaseStaging" => :release,
	"ReleaseProd" => :release
```

最后回到控制台执行

```bash
$ npx pod-install
```

#### 5. **环境设置及 SDK**

回到`targets>Build Settings`，搜索`macros`，给每个配置设置环境量，以便代码中访问，比如

```
DebugDev -> DEV=1
ReleaseDev -> DEV=1


DebugStaging -> STAGING=1
ReleaseStaging -> STAGING=1
```

新建文件，导航栏上`File > New > File`，在弹出的窗口中选择`Cocoa Touch Class`，任意命名

修改`.h`文件

```bash
#import <React/RCTBridgeModule.h>

#@interface [SDKname]: NSObject <RCTBridgeModule>
#@end

@interface RNConfig: NSObject <RCTBridgeModule>
@end
```

修改`.m`文件

```
#import "RNConfig.h" # 上面的h文件
@implementation RNConfig # 提供给RN层SDK的名字

RCT_EXPORT_MODULE();

- (NSDictionary *) constantsToExport
{
# 在macros设置的变量
#if DEV
	NSString *env = @"dev";
#elif STAGING
	NSString *env = @"staging";
#elif
	NSString *env = @"prod";
#endif
	return @{ @"env": env };
}

+ {BOOL}requiresMainQueueSetUp
{
	return YES;
}

@end
```

#### 6. **获取配置**

```js
import { NativeModules: { RNConfig } } from 'react-native'
console.log(RNConfig.env)
```

### 安卓

- 在 build.gradle 中添加`productFlavors`

  ```
  flavorDimensions 'env'
  productFlavors {
  	dev {
  		applicationId 'com.xx.yy.dev'
  		resValue "string", "app_name", "开发版名称"
          applicationIdSuffix '.dev'
  	}
  	staging {
  		applicationId 'com.xx.yy.staging'
  		resValue "string", "app_name", "测试版名称"
          applicationIdSuffix '.staging'
  	}
  	prod {
  		applicationId 'com.xx.yy'
  		resValue "string", "app_name", "正式版名称"
  	}
  }
  ```

- 创建 SDK，[Android 原生模块 · React Native 中文网](https://reactnative.cn/docs/native-modules-android)

  - 创建 XXModule.java

    ```java
    package com.your-app-name;

    import android.widget.Toast;

    import com.facebook.react.bridge.NativeModule;
    import com.facebook.react.bridge.ReactApplicationContext;
    import com.facebook.react.bridge.ReactContext;
    import com.facebook.react.bridge.ReactContextBaseJavaModule;
    import com.facebook.react.bridge.ReactMethod;

    import java.util.Map;
    import java.util.HashMap;

    public class RNConfigModule extends ReactContextBaseJavaModule {
      private static ReactApplicationContext reactContext;

      public RNConfigModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
      }

      @Override
      public String getName() {
        return "RNConfig"; // js通过这个名字获取该模块
      }

      // 用于于提供一些常量
      @Override
      public Map<String, Object> getConstants() {
        final Map<String, Integer> constants = new HashMap<>();
        constants.put("env", BuildConfig.FLAVOR);
        return constants;
      }

      @ReactMethod
      public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
      }
    }
    ```

* 创建 XXPackage.java

  ```java
  // RNConfigPackage.java

  package com.your-app-name;

  import com.facebook.react.ReactPackage;
  import com.facebook.react.bridge.NativeModule;
  import com.facebook.react.bridge.ReactApplicationContext;
  import com.facebook.react.uimanager.ViewManager;

  import java.util.ArrayList;
  import java.util.Collections;
  import java.util.List;

  public class RNConfigPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
      return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
                                ReactApplicationContext reactContext) {
      List<NativeModule> modules = new ArrayList<>();
      modules.add(new RNConfigModule(reactContext));
      return modules;
    }
  }
  ```

* 实现

  - 回到`MainActivity.java`，引入这个 Package，在`getPackages`方法中添加自己的 Package

    ```java
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new CustomToastPackage()); // <-- 添加这一行，类名替换成你的Package类的名字 name.
      return packages;
    }
    ```

### 其他参考

- [Building React Native app for multiple environments (updated for RN 0.61.4) | by Yee Wong | Medium](https://medium.com/@ywongcode/building-multiple-versions-of-a-react-native-app-4361252ddde5)
