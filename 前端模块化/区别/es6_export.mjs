console.log('es6的export导出');
export var count = 0;
export var obj = { name: koa };
setTimeout(function () {
  console.log('commonJs，500毫秒后打印count', ++exports.count)
}, 1500)
export default debounce = 123
