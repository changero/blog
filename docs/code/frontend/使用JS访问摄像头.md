---
title: 使用JS访问摄像头
date: 2020-07-18
categories:
  - 前端
---
### 使用JS访问摄像头

#### MediaStream API

##### 检查API

```js
if(
'mediaDevices' in navigator &&
'getUserMedia' in navigator.mediaDevices
){}
```

获取视频接口

```js
try{
  const videoStream = await navigator.mediaDevices.getUserMedia({video: true})
}
catch{
  console.log('用户禁止')
}
```

将视频通过video渲染

```js
const video = document.createElement("video")
video.srcObject = videoStream
video.autoplay = true
document.body.appendChild(video)
```

关闭视频流

```JS
videoStream.getTracks().forEach(track => track.stop())
```

截图

```js
const canvas = document.querySelector("#canvas");
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;
canvas.getContext("2d").drawImage(video, 0, 0);
```

转化成图片

```js
const img = document.createElement("img");
img.src = canvas.toDataURL("image/png");
//screenshotsContainer.prepend(img);
```

