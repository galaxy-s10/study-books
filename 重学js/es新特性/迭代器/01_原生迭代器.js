const arr = [1, 2, 3];
const str = '123';
const obj = { a: 1, b: 2, c: 3 };

const arrInter = arr[Symbol.iterator](); //数组的原型（__proto__）有迭代器
const strInter = str[Symbol.iterator](); //字符串的原型（__proto__）有迭代器
// const arrInter = obj[Symbol.iterator](); //对象没有迭代器

console.log(arrInter.next()); //{ value: 1, done: false }
console.log(arrInter.next()); //{ value: 2, done: false }
console.log(arrInter.next()); //{ value: 3, done: false }
console.log(arrInter.next()); //{ value: undefined, done: true }

console.log(strInter.next()); //{ value: '1', done: false }
console.log(strInter.next()); //{ value: '2', done: false }
console.log(strInter.next()); //{ value: '3', done: false }
console.log(strInter.next()); //{ value: undefined, done: true }
