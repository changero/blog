(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{429:function(s,n,e){"use strict";e.r(n);var a=e(14),r=Object(a.a)({},(function(){var s=this,n=s._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"安卓打包-rn-出现资源重复的问题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安卓打包-rn-出现资源重复的问题"}},[s._v("#")]),s._v(" 安卓打包 RN 出现资源重复的问题")]),s._v(" "),n("p",[s._v("找到"),n("code",[s._v("node_modules/react-native/react.gradle")]),s._v("文件，找到"),n("code",[s._v("doFirst")]),s._v("定义的地方，在后面添加")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('// gradle\ndoLast {\n    def moveFunc = { resSuffix ->\n        File originalDir = file("$buildDir/generated/res/react/release/drawable-${resSuffix}");\n        if (originalDir.exists()) {\n            File destDir = file("$buildDir/../src/main/res/drawable-${resSuffix}");\n            ant.move(file: originalDir, tofile: destDir);\n        }\n    }\n    moveFunc.curry("ldpi").call()\n    moveFunc.curry("mdpi").call()\n    moveFunc.curry("hdpi").call()\n    moveFunc.curry("xhdpi").call()\n    moveFunc.curry("xxhdpi").call()\n    moveFunc.curry("xxxhdpi").call()\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br")])]),n("p",[s._v("然后在菜单中找到 Buile>clean Project，清理一下项目，重新构建")])])}),[],!1,null,null,null);n.default=r.exports}}]);