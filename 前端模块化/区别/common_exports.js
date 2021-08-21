// console.log('commonjs的exports导出');
var count = 0
var obj = { name: 'express' }

setTimeout(function () {
  console.log('500', count, obj.name)
}, 1000)

exports.count = count
exports.obj = obj