---
title: JS实现复制文字加版权
date: "2021-08-01 22:53:40"
categories:
  - 前端
lang: zh-cn
---

## JS 实现复制文字加版权

### 方式一

```js
document.oncopy = function() {
  const selection = window.getSelection();
  const selectedText = selection.toString().replace(/\n/, "<br />");

  const el = document.querySelector("#copy");
  el.innerText = selectedText + "\n版权信息";

  selection.selectAllChildren(el);
};
```

### 方式二

```js
var ua = navigator.userAgent.toLowerCase();
if (window.ActiveXObject) {
  /* 兼容旧版的IE */
  document.body.oncopy = function() {
    event.returnValue = false;
    var selectedText = document.selection.createRange().text;
    var pageInfo = "版权信息";
    clipboardData.setData(
      "Text",
      selectedText.replace(/\n/g, "<br>") + pageInfo
    );
  };
} else {
  function addCopyRight() {
    var body_element = document.getElementsByTagName("body")[0];
    var selection = window.getSelection();
    var pageInfo = "版权信息";
    var copyText = selection.toString().replace(/\n/g, "<br>") + pageInfo;
    var newDiv = document.createElement("div");
    newDiv.style.position = "absolute";
    newDiv.style.left = "-99999px";
    body_element.appendChild(newDiv);
    newDiv.innerHTML = copyText;
    selection.selectAllChildren(newDiv);
    window.setTimeout(function() {
      body_element.removeChild(newDiv);
    }, 0);
  }
  document.oncopy = addCopyRight;
}
```

### 方式三

```js
var selfLogin = false;
var follow = $("#profile_block").find("#p_b_follow");
var block = follow.length >= 1 ? follow[0] : "";
var followText = block != null && block != undefined ? block.innerHTML : "";
if (followText == "") selfLogin = true;

var pageInfo = "版权信息";

document.addEventListener("copy", function(ev) {
  var targetHTML = ev.target.innerHTML.trim();
  if (targetHTML == "") return;
  if (
    !(
      targetHTML.startsWith('<table class="hljs-ln"') &&
      targetHTML.endsWith("</table>")
    ) ||
    !selfLogin
  ) {
    var selected = window.getSelection();
    var selectedText = selected.toString();
    let copyRightStr = (selectedText + pageInfo).replace(/\n/g, "\r\n");

    ev.clipboardData.setData("text/plain", copyRightStr);
    ev.preventDefault();
  }
});
```
