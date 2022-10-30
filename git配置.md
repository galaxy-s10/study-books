# git config

默认的git配置文件位置：~/.gitconfig，你设置的全局配置都存在这里

```
[safe]
	directory = /opt/homebrew/Library/Taps/homebrew/homebrew-cask
	directory = /opt/homebrew/Library/Taps/homebrew/homebrew-services
	directory = /opt/homebrew/Library/Taps/homebrew/homebrew-core
[user]
	email = 2274751790@qq.com
	name = shuisheng
[filter "lfs"]
	process = git-lfs filter-process
	required = true
	clean = git-lfs clean -- %f
	smudge = git-lfs smudge -- %f
[core]
	whitespace = true
	autocrlf = true

```



# core.whitespace

## 命令

获取当前core.whitespace

```sh
git config --get core.whitespace
```

设置true，会显示修改，而且会显示空白修改，即会有^M。建议设置这个，避免看不出来改了那里。

```sh
git config --global core.whitespace true
```

设置cr-at-eol，会显示修改，但不会显示空白修改，即不会有^M

```sh
git config --global core.whitespace cr-at-eol
```



## progit的解释

https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git

Git 预先设置了一些选项来探测和修改了多余的六种默认选项。它提供了处理多余的空格字符——其中三个开启，另外三个默认关闭，不过你可以自由地设置它们。

被打开的三个选项是：`blank-at-eol`查找行尾的空格；查找行尾的默认`blank-at-eof`空行；查找文件 `space-before-tab`行头标签最前面的空格。

被关闭的三个选项`indent-with-non-tab`，揪出以空格是非监视画面的行（你可以用`tabwidth`选项控制它）；`tab-in-indent`，在行头表示缩进的选项卡；`cr-at-eol`，告诉Git默认不让行尾的返回。

通过设置`core.whitespace`，你可以设置 Git 按照你的配置来打开或以显示的选项`-`。要打开除`space-before-tab`之外的所有选项，那么可以这样（`trailing-space`覆盖`blank-at-eol`和`blank-at-eof`）：

```console
$ git config --global core.whitespace \
    trailing-space,-space-before-tab,indent-with-non-tab,tab-in-indent,cr-at-eol
```

你也可以只指定自定义的部分：

```console
$ git config --global core.whitespace \
    -space-before-tab,indent-with-non-tab,tab-in-indent,cr-at-eol
```

当你运行`git diff`时，Git 会检测到这些问题，并提交之前修复`git apply`它们的命令。 ，你可以让 Git 在应用时发出警告：

```console
$ git apply --whitespace=warn <patch>
```

或者让 Git 在打上补丁前自动修改这个问题：

```console
$ git apply --whitespace=fix <patch>
```

`git rebase`如果提交的空白文件有问题，但可以使用让 Git 交给他们的选项，你可以让`git rebase --whitespace=fix`它们在作业的时候自动修改。



# core.autocrlf

## 命令

获取当前core.autocrlf

```sh
git config --get core.autocrlf
```

input，在提交的时候（即git add .）会提示`warning: xxxx 中的 CRLF 将被 LF 替换。在工作区中该文件仍保持原有的换行符`，即git status还是和以前一样的

```sh
git config --global core.autocrlf input
```

true，会将项目的换行符换成CRLF

- 如果你当前在mac环境，你的项目使用的换行符是LF，那么在提交的时候（即git add .）会提示`warning: xxxx 中的 LF 将被 CRLF 替换。在工作区中该文件仍保持原有的换行符`，因为你原本用的是LF，要换成CRLF
- 如果你当前在window环境，你的项目使用的换行符是CRLF，那么在提交的时候（即git add .）不会提示`warning: xxxx 中的 LF 将被 CRLF 替换。在工作区中该文件仍保持原有的换行符`，因为你原本用的就是CRLF，不需要换
- 一般情况下，设置了true后，后面再操作文件，是不会有换行符的问题的（只是你git add的时候git会提示给你替换），如果有换行符的问题，那么肯定就是你原本的是LF，你保存文件后，换成了CRLF；或者你原本是CRLF，保存文件后，替换成了LF

```sh
git config --global core.autocrlf true
```

false，git add .的时候不会做任何转换

```sh
git config --global core.autocrlf false
```



## git-scm的解释

https://git-scm.com/docs/git-config#Documentation/git-config.txt-coreautocrlf

如果为 true，则`CRLF`当行尾转换处于活动状态时，让 Git 检查转换是否可逆。Git 将验证命令是否直接或间接修改了工作树中的文件。例如，提交一个文件然后签出同一个文件应该会在工作树中产生原始文件。如果当前设置不是这种情况 `core.autocrlf`，Git 将拒绝该文件。该变量可以设置为“警告”，在这种情况下，Git 只会警告不可逆的转换，但会继续操作。

CRLF 转换可能会损坏数据。启用后，Git 将在提交期间将 CRLF 转换为 LF，在签出期间将 LF 转换为 CRLF。Git 无法重新创建在提交之前包含 LF 和 CRLF 混合的文件。对于文本文件，这是正确的做法：它更正了行尾，以便我们在存储库中只有 LF 行尾。但是对于意外归类为文本的二进制文件，转换可能会损坏数据。

如果您及早发现这种损坏，您可以通过在 .gitattributes 中明确设置转换类型来轻松修复它。提交后，您的工作树中仍然有原始文件，并且该文件尚未损坏。您可以明确告诉 Git 该文件是二进制文件，Git 会适当地处理该文件。

不幸的是，无法区分清理具有混合行结尾的文本文件的预期效果和损坏二进制文件的不良效果。在这两种情况下，CRLF 都会以不可逆的方式被移除。对于文本文件，这是正确的做法，因为 CRLF 是行尾，而对于二进制文件，转换 CRLF 会破坏数据。

请注意，此安全检查并不意味着结帐会为不同的设置生成与原始文件相同的文件 `core.eol`和`core.autocrlf`，而仅针对当前设置。例如，带有 的文本文件`LF`将被 接受`core.eol=lf` 并且以后可以用 签出`core.eol=crlf`，在这种情况下，结果文件将包含`CRLF`，尽管原始文件包含`LF`. 但是，在两个工作树中，行结尾都是一致的，即 all`LF`或 all `CRLF`，但从不混合。`core.safecrlf` 该机制将报告具有混合行结尾的文件。

## progit的解释

假如你正在 Windows 上写程序，而你的同伴用的是其他系统（或相反），你可能会遇到 CRLF 问题。 这是因为 Windows 使用回车（CR）和换行（LF）两个字符来结束一行，而 Mac 和 Linux 只使用换行（LF）一个字符。 虽然这是小问题，但它会极大地扰乱跨平台协作。许多 Windows 上的编辑器会悄悄把行尾的换行字符转换成回车和换行，或在用户按下 Enter 键时，插入回车和换行两个字符。

Git 可以在你提交时自动地把回车和换行转换成换行，而在检出代码时把换行转换成回车和换行。 你可以用 `core.autocrlf` 来打开此项功能。 如果是在 Windows 系统上，把它设置成 `true`，这样在检出代码时，换行会被转换成回车和换行：

```sh
git config --global core.autocrlf true
```

如果使用以换行作为行结束符的 Linux 或 Mac，你不需要 Git 在检出文件时进行自动的转换；然而当一个以回车加换行作为行结束符的文件不小心被引入时，你肯定想让 Git 修正。 你可以把 `core.autocrlf` 设置成 input 来告诉 Git 在提交时把回车和换行转换成换行，检出时不转换：

```sh
git config --global core.autocrlf input
```

这样在 Windows 上的检出文件中会保留回车和换行，而在 Mac 和 Linux 上，以及版本库中会保留换行。

如果你是 Windows 程序员，且正在开发仅运行在 Windows 上的项目，可以设置 `false` 取消此功能，把回车保留在版本库中：

```sh
git config --global core.autocrlf false
```



## doc.github的解释

https://docs.github.com/cn/get-started/getting-started-with-git/configuring-git-to-handle-line-endings



# core.eol

**请注意，如果core.autocrlf设置为true或input，则将忽略此值。**

## 命令

获取当前core.eol

```sh
git config --get core.eol
```

true

```sh
git config --global core.eol true
```

false

```sh
git config --global core.eol false
```



## git-scm解释

为标记为文本的文件设置要在工作目录中使用的行结束类型（通过`text` 设置属性，或者通过让`text=auto`Git 自动将内容检测为文本）。替代方案是*lf*、*crlf*和*native*，它们使用平台的本机行尾。默认值为`native`。有关行尾转换的更多信息，请参阅 [gitattributes[5\]](https://git-scm.com/docs/gitattributes)。请注意，如果core.autocrlf设置为true或input，则将忽略此值。





# core.safecrlf

## 命令

获取当前core.safecrlf

```sh
git config --get core.safecrlf
```

true，允许提交包含混合换行符的文件

```sh
git config --global core.safecrlf true
```

false，拒绝提交包含混合换行符的文件

```sh
git config --global core.safecrlf false
```

warn，提交包含混合换行符的文件时给出警告

```sh
git config --global core.safecrlf warn
```





# .gitattributes

自定义git配置文件

```
# https://docs.github.com/cn/get-started/getting-started-with-git/configuring-git-to-handle-line-endings?platform=mac#about-line-endings
# 该项目一开始是在window系统创建的，.editorconfig配置的换行符是window系统的crlf
# 设置* text eol=crlf后，会忽略git全局的core.autocrlf配置，在git add .的时候会将所有换行符替换为crlf
# * text eol=crlf
# 但https://adaptivepatchwork.com/2012/03/01/mind-the-end-of-your-line/文章里不推荐修改eol设置
# * text=auto

```



# 实际案例

## 空白问题

在多人协作的情况下，可能每个开发者使用的操作系统不一样，在git提交时出现很多^M提示符

```sh
diff --git a/.prettierrc b/.prettierrc
index 8134dbf..2760dcf 100644
--- a/.prettierrc
+++ b/.prettierrc
@@ -1,6 +1,6 @@
-{
-    "semi": false,
-    "printWidth": 200,
-    "singleQuote": true,
-    "tabWidth": 4
-}
+{^M
+    "semi": false,^M
+    "printWidth": 200,^M
+    "singleQuote": true,^M
+    "tabWidth": 4^M
+}^M
```

### 解决办法1

```sh
git config --global core.whitespace cr-at-eol
```

使用上面的命令后，git diff就不会显示^M差异，但仍然会显示有修改，只是不显示

### 解决办法2

```sh
git config --global core.autocrlf input
```

使用该命令，git会在提交时转换为lf



# 参考

1. Pro Git: [https://git-scm.com/book/zh/v2](https://git-scm.com/book/zh/v2)，免费下载
2. Pro Git: [https://www.progit.cn/](https://www.progit.cn/)
