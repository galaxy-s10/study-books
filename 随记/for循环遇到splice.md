## 下标减一

> arr.splice()方法会修改原数组，所以当删除一个元素后，原数组长度改变，而for循环继续加一，则会导致错误。解决办法：在删除一个元素后，将for循环的下标也对应减一，这样就可以遍历所有数据了

```js
// 下标-1
// 可以遍历全部数据，但是会有下标问题，
// 比如：遍历arr里面的第二个3时，输出的下标i应该是3的，由于上一个3的时候i-1了，所以到这个i的时候，它输出的是2
var arr = [1, 2, 3, 3, 4, 5, 6, 3];
for (var i = 0; i < arr.length; i++) {
    if (arr[i] === 3) {
        console.log(i); // 2,2,5
        arr.splice(i, 1);
        i--
    }
}
console.log(arr);   // [1, 2, 4, 5, 6]        // 下标-1
// 可以遍历全部数据，但是会有下标问题，
// 比如：遍历arr里面的第二个3时，输出的下标i应该是3的，由于上一个3的时候i-1了，所以到这个i的时候，它输出的是2
var arr = [1, 2, 3, 3, 4, 5, 6, 3];
for (var i = 0; i < arr.length; i++) {
    if (arr[i] === 3) {
        console.log(i); // 2,2,5
        arr.splice(i, 1);
        i--
    }
}
console.log(arr);   // [1, 2, 4, 5, 6]
```

## 倒序循环

```js
// 倒序循环
var arr1 = [1, 2, 3, 3, 4, 5, 6, 3];
for (var i = arr1.length - 1; i >= 0; i--) {
    if (arr1[i] == 3) {
        console.log(i); // 7,3,2
        arr1.splice(i, 1)
    }
}
console.log(arr1);  //[1, 2, 4, 5, 6]
```

