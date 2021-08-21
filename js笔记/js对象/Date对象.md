# Date对象

# 基本方法

> 创建Date对象：new Date()
>
> 返回年份：getFullYear()
>
>  返回月份 (0 ~ 11)：getMonth()
>
> 返回一个月中的某一天 (1 ~ 31)：getDate()
>
> 返回 Date 对象的小时 (0 ~ 23)：getHours()
>
> 返回 Date 对象的分钟 (0 ~ 59 )：getMinutes()
>
> 返回 Date 对象的秒钟 (0 ~ 59)：getSeconds()
>
> 返回 Date 对象的毫秒 (0 ~ 999)：getMilliseconds()

```js
<script>
    var date1 = new Date();
    var date2 = new Date(1590749870077);
    var date3 = new Date('2020-5-29 18:54:10');
    var date4 = new Date(2020, 4, 29, 18, 54, 10, 800);
    console.log(date1);
    console.log(date2); //Fri May 29 2020 18:57:50 GMT+0800 (中国标准时间)
    console.log(date3); //Fri May 29 2020 18:54:10 GMT+0800 (中国标准时间)
    console.log(date4); //Fri May 29 2020 18:54:10 GMT+0800 (中国标准时间)
    var date5 = date4.getFullYear()
    var date6 = date4.getMonth()
    var date7 = date4.getDate()
    var date8 = date4.getHours()
    var date9 = date4.getMinutes()
    var date10 = date4.getSeconds()
    var date11 = date4.getMilliseconds()
    // 2020 5 29 18 54 10 800
    console.log(date5, date6 + 1, date7, date8, date9, date10, date11);
</script>
```



# 常用方法

## 返回 1970 年1月1日至今的毫秒数 - getTime()

```js
<script>
    var date1 = new Date()
    var date2 = date1.getTime()
    console.log(date2); //1590751359793
</script>
```

##  以毫秒设置 Date 对象 - setTime()

```js
<script>
    var date1 = new Date('2020-5-29 14:35:10')
    var date2 = date1.getTime()
    console.log(date2); //1590734110000
    date1.setTime(date2)
    console.log(date1); //Fri May 29 2020 14:35:10 GMT+0800 (中国标准时间)

    var date3 = 1 * 24 * 60 * 60 * 1000
    date1.setTime(date2 + date3)
    console.log(date1); //Sat May 30 2020 14:35:10 GMT+0800 (中国标准时间)

    console.log(date1.toUTCString());   //Sat, 30 May 2020 06:35:10 GMT
</script>
```

## 根据世界时，把 Date 对象转换为字符串 - toUTCString()

```js
<script>
    var date4 = new Date()
    console.log(date4);         //Fri May 29 2020 19:40:23 GMT+0800 (中国标准时间)
    console.log(date4.toUTCString());   // Fri, 29 May 2020 11:40:23 GMT
</script>
```

## new Date()

```js
var date = new Date()   //当前时间
console.log(date);
var date1 = new Date(2020, 4, 6)  //Wed May 06 2020 00:00:00 GMT+0800 (中国标准时间),也就是2020年5月6日0时0分0秒
console.log(date1);
var date2 = new Date(2020, 4, 6, 10, 3, 43)  //Wed May 06 2020 10:03:43 GMT+0800 (中国标准时间),也就是2020年5月6日10时3分43秒
console.log(date2);
var date3 = new Date('2020-5-6')    //Wed May 06 2020 00:00:00 GMT+0800 (中国标准时间),也就是2020年5月6日0时0分0秒
console.log(date3);
var date4 = new Date('2020-5-6 10:3:43')    //Wed May 06 2020 10:03:43 GMT+0800 (中国标准时间),也就是2020年5月6日10时3分43秒
console.log(date4);
```

### 获取时间戳

```js
var date5 = new Date()
console.log(date5.valueOf());	//1590752594363
console.log(date5.getTime());	//1590752594363
var date6 = +new Date();
console.log(date6);	//1590752594363
//H5新增
console.log(Date.now());	//1590752594363
```

### 时间转化为时间戳

```js
var stamp1 = new Date('2020-5-6 10:10:10').getTime()
console.log(stamp1);     //1588731010000
var stamp2 = new Date('2020-5-6 10:10:10').valueOf()
console.log(stamp2);    //1588731010000
var stamp3 = +new Date('2020-5-6 10:10:10')
console.log(stamp3);    //1588731010000
```

### 格式化日期：年月日星期时分秒

```js
// 格式化日期(年月日星期时分秒)
function formatdate(time) {
    var date3 = new Date(time)
    var year = date3.getFullYear() //年
    var month = date3.getMonth() + 1    //月
    var day = date3.getDate()     //日
    var weekarr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var week = date3.getDay()  //星期
    var hour = date3.getHours() //时
    hour = hour < 10 ? '0' + hour : hour
    var minutes = date3.getMinutes()    //分
    minutes = minutes < 10 ? '0' + minutes : minutes
    var seconds = date3.getSeconds()  //秒
    seconds = seconds < 10 ? '0' + seconds : seconds
    return year + '年' + month + '月' + day + '日' + weekarr[week] + hour + '时' + minutes + '分' + seconds + '秒'
}
console.log(formatdate('2020-5-6 1:2:1'));  //2020年5月6日星期三01时02分01秒
```

### 格式化日期：年月日时分秒

```js
// 格式化日期(年月日时分秒)
function formatdate1(time) {
    var date3 = new Date(time)
    var year = date3.getFullYear() //年
    var month = date3.getMonth() + 1    //月
    var day = date3.getDate()     //日
    var hour = date3.getHours() //时
    hour = hour < 10 ? '0' + hour : hour
    var minutes = date3.getMinutes()    //分
    minutes = minutes < 10 ? '0' + minutes : minutes
    var seconds = date3.getSeconds()  //秒
    seconds = seconds < 10 ? '0' + seconds : seconds
    return year + '年' + month + '月' + day + '日' + hour + '时' + minutes + '分' + seconds + '秒'
}
console.log(formatdate1('2020-5-6 1:2:1')); //2020年5月6日01时02分01秒
```

### 案例

```js
// 倒计时案例
function timedown(inputime) {
    var nowdate = +new Date()  //当前时间戳
    var inputdate = +new Date(inputime)  //输入的时间戳
    var resdate = parseInt((inputdate - nowdate) / 1000)  //将毫秒数转化为秒
    var day = parseInt(resdate / (60 * 60 * 24))    //天
    day = day < 10 ? '0' + day : day
    var hour = parseInt(resdate / (60 * 60) % 24)   //时
    hour = hour < 10 ? '0' + hour : hour
    var minutes = parseInt(resdate / 60 % 60)   //分
    minutes = minutes < 10 ? '0' + minutes : minutes
    var seconds = parseInt(resdate % 60)    //秒
    seconds = seconds < 10 ? '0' + seconds : seconds
    return day + '天' + hour + '时' + minutes + '分' + seconds + '秒'
}
setInterval(() => {
    console.log(timedown('2020-5-7 19:13:59'));
}, 1000);

// 运行时案例
function runtime(inputime) {
    var nowdate = +new Date()  //当前时间戳
    var inputdate = +new Date(inputime)  //输入的时间戳
    var resdate = parseInt((nowdate - inputdate) / 1000)  //将毫秒数转化为秒
    var day = parseInt(resdate / (60 * 60 * 24))    //天
    day = day < 10 ? '0' + day : day
    var hour = parseInt(resdate / (60 * 60) % 24)   //时
    hour = hour < 10 ? '0' + hour : hour
    var minutes = parseInt(resdate / 60 % 60)   //分
    minutes = minutes < 10 ? '0' + minutes : minutes
    var seconds = parseInt(resdate % 60)    //秒
    seconds = seconds < 10 ? '0' + seconds : seconds
    return day + '天' + hour + '时' + minutes + '分' + seconds + '秒'
}

setInterval(() => {
    console.log(runtime('2020-5-6 10:10:10'));
}, 1000);
```

### 时间戳转正常时间

```js
// 时间戳转正常时间年月日时分秒
function formatdate2(timestamp) {
    var date = new Date(timestamp)
    var year = date.getFullYear() //年
    var month = date.getMonth() + 1    //月
    var day = date.getDate()     //日
    var hour = date.getHours() //时
    hour = hour < 10 ? '0' + hour : hour
    var minutes = date.getMinutes()    //分
    minutes = minutes < 10 ? '0' + minutes : minutes
    var seconds = date.getSeconds()  //秒
    seconds = seconds < 10 ? '0' + seconds : seconds
    return year + '年' + month + '月' + day + '日' + hour + '时' + minutes + '分' + seconds + '秒'

}
console.log(formatdate2(1588774080345));	//2020年5月6日22时25分05秒
```

### 时间戳转化为精确到分的时间戳

```js
// 将时间戳转化为精确到分的时间戳
function formatdate3(timestamp) {
    //首先将时间戳转化为正常时间
    var date = new Date(timestamp)  //Wed May 06 2020 22:25:05 GMT+0800 (中国标准时间)
    // 获取秒数
    var seconds = date.getSeconds()
    // 原来时间戳减去秒数乘以1000,得到精确到分的时间戳
    var newtimestamp = timestamp - (5 * 1000)
    //将毫秒去掉精确到秒的时间戳
    newtimestamp = Date.parse(new Date(newtimestamp))
    return newtimestamp
}
console.log(formatdate3(1588775105149))
```



