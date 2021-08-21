# set结构

类似于数组，但是成员的值都是唯一的,没有重复的值。

```js
// set结构
let arr = [1, 2, 3, 3, 5, 6, 4, 6]
let arr1 = new Set()
arr1.add(1).add(3).add(3).add(2)
console.log(arr1);  //Set(3) {1, 3, 2}
let arr2 = new Set(arr)
console.log(arr2);  //Set(6) {1, 2, 3, 5, 6, 4}
for (let val of arr2) {
    console.log(val);
}
```



# set()方法

去重

```js
let arr = [1, 2, 3, 3, 5, 6, 4, 6]
let arr2 = new Set(arr)
console.log(arr2);  //Set(6) {1, 2, 3, 5, 6, 4}
// 去重转数组
arr2 = [...arr2]
console.log(arr2);  // [1, 2, 3, 5, 6, 4]
```



# map结构

类似于对象，也是键值对的集合，但是对象的键只能是字符串，而Map的键可以是任意类型的值。

```js
// map结构
let arr3 = new Map()
arr3.set('name','掌声').set('age',18).set('sex','男')
console.log(arr3);
for( let [key,value] of arr3){
    console.log(key,value);
}
```

# map()方法

map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

map() 方法按照原始数组元素顺序依次处理元素。

**注意：** map() 不会对空数组进行检测。

**注意：** map() 不会改变原始数组。

```js
// map()方法
let arr4 = [1, 2, 3, 4, 5]
arr5 = arr4.map(val => {
    return val + 1
})
console.log(arr4);  // [1, 2, 3, 4, 5]
console.log(arr5);  // [2, 3, 4, 5, 6]
```
