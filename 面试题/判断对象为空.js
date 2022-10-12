let obj = {};
let obj1 = { a: undefined, b: function () {}, c: Symbol() };
Object.defineProperty(obj1, 'd', {
  value: 'ddd',
  enumerable: false,
});
console.log(JSON.stringify(obj), JSON.stringify(obj) === '{}'); // {} true
// 缺点：不能识别undefined、函数、Symbol以及Object.defineProperty定义的不可枚举属性
console.log(JSON.stringify(obj1), JSON.stringify(obj1) === '{}'); // {} true

console.log(Object.keys(obj), Object.keys(obj).length === 0); // [] true
// 缺点：不能识别Object.defineProperty定义的不可枚举属性
console.log(Object.keys(obj1), Object.keys(obj1).length === 0); // [ 'a', 'b', 'c' ] false

// 最佳方案
console.log(Reflect.ownKeys(obj1), Reflect.ownKeys(obj1).length === 0); // [ 'a', 'b', 'c', 'd' ] false
