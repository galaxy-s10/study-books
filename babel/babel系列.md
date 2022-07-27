# babel是什么

官网解释：Babel 是一个工具链，主要用于将 ECMAScript 2015+ 代码转换为当前和旧版浏览器或环境中向后兼容的 JavaScript 版本

个人理解：其实babel和webpack都有一点很相像，就是webpack本质上是一个打包器，它可以处理js，css，img等，从入口文件开始，然后处理入口文件里面的依赖关系，经过webpack的loader和plugin处理，最终打包成一个bundle文件，怎么说呢，就是很多事情并不是webpack做的，而是webpack提供的一系列钩子，webpack的loader和plugin都基于这些钩子做一系列事情，从而打包成一个bundle。

而babel也是这样，babel主要是对输入代码进行解析（parse），转换（transform），生成（generate）然后在这三个阶段做不同的事情。

# @babel/preset-env

官方解释：`@babel/preset-env`是一个智能预设，允许您使用最新的 JavaScript，而无需微观管理目标环境需要哪些语法转换（以及可选的浏览器 polyfill）。这既让你的生活更轻松，也让 JavaScript 包更小！

个人理解：主要是一些babel预设，他内置了一些[插件](https://github.com/babel/babel/blob/main/packages/babel-preset-env/package.json)，，可以将一些较新的语法或特性处理（解析/转换/生成）成一些旧的语法，如：

1. let转换成var，因为内置了[@babel/plugin-transform-block-scoping](https://babeljs.io/docs/en/babel-plugin-transform-block-scoping)插件
2. 箭头函数转成普通函数，使用了[@babel/plugin-transform-arrow-functions](https://babeljs.io/docs/en/babel-plugin-transform-arrow-functions)插件
3. ...

# @babel/plugin-transform-runtime

官网解释：一个插件，可以重用 Babel 的注入帮助代码以节省代码大小。

Babel 使用非常小的帮助器来处理常见的功能，例如`_extend`. 默认情况下，这将添加到需要它的每个文件中。这种重复有时是不必要的，尤其是当您的应用程序分布在多个文件中时。

这就是`@babel/plugin-transform-runtime`插件的用武之地：所有助手都将引用该模块`@babel/runtime`，以避免在编译输出中出现重复。运行时将编译到您的构建中。

从默认的@babel/preset-env构建输出的文件中，我们可以看出，输入文件里使用了扩展运算符，编译的输出结果多了三个函数：_objectSpread，_defineProperty，ownKeys，如果多个文件都使用



# @babel/preset-env的corejs和@babel/plugin-transform-runtime的corejs区别

