# vue的两种路由模式

> vue的两种路由模式分别是hash和history模式。
>
> 为什么在开发环境下，使用history模式的时候刷新都不报错，而打包成静态文件上线后，打开项目空白页面（这个大多数是在配置文件配置：publicPath: './'可解决），或者打开时显示正常，跳转也正常，但是刷新就报404？
>
> 因为打包成静态文件上线后，这个项目就只是一个静态文件，它只是被你的nginx或其他代理服务器给托管起来了，在这个项目里进行F5刷新，还是会等于请求url，如果匹配不到相应的路径就还是会报404
>
> 而在开发环境下，是有一个服务（8080端口）托管起来的，个人猜测应该是vue脚手架应该做了很多处理，比如刷新的时候匹配不到路径就跳转/，所以在开发环境下是不会报404的。
>
> 而hash模式不一样不管在开发还是打包成dist静态文件后，都不会报404，比如直接找打包后的dist文件里面的index.html打开访问，然后刷新都不会报404，因为刷新只会带#号前面的url进行查找，即#号后面不管是什么，刷新都是跳#号前面的原路径 

# hash路由

## 配置nginx

配置好nginx后，在nginx根目录新建hashDeom文件夹，里面新建一个index.html，然后即可在浏览器打开localhost:5001端口进行调试，比如我的nginx根目录是：D:\phpstudy_pro\Extensions\Nginx1.15.11，就在这里新建一个hashDeom夹，然后再在里面新建index.html即可通过localhost:5001端口访问

```bash
server {
    listen       5001;
    server_name  localhost;
    gzip on;
    # 进行压缩的文件类型。
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;
    location / {
        root   hashDemo;
        index  index.html index.htm;
    }
    location /profile {
        default_type application/json ;
        return 200  '{"name":"profile","result":"profile-success"}';
    }
    location /homeAjax {    #不区分大小写，homeajax和HOMEAJAX等等都可匹配到
        default_type application/json ;
        return 200  '{"name":"homeAjax","result":"homeAjax-success"}';
    }
    location /profileAjax {
        default_type application/json ;
        return 200  '{"name":"profileAjax","result":"profileAjax-success"}';
    }

}
```

## hash

hash 模式下，仅 hash 符号之前的内容会被包含在请求中，比如地址栏输入：localhost:5001/#home或者localhost:5001/#profile，然后回车，实际请求的地址仍然是：localhost:5001，因此对于后端来说，只要匹配到了localhost:5001/这一个路径，就不会报404

```html
<body>
    <h1 style="color: red;">hash模式</h1>
    <div>
        <h1>使用location.href方法改变url，不会发起网络请求</h1>
        <button onClick="goHome()">home</button>
        <button onClick="goProfile()">profile</button>
        <button onClick="goLogin()">login</button>
        <button onClick="goNotFount()">404</button>
    </div>
    <div>
        <h1>使用history其他方法改变url，不会发起网络请求</h1>
        <button onClick="go(1)">下一个历史记录url:go(1)</button>
        <button onClick="go(-1)">上一个历史记录url：go(-1)</button>
        <button onClick="go(2)">下两个历史记录url:go(2)</button>
        <button onClick="go(-2)">上两个历史记录url:go(-2)</button>
        <button onClick="back()">上一个历史记录url:back()</button>
        <button onClick="forward()">下一个历史记录url:forward()</button>
    </div>
    <div>
        <h1>发起网络请求</h1>
        <button onClick="getData('profileAjax')">profileAjax</button>
        <button onClick="getData('homeAjax')">homeAjax</button>
        <span class="ajaxdata"></span>
    </div>
    <h1 style="color: red;">
        当前路由：<span class="view"></span>
    </h1>


    <script>
        var view = document.getElementsByClassName('view')[0]
        var ajaxdata = document.getElementsByClassName('ajaxdata')[0]
        // 监听url的变化
        window.addEventListener("hashchange", (e) => {
            console.log('hash地址栏改变了');
            hashchange()
        });

        // 刚进来第一次监听不到url变化，因此需要先执行一次
        hashchange()

        function hashchange() {
            // 更新视图
            // view.innerHTML = location.href
            switch (location.hash) {
                case "":
                    view.innerHTML = '当前是网站首页'
                    // view.innerHTML = location
                    break;
                case "#home":
                    view.innerHTML = location.hash
                    // view.innerHTML = location
                    break;
                case "#profile":
                    view.innerHTML = location.hash
                    // view.innerHTML = location
                    break;
                case "#login":
                    view.innerHTML = location.hash
                    // view.innerHTML = location
                    break;
                default:
                    // view.innerHTML = '404'
                    view.innerHTML = '404匹配不到：' + location.hash
            }
        }

        function goHome() {
            // console.log('goHome');
            window.location.href = "#home"
        }
        function goProfile() {
            // console.log('goProfile');
            window.location.href = "#profile"
        }
        function goLogin() {
            // console.log('goLogin');
            window.location.href = "#login"
        }
        function goNotFount() {
            // console.log('goNotFount');
            window.location.href = "#404" + Math.floor((Math.random() * 99) + 1)
        }
        // 请求数据
        function getData(url) {
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (res) {
                // console.log(res);
                ajaxdata.innerHTML = JSON.stringify(res)
            }).catch(function (err) {
                console.log(err);
            })
        }
        function go(num) {
            history.go(num)
        }
        function back() {
            // back() 方法可加载历史列表中的前一个 URL（如果存在）。
            history.back()  // === history(-1)
        }
        function forward() {
            // forward() 方法可加载历史列表中的下一个 URL。
            history.forward()  // === history(1)
        }
    </script>
</body>
```



# history路由

## 配置nginx

在http模块下新增server

```bash
server {
    listen       5002;
    server_name  localhost;
    gzip on;
    # 进行压缩的文件类型。
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;
    location / {
        root   historyDemo;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /profile {
        default_type application/json ;
        return 200  '{"name":"profile","result":"profile-success"}';
    }
    location /homeAjax {    #不区分大小写，homeajax和HOMEAJAX等等都可匹配到
        default_type application/json ;
        return 200  '{"name":"homeAjax","result":"homeAjax-success"}';
    }
    location /profileAjax {
        default_type application/json ;
        return 200  '{"name":"profileAjax","result":"profileAjax-success"}';
    }
}
```

## history

history 模式下，地址栏的路径必须要被后端匹配到，比如地址栏输入：localhost:5002/home，实际请求的地址就是localhost:5002/home，后端就必须要有匹配/home路由的处理，如果后端没有匹配/home，那么前端在地址栏输入localhost:5002/home然后回车刷新，就会报404。因为前端可以随意输入地址栏跳转，后端如果要匹配到所有的路由的话，可以使用nginx，添加一条location /记录，并且在里面添加：try_files $uri $uri/ /index.html;这样如果前端地址栏刷新时匹配不到/home，就会被/匹配到，然后就会重定向到跳转index.html

```html
<body>
    <h1 style="color:green;">history模式</h1>
    <div>
        <h1>使用history.pushState方法改变url，不会发起网络请求</h1>
        <button onClick="goHome()">home</button>
        <button onClick="goProfile()">profile</button>
        <button onClick="goLogin()">login</button>
        <button onClick="goNotFount()">404</button>
    </div>
    <div>
        <h1>使用history其他方法改变url，不会发起网络请求</h1>
        <button onClick="go(1)">下一个历史记录url:go(1)</button>
        <button onClick="go(-1)">上一个历史记录url：go(-1)</button>
        <button onClick="go(2)">下两个历史记录url:go(2)</button>
        <button onClick="go(-2)">上两个历史记录url:go(-2)</button>
        <button onClick="back()">上一个历史记录url:back()</button>
        <button onClick="forward()">下一个历史记录url:forward()</button>
    </div>
    <div>
        <h1>发起网络请求</h1>
        <button onClick="getData('profileAjax')">profileAjax</button>
        <button onClick="getData('homeAjax')">homeAjax</button>
        <span class="ajaxdata"></span>
    </div>
    <h1 style="color: red;">
        当前路由：<span class="view"></span>,
        当前路由数据：<span class="routermeta"></span>
    </h1>

    <script>
        // 获取视图
        var view = document.getElementsByClassName('view')[0]
        var routermeta = document.getElementsByClassName('routermeta')[0]
        var ajaxdata = document.getElementsByClassName('ajaxdata')[0]

        // 第一次进来先调用一次。
        popstate()

        // 监听url的变化
        window.addEventListener("popstate", (e) => {
            console.log('点击了前进/后退，history地址栏改变了');
            popstate()
        });

        // 监听url变化更新视图
        function popstate() {
            routermeta.innerHTML = JSON.stringify(history.state)
            console.log(location)
            switch (location.pathname) {
                case "/":
                    view.innerHTML = '当前是网站首页'
                    view.innerHTML = location
                    break;
                case "/home":
                    view.innerHTML = 'home'
                    // view.innerHTML = location
                    break;
                case "/profile":
                    view.innerHTML = 'profile'
                    // view.innerHTML = location
                    break;
                case "/login":
                    view.innerHTML = 'login'
                    // view.innerHTML = location
                    break;
                default:
                    // view.innerHTML = '404'
                    view.innerHTML = '404匹配不到：' + location.pathname
            }
        }

        // 请求数据
        function getData(url) {
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (res) {
                // console.log(res);
                ajaxdata.innerHTML = JSON.stringify(res)
            }).catch(function (err) {
                console.log(err);
            })
        }
        function go(num) {
            history.go(num)
        }
        function back() {
            // back() 方法可加载历史列表中的前一个 URL（如果存在）。
            history.back()  // === history(-1)
        }
        function forward() {
            // forward() 方法可加载历史列表中的下一个 URL。
            history.forward()  // === history(1)
        }
        function goHome() {
            // console.log('goHome');
            history.pushState({ message: '我是home' }, "", '/home');
            popstate()
        }
        function goProfile() {
            // console.log('goProfile');
            history.pushState({ message: '我是profile' }, "", '/profile');
            popstate()
        }
        function goLogin() {
            // console.log('goLogin');
            history.pushState({ message: '我是login' }, "", '/login');
            popstate()
        }
        function goNotFount() {
            // console.log('goNotFount');
            history.pushState({ message: '我是404' }, "", '/404' + Math.floor((Math.random() * 99) + 1));
            popstate()
        }
    </script>
</body>
```

上面的history案例使用了nginx托管，直接在浏览器打开localhost:5002即可模拟线上环境。打开后，除了点击发起网络请求按钮外，点击其他按钮都不会发起请求，比如点了home，就会改变url地址为localhost:5002/home，但是并不会发起一个localhost:5002/home请求，这时候如果点击了home改变了地址栏后，按F5刷新，才就会发起一个localhost:5002/home请求，但是nginx匹配不到/home，因此会匹配到/，然后重定向到了原本的index.html；

这里有个例外就是，如果从浏览器点击profile按钮，地址栏会变成localhost:5002/profile是不会发起网络请求的，但是如果当地址栏是localhost:5002/profile时，直接F5刷新，就会发起网络请求，然后nginx刚好有一个/profile路由记录匹配到，因此就会返回/profile返回的数据，而不会匹配到/进行重定向！

# 区别

共同点：都可通过改变路由(地址栏)而不刷新页面

不同点：

- 显示问题，hash会在地址栏上带#号，而history不会
- history可以通过pushState可以添加任意类型数据和title到记录中，而hash只可以添加短字符串在#号后面（因为地址栏上的url长度是有限制的）
- hash刷新时候，只会把#号之前的内容当做请求url发起请求，比如abc.com#home，只会把abc.com当做url发起请求。后端只需要匹配到abc.com就可以了；而history会把全路径发起请求，比如abc.com/home，就会把abc.com/home当做url发起请求。后端需要匹配到增加一个覆盖全路径的匹配/，让匹配不到/home时，让它重定向到一个abc.com页面（比如index.html），这样就不会报404了