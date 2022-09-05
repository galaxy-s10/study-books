function test() {
  throw { a: 1, b: 2 };
  //   throw '123';
  //   throw new Error('123');
}
test();
