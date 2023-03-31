---
title: Android手册
date: "2021-07-15 21:06:46"
categories:
  - 编程
tags:
  - android
lang: zh-cn
---

## Android 学习记录

### 布局

- 相对布局`RelativeLayout`
- 线性布局`LinearLayout`
- 帧布局`FrameLayout`
- 表格布局`TableLauout`
- 网格布局`GridLayout`

<!-- more -->

### 组件

- 文本框`TextView`
- 按钮`Button`
- 图片按钮`ImageButton`
- 单选框`RadioButton`,`RadioGroup`
- 复选框`CheckButton`
- 日期选择器`DatePickerView`
- 时间选择器`TimePickerView`
- 计时器``
- 进度条`ProgressBar`
- 拖动条`SeekBar`
- 星际评分条`RatingBar`
- 图像试图`ImageView`
  - src：图片资源
  - scaleType：图片缩放方式
  - adjustViewBounds：是否保持图片长宽比
  - tint：添加遮罩
- 图像切换器`ImageSwitcher`
- 网格视图 `GridView`
- 下拉列表`Spinner`
- 列表视图`ListView`
  - setOnItemClick
- 滚动视图`ScrollView`。横向滚动`HorizontalScrollView`
- 选项卡`TabHost`、`TabWidget`、`TabContent`

### Activity

一个 Activity 就是一屏

- 运行状态
- 暂停状态
  - 无法进行操作
- 停止状态
- 销毁状态

#### 生命周期

- 初始化
  - onCreate
  - onStart
  - onResume
- 运行状态
  - onPause - 进入暂停状态
  - onStop - 进入停止状态
  - onDestrpy - 进入销毁状态
- 暂停状态
  - onResume - 恢复到运行状态
- 停止状态
  - onRestart - 重新启动，之后 onCreate 重新创建 Activity

#### 创建、配置、启动、关闭

##### 创建 Activity

- 创建继承自 Activity 的 Activity
- 重写 onCreate 方法
- 通过`setContentView`方法设置视图

##### 配置

在`AndroidManifest.xml`创建一个 activity 项

##### 入口 Activity 配置

在创建的`activity`节点中添加`inten-filter`

```xml
<intent-filter>
	<action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
```

##### 通过 startActivity 启动

```java
Intent intent = new Intent(Main.activity.this, OtherActivity.class);
startActivity(intent)
```

##### 关闭 Activity

直接调用`finish`方法，回到调用它的 Activity 当中

```java
finish();
```

##### 刷新 Activity

```java
onCreate(null)
```

#### 多个 Activity 交互

##### 使用 Bundle 在 Activity 之间交换数据

Intent 不具备存储数据的能力，要利用 Bundle 来在 activity 之间传递数据，Bundle 是键值对的组合

> 数据 > put > Bundle > putExtras > Intent> startActivity > Activity

```java
// 传递bundle
Bundle bundle = new Bundle();
bundle.putCharsequence("name", name);

intent.putExtras(bundle);

// 获取bundle
Intent intent = getIntent();
Bundle bundle = intent.getExtras();
String name = bundle.getString("name");
```

##### 调用另一个 activity 并返回结果

> public void startActivityForResult(Intent intent, int requestCode);

e.g

```java
startActivityForResult(intent, 0x007);

// 返回页面
Intent intent = getIntent();
Bundle bundle = new Bundle();
bundle.putInt("imageId", id);
intent.setExtra(bundle);
setResult(0x007, intent);
finish();

// 获取返回页面返回的数据
protect void onActivityResult(int requestCode, int resultCode, Intent data){
    super.onActivityResult(requestCode, resultCode,data );
    if(requestCode == 0x007 && resultCode == 0x007){
        Bundle bundle = data.getExtras();
        int imageId = bundle.getInt("imageId");

    }
}
```

#### Fragment

只能存在与 Activity 当中

### Intent

传递数据的快递员

作用：

- 打开 Activity、传递数据
- 后台任务，service
- 发送广播

#### 对象属性

- componentname - `setComponent`

  ```java
  Intent intent = new Intent();
  ComponentName cn = new ComponentName("包名", "类名");
  intent.setComponent(cn);
  startActivity(intent)
  ```

- Action（动作）、Data（数据）、Category（）

  > Action 常量

  ```java
  intent.setAction();
  intent.setData();
  intent.addCategory(intent.CATEGORY_HOME) //返回到桌面
  ```

- Extras

  - putExtras()
  - getExtras()

- Flags

  ```java
  intent.setFlags(intent.FLAG_ACTIVITY_NO_HISTORY) // 不保留历史记录，退出app后重新打开会回到首页
  ```

#### 种类

- 显示 Intent

  > 直接指定对应的 activity 或 service

- 隐式 Intent

  > 创建 intent 的时候不直接指定 activity 或 service
  >
  > 通过设置 action、category、flag，由系统自动查找对应的 activity

#### 过滤器

> 通过 intent-filter 标记在`Androidmanifest.xml`文件中配置

创建 intent 对象

```java
Intent intent = new Intent();
// 不明确指定我打开那个activity，由系统决定，系统会打开选择的弹窗
intent.setAction(intent.ACTION_VIEW);
startActivity(intent);
```

定义 activity 的过滤器，就是哪些动作可以打开这个 activity

```xml
<activity
          android:label="我的自定义名称"
>
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT">
	</intent-filter>
</activity>
```

### 调试

#### DDMS 工具使用

> 通过 DDMS 可以查看指定进程中的线程信息、内存等

可以在 AS 中打开、或者通过`sdk目录 > tools > ddms.bat`打开

#### 日志

```java
Log.v() // verbose
Log.d() // debug
Log.i() // info
Log.w() // warning
Log.e() // error
```

#### 程序调试

### 事件手势

- 基于监听的事件处理
  - 给 UI 组件添加事件监听器
- 基于回调的事件处理
  - 重写 Android 组件的回调方法
  - 重写 Activity 的回调方法

#### 事件处理

- onTouchEvent
- onKeyDown
- onKeyUp

#### 物理按键事件处理

- 音量键 - `KEYCODE_VOLUME_UP`、`KEYCODE_COLUME_DOWN`
- 菜单键- `KEYCODE_MENU`
- 主屏键 - `KEYCODE_HOME`
- 返回键 - `KEYCODE_BACK`
- 电源键 - `KEYCODE_POWER`

e.g.连按两次返回键退出程序

```java
private long lastBack = 0
public boolean onKeyDown(int keyCode, KeyEvent event){
    if(keyCode == KeyEvent.KECYCODE_BACK){
        exit();
        return true
    }
}

public void exit(){
    if((System.currentTimeMillis() - lastBack) > 2000){
        Toast.makeText(Activity.this, "再按一次退出程序", Toast.LENGTH_SHORT).show();
        lastBack = System.currentTimeMillis();
    }
    else{
        finish();
        System.exit(0);
    }
}
```

#### 触摸事件处理

- 单击事件
  - setOnClickListener
  - setOnLongClickListener
- 触摸事件
  - setOnTouchListener

#### 手势

##### 手势检测

- GestureDetector

  - onGestureListener

  ```java
  public class MainActivity extends AppcompatActivity implements GestureDetector.onGestureListener{
      GestureDetector detector;
      onCreate(){
          detector = new GestureDetector
      }
      onTouchEvent(){
          return detector.onTouchEvent()
      }
      onFling(){
          // 处理手势
      }
  }
  ```

### Android 应用资源

在代码中直接使用的字符串、图片、布局等信息

#### 字符串

通过`<string>`标记定义资源，`res>values>string.xml`

##### XML

`@strting/name`

##### JAVA

`getResources().getString('name')`

#### 颜色

通过`<color>`标记颜色资源。`res>values>colors.xml`

##### XML

`@color/bg`

##### JAVA

`getResources().getColor(R.color.bg)`、或者`getColor(R.color.bg)`

#### 尺寸

`dp`设备独立像素。`sp`可伸缩像素，设置字体大小的单位

通过`dimens.xml`定义。`<dimen name="">16dp</dime>`

##### XML

`textSize="@dimen/name"`

##### JAVA

`getResources().getDimension(R.dimen.name)`

#### 布局

在 XML 中通过`<include>` 引入其他布局资源

#### 数组资源

具有相同数据类型的一组数据的集合

在`res>values`创建`array.xml`文件

array、integer-array、string-array

```xml
<resources>
	<string-array name="list">
        <item>133</item>
        <item>233</item>
        <item>331</item>
    </string-array>
</resources>
```

```java
String[] arr = getResources().getStringArray(R.array.list)
```

#### 图像

##### drawable 资源

状态可变资源

##### mipmap 资源

存放启动图片、图标

#### 主题和样式资源

通过`<style>`定义主题资源

#### 菜单资源

创建`res>menu>menu.xml`

```xml
<menu>
	<item andorid:id="message" android:title="消息"></item>
   	<item andorid:id="homepage" android:title="首页"></item>
	<item andorid:id="help" android:title="帮助"></item>
	<item andorid:id="feedback" android:title="我要反馈"></item>
</menu>
```

##### 选项资源

重写 Activity 中的`onCreateOptionsMenu`方法

```java
public boolean onCreateOptionsMenu(Menu menu){
    MenuInflater menuInflater = new MenuInflater(this);
    menuInflater.inflate(R.menu.menu, menu);
    return super.onCreateOptionsMenu(menu)
}
```

重写`onOpyionsItemSelected`方法

```java
public boolean onOptionsItemSelected(MenuItem item){
    switch(item.getItemId()){
        case R.id.settings:
            Intent intent = new Intent(Activity.this, Settings.this);
            startActivity(intent);
            break;
        case R.id.regard:
            Intent intent = new Intent(Activity.this, Regard.this);
            startActivity(intent);
            break;
    }
}
```

##### 上下文菜单

`res>menu>menu.xml`

```xml
<menu>
	<item andorid:id="@+id/menu_copy" android:title="复制"></item>
   	<item andorid:id="@+id/menu_collect" android:title="收藏"></item>
	<item andorid:id="@+id/menu_translate" android:title="翻译"></item>
	<item andorid:id="@+id/menu_report" android:title="举报"></item>
</menu>
```

- 为组件注册上下文菜单

  ```java
  registerForContextMenu(textview)
  ```

- 添加上下文菜单

  重写`onCreateContextMenu`

  ```java
  MenuInflater inflater = new MenuFlater(this);
  inflater.inflate(R.menu.menu, menu)
  ```

- 指定事件处理

  重写`onContextItemSelected`

#### Android 国际化

### Action Bar

#### 显示和隐藏 Action Bar

API11 以上默认显示 Action Bar，要隐藏 Action Bar 只需要修改 theme 在后面添加`.NoActionBar`

```xml
<activity android:theme="@style/theme.NoActionBar"></activity>
```

##### 动态显示和隐藏

```java
// 获得ActionBar对象
ActionBar actionBar = getSupportActionBar();
// 隐藏
actionBar.hide();
// 显示
actionBar.show();
```

#### 添加 Action Item

定义菜单资源，在 item 上添加`app:showAsAction`属性

- always
- ifRoom，由空间则显示，否则放到溢出菜单中
- never，始终放到溢出菜单中

然后通过`onCreateOptionsMenu`方法添加到菜单

#### 添加 Action View

定义菜单资源，在 item 上添加`app:actionViewClass`属性，`android.support.v7.widget.SearchView`

或者`app.actionLayout`，用于跳转到其他 layout

然后通过`onCreateOptionsMenu`方法添加到菜单

#### Action Bar 与 Tab

实现层级导航

### 消息

#### 通过 Toast 显示消息提示框

```java
Toast.makeText(context, "消息", Toast.LENGTH_LONG).show()
```

#### 通过 AlertDialog 实现对话框

```java
// 确认对话框
AlertDialog alert = new AlertDialog.Builder(context).create();
alert.setIcon(R.drawable.icon);
alert.setTitle("乔布斯");
alert.setMessage("或者就是为了改变世界，难道还有其他原因吗？");
alert.setButton(DialogInterface.BUTTON_NEGATIVE, "否", new DialogInterface.OnClickListener);
alert.setButton(DialogInterface.BUTTON_POSITIVE, "否", new DialogInterface.OnClickListener);
alert.show();

// 列表对话框
alert.setItems(list, new DialogInterface.OnClickListener);
alert.show();

// 带单选列表项
alert.setSignleChoiceItems(list, new DialogInterface.OnClickListener);
alert.show();

// 带多选列表项
// checkItems = {true, false ,true} 记录哪些项被选中的
alert.setMultiChoiceItems(list,checkItems, new DialogInterface.OnClickListener);
alert.show();
```

#### 使用 Notification 显示通知

```java
// 获取通知管理器
NotificationManager manager = getSystemService(NOTIFICATION_SERVICE);
// 创建一个通知对象
Notification.Builder notification = new Notification.Builder(this);
// 通知打开后自动消失
notification.setAutoCancel(true);
notification.setSmallIcon();
notification.setContentTitle("奖励百万红包");
// 设置通知内容
notification.setContentText("奖励百万红包");
// 设置发送时间
notification.setWhen(System.currentTimeMillis());
// 设置声音和震动
notification.setDefaults(Notification.DEFAULT_SOUND|Notification.DEFAULT_VIBRATE);
// 创建启动详情页的intent
Intent intent = new Intent(this, Detail.class);
PendingIntent pi = PendingIntent.getActivity(this,0,intent,0);
// 设置通知栏点击跳转
notification.setContentIntent(pi);

final int NOTIFY_ID = 0X123;
// 发送通知
manager.notify(NOTIFY_ID, notification.build());
```

#### 使用 BroadcastReceiver

```java
Intent intent = new Intent();
intent.setAction("haha");
// 发送广播
sendBoardcast(intent);
```

创建接收器，需要继承`BoardcastReceiver`

```java
public Receiver extends BoardcastReceiver{
    private static final String A1 = "haha";
    private static final String A2 = "hbhb";
    @Override
    public void onReceiver(Context context, Intent, intent){
        if(intent.getAction().equals(A1)){
            Toast.makeText(context);
        }else{
            Toast.makeText(context);
        }
    }
}
```

注册接收器`AndroidManifest.xml`

```xml
<application>
	<receiver android:name="Receiver" android:enable="true" android:exported="true">
    	<intent-filter>
        	<action android:name="A1"></action>
        	<action android:name="A2"></action>
        </intent-filter>
    </receiver>
</application>
```

#### AlarmManger 闹钟

```java
Intent intent = new Intent(context, target);
PendingIntent pi = new PendingIntent.getActivity(context, 0, intent, 0);
AlarmManager alarm = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
Calendar c = Calendar.getInstance();
// 设置闹钟的小时数
c.set(Calendar.HOUR_OF_DAY, timepicker.getCurrentHour());
c.set(Calendar.MINUTE, timepicker.getCurrentMinute());
c.set(Calendar.SECOND, 0);
alarm.set(AlarmManager.RTC_WEAKUP, C.getTimeInmILLIS(), PendingIntent());
```

### 图形图像处理技术

#### 画笔和画布

#### 创建继承自 View 的子类

```java
public class MyView extends View{
  public MyView(Context context){
    	super(context);
  }
  // 重写onDraw方法
  public void onDraw(Canvas canvas){
    super.onDraw(canvas);
    // 创建画笔
    Paint paint = new Paint();
    // 设置画笔颜色
    paint.setColor(0xFFFF6600);
    paint.setStyle(Paint.Style.FILL); //Paint.Style.STROKE
    // 绘制矩形
    canvas.drawRect(10,10,280, 150, paint);
  }
}
```

然后在 Activity 中添加该 View

```java
FrameLayout fl = findViewVyId(xxx);
// 添加自定义View
fl.addView(new MyView(this));
```

#### 绘制几何图形

> 抗锯齿：`paint.setAntiAlias(true)`
>
> RectF 对象定义轮廓

- drawArc(弧形大小，起始角度，偏离角度，是否包括圆心，画笔)
- drawCircle(圆心 x，圆心 y，半径，画笔)
- drawLine()
- drawRect()- 绘制矩形
- drawRoundRect() - 绘制圆角矩形

#### 绘制文本

- drawText

#### 绘制路径

Path 类:`Path path = new Path();`

- addArc：弧形
- addCircle：圆形
- addRect：矩形
- addRoundRect：圆角矩形
- 绘制图形：canvas.drawPath、drawTextOnPath

#### 绘制图片

通过`bitmap`来实现，

- BitmapFactory 类

  - 通过图片文件创建
  - 通过输入流创建
  - 方法

    - decodeFile

      添加获取 SD 的权限，获取 SD 卡根目录:`Environment.getExternalStorageDirectory()`

      创建位图对象:

      ```java
      Bitmap bitmap = BitmapFactory.decodeFile(path);
      // 绘制图片
      Paint paint = new Paint();
      canvas.drawBitmap(bitmap, 0, 0, paint);
      ```

    - decodeResource

    - decodeStream

- Bitmap 类
  - 挖取一块图像创建：createBitmap()根据重载形式创建对应的 Bitmap 对象
  - 将源位图缩放生成：
  - 使用颜色数组生成
  - compress()：压缩 Bitmap 对象并保存到文件输出流
  - createScaledBitmap()：将源位图对象压缩并创建新的 Bitmap 对象

### 动画

- 动画资源文件
- 引用多张图片
- 在布局中使用动画文件

#### 逐帧动画

在 res 目录下创建动画资源文件`res>anim>fairy.xml`，使用`<animation-list>`申明动画

```xml
<animation-list>
  <item andorid:drawable="@drawable/img1" android:duration="60"></item>
  <item andorid:drawable="@drawable/img2" android:duration="60"></item>
  <item andorid:drawable="@drawable/img3" android:duration="60"></item>
</animation-list>
```

在布局文件中使用动画文件

```xml
<LinearLayout android:background="@anim/fairy.xml"></LinearLayout>
```

控制动画的开始、停止

```java
// 记录播放状态
boolean flag = true;
// 获取到布局元素
AnimationDrawable anim = ele.getBackground();
ele.setOnClickListener(new View.OnClickListener(){
  @Override
  public void onCLick(View v){
    if(!flag){
      anim.start();
      flag = true;
    }else{
      anim.stop();
      flag=false;
    }
  }
})
```

#### 补间动画

> 透明度渐变、旋转、缩放、平移

创建动画资源文件

**渐变效果**，创建动画资源文件，`res>anim>alpha.xml`

```xml
<set>
	<alpha andorid:fromAlpha="0" andoird:toAlpha="1" andoird:duration="2000"></alpha>
</set>
```

```java
AnimationDrawable anim = AnimationUtils.loadAnimation(MainActivity.this, R.anim.alpha);
// 开启动画
imageView.startAnimation(anim);
```

**旋转动画**，创建动画资源文件，`res>anim>rotate.xml

```xml
<set>
	<rotate andorid:fromDegress="0" andoird:toDegress="360" android:pivotX="50%" android:pivotY="50%" andoird:duration="2000"></rotate>
</set>
```

**缩放动画**，创建动画资源文件，`res>anim>scale.xml

```xml
<set>
	<scale andorid:fromXScale="1" andoird:fromYScale="1" android:toXScale="2" android:toYScale="2" android:povitX="50%" android:povitY="50%" andoird:duration="2000"></scale>
</set>
```

**平移动画**，创建动画资源文件，`res>anim>translate.xml`

```xml
<set>
	<translate andorid:fromXDelta="0" andoird:fromYDelta="0" android:toXDelta="200" android:toYDelta="200" andoird:duration="2000"></translate>
</set>
```

**淡入淡出**，，创建动画资源文件，`res>anim>fade_in.xml`

```xml
<set>
	<alpha andorid:fromAlpha="0" andoird:ftoAlpha="1" andoird:duration="2000"></alpha>
</set>
```

创建淡出动画，`res>anim>fade_out.xml`

```xml
<set>
	<alpha andorid:fromAlpha="1" andoird:ftoAlpha="0" andoird:duration="2000"></alpha>
</set>
```

```java
// 创建动画数组
Animation[] animation = new Animation[2];
animation[0] = AnimationUtils.loadAnimation(this, R.anim.fade_in);
animation[1] = AnimationUtils.loadAnimation(this, R.anim.fade_out);
// 通过ViewFlipper加载图片数组，实现相册的功能
Flipper flipper = findeViewById(R.id.flipper);
// 指定动画
flipper.setInAnimation(animation[0]);
flipper.setOutAnimation(animation[1]);
```

### 多媒体应用

#### 播放音频

> 支持 mp3、ogg、3gp、wav

- MediaPlayer

  > 延迟时间长、占用资源多、不支持同时播放多个音频

  - 创建 MediaPlayer 创建对象
  - 装载音频文件

  ```java
  // 创建的时候就指定了播放的音频，适合播放单个文件
  MediaPlayer mediaplayer = MediaPlayer.create(this, R.raw.sournd.mp3);
  // 开始播放
  mediaplayer.start();
  // 暂停播放
  mediaplayer.pause();
  // 停止播放
  mediaplayer.stop();
  ```

  ```java
  // 定义文件
  File file = new File("/sdcard/music.mp3");
  if(file.exists()){
  	MediaPlayer  mediaplayer = MediaPlayer.create(this, Uri.parse(file.getAbsolutePath()));
    Log.d("当前正在播放"+mediaplayer.isPLaying());
  }
  mediaplayer.setOnCompletionListener(new MediaPlayer.CompletionListener(){
    public void onCompletion(MediaPlayer mp){
      	play();
    }
  })

  private void play(){
    // 重置播放器
  	mediaplayer.reset();
    try{
      mediaplayer.setDataSource(file.getAbsolutePath());
  	  mediaplayer.prepare();
      mediaplayer.start();
    }catch(IOException e){
       e.printStackTrace();
    }
  }

  protected void onDestroy(){
    if(mediaplayer.isPlaying()){
      mediaplaying.stop();
    }
    // 释放资源
    mediaplayer.release();
    super.onDestroy();
  }
  ```

- SoundPool

  > 延迟时间短、占用资源少、支持同时播放多个音频
  >
  > 只能播放短促的音频

  - 创建 SoundPool 对象
  - 加载音频-load()
  - 播放音频-play()

  ```java
  // 创建音效
  AudioAttributes attr = new AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_MEDIA).
    setContentType(AudioAttributes.CONTENT_TYPE_MUSIC).build();
  // 创建SoundPool并设置音效,以及最多可容纳10个音频流
  SoundPool soundpool = new SoundPool.Builder().setAudioAttributes(attr).setMaxStreams(10).build();
  // 将要播放的音频保存到HashMao对象中
  HashMap<Integer, Integer> soundmap = new HashMap<Integer, Integer>();
  soundmap.put(0, soundpool.load(this, R.raw.sound1, 1)); // 1表示优先级，越大优先级越高
  soundmap.put(1, soundpool.load(this, R.raw.sound2, 1));
  soundmap.put(2, soundpool.load(this, R.raw.sound3, 1));
  soundmap.put(3, soundpool.load(this, R.raw.sound4, 1));
  soundmap.put(4, soundpool.load(this, R.raw.sound5, 1));
  // 播放音频
  // 左声道音量、有声道音量、优先级、循环次数、速率
  soundpool.play(soundmap.get(0),1,1, 0, 0, 1 );
  //
  ```

#### 播放视频

> Mp4、3gp

- VideoView

```java
VideoView video = (VideoView) findViewById(R.id.video);
File file = new File(Environment.getExternalStorageDirectory()+"/video.mp4");
if(file.esists()){
  video.setVideoPath(file.getAbsolutePath());
}else{

}
// 添加播放控制器
MediaController mc = new MediaController(this);
video.setMediaController(mc);
video.requestFocus();
// 开始播放
video.start();
video.setOnCompletionListener(new MediaPlayer.OnCompletionListener(){})
```

- MediaPlayer

- SurfaceView

  ```java
  SurfaceView sfv = findViewById();
  SurfaceHolder sfh = sfv.getHolder();
  MediaPlayer mp = new MediaPlayer();
  mp.setAudioStreamType(AudioManager.STREAM_MUSIC);
  mp.setOnCompletionListener(new MediaPlayer.OnCompletionListener(){});
  ```

public void play(){
mp.reset();
mp.setDisplay(sfh); // 把视频画面输出到 surfaceview
try{
mp.setDataSource("文件路径");
mp.prepare();
}catch{}
// 开始播放
mp.start();
// 暂停播放
mp.pause();
// 停止播放
mp.stop();
}

````

#### 摄像头拍照、录制视频

> Camara

```java
SurfaceView sfv = findViewById();
sfv.getHolder().setFixedSize(1920, 1080); // 设置分辨率

private void recore(){
File path = new File(Environment.getExternalStorageDirectory()+"/MyVideo/"); // 视频保存的文件夹
if(!path){
  path.mkdir();
}
String filename = "video.mp4";
videoFile = new File(path, filename);
mediaRecorder = new MediaRecorder();
android.handware.Camera ;
camera = Camera.open();
camera.setDisplayOrientation(90);
camera.unlock(); // 解锁摄像头
mediaRecorder.setCamera(camera);
mediaRecorder.reset();
mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
mediaRecorder.setVideoSource(MediaRecorder.VideoSource.CAMERA);
mediaRecorder.setOutputFormat(MediaRecorder.outputFormat.MPEG_4);
mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.DEFAULT);
mediaRecorder.setVideoEncoder(MediaRecorder.VideoEncoder.MPEG_4_SP);
// 设置码率，清晰度
mediaRecorder.setVideoEncoderBitRate(1920*1080);
mediaRecorder.setVideoSize(1920, 1080);
// 每秒10帧
mediaRecorder.setVideoFrameRate(10);
mediaRecorder.setOutputFile(videoFile.getAbsolutePath());
mediaRecorder.setPreviewDisplay(sfv.getHolder().getSurface());
mediaRecorder.setOrientationHint(90); // 角度
mediaRecorder.prepare();
mediaRecorder.start();
}

private void stop(){
mediaRecorder.stop();
mediaRecorder.release();
camera.stopPreview();
camera.release();
}
````

### 数据存储

#### sharedPreferences

> 永久保存

```java
// mode MODE_PRIVATE 本应用读写
getSharedPreferences(String name, int mode); // mode 本应用读写或夸应用读写
getPreferences(int mode);
```

#### 文件存储

- 内部存储

  > 位于`data>data>包名>files>内部存储文件`
  >
  > 默认只能被创建的应用访问
  >
  > 应用卸载以后，内部存储的文件也被删除
  >
  > 内部存储空间耗尽，手机也就无法使用

  ​

  ```java
  FileOutputStream foo = null;
  String text = output.getText().toString(); // 获取文本
  foo = openFileOutput("memo", MODE_PRIVATE); // 获得文件输出流对象
  foo.write(text.getBytes()); // 保存备忘信息
  foo.flush();
  foo.close(); // 关闭文件流

  // 读取文件信息
  FileInputStream fis = null;
  fis = openFileInput("memo"); // 获取输入流对象
  byte[] buffer = new byte[fis.available()];
  fis.read(buffer); // 读取数据到buffer
  fis.close(); // 关闭输入流对象
  String data= new String(buffer);
  ```

- 外部存储

  > 连接手机到电脑上能被电脑访问的存储部分

  - 获取外存目录:`Environment.getExternalStorageDirectory()`

  ```java
  File file = new File(Environment.getExternalStorageDirectory(), "Text.text");
  FileOutputStream fos = new FileOutputStream(file);
  String text = "你好";
  fos.write(text);
  fos.slush();

  fis = new FileInputStream(file);
  ```

#### SQLite 数据库

> 占用资源少、运行效率高、可移植性强、安全可靠

- 创建数据库
  - openOrCreateDatabase
  - SQLiteOpenHelper
- 操作数据库
  - insert
  - delete
  - update
  - query

#### 数据共享 Content-Provider

### Handler 消息机制

#### 传递机制

```java
Handler handler = new Handler(){
  @Override
	public void  handleMessage(Message msg){
    super.handleMessage(msg);
    if(msg.what === 0x123){
      // 操作主线程
    }
  }
}
Thread thread = new Thread(new Runnable(){
  @Override
  public void run(){
    handler.sendEmptyMessage(0x123);
  }
});
thread.start();
```

Handler、Looper、MessageQueue、Message 的关系

#### Message

- Message.obtain()
- Handler.obtainMessage()

#### Looper

主线程中自动创建

子线程中：

- 初始化 Looper 对象：prepare()
- 创建 Handler 对象：new Handler()
- 启动 Looper：loop（）

### Service

能够在后台长时间运行，并且没有用户界面的应用程序组件

- Started Service
- Bound Service - 与 activity 绑定
- Intent Service - 自动启停线程，执行耗时任务

#### 创建和配置 Service

在报名目录上右键，选择`New> Service`，重写方法`onCreate`，`onStartCommand`，`onDestroy`

#### 启动和停止 searvice

```java
Intent intent = new Intent(this,Service.class);
startService(intent);
stopService(intent);
```

控制背景音乐的播放

```java
static boolean isPlaying; // 记录播放状态
MediaPlayer player = MediaPlayer.create(this, R.raw.music); // player对象

onStartCommand(){
  if(!player.isPlaying()){
    player.start();
    isPlaying = player.isPlaying();
  }
}

onDestroy(){
  player.stop();
  isPlaying = player.isPlaying();
  player.release();
}
```

### 传感器的应用

- 什么是传感器
  - 一个微型无力设备，能够探测、感受到外界信号，并按一定规律转换成我们需要的信息
- 磁场传感器
- 加速器传感器
- 方向传感器（Sensor.TYPE_ORIENTATION）建议使用加速度传感器和磁场传感器来实现
- 光线

#### 应用

获取 SensorManager 对象，调用 getSystemService 方法。

获取指定类型的传感器，嗲用 getDefaultSensor 方法

注册监听器，`MyActivity implements SensorEventListener`，并实现对应的方法

```java
private SensorManager sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
// 注册监听器
sensorManager.registerListener(this, sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT), SensorManager.SENSOR_DELAY_GAME); // 光线传感器,并设置频率
// 取消注册
sensorManager.unregisterListener(this);
// 当监听的值发生变化，需要实现SensorEventListener
public void onSensorChanged(SensorEvent event){
  float[] values=event.values();
  int sensorType = event.sensor.getType();
  StringBuilder stringBuilder = null;
  if(sensorType === Sensor.TYPE_LIGHT) { // 判断是否是光线传感器
    stringBuilder = new StringBuilder();
    stringBuilder.append(values[0]); // 添加获取到的值
  }
}
```

##### 方向传感器

`getRotationMatrix`

### 位置服务与地图应用

#### 获取 LocationProvider

- gps
- network（通过基站来定位）
- passive

1. 获取所有可用的 LocationProvider

   通过 LocationManger 对象的`getAllProviders`方法

   ```java
   LocationManager locationManager = getSystemService(LOCATION_SERVICE);
   // 获取所有可用的providers
   List<String> providerNames=locationManager.getAllProviders();
   StringBuilder stringbuilder = new StringBuilder();
   for(Iterator<String> iterator=providerNames.iterator();iterator.hasNext()){
     stringbuilder.append(iterator.next()+"\n");
   }
   ```

2) 通过名称获得 LocationProvider

   通过 LocationManger 对象的`getProvider`方法

   ```java
   LocationManager locationManager = getSystemService(LOCATION_SERVICE);
   // 获取GPS的provider
   LocationProvider locationProvider=locationManager.getProvider(LocationManager.GPS_PROVIDER);

   ```

3) 通过 Criteria 类获取 LocationProvider

   ```java
   // 获得最佳LocationProvider
   Criteria criteria = new Criteria();
   criteria.setCostAllowed(false); // 不收费的
   criteria.setAccuracy(Criteria.ACCUrACY_FINE); //获取精度最准确的
   criteria.setProwserRequirement(Criteria.POWER_LOW); // 获取耗电量最低的
   String provider = locationManager.getBestProvider(criteria, true); // 获取最佳的LocationProvider
   ```

#### 获取定位信息

- 获取 LocationManager 对象
- 设置监听器- `requestLocationUpdates方法`
- 获取定位信息 - `getLastKnownLocation`方法

```java
// 检查权限
if(ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != ){
  return;
}

LocationManager locationManager = getSystemService(LOCATION_SERVICE);
locationManager.requestLocationUpdates(
	LocationManager.GPS_PROVIDER, //指定使用GPS定位
  1000， // 监听事件
  1, // 间隔1米
  new LocationListener(){
    public void onLocationChanged(Location location){ // GPS信息发生改变时调用

    }
  }
)
Location location = locationManager.getLastKonwnLocation(LocationManager.GPS_PROVIDER);
locationUpdates(location);

public void locationUpdates(Location location){
  	if(location != null){
      StringBuilder sb = new StringBuidler();
      sb.append("您的位置是\n");
      sb.append("经度:");
      sb.append(location.getLongitude());
      sb.append("\n纬度:");
      sb.append(location.getLatitude());
    }
}
```

#### 集成百度地图 API

- [申请密钥](https://lbsyun.baidu.com)
- 获取签名- `keytook -list - v -keystore debug.keystore`
- 下载 SDK

### 其他

#### Activity 和 APPCompatActivity 的区别

继承自 APPCompatActivity 的 Activity，在界面上会显示一个默认主题色的标题栏。而 Activity 没有

#### 去掉状态栏

找到`AndroidManifest.xml`中对应的 activity，添加`android:theme="@andoird:style/Theme.Black.NoTitleBar.FullScreen"`
