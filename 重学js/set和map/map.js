// // const set1 = new Set();
// // console.log(set1); // Set(0) {}

// // const set2 = new Set([
// //   'tom',
// //   1,
// //   false,
// //   true,
// //   false,
// //   undefined,
// //   null,
// //   { age: 18 },
// // ]);
// // console.log(set2); // Set(7) { 'tom', 1, false, true, undefined, null, { age: 18 } }

// // console.log(set2.has('tom')); // true
// // console.log(set2.add('hi')); // Set(8) { 'tom', 1, false, true, undefined, null, { age: 18 }, 'hi' }
// // console.log(set2.delete(1)); // true
// // console.log(set2); // Set(7) { 'tom', false, true, undefined, null, { age: 18 }, 'hi' }
// // console.log(set2.clear()); // undefined
// // console.log(set2); // Set(0) {}

// // console.log(Array.from(new Set([1, 2, 3]))); // [ 1, 2, 3 ]

// let set = new Set(['red', 'green', 'blue']);

// for (let item of set.keys()) {
//   console.log(item);
// }
// // red
// // green
// // blue

// for (let item of set.values()) {
//   console.log(item);
// }
// // red
// // green
// // blue

// for (let item of set.entries()) {
//   console.log(item);
// }
// // ["red", "red"]
// // ["green", "green"]
// // ["blue", "blue"]

// // Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的`values`方法。这意味着，可以省略values方法，直接用for...of循环遍历 Set。
// console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true

// for (let item of set) {
//   console.log(item);
// }

// // red
// // green
// // blue

let obj = { age: 18 };
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(this, key + ' : ' + value)); //这里的this是window
set.forEach(function (value, key) {
  console.log(this, key + ' : ' + value); //这里的this是obj
}, obj);
