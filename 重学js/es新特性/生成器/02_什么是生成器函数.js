function* foo() {
  console.log('函数开始执行~');

  const value1 = 100;
  console.log('第一段代码:', value1);
  yield;

  const value2 = 200;
  console.log('第二段代码:', value2);
  yield;

  const value3 = 300;
  console.log('第三段代码:', value3);
  yield;

  console.log('函数执行结束~');
}

// 调用生成器函数时, 会给我们返回一个生成器对象，但不会执行foo里面的代码！
const generator = foo();
console.log(generator); //Object [Generator] {}

// 开始执行foo的第一段代码
generator.next(); //函数开始执行~ 第一段代码: 100
// 开始执行foo的第二段代码
generator.next(); //第二段代码: 200
// 开始执行foo的第三段代码
generator.next(); //第三段代码: 200
// 开始执行foo的第四段代码
generator.next(); //函数执行结束~
// 开始执行foo的第五段代码
generator.next(); //啥也不干
// 开始执行foo的第六段代码
generator.next(); //啥也不干
