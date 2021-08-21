# Js函数里面的参数

> 在看 Js参数传递时，先看最基本的，会为下面做铺垫

```js
function fn() {
    var a = 100
    console.log(a); //100
}
fn()
console.log(a); // 报错a is not defined
```

```js
function fn() {
    a = 100 //这里不是var a = 100，而且，也没有定义局部变量var a，因此这里约等于window.a = 100
    console.log(a); //100
}
fn()
console.log(a); //100
```

```js
function fn(a) {
    console.log(a); //100
    a = 100 //由于这里有形参a，因此，这里的a = 100，约等于 var a = 100
    console.log(a); //100
}
fn(100)
console.log(a); //报错a is not defined
```

> 上述代码完全等价于：

```js
function fn(a) {
    var a
    console.log(a); //100
    a = 100
    console.log(a); //100
}
fn(100)
console.log(a); //报错a is not defined
```



# Js参数传递

> 在这里，直接通过具体案例一个个循环渐进的说明 js的参数传递

## 普通类型参数传递

首先就是最简单的普通类型（string,number,boolean,null,undefined,symbol）赋值

> 案例1：

```js
var a = 1
a = 2

console.log(a); //2
```

> 案例2：

```js
var a = 1
var b = a
b = 2
console.log(a); //1
console.log(b); //2
```

> 案例3：

```js
var a = 1
function fn(a) {
    console.log(a); //这里的a是第一次接收到的形参a，即1
    a = 100 //这里由于已经定义了形参a，因此约等于 var a = 100
    b = a   //这里由于没有定义过形参b，因此这里约等于window.b = a
    console.log(a); //这里的a是var a = 100后的a，即100
    console.log(b); //这里的b是window.b = 100，即100
}
fn(a)
console.log(a); //1
console.log(b); //100
```

> 案例4（完全等价于案例3）：

```js
var a = 1
function fn(aa) {
    console.log(aa); //这里的aa是第一次接收到的形参a，即1
    aa = 100 //这里由于已经定义了形参aa，因此约等于 var aa = 100
    b = aa   //这里由于没有定义过形参b，因此这里约等于window.b = aa
    console.log(aa); //这里的aa是var aa = 100后的a，即100
    console.log(b); //这里的b是window.b = 100，即100
}
fn(a)
console.log(a); //1
console.log(b); //100
console.log(aa);    //报错报错aa is not defined
```

> 案例5（完全等价于案例4）：

```js
var a = 1
function fn(aa) {
    var aa
    console.log(aa); //这里的aa是第一次接收到的形参a，即1
    aa = 100 //这里由于已经定义了形参aa，因此约等于 var aa = 100
    b = aa   //这里由于没有定义过形参b，因此这里约等于window.b = aa
    console.log(aa); //这里的aa是var aa = 100后的a，即100
    console.log(b); //这里的b是window.b = 100，即100
}
fn(a)
console.log(a); //1
console.log(b); //100
console.log(aa);    //报错报错aa is not defined
```

> 案例3,4,5重点：

```js
/**
 * 重点：fn函数里面的aa = 100，根据案例2可粗略转化为：
 * var a = 1
 * var aa = a
 * aa = 100
 * console.log(a)   //1
 * console.log(aa)  //100
 * 因此，fn函数里面的aa = 100，并不会修改fn函数外面的a !
 * 并且：aa是fn的局部变量，所以aa = 100，会将fn函数里面的aa修改成100！
*/
```

## 引用数据类型参数传递

> 案例1：

```js
var a = { age: 1 }
a = { age: 100 }
console.log(a); //{age:100}
```

> 案例2：

```js
var a = { age: 1 }
var b = a
b = { age: 100 }
console.log(a); //{age:1}
console.log(b); //{age:100}
```

> 案例3：

```js
var a = { age: 1 }
function fn(a) {
    console.log(a); //{age:1}
    a = { age: 100 }    //这里由于已经定义了形参a，因此a = {age:100}约等于var a = {age:100}
    console.log(a); //{age:100}
}

fn(a)
console.log(a); //{age:1}
```

> 案例3完全等价于下述代码：

```js
var a = { age: 1 }
function fn(aa) {
    var aa
    console.log(aa); //{age:1}
    aa = { age: 100 }    //这里由于已经定义了形参aa，因此aa = {age:100}约等于var aa = {age:100}
    console.log(aa); //{age:100}
}

fn(a)
console.log(a); //{age:1}

/**
 * 重点：执行fn(a)，将a当做形参传给fn函数里的aa，
 * 首先在fn函数内部定义fn的局部变量var aa，然后将fn(a)的a给aa，即：
 * var a = {age:1}
 * var aa = a
 * aa = {age:100}
 * 根据案例2可知：此时的a:{age:1},aa:{age:100}
*/
```

