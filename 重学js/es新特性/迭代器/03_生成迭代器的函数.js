function createArrayIterator(arr) {
  let index = 0;
  return {
    next: function () {
      if (index < arr.length) {
        return { done: false, value: arr[index++] };
      } else {
        return { done: true, value: undefined };
      }
    },
  };
}

const names = ['abc', 'cba', 'nba'];

const namesIterator = createArrayIterator(names);
console.log(namesIterator.next()); //{ done: false, value: 'abc' }
console.log(namesIterator.next()); //{ done: false, value: 'cba' }
console.log(namesIterator.next()); //{ done: false, value: 'nba' }
console.log(namesIterator.next()); //{ done: true, value: undefined }
console.log('-------');

const nums = [10, 20, 30];
const numsIterator = createArrayIterator(nums);
console.log(numsIterator.next()); //{ done: false, value: 10 }
console.log(numsIterator.next()); //{ done: false, value: 20 }
console.log(numsIterator.next()); //{ done: false, value: 30 }
console.log(numsIterator.next()); //{ done: true, value: undefined }
console.log(numsIterator.next()); //{ done: true, value: undefined }

console.log('-------');

// 创建一个无限的迭代器
function createNumberIterator() {
  let index = 0;
  return {
    next: function () {
      return { done: false, value: index++ };
    },
  };
}

const numberInterator = createNumberIterator();
console.log(numberInterator.next()); //{ done: false, value: 0 }
console.log(numberInterator.next()); //{ done: false, value: 1 }
console.log(numberInterator.next()); //{ done: false, value: 2 }
console.log(numberInterator.next()); //{ done: false, value: 3 }
console.log(numberInterator.next()); //{ done: false, value: 4 }
console.log(numberInterator.next()); //{ done: false, value: 5 }
console.log(numberInterator.next()); //{ done: false, value: 6 }
console.log(numberInterator.next()); //{ done: false, value: 7 }
