---
title: 解决XCode12不兼容rn的问题
date: "2021-06-23 21:24:59"
categories:
  - 前端
tags:
  - react-native
lang: zh-cn
---

## 解决XCode12不兼容rn的问题

> [Build failed after update Xcode 12.5 beta Cannot initialize a parameter of type 'NSArray> *' with an rvalue of type 'NSArray *' · Issue #31412 · facebook/react-native · GitHub](https://github.com/facebook/react-native/issues/31412)

在Podfile中添加如下代码

<!-- more -->

```
post_install do |installer|
  ## Fix for XCode 12.5
  find_and_replace(
  "../node_modules/react-native/React/CxxBridge/RCTCxxBridge.mm",
  "_initializeModules:(NSArray<id<RCTBridgeModule>> *)modules", 
  "_initializeModules:(NSArray<Class> *)modules")
  
  find_and_replace(
  "../node_modules/react-native/ReactCommon/turbomodule/core/platform/ios/RCTTurboModuleManager.mm",
  "RCTBridgeModuleNameForClass(module))", 
  "RCTBridgeModuleNameForClass(Class(module)))"
  )
  
  # 这里是解决ios14图片无法显示的问题，也可以将rn升级到0.63来解决
  find_and_replace(
  "../node_modules/react-native/Libraries/Image/RCTUIImageViewAnimated.m",
  "- (void)displayLayer:(CALayer *)layer", 
  "- (void) displayLayer:(CALayer *)layer {
  if (_currentFrame) {
    layer.contentsScale = self.animatedImageScale;
    layer.contents = (__bridge id)_currentFrame.CGImage;
  }else {
    [super displayLayer:layer];
  }
}
- (void)displayLayer1:(CALayer *)layer"
  )
end
  
def find_and_replace(dir, findstr, replacestr)
  Dir[dir].each do |name|
      text = File.read(name)
      replace = text.gsub(findstr,replacestr)
      if text != replace
          puts "Fix: " + name
          File.open(name, "w") { |file| file.puts replace }
          STDOUT.flush
      end
  end
  Dir[dir + '*/'].each(&method(:find_and_replace))
end
```

