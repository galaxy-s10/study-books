# JSON/JSONP

为什么需要jsonp?

为了解决跨域问题。

## 跨域

1. 域名不同，如www.aaa.com和www.bbb.com
2. 子域名不同，如www.aaa.com和admin.bbb.com
3. 协议不同，如http和https
4. 域名和域名对应的ip地址也会存在跨域问题

## jsonp原理

> 众所周知，由于浏览器的同源策略，要从不同的域（网站）访问数据会产生跨域问题，img的src(获取图片)，link的herf（获取css），script的scr(获取JavaScript)，这三个不属于同源策略，都可以跨域获取数据，因此，jsonp应运而生！
>
> JSONP实现跨域的原理简单的说，就是动态创建script标签，然后利用script的src 不受同源策略约束来跨域获取数据。



## 简单实现jsonp

```js
//前端
var parent = document.body
var cb = document.createElement('script');
cb.src = "http://localhost:3000?callback=show"
parent.appendChild(cb)
parent.removeChild(parent.lastElementChild)
```



```js
//后端（node）
var express = require('express')
var url = require('url')
var app = express()

app.use('/', function (req, res) {
    var urlParse = url.parse(req.url, true)
    console.log(urlParse);
    var cb = urlParse.query.callback
    // setTimeout(() => {
    res.end(cb + "('我是原生jsonp返回的数据')")
    // }, 3000);
})

app.listen('3000', function () {
    console.log('running......')
})
```



## 封装jsonp

```js
//封装一个json转字符串函数
function formatjson(json) {
    //创建一个空数组
    var arr = [];
    //遍历json的每个键值对
    for (var key in json) {
        //把每个键值对转换成=的形式依次放入数组
        arr.push(key + '=' + json[key]);
    };
    //用&进行字符串拼接，并返回结果
    return arr.join('&');
}

//封装jsonp
function sendJsonp(json) {
    //在没有传入json的情况下，默认设置为{}
    json = json || {};
    //判断是否传入url交互地址，如果没有，则终止运行
    if (!json.url) {
        console.log('no url');
        return;
    }
    //设置响应时间，默认为10秒
    json.timeout = json.timeout || 10000;
    //设置默认的接口（仅对于此处用到的url）
    json.cbName = json.cbName || 'cb';
    //默认数据为一个空的json
    json.data = json.data || {};
    //设置jsonp的回调函数名并同时设置刷新缓存（利用随机数）
    json.data[json.cbName] = json.cbName + Math.random();
    //把随机数里生成的.替换为空（函数命名不要有点）
    json.data[json.cbName] = json.data[json.cbName].replace('.', '');
    var parent = document.body
    var cb = document.createElement('script');
    cb.src = json.url + '?' + formatjson(json.data)
    parent.appendChild(cb)

    //设置一个定时器
    var timer = setTimeout(function () {
        //当响应时间超时后，使后续的函数不执行
        window[json.data[json.cbName]] = null;
        // window[json.data[json.cbName]] = (res) => {
        //     console.log('请求超时',res);
        // };
        json.callback('请求超时！！！', null);
    }, json.timeout);
    window[json.data[json.cbName]] = function (res) {
        console.log('响应成功！');
        //关闭定时器
        clearTimeout(timer);
        //清除之前插入的script（因为script只加载一次，并且此时已收到数据）
        // setTimeout(() => {
        parent.removeChild(parent.lastElementChild)
        // }, 1000);

        //执行成功时设置的函数
        json.callback(null, res);
    };
}

//调用
sendJsonp({
    url: 'http://localhost:3000/login',
    cbName: 'callback',
    callback: (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(JSON.parse(data));
            // console.log(typeof JSON.parse(data));
            console.log(data);
        }
    },
    data: { name: 'admin', pwd: 123456 },
    timeout: 1000,//单位是毫秒
})
```

```js
//后端（node）
var express = require('express')
var url = require('url')
var app = express()

app.use('/login', function (req, res) {
    var urlParse = url.parse(req.url, true)
    console.log(urlParse);
    var cb = urlParse.query.callback
    var name = urlParse.query.name
    var pwd = urlParse.query.pwd
    if (name == 'admin' && pwd == 123456) {
        const info = { name: '张三', age: 19 }
        console.log(JSON.stringify(info));
        var jsondata = cb + "('" + JSON.stringify(info) + "')"
        console.log(jsondata);
        // setTimeout(() => {
        res.end(jsondata)
        // }, 2000);
    }

})

app.listen('3000', function () {
    console.log('running......')
})
```

