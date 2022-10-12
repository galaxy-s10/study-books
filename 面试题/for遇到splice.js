// 正序遍历同时删除元素的时候，就会可能导致数组塌陷
// 因为删除元素的时候，后面的元素全部都往前移了，但是下标却继续往后走，导致少遍历了一些元素
var arr = [1, 2, 3, 3, 4, 5, 6, 3];
// for (var i = 0; i < arr.length; i++) {
//   console.log('当前数组长度', arr.length, ',当前下标', i);
//   if (arr[i] === 3) {
//     arr.splice(i, 1);
//     i--; //删了一个元素就添加回一个元素
//   }
// }
// console.log(arr); // [1, 2, 4, 5, 6]
// 解决方法1：删一个元素的时候，数组的下标也减一
// 缺点：可以遍历全部数据，但是会有下标问题，比如：遍历arr里面的第二个3时，输出的下标i应该是3的，由于上一个3的时候i-1了，所以到这个i的时候，它输出的是2

// 倒序循环
// for (var i = arr.length - 1; i > 0; i--) {
//   console.log('当前数组长度', arr.length, ',当前下标', i);
//   if (arr[i] === 3) {
//     arr.splice(i, 1);
//   }
// }
// console.log(arr); // [1, 2, 4, 5, 6]

console.log(
  arr.reduce((pre, cur) => {
    cur !== 3 && pre.push(cur);
    return pre;
  }, [])
); // [1, 2, 4, 5, 6]
// console.log(arr.filter((v) => v !== 3));
