(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{110:function(s,t,a){"use strict";a.r(t);var e=a(0),n=Object(e.a)({},function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("p",[s._v("一直不怎么记得住关于git操作的版本回退的一下姿势，于是对于一些简单的操作，写下来做个记录")]),s._v(" "),e("h2",{attrs:{id:"第一次提交文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#第一次提交文件","aria-hidden":"true"}},[s._v("#")]),s._v(" 第一次提交文件")]),s._v(" "),e("p",[s._v("首先，我们需要创建一个版本库")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" init\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("这个时候文件夹内已有的或者是新创建的文件都处于"),e("code",[s._v("unstage")]),s._v("状态。通过"),e("code",[s._v("add")]),s._v("命令，往暂存区中添加一个文件")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" tsconfig.json\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),s._v(" "),e("p",[s._v("通过"),e("code",[s._v("git status")]),s._v("查看状态，得知现在暂存区中有一个新文件，并且提示")]),s._v(" "),e("blockquote",[e("p",[s._v('使用 "git rm --cached <文件>..." 以取消暂存')])]),s._v(" "),e("p",[s._v("执行一下。")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" --cached tsconfig.json\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("这个时候"),e("code",[s._v("tsconfig.json")]),s._v("的文件状态已经回到了工作区")]),s._v(" "),e("blockquote",[e("p",[e("code",[s._v("git rm")]),s._v("的作用是用于取消git的跟踪，类似与"),e("code",[s._v("rm")]),s._v("命令符，不过"),e("code",[s._v("git rm")]),s._v("的作用相当与"),e("code",[s._v("rm + git add")]),s._v("。"),e("code",[s._v("--cached")]),s._v("的作用是告诉命令，当前操作只撤销修改，而不把文件从磁盘中删除")])]),s._v(" "),e("p",[s._v("现在，我们新建一个a.txt，并将它提交到版本库")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" a.txt\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'init commit a.txt'")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("现在我们得到一个commit")]),s._v(" "),e("p",[e("img",{attrs:{src:a(84),alt:""}})]),s._v(" "),e("h2",{attrs:{id:"第二次提交"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#第二次提交","aria-hidden":"true"}},[s._v("#")]),s._v(" 第二次提交")]),s._v(" "),e("p",[s._v("现在我们在a.txt中写下一段文本。通过"),e("code",[s._v("git status")]),s._v("可以看到git提示我们通过"),e("code",[s._v("git add")]),s._v("添加文件，或者通过"),e("code",[s._v("git checkout -- filename")]),s._v("撤销修改")]),s._v(" "),e("p",[s._v("这里"),e("code",[s._v("checkout")]),s._v("命令就是用于撤销工作区的修改的，撤销的结果是与上次commit时相同的内容")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加--表示是要回退文件，否则将会是切换分支")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout -- a.txt\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("blockquote",[e("p",[e("code",[s._v("checkout")]),s._v("回退文件，还可以指定分支或者某一次commitId")])]),s._v(" "),e("p",[s._v("现在，修改a.txt的文件内容并提交到暂存区，这个时候应该怎么回退呢")]),s._v(" "),e("p",[s._v("git告诉我们可以通过"),e("code",[s._v("git reset HEAD <filename>")]),s._v("来取消暂存")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reset a.txt\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("默认情况下，reset会回退到HEAD版本下，这个时候，暂存区的信息没有了，但是在工作区内还能看到文件被修改的信息。并在磁盘上，文件内容没有被改变。同样的"),e("code",[s._v("reset")]),s._v("也可以指定回退的commitId，这个时候可以继续通过"),e("code",[s._v("checkout")]),s._v("命令撤销掉工作区的修改")]),s._v(" "),e("p",[s._v("现在，把文件内容提交到版本库，得到版本信息如下：")]),s._v(" "),e("p",[e("img",{attrs:{src:a(85),alt:""}})]),s._v(" "),e("h2",{attrs:{id:"第三次提交"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#第三次提交","aria-hidden":"true"}},[s._v("#")]),s._v(" 第三次提交")]),s._v(" "),e("p",[s._v("再次修改a.txt，如果我们想把文件回退到第一次提交时候的状态该怎么版呢，"),e("code",[s._v("checkout")]),s._v("是否可行呢")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout f86d -- a.txt\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("文件顺利的回退了，变成了初始化的状态，但是不会影响版本库的历史记录，相当于手动修改文件，并记录到暂存区")]),s._v(" "),e("p",[s._v("如果我们使用reset回退")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reset f86d a.txt\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("这样的情况下，reset不会修改工作空间，而是将工作空间与当前版本库的差异作为工作区的修改记录下来。")]),s._v(" "),e("p",[s._v("所以这个时候回退回去，通过status查看可以发现git告诉我们有更改还未提交")]),s._v(" "),e("p",[s._v("可以看出来checkout在回退文件的时候比reset更强势，它会丢弃一切暂存区和工作区的修改来保持跟版本库的一致")]),s._v(" "),e("h2",{attrs:{id:"关于reset的参数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#关于reset的参数","aria-hidden":"true"}},[s._v("#")]),s._v(" 关于reset的参数")]),s._v(" "),e("p",[s._v("reset的时候有一个可选的强度参数:")]),s._v(" "),e("ul",[e("li",[e("p",[e("code",[s._v("--hard")]),s._v("：丢弃一切修改，与版本库保持一致")])]),s._v(" "),e("li",[e("p",[e("code",[s._v("--soft")]),s._v("：保持工作区不变，版本库的差异记录到暂存区中")])]),s._v(" "),e("li",[e("p",[e("code",[s._v("--mixed")]),s._v("：默认参数，将版本库的差异和之前暂存区的信息都记录为工作区的修改，作为撤销暂存区信息使用")])])]),s._v(" "),e("h2",{attrs:{id:"如果不小心删错了文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#如果不小心删错了文件","aria-hidden":"true"}},[s._v("#")]),s._v(" 如果不小心删错了文件")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout commitid -- a.txt\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reset commit a.txt\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout -- a.txt\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])])])},[],!1,null,null,null);t.default=n.exports},84:function(s,t,a){s.exports=a.p+"assets/img/commit1.ddbab5f4.png"},85:function(s,t,a){s.exports=a.p+"assets/img/commit2.ea49f0c3.png"}}]);