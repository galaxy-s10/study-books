# String对象

## 返回某个指定的字符串值在字符串中首次出现的位置 - indexOf()

indexOf() 来定位字符串中某一个指定的字符首次出现的位置（从0开始），如果没找到对应的字符函数返回-1

Ps：组也有此方法，indexOf()搜索数组中的元素，并返回它所在的位置。

```js
var str = 'www.baidu.com'
console.log(str.indexOf('w'));  //0
```

## 提取字符串的片断 - slice()

slice(start, end) 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。

Ps：数组也有此方法，Array.slice()选取数组的的一部分，并返回一个新数组。

```js
var str = 'www.baidu.com'
var str1 = str.slice(1, 4)
console.log(str1);  // ww.
console.log(str2);  // ww.baidu.com
```

## 字符串分割成数组 - split()

```js
var str = 'www.baidu.com'
var arr = str.split('.')
console.log(arr);   //["www", "baidu", "com"]
```

## 替换 - replace()

```js
var str = 'www.baidu.com'
var str3 = str.replace('w', 'p')
console.log(str3);  //pww.baidu.com
var str4 = str.replace(/w/g, 'p')
console.log(str4);  //ppp.baidu.com
```

## 匹配 - match()

match() 方法将检索字符串 String Object，以找到一个或多个与 regexp 匹配的文本。这个方法的行为在很大程度上有赖于 regexp 是否具有标志 g。如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 **null**。否则，它将返回一个**数组**，其中存放了与它找到的匹配文本有关的信息。

```js
var newstr = '[object Function Text]'
var res = newstr.match(/\s+\w+/)
var res1 = newstr.match(/\s+(\w+)/)
var res2 = newstr.match(/\s+\w+/g)
var res3 = newstr.match(/\s+(\w+)/g)
console.log(res);
// [" Function", index: 7, input: "[object Function Text]", groups: undefined]
console.log(res1);
// [" Function", "Function", index: 7, input: "[object Function Text]", groups: undefined]
console.log(res2);  //[" Function", " Text"]
console.log(res3);  //[" Function, " Text"]
```

## 提取字符 - substring()

```js
var str = 'www.baidu.com'
var str5 = str.substring(1, 5)
var str6 = str.substring(1)
console.log(str5);  //ww.b
console.log(str6);  //ww.baidu.com
```

## 把字符串转换为小写 - toLowerCase()

## 把字符串转换为大写 - toUpperCase()

## 删除字符串的头尾空格(中间的不行) - trim()