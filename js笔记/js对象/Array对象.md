# Array对象

## 常用方法

### 在数组末尾添加一个或多个元素 - push()

> 在数组末尾添加一个或多个元素，返回新长度，会修改原数组
>

```js
var arr = [1, 2, 3, 4, 5]
var len1 = arr.push(6)
console.log(arr);   //[1, 2, 3, 4, 5, 6]
console.log(len1);  //6
```

### 在数组开头添加一个或多个元素 - unshift()

> 在数组开头添加一个或多个元素，返回新长度，会修改原数组
>

```js
var arr = [1, 2, 3, 4, 5]
var len2 = arr.unshift(0)
console.log(arr);   //[0, 1, 2, 3, 4, 5]
console.log(len2);  //6
```

### 删除数组的最后一个元素 - pop()

> pop() 方法用于删除数组的最后一个元素，并返回删除的元素，会修改原数组
>

```js
var arr = [1, 2, 3, 4, 5]
var reitem = arr.pop()
console.log(arr);   //[1, 2, 3, 4]
console.log(reitem);  //5
```

### 把数组的第一个元素从其中删除 - shift()

> shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值，会修改原数组
>

```js
var arr = [1, 2, 3, 4, 5]
var reitem1 = arr.shift()
console.log(arr);   //[2, 3, 4, 5]
console.log(reitem1);   //1
```

### 添加或删除数组中的元素 - splice()

> arr.splice('添加/删除的起始位置(必须)','删除的数量(可选)','要添加的元素(可选)')

splice() 方法用于添加或删除数组中的元素，会修改原数组

如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。

```js
<script>
    var arr = ['aaa', 'bbb', 'ccc', 'ddd']
    // 在数组下标为1的位置，删除后面的全部元素
    // var res = arr.splice(1)
    // console.log(res);   //["bbb", "ccc", "ddd"]
    // console.log(arr);   //["aaa"]

    // 在数组下标为2的位置，删除后面的全部元素
    // var res = arr.splice(2)
    // console.log(res);   //["ccc", "ddd"]
    // console.log(arr);   //["aaa", "bbb"]

    // 在数组下标为1的位置，删除后面的全部元素
    // var res1 = arr.splice(1, 0)
    // console.log(res1);  //[]
    // console.log(arr);   //["aaa", "bbb", "ccc", "ddd"]

    // 在数组下标为1的位置，删除一个元素
    // var res1 = arr.splice(1, 1)
    // console.log(res1);  //["bbb"]
    // console.log(arr);   //["aaa", "ccc", "ddd"]

    // 在数组下标为1的位置，删除两个元素
    // var res1 = arr.splice(1, 2)
    // console.log(res1);  //["bbb", "ccc"]
    // console.log(arr);   //["aaa", "ddd"]

    // 在数组下标为1的位置，添加一项'eee'
    // var res2 = arr.splice(1, 0, 'eee')
    // console.log(res2);  //[]
    // console.log(arr);   //["aaa", "eee", "bbb", "ccc", "ddd"]

    // 在数组下标为1的位置，添加两项'eee', 'fff'
    // var res2 = arr.splice(1, 0, 'eee', 'fff')
    // console.log(res2);  //[]
    // console.log(arr);   //["aaa", "eee", "fff", "bbb", "ccc", "ddd"]

    // 在数组下标为1的位置，删除一个，添加两项'eee', 'fff'
    var res2 = arr.splice(1, 1, 'eee', 'fff')
    console.log(res2);  //["bbb"]
    console.log(arr);  //["aaa", "eee", "fff", "ccc", "ddd"]

</script>
```



### 数组转字符串 - join()

> join() 数组转字符串，通过指定的分隔符进行分隔的。返回一个字符串，不会修改原数组
>

```js
var arr = [1, 2, 3, 4, 5]
var arrstr = arr.join('、')
console.log(arrstr);    //1、2、3、4、5
console.log(arr);   //[1, 2, 3, 4, 5]
```

### 数组转换为字符串 - toString()

> 把数组转换为字符串，并返回结果。
>

```js
var arr = [1, 2, 3, 4, 5]
console.log(arr.toString());    //1,2,3,4,5
```

### 排序 - sort()

> sort() 方法用于对数组的元素进行排序。
>
> 排序顺序可以是字母或数字，并按升序或降序。
>
> 默认排序顺序为按字母升序。
>
> 会修改原数组
>

```js
var arr1 = ['a', 'd', 'b', 'c', 'e']
var res3 = arr1.sort()
console.log(res3);  //["a", "b", "d", "f", "g"]
console.log(arr1);  //["a", "b", "d", "f", "g"]

var arr2 = [1, 3, 4, 6, 2, 5]
var res4 = arr2.sort((a, b) => {
    return a - b
    // return b-a   //[6, 5, 4, 3, 2, 1]
})
console.log(res4);  //[1, 2, 3, 4, 5, 6]
console.log(arr2);  //[1, 2, 3, 4, 5, 6]
```

### 反转数组 - reverse()

> 颠倒数组中元素的顺序。返回颠倒顺序后的数组，会修改原数组
>

```js
var arr = [1, 2, 3, 4, 5]
var rearr = arr.reverse()
console.log(rearr); // [5, 4, 3, 2, 1]
console.log(arr);   // [5, 4, 3, 2, 1]
```

### 判断一个对象是否是数组 - isArray()

> 如果对象是数组返回 true，否则返回 false。

```js
var arr3 = [1, 2, 3]
var str = '123'
console.log(Array.isArray(arr3));   //truejs
console.log(Array.isArray(str));   //false
```

### 连接两个或多个数组 - concat()

> concat()，该参数可以是具体的值，也可以是数组对象。可以是任意多个。
>
> 返回一个新的数组，不会修改原数组

```js
var arr4 = [1, 2, 3]
var arr5 = [2, 3, 4]
// var res = arr4.concat(arr5)
// console.log(res); //[1, 2, 3, 2, 3, 4]
var res = arr4.concat(3,4,5)
console.log(res);   //[1, 2, 3, 3, 4, 5]
```

### 遍历 - forEach(function) 

> 对数组的每个元素执行一次提供的函数，不会修改原数组

```js
var arr = [
    { id: 1, name: "小明" },
    { id: 2, name: "小李" },
    { id: 3, name: "小张" }
]
arr.forEach(function (val, index) {
    console.log("值", val)
    console.log("索引", index)
})
console.log(arr) //不会修改原数组
```



# 伪数组

将一个伪数组对象转换为一个真正的数组，必须具备以下条件：

1、该类数组对象必须具有length属性，用于指定数组的长度。如果没有length属性，那么转换后的数组是一个空数组。

2、该类数组对象的属性名必须为数值型或字符串型的**数字**

ps: 该类数组对象的属性名可以加引号，也可以不加引号

```js
let arrayLike = {
    0: 'tom',
    1: '65',
    2: '男',
    3: ['jane', 'john', 'Mary'],
    'length': 4
}
let arr1 = Array.from(arrayLike)
console.log(arr1) // ['tom','65','男',['jane','john','Mary']]

let arrayLike1 = {
    name: 'tom',
    age: '65',
    sex: '男',
    friends: ['jane', 'john', 'Mary'],
    'length': 4
}
let arr2 = Array.from(arrayLike1)
console.log(arr2) // [undefined, undefined, undefined, undefined]
```

# Array.from()

Array.from()将伪数组对象(拥有一个 length 属性和若干索引属性的任意对象)或可迭代对象转换为真正的数组。

```js
let arr = [1, 2, 3, 4, 4, 5, 3, 1]
arr = new Set(arr)
arr = Array.from(arr)
console.log(arr);   //[1, 2, 3, 4, 5]
let str = '12345'
str = Array.from(str)
console.log(str);   //["1", "2", "3", "4", "5"]
```

# 未完待续！