# 总结

如果我们拉代码下来，.editorconfig配置了crlf，但是拉下来的代码缺全是lf，这样当我们保存文件的时候，会将lf文件保存问crlf就会有问题

当前项目有crlf和lf，并且有.gitattributes文件，配置了* text=auto

当前是在mac情况下，约等于设置了autocrlf=input

我们将crlf文件保存为lf，然后git add，没有警告（在autocrlf=input的情况下，git检出代码时会将crlf替换为lf，你此时本机将crlf文件保存为lf后，别人拉到的代码也是lf，因此不会报警告），并且git add后，显示了换行符差异，因为你工作区是crlf，提交到暂存区的确实lf，因此就会显示换行符差异

但我们将lf文件保存为crlf，然后git add提示crlf会被lf替换，（因为在autocrlf=input的情况下，git检出代码时会将crlf替换为lf，此时别人拉代码的时候得到的就是lf文件，和你本机的crlf不一致，因此会报警告），并且，git add后，这个lf文件不会有差异显示，此时我的理解是我这个文件在工作区的换行符还是我改成的crlf，但是git add到暂存区的文件已经被改成lf了（可以设置safecrlf=true验证，设置true后，提交到暂存区的文件换行符就不会被修改），那么我这个文件原本就是lf的，添加到暂存区后还是lf，因此就不会报差异。

当前是在win情况下，约等于设置了autocrlf=true

我们将lf文件保存为crlf，然后git add，提示`warning: in the working copy of '.editorconfig', LF will be replaced by CRLF the next time Git touches it`，即git会在下次检出是，将lf会被crlf替换，因为原本是文件是lf，本机替换成crlf，工作区就是crlf，并且git add添加到工作区的文件也是crlf，因此，git add只会不会显示换行符差异。



# 最佳实践

- 刚搭建项目的时候，必须添加.editorconfig配置文件，并且设置end_of_line；而且必须添加.gitattributes文件，设置* text=auto
- 如果是后面接手的项目，没有.gitattributes或.editorconfig，或者两个都没有，此时你拉下来的代码可能就是受你本地的autocrlf影响了，如果你是mac环境，本地autocrlf设置了false，拉下来的代码都是lf，但拉下来的项目有.editorconfig，并且他配置了end_of_line=crlf，那么，你保存的文件时就会将文件的lf改成crlf，那么总而言之，得保证必须得有这两个文件，哪个没有就新建哪个，然后提交到代码仓库，然后你再把本地当前项目删了，重新拉一遍代码下来，就可以保证你在mac下拉下来的代码文件全是lf，在win的话拉下来的代码全是crlf。
- ，但是有个.editorconfig文件，.editorconfig配置了end_of_line是crlf，但你拉代码下来后，拉下来的代码全是lf，那么此时你手动添加.gitattributes，并且设置* text=auto，如果你添加.gitattributes，并且设置* text=auto后，保存文件还是会有换行符差异的话，你可以重启一下vscode，因为有可能是有延迟导致的，如果重启还是有问题，可以只添加了.gitattributes后提交到代码仓库，然后再换个位置拉代码下来（或者直接把当前的目录删了重新拉代码）



# 误区

并不是有了.gitattributes就一定不会有换行符差异。

换行符差异的本质一定是你本地工作区修改了换行符（或者说你工作区的a文件的换行符和提交到暂存区后的a文件的换行符不一致）

不管你autocrlf、.gitattributes、.editorconfig，只要满足上面的条件，就一定会报换行符差异

1. 比如你在mac环境，本地autocrlf设置了false，git clone后得到的项目代码都是lf（其实不一定你mac环境，本地设置autocrlf为false，拉代码下来就一定是lf，也有可能是crlf的。），拉下来的项目没有.gitattributes，有.editorconfig，并且他配置了end_of_line=crlf，那么，你保存的文件时就会将文件的lf改成crlf，此时就会报换行符差异！
2. 比如你在mac环境，本地autocrlf设置了false，git clone后得到的项目代码都是crlf（其实不一定你mac环境，本地设置autocrlf为false，拉代码下来就一定是lf，也有可能是crlf的。），拉下来的项目没有.gitattributes，有.editorconfig，并且他配置了end_of_line=lf，那么，你保存的文件时就会将文件的crlf改成lf，此时就会报换行符差异！



# 下面的不用看了，可能不准确（但我舍不得删）

.gitconfig

```
[core]
	#whitespace，true:显示空白问题；cr-at-eol:不显示空白问题
	#whitespace = true
	#whitespace = cr-at-eol

	#safecrlf,默认warn。true:拒绝提交包含混合换行符的文件；false:允许包含混合换行符的文件；warn:混合换行符的文件时报警告
	#safecrlf = false
	#safecrlf = true
	#safecrlf = warn

	#autocrlf,默认false。false：不自动转换换行符；input：转换为LF；true：转换为CRLF
	#autocrlf = input
	#autocrlf = true
	#autocrlf = false
```

gitdemo

a.js

![https://resource.hsslive.cn/image/e648af774d624cc011f69c9d4ecccd66.jpg](https://resource.hsslive.cn/image/e648af774d624cc011f69c9d4ecccd66.jpg)

b.js

![https://resource.hsslive.cn/image/a524c477264e2cff46cf987a9bddaf0a.jpg](https://resource.hsslive.cn/image/a524c477264e2cff46cf987a9bddaf0a.jpg)

此时我们看到当前工作区是干净的，a.js 和 b.js 都使用了 LF 作为尾行符，此时我们把代码提交上去 github，然后换一台 win 系统的电脑拉代码下来

win 系统的电脑.gitconfig 配置和我 mac 的配置一样，拉取代码下来后，唯一不一样的是底部的 LF 变成了 CRLF，这就很纳闷了，为什么我们 mac 系统里底部的显示 LF，提交到 git 仓库后，按道理来说提交的文件也是 LF，为啥我在 win 系统里面拉代码，底部没有显示文件是 LF，而显示的是 CRLF？？？先不管，此时我们保存 a.js 和 b.js，按道理来说，原本文件是 LF 的话，此时我们在 win 系统里底部显示的是 CRLF，保存的应该也是 CRLF，git 应该会检测出文件发生了修改，然而结果却是 git 并没有检测到更改了文件（此处省略图了，比较麻烦）。

这就又很纳闷了，？？？？？？，又先不管，我们此时在 win 系统新建一个 c.js

c.js，c.js 的尾行符是 CRLF

```js
console.log('ccc');
```

直接提交代码仓库！然后回到 mac，git pull 拉下来

![https://resource.hsslive.cn/image/d6dd0df5900c1cf2fd797042a3e28b56.jpg](https://resource.hsslive.cn/image/d6dd0df5900c1cf2fd797042a3e28b56.jpg)

此时又纳闷了，明明 win 提交的 c.js 是 crlf，为什么 mac 里拉代码下来，却还是显示的 LF？？？暂且不管，直接保存一下 c.js 看看，发现和 win 的情况一样，git 检测不到更改了文件，此时我们在 mac 添加一个.editorconfig 文件：

.editorconfig

```
# https://editorconfig.org
root = true

[*]
end_of_line = lf

```

然后重新保存一遍所有文件，发现除了检测新增的.editorconfig 文件，其他 abc.js 都检测不到修改（此时所有文件底部都是显示的 LF），我们直接提交

然后回到 win 系统拉代码，拉代码下来后，所有文件的底部依旧显示的是 CRLF，此时，将所有文件再保存一遍，此时有了变化，底部的 CRLF 全都变成了 LF，注意，我们此时还没有使用 git add 添加到暂存区，仅仅是所有文件保存了一遍：

![https://resource.hsslive.cn/image/9a50c7cf72e0bddb34ebecf3e5ed7abe.png](https://resource.hsslive.cn/image/9a50c7cf72e0bddb34ebecf3e5ed7abe.png)

所有文件显示的都是：`No content changes found`，此时我们 git diff 显示：

![https://resource.hsslive.cn/image/4877b683757e62edaa17d93469f39115.png](https://resource.hsslive.cn/image/4877b683757e62edaa17d93469f39115.png)

翻译过了就是：`警告：在'b的工作副本中。js'，LF将在Git下次接触时被CRLF替换`，此时我们直接 git add .看看会发生什么

![https://resource.hsslive.cn/image/cda67e6fd18822e4248a9526e03644d4.png](https://resource.hsslive.cn/image/cda67e6fd18822e4248a9526e03644d4.png)

![https://resource.hsslive.cn/image/165b0bac82045c25edbfae3ee369fcad.png](https://resource.hsslive.cn/image/165b0bac82045c25edbfae3ee369fcad.png)

很神奇的一点，git add .之后，竟然又恢复正常了？？？一脸懵逼，先放着这个问题，继续在 win 里面添加一个 d.js 看看

![https://resource.hsslive.cn/image/17508cf0ef4d69297ea5f5a40d73158d.png](https://resource.hsslive.cn/image/17508cf0ef4d69297ea5f5a40d73158d.png)

此时提交 d.js，然后再到 mac 看看有没有什么异常，回到 mac，拉了代码后，再次保存一遍所有文件，然后结果也是 git 没有检测修改，好像没什么毛病。

此时回到 win 系统，将.editorconfig 文件的 end_of_line 修改为 crlf，然后再保存一遍所有文件，看看，

![https://resource.hsslive.cn/image/d340831639571d00b220003c9ace4630.png](https://resource.hsslive.cn/image/d340831639571d00b220003c9ace4630.png)

![https://resource.hsslive.cn/image/712f543acd603bb9dd3b05528b698a34.png](https://resource.hsslive.cn/image/712f543acd603bb9dd3b05528b698a34.png)

看到.editorconfig 只修改了一行，而 a.js 又显示了：`No content changes found`，b 和 c.js 也是一样显示这个，但是问题来了，为什么 d.js 没有显示修改呢？？？？d.js 和 abc.js 有啥不一样吗？让我们回顾上文，可以发现，ab 是原本就是使用 LF，添加.editorconfig 配置文件后的格式化也是 LF，c.js 和 d.js 虽然都是在 win 创建的，但是 c.js 创建的时候是 CRLF，后面在 mac 环境里，添加了.editorconfig 后，格式化成 LF 了，而 d.js 一出生就是在有.editorconfig 文件的时候，保存之后他变成了 LF

此时还是没有说清楚 abc 和 d.js 有什么区别，这里我总结下其实有一个最大的区别：**abc.js 都曾经在 mac 里面格式化过，然后提交到代码仓库，而且都被拉到了 win，而 d.js 实际上只在 win 里面格式化过，并没有经过 mac 格式化后，再被 win 拉过来（这是 d 和 c.js 的区别）**

我们此时先 git add .看看，应该还是和之前的一样，只会显示.editorconfig 修改了，测试后果然是这样，只显示了.editorconfig 修改了。然后我们新建一个 e.js，然后再提交 e.js

![https://resource.hsslive.cn/image/e43fca86adb82df5e659719b91ccd3c5.png](https://resource.hsslive.cn/image/e43fca86adb82df5e659719b91ccd3c5.png)

然后回到 mac，先看看此时的 mac：

![https://resource.hsslive.cn/image/6bfaa450afa59e6966e67dadf9e66365.png](https://resource.hsslive.cn/image/6bfaa450afa59e6966e67dadf9e66365.png)

然后拉代码下来

![https://resource.hsslive.cn/image/f4fea5d1d368f4b069631660a728d6c9.png](https://resource.hsslive.cn/image/f4fea5d1d368f4b069631660a728d6c9.png)

可以看到，e.js 包括所有文件，底部都还是显示 LF，可以看出，编辑器貌似不管你.editorconfig 设置的什么，他底下就是显示的 LF（其实这跟"file.eol"这个 vscode 配置有关），然后老规矩，保存所有文件看看

![https://resource.hsslive.cn/image/f9d68b279a8e318bb2e114144fba5061.png](https://resource.hsslive.cn/image/f9d68b279a8e318bb2e114144fba5061.png)

可以看出，保存一遍所有文件后，底部的 LF 变成了.editorconfig 设置的 CRLF，而且 git 检测除了空格差异，但是又有一点区别，只有 abc.js 检测出了空格差异，d 和 e 都没有检测出空格差异，这其实还是上面那个区别，d 和 e 没有在 mac 格式化过，都是一直在 win 系统，而 abc 都曾经在 mac 里面格式化成 LF，因此，abc.js 是 LF，而 de.js 其实本质上还是 CRLF，所以 de 在 mac 里面保持的时候，.editorconfig 格式化成 CRLF，和原本的不冲突，就不会有差异

我们此时 git add .看看什么情况，

git add .后，和原本没 git add .的情况一样，没变化，还是原本的空格差异，还是那几个文件，此时我们直接提交到 git 仓库

![https://resource.hsslive.cn/image/9e154798bccfa5396d3e80f61e507b2d.png](https://resource.hsslive.cn/image/9e154798bccfa5396d3e80f61e507b2d.png)

这里其实可以看到，已经很恶心了，明明什么都没有改，但是却又一堆飘红（空格差异），我们回到 win，拉代码下来看看

![https://resource.hsslive.cn/image/9364be029d2caa0f472c52748ffc2138.png](https://resource.hsslive.cn/image/9364be029d2caa0f472c52748ffc2138.png)

真难看 hhh，此时其实已经有一个小结论了，mac 里面使用 lf，在 win 里面即使保存文件的时候，会显示：`No content changes found`，但是 git add .后，就不会显示了，因此最终提交到 git 仓库也不会有空格差异，而 win 里面使用 crlf，在 mac 里保存文件，直接显示空格差异

最终提交代码也会有空格差异，非常的裂开呢，

时间有点晚了，明天继续写~
