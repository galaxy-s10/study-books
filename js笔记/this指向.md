# 为什么使用this

如果没有5，那么我们的代码会是下面的写法：

- 在方法中，为了能够获取到name名称，必须通过obj的引用（变量名称）来获取。
- 但是这样做有一个很大的弊端：如果我将obj的名称换成了info，那么所有的方法中的obj都需要换成info。

```js
var obj = {
  name: "why",
  running: function() {
    console.log(obj.name + " running");
  },
  eating: function() {
    console.log(obj.name + " eating");
  },
  studying: function() {
    console.log(obj.name + " studying");
  }
}
```

- 当我们通过obj去调用running、eating、studying这些方法时，this就是指向的obj对象

```js
var obj = {
  name: "why",
  running: function() {
    console.log(this.name + " running");
  },
  eating: function() {
    console.log(this.name + " eating");
  },
  studying: function() {
    console.log(this.name + " studying");
  }
}
```

# this指向什么

最简单的，this在全局作用域下指向什么？在浏览器中测试就是指向window，所以在全局作用域下，我们可以认为this就是指向的window

```js
console.log(this); // window

var name = "why";
console.log(this.name); // why
console.log(window.name); // why
```

定义一个函数，我们采用三种不同的方式对它进行调用，它产生了三种不同的结果

```js
// 定义一个函数
function foo() {
  console.log(this);
}

// 1.调用方式一: 直接调用
foo(); // window

// 2.调用方式二: 将foo放到一个对象中,再调用
var obj = {
  name: "why",
  foo: foo
}
obj.foo() // obj对象

// 3.调用方式三: 通过call/apply调用
foo.call("abc"); // String {"abc"}对象
```

上面的案例说明了一下问题：

- 1.函数在调用时，JavaScript会默认给this绑定一个值；
- 2.this的绑定和定义的位置（编写的位置）没有关系；
- 3.this的绑定和调用方式以及调用的位置有关系；
- 4.this是在运行时被绑定的；

# this绑定规则

## 默认绑定

在独立函数调用的情况下使用默认绑定

- 独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用；

**案例一：普通函数调用**

```js
function foo() {
  console.log(this); // window
}

foo();
```

**案例二：函数调用链（一个函数又调用另外一个函数）**

- 所有的函数调用都没有被绑定到某个对象上；

```js
// 2.案例二:
function test1() {
  console.log(this); // window
  test2();
}

function test2() {
  console.log(this); // window
  test3()
}

function test3() {
  console.log(this); // window
}
test1();
```

**案例三：将函数作为参数，传入到另一个函数中**

```js
function foo(func) {
  func()
}

function bar() {
  console.log(this); // window
}

foo(bar);
```

对案例进行一些修改，打印结果是否会发生变化：

- 这里的结果依然是window，原因非常简单，在真正函数调用的位置，并没有进行任何的对象绑定，只是一个独立函数的调用；

```js
function foo(func) {
  func()
}

var obj = {
  name: "why",
  bar: function() {
    console.log(this); // window
  }
}

foo(obj.bar);
```

## 隐式绑定

另外一种比较常见的调用方式是通过某个对象进行调用的：

- 也就是它的调用位置中，是通过某个对象发起的函数调用。

**案例一：通过对象调用函数**

- foo的调用位置是obj.foo()方式进行调用的
- 那么foo调用时this会隐式的被绑定到obj对象上

```js
function foo() {
  console.log(this); // obj对象
}

var obj = {
  name: "why",
  foo: foo
}
obj.foo();
```

**案例二：案例一的变化**

- 我们通过obj2又引用了obj1对象，再通过obj1对象调用foo函数；
- 那么foo调用的位置上其实还是obj1被绑定了this；

```js
function foo() {
  console.log(this); // obj1对象
}

var obj1 = {
  name: "obj1",
  foo: foo
}

var obj2 = {
  name: "obj2",
  obj1: obj1
}

obj2.obj1.foo();
```

**案例三：隐式丢失**

- 结果最终是window
- 因为foo最终被调用的位置是bar，而bar在进行调用时没有绑定任何的对象，也就没有形成隐式绑定；
- 相当于是一种默认绑定；

```js
function foo() {
  console.log(this);
}

var obj1 = {
  name: "obj1",
  foo: foo
}

// 讲obj1的foo赋值给bar
var bar = obj1.foo;
bar();
```



## 显示绑定

- 通过call或者apply绑定this对象

call和apply第一个参数是相同的，后面的参数，apply为数组，call为参数列表

apply 最后还是转化成 call 来执行的，call 要更快毫无疑问，call性能好一丢丢

显示绑定后，this就会明确的指向绑定的对象

```js
function foo() {
  console.log(this);
}

foo.call(window); // window
foo.call({name: "why"}); // {name: "why"}
foo.call(123); // Number {123}
```

- 使用Function.prototype.bind

```js
function foo() {
  console.log(this);
}

var obj = {
  name: "why"
}

var bar = foo.bind(obj);

bar(); // obj对象
bar(); // obj对象
bar(); // obj对象
```

- 内置函数

**案例一：setTimeout**

setTimeout中会传入一个函数，这个函数中的this通常是window

```js
setTimeout(function() {
  console.log(this); // window
}, 1000);
```

为什么是window?

- 这个和setTimeout源码的内部调用有关；
- setTimeout内部是通过apply进行绑定的this对象，并且绑定的是全局对象；

**案例二：数组的forEach**

数组有一个高阶函数forEach，用于函数的遍历：

- 在forEach中传入的函数打印的也是Window对象；
- 这是因为默认情况下传入的函数是自动调用函数（默认绑定）；

```js
var names = ["abc", "cba", "nba"];
names.forEach(function(item) {
  console.log(this); // 三次window
});
```

```js
var names = ["abc", "cba", "nba"];
var obj = {name: "why"};
names.forEach(function(item) {
  console.log(this); // 三次obj对象
}, obj);
```

**案例三：div的点击**

获取元素节点，并且监听点击：

- 在点击事件的回调中，this指向谁呢？box对象；
- 这是因为在发生点击时，执行传入的回调函数被调用时，会将box对象绑定到该函数中；

```js
var box = document.querySelector(".box");
box.onclick = function() {
  console.log(this); // box对象
}
```

## new绑定

使用new关键字来调用函数时，会执行如下的操作：

1. 创建一个全新的对象；
2. 这个新对象会被执行Prototype连接；
3. 这个新对象会绑定到函数调用的this上（this的绑定在这个步骤完成）；
4. 如果函数没有返回其他对象，表达式会返回这个新对象；

```js
// 创建Person
function Person(name) {
  console.log(this); // Person {}
  this.name = name; // Person {name: "why"}
}

var p = new Person("why");
console.log(p);
```

# 规则优先级

## **默认规则的优先级最低**

默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定this

## **显示绑定优先级高于隐式绑定**

```js
function foo() {
  console.log(this);
}

var obj1 = {
  name: "obj1",
  foo: foo
}

var obj2 = {
  name: "obj2",
  foo: foo
}

// 隐式绑定
obj1.foo(); // obj1
obj2.foo(); // obj2

// 隐式绑定和显示绑定同时存在
obj1.foo.call(obj2); // obj2, 说明隐式绑定优先级更高
```

## **new绑定优先级高于隐式绑定**

```js
function foo() {
  console.log(this);
}

var obj = {
  name: "why",
  foo: foo
}

new obj.foo(); // foo对象, 说明new绑定优先级更高
```

## **new绑定优先级高于bind**

new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高

```js
function foo() {
  console.log(this);
}

var obj = {
  name: "obj"
}

var foo = new foo.call(obj);	// Uncaught TypeError: foo.call is not a constructor
```

new绑定可以和bind后的函数同时使用

```js
function foo() {
  console.log(this);
}

var obj = {
  name: "obj"
}

// var foo = new foo.call(obj);
var bar = foo.bind(obj);
var foo = new bar(); // 打印foo, 说明使用的是new绑定
```

## 优先级总结

new绑定 > 显示绑定（bind）> 隐式绑定 > 默认绑定

# 规则之外

## 忽略显示绑定

如果在显示绑定中，我们传入一个null或者undefined，那么这个显示绑定会被忽略，使用默认规则：

```js
function foo() {
  console.log(this);
}

var obj = {
  name: "why"
}

foo.call(obj); // obj对象
foo.call(null); // window
foo.call(undefined); // window

var bar = foo.bind(null);
bar(); // window
```

另外一种情况，创建一个函数的 `间接引用`，这种情况使用默认绑定规则。

```js
function foo() {
  console.log(this);
}

var obj1 = {
  name: "obj1",
  foo: foo
}; 

var obj2 = {
  name: "obj2"
}

obj1.foo(); // obj1对象
(obj2.foo = obj1.foo)();  // window
```

## ES6箭头函数

我们来看一个模拟网络请求的案例：

- 这里我使用setTimeout来模拟网络请求，请求到数据后如何可以存放到data中呢？
- 我们需要拿到obj对象，设置data；
- 但是直接拿到的this是window，我们需要在外层定义：`var _this = this`
- 在setTimeout的回调函数中使用_this就代表了obj对象

```js
var obj = {
  data: [],
  getData: function() {
    var _this = this;
    setTimeout(function() {
      // 模拟获取到的数据
      var res = ["abc", "cba", "nba"];
      _this.data.push(...res);
    }, 1000);
  }
}

obj.getData();
```

箭头函数并不绑定this对象，那么this引用就会从上层作用域中找到对应的this

```js
var obj = {
  data: [],
  getData: function() {
    setTimeout(() => {
      // 模拟获取到的数据
      var res = ["abc", "cba", "nba"];
      this.data.push(...res);
    }, 1000);
  }
}

obj.getData();
```

如果getData也是一个箭头函数，那么setTimeout中的回调函数中的this指向谁

- 答案是window；
- 依然是不断的从上层作用域找，那么找到了全局作用域；
- 在全局作用域内，this代表的就是window

```js
var obj = {
  data: [],
  getData: () => {
    setTimeout(() => {
      console.log(this); // window
    }, 1000);
  }
}

obj.getData();
```