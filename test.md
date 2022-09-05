# new 构造函数里的 this 以及返回值

```js
/**
 * new 构造函数里面的this
 * 默认函数里面的this，谁调用就指向谁，
 * 但是new 构造函数，这个构造函数里面的this指向是new 构造函数出来的实例
 * 如果new 构造函数里面有返回值:
 * 1，如果返回的是一个基本数据类型（string,number,undefined...）,则返回值为new 构造函数出来的实例
 * 2，如果返回的是一个非基本数据类型的对象（object），则返回值为指定的对象
 * 如果new 构造函数里面没有返回值，默认返回undefined，则返回值还是new 构造函数出来的实例
 */
console.log('---------new 构造函数里的this以及返回值-----------');
function Test(name) {
  this.name = name;
}
var test = new Test('test');
console.log(test); //Test {name: "test"}

function Test1(name) {
  this.name = name;
  return 1;
}
var test1 = new Test1('test1');
console.log(test1); //Test1 {name: "test1"}

function Test2(name) {
  this.name = name;
  return { age: 18 };
}
var test2 = new Test2('test2');
console.log(test2); //{age: 18}
```

![构造函数this和返回值.png](https://resource.hsslive.cn/1614578216948构造函数this和返回值.webp)

# 没有 new 得到的是什么

```js
/**
 * 首先我们看没有new的时候，得到的是什么
 * 根据控制台打印，可知没有new的时候，得到的dog只有自身的name属性，以及__proto__
 * 而没有new的__proto__，指向的就是Object.prototype
 */
console.log('-------没有new得到的是什么--------');
var dog = { name: 'husky' };
console.log(dog);
```

![没有new得到什么.png](https://resource.hsslive.cn/1614578227311没有new得到什么.webp)

# new 做了什么

```js
/**
 * new做了什么?
 * 首先我们要知道new之后的是什么，
 * 根据控制台打印，可知new之后，cat除了有自身的name属性，还有__proto__
 * 而__proto__指向的并不是默认的Object.prototype，而是构造函数的prototype，
 * 因为：cat自身的__proto__有以下：
 * cat的__proto__有constructor指向Cat，
 * cat的__proto__还有一个__proto__，指向Object.prototype
 * 因此可以得出结论：
 * cat的__proto__指向Cat.prototype
 * */
console.log('--------new做了什么---------');
function Cat(name) {
  this.name = name;
}
var cat = new Cat('tom');
console.log(cat);

function _new(arg1) {
  var obj = {}; //新建一个对象
  // arg1是传进来的构造函数
  obj.__proto__ = arg1.prototype;
  var args = [].slice.call(arguments);
  // args.length = args.length - 1    //bug，这是删除最后一个元素，并不是删除第一个元素
  args.splice(0, 1); //删除第一个构造函数
  // 修改构造函数的this，并将参数传给它，然后执行该构造函数
  arg1.apply(obj, args);
  return obj; //返回新建的对象
}
var cat1 = _new(Cat, 'tom1');
console.log(cat1);
```

![new做了什么.png](https://resource.hsslive.cn/1614578236666new做了什么.webp)

# 简化版实现 new

```js
/**
 * new做了什么?
 * 创建一个空对象，且该对象继承构造函数的原型。
 * 将构造函数里的this指向构造函数的实例
 * 最后返回这个空对象（如果没有手动返回其他的对象）
 * */

console.log('-------简化版实现new---------');
var Parent = function (name, age) {
  this.name = name;
  this.age = age;
};

// 实现new
function myNew() {
  var obj = {};
  var args = [].slice.call(arguments);
  var constructor = args.shift();
  obj.__proto__ = constructor.prototype;
  constructor.apply(obj, args);
  return obj;
}

var p = new Parent('hss', 21);
var p1 = myNew(Parent, 'hss', 21);
console.log(p);
console.log(p1);
```
