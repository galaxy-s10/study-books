function* foo(num) {
  const value1 = 100 * num;
  console.log('第一段代码:', value1, '，num的值：', num);
  const n = yield value1;

  const value2 = 200 * n;
  console.log(
    '第二段代码:',
    value2,
    'value1的值',
    value1,
    '，num的值：',
    num,
    '，n的值',
    n
  );
  const count = yield value2;

  const value3 = 300 * count;
  console.log(
    '第三段代码:',
    value3,
    'value2的值',
    value2,
    '，num的值：',
    num,
    '，count的值',
    count
  );
  yield value3;

  console.log('函数执行结束~');
  return '123';
}

// 生成器上的next方法可以传递参数
const generator = foo(5);
// next()的参数会传给上一条执行的 yield语句左边的变量
console.log(generator.next(111)); //第一次传的参数其实无意义，因为没有上一个执行yield语句
console.log(generator.next(2));
console.log(generator.next(3));
console.log(generator.next(4));
console.log(generator.next(5));

// 打印顺序
// 第一段代码: 500 ，num的值： 5
// { value: 500, done: false }
// 第二段代码: 400 ，num的值： 5 ，n的值 2
// { value: 400, done: false }
// 第三段代码: 900 ，num的值： 5 ，count的值 3
// { value: 900, done: false }
// 函数执行结束~
// { value: '123', done: true }
// { value: undefined, done: true }
