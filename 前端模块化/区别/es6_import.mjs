console.log('es6的import是编译时调用，所以必须放在文件开头');
import { count } from './es6_export.mjs'
setTimeout(function () {
  console.log('es6,1000毫秒后打印count', count)
}, 1000)
setTimeout(function () {
  console.log('es6,1500毫秒后打印count', count)
}, 1500)