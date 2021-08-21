# Math对象

## Math.random()

得到一个大于等于0，小于1之间的随机数

```js
// 随机获取0-1之间的随机数
console.log(Math.random());
// 随机获取0-10之间的随机数[0-10)
console.log(Math.random() * 10);
// 随机获取0-9之间的随机整数[0-9]
console.log(Math.floor(Math.random() * 10));
// 随机获取0-8之间的随机整数[0-8]
console.log(Math.floor(Math.random() * 9));
// 随机获取1-9之间的随机整数[1-9]
console.log(Math.floor(Math.random() * 9) + 1);
// 随机获取1-10之间的随机整数[1-10]
console.log(Math.floor(Math.random() * 10) + 1);
// 随机获取1-20之间的随机整数[1-20]
console.log(Math.floor(Math.random() * 20) + 1);

//随机获取1-9之间的随机整数[1-9]
console.log(Math.ceil(Math.random() * 9));
//随机获取1-20之间的随机整数[1-20]
console.log(Math.ceil(Math.random() * 20));
//随机获取[n-m]之间的随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomInt1(min, max) {
    return Math.round(Math.random() * (max - min)) + min
}
// Fisher–Yates shuffle洗牌算法
function shuffle(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        // 随机下标
        var randomIndex = Math.floor(Math.random() * (i + 1));
        // 随机下标的值
        var itemAtIndex = arr[randomIndex];
        // 随机下标的值和当前遍历到的下标的值互换位置
        arr[randomIndex] = arr[i];
        // 把当前遍历到的值换成随机下标的值
        arr[i] = itemAtIndex;
    }
    return arr;
}
```

## Math.round()

四舍五入，该函数返回的是一个四舍五入后的的整数

```js
console.log(Math.round(1.4));   //1
console.log(Math.round(1.5));   //2
console.log(Math.round(1.6));   //2
console.log(Math.round(-1.4));  //-1
console.log(Math.round(-1.5));  //-1
console.log(Math.round(-1.6));  //-2
```

## Math.ceil()

向上取整，取大的

```js
console.log(Math.ceil(0.4));  //1
console.log(Math.ceil(0.5));  //1
console.log(Math.ceil(0.6));  //1
console.log(Math.ceil(-0.4));  //-0
console.log(Math.ceil(-0.5));  //-0
console.log(Math.ceil(-0.6));  //-0
console.log(Math.ceil(1.4));   //2
console.log(Math.ceil(1.5));   //2
console.log(Math.ceil(1.6));   //2
console.log(Math.ceil(-1.4));  //-1
console.log(Math.ceil(-1.5));  //-1
console.log(Math.ceil(-1.6));  //-1
```

## Math.floor()

向下取整，取小的

```js
console.log(Math.floor(0.4));  //0
console.log(Math.floor(0.5));  //0
console.log(Math.floor(0.6));  //0
console.log(Math.floor(-0.4));  //-1
console.log(Math.floor(-0.5));  //-1
console.log(Math.floor(-0.6));  //-1
console.log(Math.floor(1.4));   //1
console.log(Math.floor(1.5));   //1
console.log(Math.floor(1.6));   //1
console.log(Math.floor(-1.4));  //-2
console.log(Math.floor(-1.5));  //-2
console.log(Math.floor(-1.6));  //-2
console.log(Math.ceil(-1.6));  //-1
```

