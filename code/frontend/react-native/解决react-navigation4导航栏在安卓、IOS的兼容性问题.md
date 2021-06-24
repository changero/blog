---
title: 解决react-navigation4导航栏在安卓、IOS的兼容性问题
date: "2021-06-24 22:11:44"
categories:
  - 前端
tags:
  - react-native
lang: zh-cn
---

## 解决react-navigation4导航栏在安卓、IOS的兼容性问题

- 获取状态栏高度

```js
import {StatusBar, Platform, NativeModules} from 'react-native';
export function useStatusBarHeight() {
	const [STATUSBAR_HEIGHT, setHeight] = useState(StatusBar.currentHeight || 0);
	useDidMount(() => {
		if (Platform.OS === 'ios') {
			const {StatusBarManager} = NativeModules;
			StatusBarManager.getHeight(({height}) => {
				setHeight(height);
			});
		}
	});
```

- 在组件中获取状态栏高度，这里我用高阶组件的形式，获取状态栏高度，并通知navigation

<!-- more -->

```js
import React, {memo, useEffect} from 'react';
import {useStatusBarHeight} from '@/hooks';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/**
 * 自动更新状态栏高度
 * @param {*} Component
 * @returns
 */
export default function withStatusBarHeight(Component) {
	const WrapperComponent = memo(props => {
		const statusBarHeight = useStatusBarHeight();
		useEffect(() => {
			if (statusBarHeight) {
				props.navigation.setParams({statusBarHeight});
			}
		}, [statusBarHeight]);
		return <Component {...props} />;
	});
	hoistNonReactStatic(WrapperComponent, Component);
	WrapperComponent.navigationOptions = Component.navigationOptions;
	WrapperComponent.displayName = `StatusBarHeightComponent(${getDisplayName(Component)})`;
	return WrapperComponent;
}

```

- 在navigation中设置高度

  

  ```js
  export default ({navigationOptions, navigation}) => {
    // 获取到状态栏高度
  	const statusBarHeight = navigation.getParam('statusBarHeight', 0);
    return {
      ...other Options,
      headerStyle: {
  				backgroundColor: '主题色',
  				...Platform.select({
  					android: {
  						height: rpx(88) + statusBarHeight,
  						paddingTop: statusBarHeight,
  					},
  					ios: {
              // 注意这里
  						marginTop: statusBarHeight - 20,
  						height: rpx(88),
  					},
  				}),
  			},
    }
  }
  ```

  **注意：在ios上，因为navigation的容器外层会默认添加20大小的距离，来避免状态栏与我们自己的标题栏重叠，但是20大小在高版本iphone上是不够的，就导致标题栏与状态栏重叠，所以首先减掉这20大小的距离，再重新设置偏离来达到状态栏与标题栏分离的目的**

  