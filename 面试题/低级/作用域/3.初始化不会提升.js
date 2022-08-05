// WARN：其实本质还是声明的就会提升，但赋值操作不会
console.log(a); //不会打印1，会打印undefined，但不报ReferenceError: a is not defined
var a = 1;

console.log(b); //var b提升了，但赋值操作不会提升，因此这里是是undefined
b(); //直接报错：TypeError: b is not a function
var b = function () {
  console.log('bbb');
};
