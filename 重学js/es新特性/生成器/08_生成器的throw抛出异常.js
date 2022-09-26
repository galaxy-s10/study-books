function* foo() {
  console.log('代码开始执行~');

  const value1 = 100;
  try {
    yield value1;
  } catch (error) {
    console.log('捕获到异常情况:', error);
  }

  console.log('第二段代码继续执行');
  const value2 = 200;
  yield value2;

  console.log('代码执行结束~');
}

const generator = foo();

console.log(generator.next());
console.log(generator.throw('error message'));
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());

// 打印顺序
// 代码开始执行~
// { value: 100, done: false }
// 捕获到异常情况: error message
// 第二段代码继续执行
// { value: 200, done: false }
// 代码执行结束~
// { value: undefined, done: true }
// { value: undefined, done: true }
// { value: undefined, done: true }
