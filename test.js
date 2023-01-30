const path = require('path');

// console.log(path.resolve('/aaa/bbb', './b.js')); //打印：/aaa/bbb/b.js
// console.log(path.resolve('/aaa/bbb/', './b.js')); //打印：/aaa/bbb/b.js
// console.log(path.resolve('/aaa/bbb', '../b.js')); //打印：/aaa/b.js
// console.log(path.resolve('/aaa/bbb/', '../b.js')); //打印：/aaa/b.js
// console.log(path.resolve('/aaa/bbb/ccc', '../b.js')); //打印：/aaa/bbb/b.js
// console.log(path.resolve('/aaa/bbb/ccc/', '../b.js')); //打印：/aaa/bbb/b.js
// console.log(path.resolve('/aaa/bbb/ccc/a.js', '../b.js')); //打印：/aaa/bbb/ccc/b.js

console.log(path.resolve('/aaa/bbb'.replace('/', path.sep), './b.js')); //打印：/aaa/bbb/b.js

console.log(path.posix.resolve('/aaa/bbb', './b.js')); //打印：/aaa/bbb/b.js
console.log(path.posix.resolve('/aaa/bbb/', './b.js')); //打印：/aaa/bbb/b.js
console.log(path.posix.resolve('/aaa/bbb', '../b.js')); //打印：/aaa/b.js
console.log(path.posix.resolve('/aaa/bbb/', '../b.js')); //打印：/aaa/b.js
console.log(path.posix.resolve('/aaa/bbb/ccc', '../b.js')); //打印：/aaa/bbb/b.js
console.log(path.posix.resolve('/aaa/bbb/ccc/', '../b.js')); //打印：/aaa/bbb/b.js
console.log(path.posix.resolve('/aaa/bbb/ccc/a.js', '../b.js')); //打印：/aaa/bbb/ccc/b.js
