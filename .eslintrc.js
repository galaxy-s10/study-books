module.exports = {
  root: true,
  settings: {
    // 'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    // 'airbnb-base', // airbnb的eslint规范，它会对import和require进行排序，挺好的。如果不用它的话，需要在env添加node:true
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  // plugins: ['import', '@typescript-eslint'],
  // parser: '@typescript-eslint/parser',
  // rules优先级最高，会覆盖上面的
  rules: {
    /**
     * 0 => off
     * 1 => warn
     * 2 => error
     */
    // 'import/order': [
    //   'error',
    //   {
    //     groups: [
    //       'builtin',
    //       'external',
    //       'internal',
    //       ['sibling', 'parent'],
    //       'index',
    //       'object',
    //       'type',
    //     ],
    //     'newlines-between': 'always', // 强制或禁止导入组之间的新行：
    //     // 根据导入路径按字母顺序对每个组内的顺序进行排序
    //     alphabetize: {
    //       order: 'asc' /* 按升序排序。选项：['ignore', 'asc', 'desc'] */,
    //       caseInsensitive: true /* 忽略大小写。选项：[true, false] */,
    //     },
    //   },
    // ],

    'no-console': 0, // 此规则不允许调用console对象的方法。
    'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }], // 该规则强制注释中 // 或 /* 后空格的一致性
    'no-var': 2, // 要求let或const代替var
    'no-shadow': 2, // 禁止变量声明与外层作用域的变量同名
    'no-param-reassign': 2, // 禁止对 function 的参数进行重新赋值
    'no-nested-ternary': 2, // 禁止嵌套三元
    'no-plusplus': 2, // 禁用一元操作符 ++ 和 --
    'no-unused-vars': 2, // 禁止出现未使用过的变量
    'vars-on-top': 2, // 要求所有的 var 声明出现在它们所在的作用域顶部
    // 'no-undef': 2,

    // 'import/no-extraneous-dependencies': 2, // 开发/生产依赖混乱
    // 'import/prefer-default-export': 0, // 当模块只有一个导出时，更喜欢使用默认导出而不是命名导出。
    // 'import/extensions': 0, // 确保在导入路径中一致使用文件扩展名
    // 'import/no-unresolved': 0, // 不能解析带别名的路径的模块，但实际上是不影响代码运行的。找不到解决办法，只能关掉了。
    // 'class-methods-use-this': 0, // 类方法如果不使用this的话会报错
    // 'class-methods-use-this': 0, // 类方法如果不使用this的话会报错
    // 'no-restricted-syntax': [
    //   // airbnb默认禁用了一些语法
    //   1,
    //   // 'FunctionExpression',
    //   // 'ForInStatement',
    //   { selector: 'ForInStatement', message: '不建议使用for in' },
    // ],
    // 'guard-for-in': 0, // 当for in循环不使用if语句过滤其结果时，它会发出警告
    // 'no-plusplus': 0,
    // 'arrow-body-style': [1, 'as-needed'], // 在可以省略的地方强制不使用大括号（默认）
    // 'global-require': 1, // 此规则要求所有调用require()都在模块的顶层，类似于 ES6import和export语句，也只能在顶层发生。
    // 'import/prefer-default-export': 0, // 当模块只有一个导出时，更喜欢使用默认导出而不是命名导出。
    // 'no-undef': 0, // https://github.com/typescript-eslint/typescript-eslint/issues/2528#issuecomment-689369395
    // 'func-names': 0, // 不能是匿名函数
    // 'no-underscore-dangle': 0, // Unexpected dangling '_' in '_xxx'
    // 'import/extensions': 0, // 省略导入源路径中的文件扩展名
    // 'import/no-unresolved': 0, // 确保导入的模块可以解析为本地文件系统上的模块，如标准节点require.resolve行为所定义的。
    // 'prefer-rest-params': 0, // 此规则旨在标记arguments变量的使用
    // 'import/newline-after-import': 1, // 强制在最后一个顶级导入语句或 require 调用之后有一个或多个空行
    // 'no-redeclare': 2, // 此规则旨在消除在同一范围内具有多个声明的变量。
    // 'no-unused-expressions': [2, { allowShortCircuit: true }], // 期望一个赋值或函数调用，却看到了一个表达式，允许&&
    // 'array-callback-return': [2, { allowImplicit: false }], // expects a return value from arrow function.期望箭头函数的返回值。
  },
};
