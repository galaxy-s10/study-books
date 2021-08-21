# find()方法

find() 方法返回通过测试（函数内判断）的数组的**第一个元素的值。**

find() 方法为数组中的每个元素都调用一次函数执行：

- 当数组中的元素在测试条件时返回 *true* 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
- 如果没有符合条件的元素返回 **undefined**

```js
// find()
let arr6 = [1, 2, 3, 4, 5]
let res = arr6.find(val => {
    return val > 3
})
console.log(res);   //4
let res1 = arr6.find(val => {
    return val > 5
})
console.log(res1);   //undefined
let objarr = [{ id: 1, name: '张三' }, { id: 2, name: '李四' }, { id: 3, name: '王五' }]
let objarrres = objarr.find(val => {
    return val.id > 1
})
console.log(objarrres);     //{id: 2, name: "李四"}
```



# some()方法

some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。

some() 方法会依次执行数组的每个元素：

- 如果有一个元素满足条件，则表达式返回***true*** , 剩余的元素不会再执行检测。
- 如果没有满足条件的元素，则返回**false**。

```js
// some()
let arr7 = [1, 2, 3, 4, 5, 6]
let res2 = arr7.some(val => {
    return val > 3
})
console.log(res2);  //true
let res3 = arr7.some(val => {
    return val > 6
})
console.log(res3);  //false
```

