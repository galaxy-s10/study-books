// Array.from()将伪数组对象(拥有一个 length 属性和若干索引属性的任意对象)或可迭代对象转换为真正的数组。
let arr = [1, 2, 3, 4, 4, 5, 3, 1];
arr = new Set(arr);
arr = Array.from(arr);
console.log(arr); //[1, 2, 3, 4, 5]
let str = '12345';
str = Array.from(str);
console.log(str); //["1", "2", "3", "4", "5"]

let arrayLike = {
  0: 'tom',
  1: '65',
  2: '男',
  3: ['jane', 'john', 'Mary'],
  length: 4,
};
let arr1 = Array.from(arrayLike);
console.log(arr1); // ['tom','65','男',['jane','john','Mary']]

let arrayLike1 = {
  name: 'tom',
  age: '65',
  sex: '男',
  friends: ['jane', 'john', 'Mary'],
  length: 4,
};
let arr2 = Array.from(arrayLike1);
console.log(arr2); // [undefined, undefined, undefined, undefined]

/*
 *将一个类数组对象转换为一个真正的数组，必须具备以下条件：
 *1、该类数组对象必须具有length属性，用于指定数组的长度。如果没有length属性，那么转换后的数组是一个空数组。
 *2、该类数组对象的属性名必须为数值型或字符串型的数字
 *ps: 该类数组对象的属性名可以加引号，也可以不加引号
 */

let arr3 = [1, 2, 3, 4, 5, 6, 7];
arr3 = arr3.map((val) => {
  console.log(val);
  if (val > 3) {
    return val;
  }
});
console.log(arr3);

//函数内部arguments转真正数组
/* 
        Arguments对象：
        用于储存调用函数时的所有实参
        arguments.callee()是arguments的重要属性。表示arguments所在函数的引用地址。
    */
function test(num1, num2, num3) {
  console.log(arguments);
  console.log(arguments.length);
  const arr1 = [].slice.call(arguments);
  const arr2 = Array.from(arguments);
  console.log(arr1);
  console.log(arr2);
}

test(1, 2, 3);
