# Delete `cr` eslint

## 网上搜到的答案

编辑器和使用eslint校验文件报错：error  Delete `␍`  prettier/prettier，原因是因为git。

由于历史原因，`windows`下和`linux`下的文本文件的换行符不一致。

* Windows在换行的时候，同时使用了回车符CR(carriage-return character)和换行符LF(linefeed character) 
* 而Mac和Linux系统，仅仅使用了换行符LF 
* 老版本的Mac系统使用的是回车符CR 

因此，文本文件在不同系统下创建和使用时就会出现不兼容的问题。

## 我的理解

项目里面的editorconfig要求的是lf，项目里面安装的prettier会默认读你的这个editorconfig，把里面的配置当做规则，但是你编辑器里面用的是crlf，你编辑器保存文件后就用的是crlf，如果你编辑器就安装了对应的插件（eslint和prettier和EditorConfig for VS Code，编辑器安装的prettier，默认会读editorconfig，但是如果不安装EditorConfig for VS Code，prettier就读不到editorconfig！所以要装EditorConfig for VS Code）并配置对了，编辑器当时就会给你报错，如果你编辑器没有安装对应的插件什么的，编辑器就不会报错，但是你npm run lint，是使用的项目里面的eslint检测的，还是会报错

至于怎么解决，要有两个方面，第一个是解决掉项目里面的所有crlf，第二个是把编辑器的换行符变成lf，防止以后再次出现这个问题

## 我怎么解决

error  Delete `␍`  prettier/prettier这个报错是可以通过eslint --fix自动修复的，所以如果出现了这个错误，就允许项目里面的npx eslint --fix修复一下（具体怎么修复看eslint官方文档），或者如果在全局安装了eslint的，也可以通过全局的eslint --fix进行修复（使用全局的eslint来检测当前项目的文件，也是会读取当前项目的eslint配置文件，当前项目的配置文件引了plugin:prettier/recommended，而plugin:prettier/recommended有条规则，规则里面有个usePrettierrc属性，默认true，true就代表会读当前项目的prettier配置文件，而且usePrettierrc是true的话，它源码里还做了一件事，使用`prettier.resolveConfig` 读取当前项目的editorconfig配置文件！），修复完后，在vscode里把插件（eslint和prettier和EditorConfig for VS Code）装全，别装少了，这样下次这个编辑器后面的换行符都是lf的了，且在vscode的setting.json里面添加："files.eol": "\n"，将vscode的默认行尾序列（也就是结尾换行符）设置成LF，这样就可以将默认行尾序列换成LF了，如果不设置vscode的files.eol的话，默认是auto，如果是win的话，可能默认就是CRLF，因此直接指定LF就肯定不会错了。

> PS：vscode安装的prettier有个设置：End Of Line，也就是指定prettier的换行符，默认值是LF；还有个设置Use Editor Config，默认读取editorconfig，默认值也是true（但是测试发现需要安装EditorConfig for VS Code插件，这个配置才会生效）格式化使用的prettier，就会改成lf
>
> 总之，遇到问题多分析，也有可能有些情况的我现在还没遇到的，但是遇到了再说，现在看来我上面的理解够用了，够解决当前的问题了。

## 通过IDE一键切换

只能一个个文件的点击编辑器右下角的CRLF进行更换。

## 最佳实践

我的项目仓库中默认是`Linux`环境下提交的代码，文件默认是以`LF`结尾的(工程化需要，统一标准)。

当我用`windows`电脑`git clone`代码的时候，若我的`autocrlf`(在`windows`下安装`git`，该选项默认为`true`)为`true`，那么文件每行会被自动转成以`CRLF`结尾，若对文件不做任何修改，`pre-commit`执行`eslint`的时候就会提示你删除`CR`。

现在可以理解`ctrl+s`和`yarn run lint --fix`方案为何可以修复`eslint`错误了吧，因为`Git`自动将`CRLF`转换成了`LF`。

现在`VScode`，`Notepad++`编辑器都能够自动识别文件的换行符是`LF`还是`CRLF`。 如果你用的是`windows`，文件编码是`UTF-8`且包含中文，最好全局将`autocrlf`设置为`false`。

```
git config --global core.autocrlf false

复制代码
```

注意：`git`全局配置之后，你需要重新拉取代码。**然后最好重启下vscode**

参考掘金：https://juejin.cn/post/6844904069304156168



# prettier

修改了prettierrc文件并保存后，如果格式化没有生效（即没有使用prettierrc的配置进行格式化），可能是vscode没有重新加载prettierrc，需要重启一遍vscode。这样vscode就会重新加载prettierrc文件