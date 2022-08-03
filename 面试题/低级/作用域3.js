let num1 = 100;
function fun3(num1) {
  // var num10 = 100       //这里接受的num1只是形参，是局部变量！！！
  console.log('接受的形参' + num1); // 100
  num = 500; // 在函数内没有声明（没有使用 var 关键字），该变量为全局变量。
  num1 = 300; // 这里修改的也只是局部函数内的num1
  console.log(num); // 500
  console.log('修改后的形参' + num1); // 300
}
fun3(num1);
console.log(num); // 500
console.log(num1); // 100
