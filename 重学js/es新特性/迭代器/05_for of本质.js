const arr = ['abc', 'cba', 'nba'];
// __proto__不是标准，只在浏览器里面有，node环境没有，因此这个案例在浏览器环境测试，在node环境测试会报错
// arr.__proto__[Symbol.iterator] = function () {
//   console.log('----');
//   let index = 0;
//   return {
//     next() {
//       if (index < arr.length) {
//         return { done: false, value: index++ };
//       } else {
//         return { done: true, value: undefined };
//       }
//     },
//   };
// };

for (let i of arr) {
  console.log(arr, i, arr[i]);
}
// 打印：
// [ 'abc', 'cba', 'nba' ] abc undefined
// [ 'abc', 'cba', 'nba' ] cba undefined
// [ 'abc', 'cba', 'nba' ] nba undefined
