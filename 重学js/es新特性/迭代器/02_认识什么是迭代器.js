// 编写的一个迭代器
const iterator = {
  next: function () {
    return { done: true, value: 'iterator' };
  },
};

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#%E8%BF%AD%E4%BB%A3%E5%99%A8
// 在 JavaScript 中，迭代器是一个对象，它定义一个序列，并在终止时可能返回一个返回值。
// 更具体地说，迭代器是通过使用 next() 方法实现 Iterator protocol 的任何一个对象，该方法返回具有两个属性的对象： value，这是序列中的 next 值；和 done ，
// 如果已经迭代到序列中的最后一个值，则它为 true 。如果 value 和 done 一起存在，则它是迭代器的返回值。
// TIP:即迭代器是一个对象，该对象有一个next方法，这个next方法返回一个包含done和value的对象。
console.log(iterator.next()); //{ done: true, value: 'iterator' }

// 数组
const arr = ['abc', 'cba', 'nba'];

// 创建一个迭代器对象来访问数组
let index = 0;
const arrIterator = {
  next: function () {
    if (index < arr.length) {
      return { done: false, value: arr[index++] };
    } else {
      return { done: true, value: undefined };
    }
  },
};

console.log(arrIterator.next()); //{ done: false, value: 'abc' }
console.log(arrIterator.next()); //{ done: false, value: 'cba' }
console.log(arrIterator.next()); //{ done: false, value: "nba" }
console.log(arrIterator.next()); //{ done: true, value: undefined }
