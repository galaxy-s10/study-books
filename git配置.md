# git config

```bash
# 显示当前的Git配置
git config --list
# 查看当前用户（global）配置
git config --global --list
# 查看当前仓库配置信息
git config --local --list
# 设置邮箱
git config --global user.email '2274751790@qq.com'
# 设置用户名
git config --global user.name 'galaxy-s10'
```

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
	#whitespace，true：显示空白问题；cr-at-eol：不显示空白问题
	whitespace = true
	#whitespace = cr-at-eol
	#safecrlf， true：拒绝提交包含混合换行符的文件；false：允许包含混合换行符的文件；warn：混合换行符的文件时报警告
	safecrlf = true
	#autocrlf，false：不自动转换换行符；input：转换为LF；true：转换为CRLF
	#autocrlf = input
	#autocrlf = true
	#autocrlf = false
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

如果没有手动设置它，默认它就没有值，如果他没有值的话

input，在提交的时候（即git add .）会提示`warning: xxxx 中的 CRLF 将被 LF 替换。在工作区中该文件仍保持原有的换行符`，即git status还是和以前一样的

```sh
git config --global core.autocrlf input
```

true，会将项目的换行符换成CRLF

如果没有手动设置core.autocrlf，默认core.autocrlf就没有值，如果他没有值的话

- 如果你当前在mac环境，mac环境默认换行符是LF，那么在提交的时候（即git add .）换行符就是LF
- 如果你当前在win环境，win环境默认换行符是CRLF，那么在提交的时候（即git add .）换行符就是CRLF
- 如果你当前在mac环境，并且你的mac环境没有手动配置core.autocrlf，然后你拉取了一个在win环境的项目（假设该项目当时的git没有手动设置core.autocrlf，即项目里的换行符是CRLF），拉取代码下来后，随便找一个文件啥也不修改，只保存，保存后不要执行git add，直接git diff会发现该文件被修改了，修改的全是换行符（这是因为换行符不一致的问题），这时候如果我们配置`git config --global core.autocrlf input`，然后再git diff就会发现原本的修改都没了，但是显示`warning: xxx 中的 CRLF 将被 LF 替换。`，并且git status显示该文件还是被修改了，但是此时我们git add后，控制台把之前git diff的`warning: xxx 中的 CRLF 将被 LF 替换。`给打印输出了，然后git status显示没有文件被修改，貌似解决了问题，但问题是，我们遇到每个和之前文件冲突的文件，都得执行一遍git add之后，才会正常，官方的[在更改行结束符后刷新仓库](https://docs.github.com/cn/get-started/getting-started-with-git/configuring-git-to-handle-line-endings?platform=mac#refreshing-a-repository-after-changing-line-endings)，我看不懂是什么操作，但是我更改core.autocrlf为input貌似很麻烦，因为他会把原本仓库的crlf改成lf，我应该将core.autocrlf设置为true，这样才会符合原本仓库的换行符，但是如果我core.autocrlf设置为true后，那么要是我有另一个仓库，他的换行符配置是LF，那岂不是我本地的core.autocrlf有得改为input，很明显不太合理，因此这里不改全局的core.autocrlf，直接在项目根目录新建.gitattributes文件，添加：`* text eol=crlf`，这样就一点毛病都没有了，下次别的用mac同事拉这个项目代码的时候，也不需要额外配置就可以直接适配换行符了，这里再总结下最终流程：首先丢弃所有文件更改，然后新建.gitattributes文件，添加：`* text eol=crlf`，这样后面就不会有git的换行符问题了
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



# 最佳实践

## .gitattributes

项目根目录新建.gitattributes文件，添加：`* text eol=lf`，这样就一点毛病都没有了，下次别的用mac同事拉这个项目代码的时候，也不需要额外配置就可以直接适配换行符了，这里再总结下最终流程：首先丢弃所有文件更改，然后新建.gitattributes文件，添加：`* text eol=lf`，这样后面就不会有git的换行符问题了

.gitattributes

```
# 设置* text=auto的话，一般情况下没问题，但是如果git配置了safecrlf = true，就会导致问题
# * text=auto
# 设置* text eol=lf，即设置成和.editorconfig的end_of_line一样的值，就会不管是win还是mac，都统一
# 使用eol设置的换行符，就不会有换行符的问题了（不会受autocrlf和safecrlf的影响）
* text eol=lf

```

> 如果不确定当前项目的换行符是否一致，直接使用prettier格式化整个项目，prettier默认会读取.editorconfig的end_of_line配置，会使用它的换行符来进行格式化，格式化完成后，在git add和git commit提交一下即可

# 参考

1. Pro Git: [https://git-scm.com/book/zh/v2](https://git-scm.com/book/zh/v2)，免费下载
2. Pro Git: [https://www.progit.cn/](https://www.progit.cn/)
