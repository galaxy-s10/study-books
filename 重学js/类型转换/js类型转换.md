

# 动态类型

JavaScript 是一种**弱类型**或者说**动态**语言。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。这也意味着你可以使用同一个变量保存不同类型的数据：

```js
var foo = 42;    // foo is a Number now
foo = "bar"; // foo is a String now
foo = true;  // foo is a Boolean now
```

# 类型转换规则

## ToPrimitive内部运算

> ToPrimitive(input, PreferredType?)

`input`代表代入的值，而`PreferredType`可以是数字(Number)或字符串(String)其中一种，这会代表"优先的"、"首选的"的要进行转换到哪一种原始类型，转换的步骤会依这里的值而有所不同。但如果没有提供这个值也就是预设情况，则会设置转换的`hint`值为`"default"`。这个首选的转换原始类型的指示(`hint`值)，是在作内部转换时由JS视情况自动加上的，一般情况就是预设值（即`PreferredType`为Number）。

而在JS的`Object`原型的设计中，都一定会有两个`valueOf`与`toString`方法，所以这两个方法在所有对象里面都会有，不过它们在转换有可能会交换被调用的顺序。

### 当PreferredType为数字(Number)时

当`PreferredType`为数字(Number)时，`input`为要被转换的值，以下是转换这个`input`值的步骤:

1. 如果`input`是原始数据类型，则直接返回`input`。
2. 否则，如果`input`是个对象时，则调用对象的`valueOf()`方法，如果能得到原始数据类型的值，则返回这个值。
3. 否则，如果`input`是个对象时，调用对象的`toString()`方法，如果能得到原始数据类型的值，则返回这个值。
4. 否则，抛出TypeError错误。

### 当PreferredType为字符串(String)时

上面的步骤2与3对调，如同下面所说:

1. 如果`input`是原始数据类型，则直接返回`input`。
2. 否则，如果`input`是个对象时，调用对象的`toString()`方法，如果能得到原始数据类型的值，则返回这个值。
3. 否则，如果`input`是个对象时，则调用对象的`valueOf()`方法，如果能得到原始数据类型的值，则返回这个值。
4. 否则，抛出TypeError错误。

### PreferredType没提供时，也就是hint为"default"时

与`PreferredType`为数字(Number)时的步骤相同。

> **数字**其实是预设的首选类型，也就是说在一般情况下，加号运算中的对象要作转型时，都是先调用`valueOf`再调用`toString`。

但这有两个异常，一个是`Date`对象，另一是`Symbol`对象，它们覆盖了原来的`PreferredType`行为，`Date`对象的预设首选类型是字符串(String)。

> 因此你会看到在一些教程文件上会区分为两大类对象，一类是 Date 对象，另一类叫 非Date(non-date) 对象。因为这两大类的对象在进行转换为原始数据类型时，首选类型恰好相反。

### valueOf与toString方法

`valueOf`与`ToString`是在Object中的两个必有的方法，位于Object.prototype上，它是对象要转为原始数据类型的两个姐妹方法。从上面的内容已经可以看到，`ToPrimitive`这个抽象的内部运算，会依照设置的首选的类型，决定要先后调用`valueOf`与`toString`方法的顺序，当数字为首选类型时，优先使用`valueOf`，然后再调用`toString`。当字符串为首选类型时，则是相反的顺序。如果没有设置，则默认预设调用方式则是如数字首选类型一样，是先调用`valueOf`再调用`toString`。

Array(数组)很常用到，虽然它是个对象类型，但它与Object的设计不同，它的`toString`有覆盖，说明一下数组的`valueOf`与`toString`的两个方法的返回值:

- `valueOf`方法返回值: 对象本身。(与Object一样)
- `toString`方法返回值: 相当于用数组值调用`join(',')`所返回的字符串。也就是`[1,2,3].toString()`会是`"1,2,3"`，这点要特别注意。

Function对象很少会用到，它的`toString`也有被覆盖，所以并不是Object中的那个`toString`，Function对象的`valueOf`与`toString`的两个方法的返回值:

- `valueOf`方法返回值: 对象本身。(与Object一样)
- `toString`方法返回值: **函数中包含的代码转为字符串值**

## ToString抽象操作

> 你不知道的JavaScript：
>
> a + "" （隐式）和前面的 String(a) （显式）之间有一个细微的差别需要注意。根据 ToPrimitive 抽象操作规则，a \+ "" 会对 a 调用 valueOf() 方法，然后通过 ToString 抽象操作将返回值转换为字符串。而 String(a) 则是直接调用 ToString() 。

> 对于普通 `对象` 来说，除非自行定义toString方法，否则就会调用**Object.prototype.toString()**方法，如果对象（如Array，Boolean，Function，Number等，它们都有自己的toString，不会调用Object.prototype.toString）有自己的toString方法，字符串化就会调用该方法并使用其返回值。

```js
var a = {
    valueOf: function () {
        console.log('valueOf');
        return "1";
    },
    toString: function () {
        console.log('toString');
        return "1";
    }
};
var b = [1];
b.valueOf = function () {
    console.log('valueOf');
    return "1";
}
b.toString = function () {
    console.log('toString');
    return "1";
}
var c = [1];
c.valueOf = function () {
    console.log('valueOf');
    return 111
};
c.toString = function () {
    console.log('toString');
    return [1]
};

console.log(String(a));     //先执行toString，返回字符串1，是基本数据类型 ，返回该值，然后String("1")，即"1"
console.log(String(b));     //先执行toString，返回字符串1，是基本数据类型 ，返回该值，然后String("1")，即"1"
// 先执行toString，返回数组[1]，非基本数据类型 ，
// 再执行valueOf，返回111，是基本数据类型，返回该值，然后String(111)，即"111"
console.log(String(c)); //"111"
```

### JSON字符串化

你不知道的JavaScript：

> 工具函数 JSON.stringify(..) 在将 JSON 对象序列化为字符串时也用到了 ToString 。 
>
> 请注意，JSON 字符串化并非严格意义上的强制类型转换，因为其中也涉及 ToString 的相关规则，所以这里顺带介绍一 下。
>
> 对大多数简单值来说，JSON 字符串化和 toString() 的效果基本相同，只不过序列化的结果总是字符串：

```js
console.log(JSON.stringify(null)) // "null"
console.log(JSON.stringify(undefined)) // undefined，注意这个undefined不是字符串的undefined
console.log(JSON.stringify(true)) // "true"
console.log(JSON.stringify(42)) // "42"
console.log(JSON.stringify("42")) // ""42""
```

## ToNumber抽象操作

你不知道的JavaScript：

> 有时我们需要将非数字值当作数字来使用，比如数学运算。为此 ES5 规范在 9.3 节定义了抽象操作 ToNumber 
>
> 其中 true 转换为 1 ，false 转换为 0 。undefined 转换为 NaN ，null 转换为 0 。 
>
> ToNumber 对字符串的处理基本遵循数字常量的相关规则 / 语法（参见第 3 章）。处理失败时返回 NaN （处理数字常量失败 时会产生语法错误）。不同之处是 ToNumber 对以 0 开头的十六进制数并不按十六进制处理（而是按十进制，参见第 2 章）。
>
> 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为 数字。 
>
> 为了将值转换为相应的基本类型值，抽象操作 ToPrimitive （参见 ES5 规范 9.1 节）会首先（通过内部操作 DefaultValue ，参见 ES5 规范 8.12.8 节）检查该值是否有 valueOf() 方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。 
>
> 如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

```js
var a = { valueOf: function () { return "42"; } };
var b = { toString: function () { return "42"; } };
var c = [4, 2]; c.toString = function () {
    return this.join(""); // "42" 
};
Number(a); // 42 
Number( b ); // 42 
Number( c ); // 42 
Number( "" ); // 0 
Number( [] ); // 0 
Number( [ "abc" ] ); // NaN
```



> Number(value)，value是被创建对象的数字值

- value如果是基本类型，对于基本类型其中**true转换为1，false转换为0；undefined 转换为 NaN，null 转换为 0**。
- value如果是引用类型，对于对象类型会首先转换成为基本类型值如果返回的是非数字的基本类型值，则再遵循基本类型转换规则将其强制转换为数字。为了将值转换为相应的基本类型值，会进行**ToPrimitive抽象操作**
- Number()会将`PreferredType`设为Number
- **会首先检查该值是否有 valueOf() 方法。如果有并且返回基本类型值，再使用该值进行强制类型转换。如果没有就使用 toString() 的返回值(如果存在)来进行强制类型转换。**如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

```js
var a = {
    valueOf: function () {
        console.log('valueOf');
        return "1";
    },
    toString: function () {
        console.log('toString');
        return "1";
    }
};
var b = [1];
b.valueOf = function () {
    console.log('valueOf');
    return "1";
}
b.toString = function () {
    console.log('toString');
    return "1";
}
var c = [1];
c.valueOf = function () {
    console.log('valueOf');
    return [1]
};
c.toString = function () {
    console.log('toString');
    return this.join("");
};

console.log(Number(a));     //先执行valueOf，返回字符串1，是基本数据类型 ，返回该值，然后Number("1")，即1
console.log(Number(b));     //先执行valueOf，返回字符串1，是基本数据类型 ，返回该值，然后Number("1")，即1
// 先执行valueOf，返回数组[1]，非基本数据类型 ，
// 再执行toString，返回"1"，是基本数据类型，返回该值，然后Number("1")，即1
console.log(Number(c)); //1
console.log(Number(undefined));  //NaN
console.log(Number(null));          //0
console.log(Number(true));          //1
console.log(Number(false));         //0
console.log(Number());              //Number() === Number(null) ,即0
console.log(Number(''));            //0
console.log(Number('-'));           //NaN
console.log(Number('12'));          //12
console.log(Number('12s'));         //NaN
console.log(Number([]));            //先valueOf本身[],再toString是"",即Number(""),即0
console.log(Number({}));            //先valueOf本身{},再toString是"[object Object]",即Number("[object Object]"),即NaN
console.log(Number([0]));           //先valueOf本身[0],再toString是"0",即Number("0"),即0
console.log(Number(["1"]));	        //先valueOf本身["1"],再toString是"1",即Number("1"),即1
console.log(Number(["1", "2"]));	//先valueOf本身["1","2"],再toString是"1,2",即Number("1,2"),即NaN
console.log(Number([1]));	        //先valueOf本身[1],再toString是"1",即Number("1"),即1
console.log(Number([1, 2]));	    //先valueOf本身[1,2],再toString是"1,2",即Number("1,2"),即NaN
console.log(Number(["abc"]));	    //先valueOf本身["abc"],再toString是"abc",即Number("abc"),即NaN
console.log(+('-1'));               //+("-1") === + Number("-1"),即+ -1，即-1
console.log(-('-1'));               //-("-1") === - Number("-1"),即- -1，即1
console.log(+('0'));                //+("0") === + Number("0"),即+ 0，即0
console.log(-('0'));                //-("0") === - Number("0"),即- 0，即-0
```

## ToBoolean抽象操作

### 假值

> 以下这些是假值：undefined、null、false、 +0 、-0 和 NaN "" 
>
> 假值的布尔强制类型转换结果为 false 。

### 假值对象

```js
var val1 = new Boolean(false)
var val2 = new Number(0)
var val3 = false
console.log(Boolean(false));        //fasle
console.log(val1);                  //Boolean {false}
console.log(val2)					//NUmber { 0 }
console.log(Boolean(val1 && val2))	//true
if (val1) { 
    console.log( "打印1" );	//执行这里
}
if (val3) { 
    console.log( "打印2" );
}else{
    console.log("打印3")	//执行这里
}
```

val1和val2就是一个假值对象，我们为 val1和val2 创建了一个封装对象，然而该对象是真值（“truthy”，即总是返回 true ），所以这里使用封装对象得到的结果和使用 false 截然相反。

```js
var a = []
a.valueOf = function () {
    console.log('valueOf');
}
a.toString = function () {
    console.log('toString');
}
console.log(Boolean(a));    //valueOf和toString都不执行，直接打印true
var val1 = new Boolean(false)
var val2 = new String('1')
console.log(Boolean(false));        //fasle
console.log(val1);                  //Boolean {false}
console.log(new Boolean(false));    //Boolean {false}
console.log(new Boolean(1));        //Boolean {false}
console.log(Boolean(val1));         //true
console.log(Boolean(val2));         //true
```

```js
console.log(Boolean(undefined));    //false
console.log(Boolean(null));         //false
console.log(Boolean(0));            //false
console.log(Boolean(+0));           //false
console.log(Boolean(-0));           //false
console.log(Boolean(NaN));          //false
console.log(Boolean(''));           //false
console.log(Boolean());           	//false
console.log(Boolean(''));           //false
console.log(Boolean());           	//false

// 除了上述类型转换为假值，其余都可以理解为真值，所有对象都真值
console.log(Boolean(-10));                  //true
console.log(Boolean(+10));                  //true
console.log(Boolean(new String('')));       //true
console.log(Boolean(new String(0)));        //true
console.log(Boolean(new String('-10')));    //true
console.log(Boolean(new Number(0)));        //true
console.log(Boolean(new Number(-0)));       //true
console.log(Boolean(new Number(+0)));       //true
console.log(Boolean(new Number(+0)));       //true
console.log(Boolean(new Array([])));        //true
console.log(Boolean(new Object()));         //true
console.log(Boolean(function () { }));      //true
```

# 显示强制类型转换

## 字符串与数字之间的显示转换

```js
var a = 42;
var b = a.toString();
console.log(b); //"42"
console.log(typeof b);  //string
/**
 * a是一个基本类型，是没有toString这个方法的，但是js会给它自动包装一层，然后调用完后立即销毁
 * 伪代码：
 * let a = 42;
 * let b = new String(a).toString()
 * console.log(b) //"42"
*/
```

a.toString() 是显式的，不过其中涉及隐式转换。因为 toString() 对 42 这样的基本类型值不适用，所以 JavaScript 引擎会自动为 42 创建一个封装对象(包装类)，然后对该对象调用 toString()。这里显式转换中含有隐式转换。

## 显示转换为布尔值

```js
var a = "0";
var b = [];
var c = {};
var d = "";
var e = 0;
var f = null;
var g;
console.log(Boolean(a)); // true
console.log(Boolean(b)); // true
console.log(Boolean(c)); // true
console.log(Boolean(d)); // false
console.log(Boolean(e)); // false
console.log(Boolean(f)); // false
console.log(Boolean(g)); // false
```



# 隐式强制类型转换

根据[规范中的加法操作](http://www.ecma-international.org/ecma-262/7.0/#sec-addition-operator-plus-runtime-semantics-evaluation)，对于操作`x + y`，会调用`ToPrimitive(x)`和`ToPrimitive(y)`把`x`和`y`转化为原始数据类型。

## 从字符串隐式强制类型转换为数字的情况

```js
var a = []
var b = '0'

console.log(a - b);     //0
/**
 * -是数字减法运算a和b都不是number，都要强制转换为数字
 * a首先进行ToPrimitive操作，a的valueOf()的值是[]，不是基本类型，继续toString()
 * a的toString()的值是"",是基本类型，然后Number("")，即0
 * b是基本类型，直接Number('0')，即0
 * 转化后结果就是0-0，即0
*/

var c = [1, 2, 3]
console.log(c - b); //NaN
console.log(b - c); //NaN
/**
 * c.valueOf()是[1,2,3]，继续toString()，结果是"1，2，3"，是基本数据类型，Number("1,2,3")结果是NaN
 * b转化后是0
 * NaN-0还是NaN
*/

var d = { age: 12 }
console.log(d - c);   //NaN
console.log(c - d);   //NaN

var e = [12]
console.log(e - b); //12
```

## 从对象强制隐式转换

```js
var a = [10]
var b = 1
var c = a - b   // "10" - 1
console.log(a.valueOf());   //[10]
console.log(a.toString());  //"10"
console.log(typeof a.toString());   //string
console.log(c);         //9
console.log(typeof c);  //number
```

```js
var a = [10]
var b = "1"
var c = a - b   // "10" - "1"
console.log(a.valueOf());   //[10]
console.log(a.toString());  //"10"
console.log(typeof a.toString());   //string
console.log(c);         //9
console.log(typeof c);  //number
```

```js
var a = {
    valueOf: function () {
        return 10
    }
}
var b = {
    valueOf: function () {
        return "1"
    }
}
var c = a - b   // 10 - "1"
console.log(a.valueOf());   //10
console.log(a.toString());  //"[object Object]"
console.log(typeof a.toString());   //string
console.log(c);         //9
console.log(typeof c);  //number
```



```js
var a = [10, 20]
var b = 1
var c = a - b   // "10,20" - 1
console.log(a.valueOf());   //[10,20]
console.log(a.toString());  //"10,20"
console.log(typeof a.toString());   //"string"
console.log(c);         //NaN
console.log(typeof c);  //number
```

## 隐式类型转换Boolean

为任意的数据类型做两次非运算，即可将其转换为布尔值

```js
var a = "123"
console.log(!!a)	//true
var b = 0
console.log(!!0)	//false
```

# 宽松相等和严格相等

《你不知道的JavaScript》

> 宽松相等（loose equals）== 和严格相等（strict equals）=== 都用来判断两个值是否“相等”，但是它们之间有一个很重要的区别，特别是在判断条件上。 
>
> 常见的误区是“== 检查值是否相等，=== 检查值和类型是否相等”。听起来蛮有道理，然而还不够准确。很多 JavaScript 的书籍和博客也是这样来解释的，但是很遗憾他们都错了。 
>
> 正确的解释是：“== 允许在相等比较中进行强制类型转换，而 === 不允许。”

## 性能对比

因为==允许在比较重进行强制类型转换，而===不允许，因此==进行强制类型转换时确实需要多花点时间，性能来说是===的性能更优，但是这些性能其实可以忽略不计。

## 抽象相等

定如果两个值的类型相同，就仅比较它们是否相等。例如，42 等于 42 ，"abc" 等于 "abc" 。 

有几个非常规的情况需要注意。 

NaN 不等于 NaN （参见第 2 章）。 

+0 等于 -0 （参见第 2 章）

两个对象指向同一个值时即视为相等，不发生强制类型转换。

## 宽松不相等

宽松不相等（loose not-equality）!= 就是 == 的相反值，!== 同理。

## 抽象关系比较

### 字符串和数字之间的相等比较

```js
var a = 42;
var b = "42";
a === b; // false 
a == b; // true
```

> 你不知道的JavaScript：

因为没有强制类型转换，所以 a === b 为 false ，42 和 "42" 不相等。 

而 a == b 是宽松相等，即如果两个值的类型不同，则对其中之一或两者都进行强制类型转换。 

具体怎么转换？是 a 从 42 转换为字符串，还是 b 从 "42" 转换为数字？

> ES5 规范 11.9.3.4-5 这样定义： 
>
> (1) 如果 Type(x) 是数字，Type(y) 是字符串，则返回 x == ToNumber(y) 的结果。
>
>  (2) 如果 Type(x) 是字符串，Type(y) 是数字，则返回 ToNumber(x) == y 的结果。

即数字和字符串比较，或字符串和数字比较，都会将字符串转成数字

比较双方首先调用 ToPrimitive ，如果结果出现非字符串，就根据 ToNumber 规则将双方强制类型转换为数字来进行比 较。

```js
var a = [42];
var b = ["43"];
a.valueOf = function () {
    console.log('a的valueOf');
    return Array.prototype.valueOf.call(this)
}
a.toString = function () {
    console.log('a的toString');
    console.log(Array.prototype.toString.call(this));
    return Array.prototype.toString.call(this)
}
b.valueOf = function () {
    console.log('b的valueOf');
    return Array.prototype.valueOf.call(this)
}
b.toString = function () {
    console.log('b的toString');
    console.log(Array.prototype.toString.call(this));
    return Array.prototype.toString.call(this)
}
console.log(a < b)// false
/**
 * 对象和对象比较，都转为基本类型再对比
 * 首先a进行toPrimitive操作，先执行valueOf,打印a的valueOf，返回[42]，不是基本类型，
 * 继续toString，打印a的toString，打印"42",返回"42"
 * 首先b进行toPrimitive操作，先执行valueOf,打印b的valueOf，返回["42"]，不是基本类型，
 * 继续toString，打印b的toString，打印"43",返回"43"
 * 结果："42"<"43"，再通过toNumber对比:
*/
```

### 其他类型和布尔类型之间的相等比较

> 规范 11.9.3.6-7 是这样说的： 
>
> (1) 如果 Type(x) 是布尔类型，则返回 ToNumber(x) == y 的结果； 
>
> (2) 如果 Type(y) 是布尔类型，则返回 x == ToNumber(y) 的结果。 

即：布尔类型和其他类型比较时，都会将布尔类型转成数字。

```js
var x = true;
var y = "42";
x == y; // false
```

Type(x) 是布尔值，所以 ToNumber(x) 将 true 强制类型转换为 1 ，变成 1 == "42" ，二者的类型仍然不同，"42" 根据规则(字符串和数字对比)被强制类型转换为 42 ，最后变成 1 == 42 ，结果为 false 。反过来也一样

```js
var x = "42"; 
var y = false;
x == y; // false
```

Type(y) 是布尔值，所以 ToNumber(y) 将 false 强制类型转换为 0 ，然后 "42" == 0 再变成 42 == 0 ，结果为 false 。 也就是说，字符串 "42" 既不等于 true (第一个例子x == y; // false看出)，也不等于 false（第二个例子x == y; // false看出） 。一个值怎么可以既非真值也非假值，这也太奇怪了吧？ 这个问题本身就是错误的，我们被自己的大脑欺骗了。 

"42" 是一个真值没错，但 "42" == true 中并没有发生布尔值的比较和强制类型转换。这里不是 "42" 转换为布尔值 

（true ），而是 true 转换为 1 ，"42" 转换为 42 。 

这里并不涉及 ToBoolean ，所以 "42" 是真值还是假值与 == 本身没有关系！ 

重点是我们要搞清楚 == 对不同的类型组合怎样处理。== 两边的布尔值会被强制类型转换为数字。 

### 对象和非对象之间的相等比较

> 关于对象（对象 / 函数 / 数组）和标量基本类型（字符串 / 数字 / 布尔值）之间的相等比较，ES5 规范 11.9.3.8-9 做如下规定： 
>
> (1) 如果 Type(x) 是字符串或数字，Type(y) 是对象，则返回 x == ToPrimitive(y) 的结果； 
>
> (2) 如果 Type(x) 是对象，Type(y) 是字符串或数字，则返回 ToPromitive(x) == y 的结果。
>
> 即：如果遇到遇到对象，就将对象转化为基本类型。

这里只提到了字符串和数字，没有布尔值。原因是我们之前介绍过 11.9.3.6-7 中规定了布尔值会先被强制类型转换为数字。

### null 和 undefined 之间的相等比较

null 和 undefined 之间的 == 也涉及隐式强制类型转换。ES5 规范 11.9.3.2-3 规定： 

(1) 如果 x 为 null ，y 为 undefined ，则结果为 true 。 

(2) 如果 x 为 undefined ，y 为 null ，则结果为 true 。 

在 == 中 null 和 undefined 相等（它们也与其自身相等），除此之外其他值都不存在这种情况。 

这也就是说在 == 中 null 和 undefined 是一回事，可以相互进行隐式强制类型转换：

```js
var a = null; 
var b; 
a == b; // true a == null; // true 
b == null; // true 
a == false; // false 
b == false; // false 
a == ""; // false 
b == ""; // false 
a == 0; // false 
b == 0; // false
```

### [] == ![]

```js
[] == ![];//true
```

首先看![]，[]是真值，因此![]是false，因此上述代码转化为：[] == false，此时变成了其他类型和布尔类型的比较，将布尔类型转化为数字，

即转化为了：[] == 0，此时又变成了对象和非对象之间的比较，将[]转化为基本类型，得到""，然后即：“”  == 0，有符合字符串和数字之间的比较，

将字符串转化为数字，““转化为数字0，即最终转化：0 == 0，所以结果为true

# 案例

### 案例1

```js
console.log({} + 1);    //"[object Object]" + 1，即"[object Object]1"
console.log({} - 1);    //"[object Object]" - 1，即NaN
console.log({} - '1');    //"[object Object]" - "1",即NaN
```

上面代码的ToPrimitive运算中，PreferredType都没提供，也就是hint为"default"时，PreferredType为默认的Number，即都是先执行valueOf，如果valueOf返回的是基本类型就返回该基本类型值；否则，再执行toString，如果toString返回的是基本类型，就返回该基本类型值；否则，就抛出TypeError错误，先执行valueOf，但{}的valueOf都是对象本身，不是基本类型，然后执行toString，{}的toString都是"[object Object]"

### 案例2

```js
let obj = {
  valueOf: function () {
      console.log('valueOf');
      return {};
  },
  toString: function () {
      console.log('toString');
      return 'obj';
  }
}
console.log(1 + obj);  //valueOf -> toString -> '1obj'
console.log(+obj); //valueOf -> toString -> NaN
console.log('' + obj); //valueOf -> toString -> 'obj'
```

### 案例3

```js
var a = {
    valueOf: function () {
        console.log('valueOf');
        return '1'
    },
    toString: function () {
        console.log('toString');
        return '2'
    }
}

// console.log(+a);    // 先打印valueOf,然后打印数字1
// console.log(a + '');    //先打印valueOf,然后打印字符串1
// console.log(a - '');    //先打印valueOf,然后打印数字1
```

### 案例4

```js
let obj = {
  valueOf: function () {
      console.log('valueOf');
      return {}; // object
  },
  toString: function () {
      console.log('toString');
      return {}; // object
  }
}

console.log(obj + obj);  //valueOf -> toString -> error!
```

### 案例5

```js
var arr = [1, 2]
var arr1 = [1, 2]
arr.valueOf = function () {
    console.log('valueOf');
    return 1
}
arr.toString = function () {
    console.log('toString');
    return 2
}
// console.log(arr.valueOf());
console.log(arr - [1]);          //valueOf--->0
console.log(arr1 - [1]);         //NaN
```

### 案例6

```js
console.log(1 + "2" + "2");     //"122"
console.log(1 + +"2" + "2");    //"32"
console.log("A" - "B" - "2");   //NaN
console.log("A" - "B" + "2");   //"NaN2"
console.log("A" - "B" + 2);     //NaN
```

### 案例7

```js
var a = [0];
if (a) {
  console.log(a == true);//false
} else {
  console.log(a);
}
```

首先a是也给对象，对象是真值，因此走console.log(a==true)，即[0] == true，[0]是转化成真值对象，并不是boolean的false值，因此，这里存在隐式转换，

[0] == true，对象和非对象进行比较，将[0]转化成基本值，即”0“ ，因此转化为：”0“ == true，变成了其他类型和布尔值比较，将布尔值转化为数字，即将true转化为1，因此转化为了：”0“ == 1，变成了字符串和数字比较，将字符串转化为数字，即将”0“转化为0，即最终转化为：0 == 1，因此结果为false

### {}+[]

```js
var a = {} + []
console.log(a); //"[object Object]"
console.log({} + []);//"[object Object]"
```

注意：如果在浏览器控制台直接输入{}+[]，有的浏览器会将前面的{}解析成block，即直接就是+[]，即强制求出数字值的`Number([])`运算，相当于`Number("")`运算，最后得出的是`0`数字。但是如果在浏览器输入({}) + []，给前面的{}添加一个括号，就不会把括号里面的{}解析成block，而是解析成一个对象，最终输出“[object Object]”

# 参考

《你不知道的JavaScript》

https://segmentfault.com/a/1190000008038678?utm_source=sf-related

https://segmentfault.com/a/1190000016724285?utm_source=tag-newest

https://segmentfault.com/a/1190000016325587

https://juejin.cn/post/6844903555548053511

https://zhuanlan.zhihu.com/p/104362868