// 当遇到yield时候值暂停函数的执行
// 当遇到return时候生成器就停止执行
function* foo1() {
  console.log('函数开始执行~');

  const value1 = 100;
  console.log('第一段代码:', value1);
  yield value1;

  const value2 = 200;
  console.log('第二段代码:', value2);
  yield value2;

  return 123;

  const value3 = 300;
  console.log('第三段代码:', value3);
  yield value3;
}

const generator1 = foo1();
console.log('第一次next返回值:', generator1.next()); //第一次next返回值: { value: 100, done: false }
console.log('第二次next返回值:', generator1.next()); //第二次next返回值: { value: 200, done: false }
console.log('第三次next返回值:', generator1.next()); //第三次next返回值: { value: 123, done: true }
console.log('第四次next返回值:', generator1.next()); //第四次next返回值: { value: undefined, done: true }
console.log('第五次next返回值:', generator1.next()); //第五次next返回值: { value: undefined, done: true }
