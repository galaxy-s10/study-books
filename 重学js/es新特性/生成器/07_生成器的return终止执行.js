function* foo(num) {
  console.log('函数开始执行~');

  const value1 = 100 * num;
  console.log('第一段代码:', value1); //第一段代码: 200
  const n = yield value1;

  const value2 = 200 * n;
  console.log('第二段代码:', value2);
  const count = yield value2;

  const value3 = 300 * count;
  console.log('第三段代码:', value3);
  yield value3;

  console.log('函数执行结束~');
  return '123';
}

const generator = foo(2);

console.log(generator.next()); //{ value: 200, done: false }
// 在第一次next()后使用了return，那么就意味着在第一次yield语句下面加了return, 会提前终端生成器函数代码继续执行
console.log(generator.return(3)); //{ value: 3, done: true }
console.log(generator.next()); //{ value: undefined, done: true }
console.log(generator.next()); //{ value: undefined, done: true }

// 打印顺序
// 函数开始执行~
// 第一段代码: 200
// { value: 200, done: false }
// { value: 3, done: true }
// { value: undefined, done: true }
// { value: undefined, done: true }
