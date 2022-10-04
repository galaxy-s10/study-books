// 迭代器写法
// function createArrayIterator(arr) {
//   console.log('迭代器写法');
//   let index = 0;
//   return {
//     next: function () {
//       if (index < arr.length) {
//         return { value: arr[index++], done: false };
//       } else {
//         return { value: undefined, done: true };
//       }
//     },
//   };
// }

// 替换成生成器写法
function* createArrayIterator(arr) {
  console.log('替换成生成器写法');
  // 3.第三种写法 yield*
  yield* arr;
  // 2.第二种写法
  // for (const item of arr) {
  //   yield item;
  // }
  // 1.第一种写法
  // yield 'abc'; // { value: 'abc', done: false }
  // yield 'cba'; // { value: 'cba', done: false }
  // yield 'nba'; // { value: 'nba', done: false }
}

const names = ['abc', 'cba', 'nba'];
const namesIterator = createArrayIterator(names);

console.log(namesIterator.next()); //{ value: 'abc', done: false }
console.log(namesIterator.next()); //{ value: 'cba', done: false }
console.log(namesIterator.next()); //{ value: 'nba', done: false }
console.log(namesIterator.next()); //{ value: undefined, done: true }

console.log('-------------');

// 2.创建一个函数, 这个函数可以迭代一个范围内的数字
// function createRangeIterator(start, end) {
//   console.log('迭代器写法');

//   let index = start;
//   return {
//     next: function () {
//       if (index < end) {
//         return { value: index++, done: false };
//       } else {
//         return { value: undefined, done: true };
//       }
//     },
//   };
// }
function* createRangeIterator(start, end) {
  console.log('替换成生成器写法');

  let index = start;
  while (index < end) {
    yield index++;
  }
}

const rangeIterator = createRangeIterator(10, 13);
console.log(rangeIterator.next()); // { value: 10, done: false }
console.log(rangeIterator.next()); // { value: 11, done: false }
console.log(rangeIterator.next()); // { value: 12, done: false }
console.log(rangeIterator.next()); // { value: undefined, done: true }
console.log(rangeIterator.next()); // { value: undefined, done: true }
