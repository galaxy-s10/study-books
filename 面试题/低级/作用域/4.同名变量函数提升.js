a(); //打印aaa，因为var a=1，只有var a会提升，a=1赋值操作不会提升，后面又定义了a函数提升了
var a = 1;
function a() {
  console.log('aaa');
}

b(); //打印bbb
function b() {
  console.log('bbb');
}
var b = 1;
// WARN：根据同名变量/函数b的打印结果，可以知道是先变量提升，然后再函数提升的
