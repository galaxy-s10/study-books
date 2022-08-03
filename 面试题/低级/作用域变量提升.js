var a; //这是变量声明
console.log(
  b,
  '下面的var b=1;里面的var b会被提升，但是赋值操作不会，因此打印undefined'
);

var b = 1; //这是变量初始化
function fun2() {
  //JavaScript 只有声明的变量会提升，初始化的不会。
  //var num1           //var num1提升了
  console.log(num1); //undefined
  var num1 = 999; //var num1提升了，但初始化变量num1 = 999并不会提升
}
fun2();

console.log(c); //报错：ReferenceError: c is not defined
