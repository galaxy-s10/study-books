var num1 = 100;
var num2 = 200;
console.log(num1); //100
console.log(num2); //200
function fun1() {
  num1 = 888;
  var num2 = 777;
  console.log(num1); //888
}
fun1();
console.log(num1); //888
console.log(num2); //200
