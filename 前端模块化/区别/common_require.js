// console.log('commonjs，require是运行时调用，所以require理论上可以运用在代码的任何地方');
var { count, obj } = require('./common_exports.js')

console.log(count, obj.name); //0 express

setTimeout(function () {
  count++;
  obj.name = 'koa'
  console.log('500', count, obj.name)  //1 koa
}, 500)