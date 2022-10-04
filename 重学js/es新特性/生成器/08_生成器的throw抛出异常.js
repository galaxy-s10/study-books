function* foo() {
  console.log('代码开始执行~');

  const value1 = 100;

  try {
    yield value1;
    console.log('aaaa'); //这个不会执行
  } catch (error) {
    console.log('捕获到异常情况:', error);
  }

  console.log('第二段代码继续执行');
  const value2 = 200;
  yield value2;

  const value3 = 300;
  yield value3;

  console.log('代码执行结束~');
}

const generator = foo();

console.log(generator.next()); //{ value: 100, done: false }
// 在第一次next后，使用了throw，如果不对第一次yield使用了try catch就会直接报错中断执行，
// 如果使用了try catch，就不会影响函数后续的执行（但是try里面yield后面的代码还是不会执行），会执行到下一个yield
console.log(generator.throw('error message'), 666); //{ value: 200, done: false } 666
console.log(generator.next()); //{ value: 300, done: false }
console.log(generator.next()); //{ value: undefined, done: true }
console.log(generator.next()); //{ value: undefined, done: true }

// 打印顺序
// 代码开始执行~
// { value: 100, done: false }
// 捕获到异常情况: error message
// 第二段代码继续执行
// { value: 200, done: false } 666
// { value: 300, done: false }
// 代码执行结束~
// { value: undefined, done: true }
// { value: undefined, done: true }
