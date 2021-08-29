/**
 * 如果一个目录下存在一个tsconfig.json文件，那么它意味着这个目录是TypeScript项目的根目录。
 * tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项。 一个项目可以通过以下方式之一来编译：
 * 1，使用tsconfig.json
 * 1-1，不带任何输入文件的情况下调用tsc，编译器会从当前目录开始去查找tsconfig.json文件，逐级向上搜索父目录。
 * 1-2，不带任何输入文件的情况下调用tsc，且使用命令行参数--project（或-p）指定一个包含tsconfig.json文件的目录。
 * tip:当命令行上指定了输入文件时，tsconfig.json文件会被忽略。
 */

/**
 * tsc编译会将有关联的文件都进行编译输出，例子：a.ts里面引入了b.ts，然后编译a.ts文件的时候，会把b.ts文件也进行编译输出。
 */

/**
 * warn: 在ts里面引入js文件的数据，会导致类型检测失效！
 */

/**
 * warn: 不管在不在同一个文件夹，在符合编译条件的所有文件，只要有不同的ts文件但定义了同一个变量，都会报错！
 * 比如：在a.ts里面let hi=1，然后又在b.ts里面let hi=2，就会报错
 */

// warn：影响编译的几个选项，files,exclude,include，如果三个都没有定义，则
// 都采用它们三个的默认值，最终的结果就是使用include的["**/*"],即编译所有ts文件
// 如果知道了files，则include会失效

// include并exclude支持通配符来制作 glob 模式：
// * 匹配零个或多个字符（不包括目录分隔符）
// ? 匹配任何一个字符（不包括目录分隔符）
// **/ 匹配嵌套到任何级别的任何目录
// 如果 glob 模式不包含文件扩展名，则只包含支持扩展名的文件（例如.ts, .tsx, 并且.d.ts默认情况下， with.js和.jsx如果allowJs设置为 true ）

/**
 * tip：files。指定要包含在程序中的文件许可列表。如果找不到任何文件，则会发生错误。默认：false
 */

// tip：exclude。默认：["node_modules", "bower_components", "jspm_packages"]，加上outDir如果指定了一个的值。
// 指定解析时应跳过的文件名或模式数组include。
// 重要提示：exclude 仅更改作为include设置结果包含的文件。exclude由于代码中的import语句、types包含、/// <reference指令或在files列表中指定，由 指定的文件仍然可以成为代码库的一部分。
// 它不是一种防止文件被包含在代码库中的机制——它只是改变了include设置发现的内容。

// tip：include，指定要包含在程序中的文件名或模式数组。这些文件名是相对于包含tsconfig.json文件的目录解析的。默认：[]如果files指定，否则["**/*"]

/**
 * tip：outDir
 * 如果指定，.js（以及.d.ts，.js.map等），文件将被发射到这个目录。保留原始源文件的目录结构；如果计算出的根不是您想要的，请参阅rootDir。
 */
