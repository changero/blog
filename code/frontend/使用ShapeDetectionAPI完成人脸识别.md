---
title: 使用ShapeDetectionAPI完成人脸识别
date: "2021-08-15 21:20:39"
categories:
  - 前端
tags:
  - webapi
lang: zh-cn
---

## 使用 Shape Detection API 完成人脸识别

通过 Shape Detection API 可以完成人脸识别，识别二维码等动作，

Face Detection API 是 Shape Detection API 的一个子集，目前处于[WICG](https://github.com/wicg/)的孵化和实验阶段，要想使用该功能，需要在 chrome 中开始实现功能。打开[chrome://flags/#enable-experimental-web-platform-features](chrome://flags/#enable-experimental-web-platform-features)选择启用，并重启浏览器。

## 使用

这个 Face Detection API 的使用非常简单

```js
var faceDetector = new FaceDetector();
faceDetector
  .detect(image)
  .then((faces) => faces.forEach((face) => console.log(face)))
  .catch((e) => {
    console.error("Boo, Face Detection failed: " + e);
  });
```

<!-- more -->

我们需要传入要识别的对象，可以是`CanvasImageSource`，`Blob`，`ImageData`或者<img>元素。然后传递给底层 API，返回对象数组，对象上提供了每个 face 的界限

> 在加载 img 元素的时候如果图片源与当前网站不一致，可能会报错。

完整的示例：

```js
var image = document.getElementById("image");
var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");
var scale = 1;

image.onload = function() {
  ctx.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  scale = canvas.width / image.width;
};

function detect() {
  if (window.FaceDetector == undefined) {
    console.error("Face Detection not supported");
    return;
  }

  var faceDetector = new FaceDetector();
  faceDetector
    .detect(image)
    .then((faces) => {
      // Draw the faces on the <canvas>.
      var ctx = canvas.getContext("2d");
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      for (let face of faces) {
        ctx.rect(
          Math.floor(face.x * scale),
          Math.floor(face.y * scale),
          Math.floor(face.width * scale),
          Math.floor(face.height * scale)
        );
        ctx.stroke();
      }
    })
    .catch((e) => {
      console.error("Boo, Face Detection failed: " + e);
    });
}
```

### 能实现什么

- 个人资料图片截切
- 快速标记场景中的所有人脸
-
