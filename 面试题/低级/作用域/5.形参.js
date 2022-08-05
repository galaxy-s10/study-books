var num1 = 100;
var num2 = 200;
console.log(num1); //100
console.log(num2); //200
function fun() {
  num1 = 888; //没有var，因此修改（影响）的是外层的num1
  var num2 = 777; //有var，因此修改（影响）是fun函数的num2
  console.log(num1); //fun函数里没有num1，找外层的num2，因此打印888
}
fun();
console.log(num1); //888
console.log(num2); //200
