// 数组乱序
// Fisher–Yates shuffle洗牌算法
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function shuffle(arr) {
  const result = [...arr];
  for (var i = result.length - 1; i >= 0; i--) {
    // 随机下标
    var randomIndex = Math.floor(Math.random() * (i + 1));
    // 随机下标的值
    var randomVal = result[randomIndex];
    // 互换位置
    result[randomIndex] = result[i];
    result[i] = randomVal;
  }
  return result;
}
// 数组反序，直接使用reverse，或者倒序遍历。
// function reve(arr) {
//   const newarr = [];
//   for (let i = arr.length - 1; i >= 0; i--) {
//     newarr.push(arr[i]);
//   }
//   return newarr;
// }

// console.log(reve(arr), arr.reverse());

console.log(shuffle(arr));
