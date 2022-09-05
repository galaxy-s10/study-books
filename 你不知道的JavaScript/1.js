var anotherObject = { a: 2 };
var myObject = Object.create(anotherObject);
console.log(anotherObject.a); // 2
console.log(myObject.a); // 2
console.log(anotherObject.hasOwnProperty('a')); // true
console.log(myObject.hasOwnProperty('a')); // false
// myObject.a++，约等于是myObject.a = myObject.a + 1
// myObject.a没有值，往上层找，找到anotherObject，他有a，值是2，因此myObject.a就是3
myObject.a++; // 隐式屏蔽！
console.log(anotherObject.a); // 2
console.log(myObject.a); // 3
console.log(myObject.hasOwnProperty('a')); // true
