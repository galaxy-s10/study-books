// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#%E8%BF%AD%E4%BB%A3%E5%99%A8
// TIP:即迭代器是一个对象，该对象有一个next方法，这个next方法返回一个包含done和value的对象。

// 编写的一个迭代器
const iterator = {
  next: function () {
    return { done: true, value: '编写的一个迭代器' };
  },
};

console.log(iterator.next()); //{ done: true, value: '编写的一个迭代器' }

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
console.log(arrIterator.next()); //{ done: true, value: undefined }
