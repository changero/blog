---
title: 用js读取文件
date: "2021-04-06 21:51:19"
categories:
  - 前端
lang: zh-cn
---

> [原文链接](https://web.dev/read-files/)

能够选择用户本地设备上的文件并与之交互是网络上最常用的功能之一。它允许用户选择文件并将其上传到服务器，例如，上传照片或提交税务文件等。但是，它还允许站点读取和操纵它们，而无需在网络上传输数据

## 现代的文件系统访问 API

文件系统访问 API 提供了一种简便的方法来读取和写入用户本地系统上的文件和目录。目前，大多数基于 Chromium 的浏览器（例如 Chrome 或 Edge）都可以使用它。要了解有关它的更多信息，请参阅[文件系统访问 API](https://web.dev/file-system-access/)文章。

<!-- more -->

由于文件系统访问 API 尚不兼容所有浏览器，因此请查看[browser-fs-access](https://github.com/GoogleChromeLabs/browser-fs-access)，它是一个在任何可用的地方都使用新 API 的帮助程序库，但在不可用时会使用旧方法。

### 访问文件

允许用户选择文件的最简单方法是使用[`<input type='file' />`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file)元素，每个主流浏览器都支持该元素。单击时，它允许用户 multiple 使用其操作系统的内置文件选择 UI 选择一个文件，如果包含该属性，则选择多个文件。当用户完成选择一个或多个文件时，将 change 触发元素的事件。您可以访问文件的列表从`event.target.files`。这是一个[FileList](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)对象。中的每个项目 FileList 都是一个[File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)对象。

<input type="file" id="file-selector" multiple>
<script>
  const fileSelector = document.getElementById('file-selector');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  });
</script>

::: details 查看代码

```
<!-- The `multiple` attribute lets users select multiple files. -->
<input type="file" id="file-selector" multiple>
<script>
  const fileSelector = document.getElementById('file-selector');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  });
</script>
```

:::

> 注意：优先检查`window.showOpenFilePicker()`方法是否可用，因为它还为您提供了文件句柄，因此除了读取外，您还可以写回文件

### 限制文件类型的用户可以选择

在某些情况下，您可能希望限制用户可以选择的文件类型。例如，图像编辑应用程序应仅接受图像，而不接受文本文件。为此，您可以 accept 向输入元素添加一个属性，以指定接受哪些文件。

```html
<input type="file" id="file-selector" accept=".jpg, .jpeg, .png" />
```

### 自定义拖放

在某些浏览器中，该`<input type="file">`元素也是放置目标，允许用户将文件拖放到您的应用中。但是，放置目标很小，并且很难使用。相反，一旦使用`<input type="file">`元素提供了核心功能，就可以提供大型的自定义拖放表面。

> 检查该[DataTransferItem.getAsFileSystemHandle()](https://web.dev/file-system-access/#drag-and-drop-integration)方法对于您的用例是否可行，因为它还为您提供了文件句柄，因此除了读取外，您还可以写回文件

### 选择你的拖放区

您的放置表面将取决于应用程序的设计。您可能只希望窗口的一部分成为放置表面，或者可能只是整个窗口。

<img src='https://webdev.imgix.net/read-files/squoosh.png' />

Squoosh 允许用户将图像拖放到窗口中的任何位置，然后单击“选择图像”将调用该`<input type="file">`元素。无论选择哪种放置区域，请确保用户清楚他们可以将文件拖放到该表面上。

### 定义防止区

要将元素设为拖放区域，您需要侦听两个事件，[dragover](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event)和[drop](https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event)。该 dragover 事件将更新浏览器 UI，以直观地指示拖放操作正在创建文件的副本。drop 用户将文件放到表面上后，将触发该事件。类似于输入元素，你可以访问文件从列表中 event.dataTransfer.files，这是一个 FileList 对象。中的每个项目 FileList 都是一个 File 对象。

```js
const dropArea = document.getElementById("drop-area");

dropArea.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
  // Style the drag-and-drop as a "copy file" operation.
  event.dataTransfer.dropEffect = "copy";
});

dropArea.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  const fileList = event.dataTransfer.files;
  console.log(fileList);
});
```

event.stopPropagation()并 event.preventDefault()阻止浏览器的默认行为发生，并允许您的代码运行。如果没有它们，浏览器可能会离开您的页面并打开用户放入浏览器窗口的文件。

查看[自定义拖拽](https://custom-drag-and-drop.glitch.me/)示例

### 关于目录

不幸的是，今天没有一种访问目录的好方法。

在[webkitdirectory](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)上属性`<input type="file">`元素，用户可以选择一个或多个目录。某些基于 Chromium 的浏览器（可能是桌面 Safari）也支持该功能，但有关浏览器兼容性的报告相互矛盾。

> 检查该[window.showDirectoryPicker()](https://web.dev/file-system-access/#opening-a-directory-and-enumerating-its-contents)方法对于您的用例是否可行，因为它还为您提供了目录句柄，因此您可以在读取内容的同时写回该目录

如果启用了拖放功能，则用户可以尝试将目录拖动到放置区域中。当引发 drop 事件时，它将包含 File 目录的对象，但将无法访问目录中的任何文件。

## 读取文件元数据

该 File 对象包含有关该文件的许多元数据属性。大多数浏览器提供文件名，文件大小和 MIME 类型，但是取决于平台，不同的浏览器可能会提供不同的信息或其他信息。

```js
function getMetadataForFileList(fileList) {
  for (const file of fileList) {
    // Not supported in Safari for iOS.
    const name = file.name ? file.name : "NOT SUPPORTED";
    // Not supported in Firefox for Android or Opera for Android.
    const type = file.type ? file.type : "NOT SUPPORTED";
    // Unknown cross-browser support.
    const size = file.size ? file.size : "NOT SUPPORTED";
    console.log({ file, name, type, size });
  }
}
```

您可以在[input-type-file](https://input-type-file.glitch.me/)Glitch 演示中看到这一点。

## 阅读文件的内容

要读取文件，请使用 FileReader，它使您可以将 File 对象的内容读取到内存中。您可以指示 FileReader 读取文件作为数组缓冲区，数据 URL 或文本。[示例](https://read-image-file.glitch.me/)

::: details 查看代码

```js
<input type='file' id='file' >
<pre id='pre' style='color: white'></pre>
<script>
const fileEl = document.querySelector("#file");
const pre = document.querySelector("#pre");
fileEl.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        pre.innerText = event.target.result
    });
    // reader.readAsDataURL(file);
    reader.readAsText(file);
    // reader.readAsArrayBuffer(file);
    // reader.readAsBinaryString(file);
}
</script>
```

:::

<input type='file' id='file' >
<pre id='pre' style='color: white'></pre>
<script>
const fileEl = document.querySelector("#file");
const pre = document.querySelector("#pre");
fileEl.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        pre.innerText = event.target.result
    });
    reader.addEventListener("progress", (event) => {
        console.log(event.loaded, event.total);
    });
    // reader.readAsDataURL(file);
    reader.readAsText(file);
    // reader.readAsArrayBuffer(file);
    // reader.readAsBinaryString(file);
}
</script>

### 监视文件读取进度

读取大文件时，提供一些 UX 来指示读取进度有帮助。为此，请使用 progress 提供的事件 FileReader。该 progress 事件提供两个属性，loaded 即读取的量和读取 total 的总量

```js
function readFile(file) {
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    const result = event.target.result;
    // Do something with result
  });

  reader.addEventListener("progress", (event) => {
    if (event.loaded && event.total) {
      const percent = (event.loaded / event.total) * 100;
      console.log(`Progress: ${Math.round(percent)}`);
    }
  });
  reader.readAsDataURL(file);
}
```
