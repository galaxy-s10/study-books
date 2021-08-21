# 什么是BOM

BOM，浏览器对象模型（Browser Object Model）。

# Window 对象

所有浏览器都支持 window 对象。它表示浏览器窗口。

所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。

全局变量是 window 对象的属性。

全局函数是 window 对象的方法。

甚至 HTML DOM 的 document 也是 window 对象的属性之一

# Window Screen

```js
<script>
    // 浏览器窗口的内部宽度(包括滚动条)
    var w = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    // 浏览器窗口的内部高度(包括滚动条)
    var h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    console.log(w, h);

    // 浏览器Y轴滚动距离
    var offsetY = pageYOffset || document.documentElement.scrollTop
    console.log(offsetY);

    // 浏览器X轴滚动距离
    var offsetX = pageXOffset || document.documentElement.scrollLeft
    console.log(offsetX);
</script>
```

# Window Location

> location.hostname 返回 web 主机的域名
>
> location.pathname 返回当前页面的路径和文件名
>
> location.port 返回 web 主机的端口 （80 或 443）
>
> location.protocol 返回所使用的 web 协议（http: 或 https:）

## 返回当前页面的URL - location.href

```js
<script>
    //file:///E:/BOM/location.html?a=1&b=2
    console.log(window.location.href);  //file:///E:/BOM/location.html?a=1&b=2
</script>
```

## 返回当前页面的URL - location.search

```js
<script>
    //file:///E:/BOM/location.html?a=1&b=2
    console.log(window.location.search);    //?a=1&b=2
    // 封装获取url参数
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return false;
    }
    console.log(getQueryVariable('a'));	//1
    console.log(getQueryVariable('b'));	//2
</script>
```

#  Window History

## history.back()

window.history.back()等于点击浏览器的后退按钮，可以加载历史记录的上一个页面

```js
<script type="text/javascript">
function goBack()
  {
  	window.history.back()
  }
</script>
```

## history.forward()

window.history.forward()等于点击浏览器的前进按钮，可以加载历史记录的下一个页面（前提是有下一个页面）

```js
<script type="text/javascript">
function goBack()
  {
  	window.history.forward()
  }
</script>
```

## history.go()

> window.history.go(1)加载历史列表中的下一个页面，约等于window.history.forward()
>
> window.history.go(-1)加载历史列表中的前一个页面，约等于window.history.back()
>
> window.history.go()如果不指定参数，默认参数为0，相当于刷新当前页面

```js
<script type="text/javascript">
function goBack()
  {
  	window.history.go(-1)
  }
</script>
```

# cookie

cookie要在服务器设置（如：http://localhost/cookie.html），直接一个html文件（如：E:/cookie.html）设置不了。

expires：过期时间，默认为浏览器关闭时删除

## 设置cookie

> document.cookie="user=admin"
>
> 删除cookie只需要设置过期时间为过去的时间即可

```js
<script>
    //封装设置cookie函数
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    setCookie('user', 'admin', 1)
    setCookie('pwd', 123456, 1)
	setCookie('pwd', 123456, -1)	//移除pwd的cookie
	console.log(document.cookie);	//user=admin; pwd=123456
</script>
```

## 获取cookie

> document.cookie
>
> 获取的cookie格式："user=admin; pwd=123456"

```js
<script>
    //封装设置cookie函数
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    //封装获取cookie函数
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) { return c.substring(name.length); }
        }
        return "";
    }
    setCookie('user', 'admin', 1)
    setCookie('pwd', 123456, 1)
	console.log(document.cookie);	//user=admin; pwd=123456
    console.log(getCookie('user')); //admin
    console.log(getCookie('pwd'));  //123456
</script>
```

# 常用方法

## onload()

onload 事件会在页面加载完成后立即发生。一个页面只会执行一个onload事件，后面的会覆盖前面的

**注意：由于html文档是自上而下执行的，而onload是文档加载完成才执行的，因此html文档里的onclick事件里执行的函数不能在onload里定义，否则会报undefined**

```html
<script>
    window.onload = function () {
        console.log('onload在页面加载完成执行');
        console.log(document.getElementById('test'));
    }
    console.log(document.getElementById('test'));  //null 
</script>

<body>
    <div id="test"></div>
</body>
```

## alert()

警告框

## confirm()

确认框

点击确定返回：true

点击取消返回：false

```html
<script>
    function show() {
        var res = window.confirm('确定or取消？')
        console.log(res);
    }
</script>

<body>
    <button onclick="show()">弹出确认</button>
</body>
```

## prompt()

提示框

```js
function show() {
    var mes = prompt('提示标题', '提示内容')
    console.log(mes);	//输出提示框的内容
}
```



## setTimeout()

在指定的毫秒数后执行指定代码。

```js
<script>
    setTimeout(() => {
        console.log('一秒后执行');
    }, 1000);
</script>
```

## clearTimeout()

停止执行setTimeout()

```js
<script>
    var timer = setTimeout(() => {
        console.log('一秒后执行');
    }, 1000);
    clearTimeout(timer)
</script>
```

 ## setInterval()

间隔指定的毫秒数不停地执行指定的代码。

```js
<script>
    setInterval(() => {
        console.log('每一秒执行一次');
    }, 1000);
</script>
```

## clearInterval()

停止执行setInterval()

```js
<script>
    var i = 0
    var timer1 = setInterval(() => {
        i++;
        console.log('每一秒执行一次');
        if (i > 5) {
            clearInterval(timer1)
            console.log('停止了timer1');
        }
    }, 1000);
</script>
```

