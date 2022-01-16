# 常用命令
> nginx 启动nginx
>
> nginx -v 查看nginx版本
>
> nginx -t 测试配置文件语法正确性
>
> nginx -s stop 快速关闭Nginx，可能不保存相关信息，并迅速终止web服务
>
> nginx -s quit 平稳关闭Nginx，保存相关信息，有安排的结束web服务
>
> nginx -s reload 重新载入nginx，当配置信息修改需要重新加载配置是使用
>
> taskkill /fi "imagename eq nginx.EXE" /f     window下杀掉所有nginx进程

# location

##  匹配规则

| 符号 | 说明                                               |
| ---- | -------------------------------------------------- |
| `~`  | 正则匹配，区分大小写                               |
| `~*` | 正则匹配，不区分大小写                             |
| `^~` | 和无修饰符类似，但是如果有^~，一旦匹配到就终止匹配 |
| `=`  | 普通字符匹配，精确匹配                             |
|      | 无修饰符，根据前缀匹配                             |

## 匹配优先级顺序

1、nginx首先检查基于前缀的location匹配(即不包含正则表达式的匹配)

2、如果有使用=修饰符的location块与请求的URL完全匹配,则立刻使用该location响应请求

3、如果没有找到带有=修饰符的location块匹配,则会继续计算非精确前缀,根据给定的URI找到最长匹配前缀,举个例子，nginx有/static和/static/js两个匹配路径，浏览器请求/static/js/aaa，这个路径都是/static前缀和/static/js/前缀，但是会选最长的/static/js/，然后保存起来

4、判断保存的location带不带 ^\~，如果带有 ^\~，则使用该location，并不再继续匹配，如果没有带 ^\~，则继续匹配

5、在确定并储存最长匹配的前缀location块后,nginx继续检查正则表达式匹配location(区分大小写/不区分大小写)，如果存在正则表达式满足要求的匹配,则会选择与请求的URI匹配的第一个正则表达式的location来相应请求

5、如果没有找到与请求的URI匹配的正则表达式location,则使用之前存储的最长前缀location响应请求

## 注意

通常情况下,一旦选择使用某一个location响应请求,那么请求将会在该location内部进行处理,而与其他location无关.但是location中某些指令会触发新的location匹配,比如：

（1）try_files

（2）rewrite

（3）error_page

匹配的顺序是**先匹配普通字符串**，然后**再匹配正则表达式**。

另外**普通字符串匹配顺序是根据配置中字符长度从长到短**，也就是说**使用普通字符串配置的location顺序是无关紧要的**，反正最后**nginx会根据配置的长短来进行匹配**，但是需要注意的是，**正则表达式按照配置文件里的顺序匹配。找到第一个匹配的正则表达式将停止搜索**。

## 匹配顺序案例

```nginx
location / {
    default_type application/json ;
    return 200  '{"name":"/","result":"/-success"}';
}


location /gethome1 {
    default_type application/json ;
    return 200  '{"name":"gethome1","result":"gethome1-success"}';
}

location /gethome {
    default_type application/json ;
    return 200  '{"name":"gethome","result":"gethome-success"}';
}

location ^~ /gethome100 {
    default_type application/json ;
    return 200  '{"name":"^~ /gethome100","result":"^~ /gethome100-success"}';
}
```

上面的匹配顺序优先级： **^~ /gethome100 > /gethome1 > /gehome>  /**，优先级和书写顺序无关。

如果地址栏上输入/gethome，先精准匹配，没有=，继续前缀匹配，找到/gethome1，/gethome，^~ /gethome100，但只有/gethome是/gethome的前缀，因此保存/gethome，继续后面的正则匹配，但是后面没有了，因此最终就是匹配到/gethome

如果地址栏上输入/gethome1，先精准匹配，没有=，继续前缀匹配，找到/gethome1，/gethome，^~ /gethome100，其中/gethome1和/gethome都是/gethome1的前缀，保存最长的，因此保存/gethome1，继续后面的正则匹配，但是后面没有了，因此最终就是匹配到/gethome1

如果地址栏上输入/gethome100，先精准匹配，没有=，继续前缀匹配，找到/gethome1，/gethome，^~ /gethome100，这三个都是/gethome100的前缀，保存最长的，因此保存/gethome100，而且/gethome100前面有^~前缀，直接使用这个匹配结果，不再继续匹配。

如果地址栏上输入/gethome100123，先精准匹配，没有=，继续前缀匹配，找到/gethome1，/gethome，^~ /gethome100，这三个都是/gethome100123的前缀，保存最长的，因此保存/gethome100，而且/gethome100前面有^~前缀，直接使用这个匹配结果，不再继续匹配。

```nginx
#location /gethobby {
#    default_type application/json ;
#    return 200  '{"name":"gethome","result":"gethome-success"}';
#}

location ^~ /gethobby { # location ^~/gethobby 空格不影响
    default_type application/json ;
    #return 状态码 数据
    return 200  '{"name":"^~/gethobby","result":"^~/gethobby-success"}';
}

location ^~ /gethobby100 { # location ^~/gethobby100 空格不影响
    default_type application/json ;
    #return 状态码 数据
    return 200  '{"name":"^~/gethobby100","result":"^~/gethobby100-success"}';
}
```

nginx不能同时写两个 /gethobby 和 ^~ /gethobby，否则会报错：nginx: [emerg] duplicate location "/gethobby"

匹配结果：

> 当浏览器地址栏输入：/gethobby时候，会匹配到^~ /gethobby
>
> 当浏览器地址栏输入：/gethobby123时候，会匹配到^~ /gethobby
>
> 当浏览器地址栏输入：/gethobby100时候，会匹配到^~ /gethobby100
>
> 当浏览器地址栏输入：/gethobby100123时候，会匹配到^~ /gethobby100

## 普通字符匹配和^~普通字符匹配区别

```nginx
location / {
    default_type application/json ;
    return 200  '{"name":"/","result":"/-success"}';
}

location ^~ /static {
    default_type application/json ;
    return 200  '{"name":"static","result":"static-success"}';
}

location ~ (jpg|jpeg|png|gif|mp3|mp4)$ {    #匹配以jpg|jpeg|png|gif|mp3|mp4结尾的路径
    default_type application/json ;
    return 200  '{"name":"正则匹配区分大小写","result":"正则匹配区分大小写-success"}';
}
```

地址栏：/static/musicmp3，先匹配 ^~ /static，命中匹配，不会继续匹配下面的正则，结果就是匹配到^~ /static

地址栏：/static/musicmp5，先匹配 ^~ /static，命中匹配，不会继续匹配下面的正则，结果就是匹配到^~ /static

```nginx
location / {
    default_type application/json ;
    return 200  '{"name":"/","result":"/-success"}';
}

location /static {
    default_type application/json ;
    return 200  '{"name":"static","result":"static-success"}';
}

location ~ (jpg|jpeg|png|gif|mp3|mp4)$ {    #匹配以jpg|jpeg|png|gif|mp3|mp4结尾的路径
    default_type application/json ;
    return 200  '{"name":"正则匹配区分大小写","result":"正则匹配区分大小写-success"}';
}
```

地址栏：/static/musicmp3，先匹配  /static，命中匹配，继续匹配下面的正则，命中~ (jpg|jpeg|png|gif|mp3|mp4)$，则结果就是匹配到~ (jpg|jpeg|png|gif|mp3|mp4)$

地址栏：/static/musicmp5，先匹配  /static，命中匹配，继续匹配下面的正则，不符合~ (jpg|jpeg|png|gif|mp3|mp4)$，则结果就是匹配到/static

# 关于loalhost后面的/

## 当location后面有/时

```nginx
server {
    listen 90;
    server_name localhost;
    
    location / {
        default_type application/json ;
        return 200  '{"name":"测试/","result":"测试/-success"}';
    }
    
    location /test/ {
        default_type application/json ;
        return 200  '{"name":"测试test","result":"测试test-success"}';
    }
}
```

浏览器输入http://127.0.0.1:90/test时，匹配到/，匹配不到/test/

浏览器输入http://127.0.0.1:90/test/时，匹配到/test/，匹配不到/

浏览器输入http://127.0.0.1:90/test/aaa时，匹配到/test/，匹配不到/

浏览器输入http://127.0.0.1:90/testaaa时，匹配到/，匹配不到/test/

浏览器输入http://127.0.0.1:90/test/aaa/aaa时，匹配到/test/，匹配不到/

## 当location后面没有/时

```nginx
server {
    listen 90;
    server_name localhost;
    
    location / {
        default_type application/json ;
        return 200  '{"name":"测试/","result":"测试/-success"}';
    }

    location /test {
        default_type application/json ;
        return 200  '{"name":"测试","result":"success"}';
    }
}
```

浏览器输入http://127.0.0.1:90/test时，匹配到/test，匹配不到/

浏览器输入http://127.0.0.1:90/test/时，匹配到/test，匹配不到/

浏览器输入http://127.0.0.1:90/test/aaa时，匹配到/test，匹配不到/

浏览器输入http://127.0.0.1:90/testaaa时，匹配到/test，匹配不到/

浏览器输入http://127.0.0.1:90/test/aaa/aaa时，匹配到/test，匹配不到/

```nginx
location /chat {
    proxy_pass http://localhost:5001;
}
```

http://localhost/chat  ===> http://localhost:5001/chat

http://localhost/chat/  ===> http://localhost:5001/chat

http://localhost/chat/chat  ===> http://localhost:5001/chat/chat

```nginx
location /chat {
    proxy_pass http://localhost:5001/;
}
# ===> proxy_pass + 原url匹配的location路径之后的内容
```

http://localhost/chat  ===> http://localhost:5001/

http://localhost/chat/  ===> http://localhost:5001//

http://localhost/chat/chat  ===> http://localhost:5001//chat

## 结论

> 当location后面有/时，只能访问test/ 以及test/xxx等路径。
>
> 当location后面没有/时，可以访问test开头的任意路径。

# proxy_pass

在nginx中配置proxy_pass代理转发时，如果在proxy_pass后面的url加/，表示绝对根路径，会把匹配到的路径部分去掉（即不带到代理地址上）

如果没有/，表示相对路径，把匹配的路径部分也给代理走（即把匹配到的部分也带到代理地址上）。

> 监听5001端口

```nginx
server {
    listen       5001;
    server_name  localhost;
    gzip on;
    # 进行压缩的文件类型。
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;
    location / {
        default_type application/json ;
        return 200  '{"name":"5001/","result":"5001/-success"}';
    }
    location /xxx {
        default_type application/json ;
        return 200  '{"name":"5001/xxx","result":"5001/xxx-success"}';
    }
    location /xxx/ {
        default_type application/json ;
        return 200  '{"name":"5001/xxx/","result":"5001/xxx/-success"}';
    }

}
```

> 监听5002端口

```nginx
server {
    listen       5002;
    server_name  localhost;
    gzip on;
    # 进行压缩的文件类型。
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;
    location / {
        default_type application/json ;
        return 200  '{"name":"5002/","result":"5002/-success"}';
    }

    location /xxx {
        proxy_pass http://localhost:5001;
    }
    location /xxx/ {
        proxy_pass http://localhost:5001;
    }
}
```

## proxy_pass末尾没有斜杠

> 5001端口

```nginx
server {
        listen       5001;
        server_name  localhost;
		gzip on;
	    # 进行压缩的文件类型。
	   	gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
	    # 是否在http header中添加Vary: Accept-Encoding，建议开启
	    gzip_vary on;
		location / {
            default_type application/json ;
            return 200  '{"name":"5001/","result":"5001/-success"}';
        }
        location /xxx {
            default_type application/json ;
            return 200  '{"name":"5001/xxx","result":"5001/xxx-success"}';
        }
        location /xxx/ {
            default_type application/json ;
            return 200  '{"name":"5001/xxx/","result":"5001/xxx/-success"}';
        }
        location /yyy {
            default_type application/json ;
            return 200  '{"name":"5001/yyy","result":"5001/yyy-success"}';
        }
        location /aaa {
            default_type application/json ;
            return 200  '{"name":"5001/aaa","result":"5001/aaa-success"}';
        }
        location /yyy/aaa {
            default_type application/json ;
            return 200  '{"name":"5001/yyy/aaa","result":"5001/yyy/aaa-success"}';
        }
        location /aaa/yyy {
            default_type application/json ;
            return 200  '{"name":"5001/aaa/yyy","result":"5001/aaa/yyy-success"}';
        }

    }
```

> 5002端口

```nginx
server {
    listen       5002;
    server_name  localhost;
    gzip on;
    # 进行压缩的文件类型。
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;
    location / {
        default_type application/json ;
        return 200  '{"name":"5002/","result":"5002/-success"}';
    }

    location /xxx {
        proxy_pass http://localhost:5001;
    }
    location /xxx/ {
        proxy_pass http://localhost:5001;
    }
    location /yyy {
        proxy_pass http://localhost:5001/aaa;
    }
    location /aaa {
        proxy_pass http://localhost:5001/aaa/yyy;
    }
}
```

浏览器地址栏：http://localhost:5002/xxx或者http://localhost:5002/xxx123，匹配到nginx中5002端口的/xxx（因为/xxx是/xxx的前缀，不是/xxx/的前缀，因为少了一个/），然后匹配到的该路径又代理到了5001端口，且没有带/，即相对路径，会将/xxx带给http://localhost:5001，实际代理到：http://localhost:5001/xxx

浏览器地址栏：http://localhost:5002/xxx/或者http://localhost:5002/xxx/123，匹配到nginx中5002端口的/xxx/（因为/xxx和/xxx/都是/xxx的前缀，但取最长的/xxx/），然后匹配到的该路径又代理到了5001端口，且没有带/，即相对路径，会将/xxx/带给http://localhost:5001，实际代理到：http://localhost:5001/xxx/

浏览器地址栏：http://localhost:5002/yyy，匹配到nginx中5002端口的/yyy，注意，此时虽然proxy_pass的URL最后没有带/，但是，它有URI，因此不能把/yyy带到这个URL的后面，不能匹配到http://localhost:5001/aaa/yyy，也不会匹配到：http://localhost:5001/yyy/aaa，只能匹配到：http://localhost:5001/aaa

浏览器地址栏：http://localhost:5002/aaa，匹配到nginx中5002端口的/aaa，注意，此时虽然proxy_pass的URL最后没有带/，但是，它有URI，因此不能把/aaa带到这个URL的后面，不能匹配到http://localhost:5001/aaa/yyy/aaa，也不会匹配到：http://localhost:5001/aaa/aaa/yyy，只能匹配到：http://localhost:5001/aaa/yyy

## proxy_pass末尾有斜杠

> 5002端口

```nginx
server {
    listen       5002;
    server_name  localhost;
    gzip on;
    # 进行压缩的文件类型。
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;
    location / {
        default_type application/json ;
        return 200  '{"name":"5002/","result":"5002/-success"}';
    }

    location /xxx {
        proxy_pass http://localhost:5001/;
    }
    location /xxx/ {
        proxy_pass http://localhost:5001/;
    }
    location /yyy {
        proxy_pass http://localhost:5001/aaa/;
    }
    location /aaa {
        proxy_pass http://localhost:5001/aaa/yyy/;
    }
}
```

浏览器地址栏：http://localhost:5002/xxx或http://localhost:5002/xxx123，匹配到nginx中5002端口的/xxx（因为/xxx是/xxx的前缀，不是/xxx/的前缀，因为少了一个/），然后匹配到的该路径又代理到了proxy_pass http://localhost:5001/，且带了/，即绝对路径，最终就是代理到http://localhost:5001/

浏览器地址栏：http://localhost:5002/xxx/或http://localhost:5002/xxx/123，匹配到nginx中5002端口的/xxx/（因为/xxx和/xxx/都是/xxx的前缀，但取最长的/xxx/），然后匹配到的该路径又代理到了proxy_pass http://localhost:5001/，且带了/，即绝对路径，最终就是代理到http://localhost:5001/

浏览器地址栏：http://localhost:5002/yyy或http://localhost:5002/yyy123或http://localhost:5002/yyy/123，匹配到nginx中5002端口的/yyy，然后匹配到的该路径又代理到了proxy_pass http://localhost:5001/aaa/，且带了/，即绝对路径，最终就是代理到http://localhost:5001/aaa/

浏览器地址栏：http://localhost:5002/aaa或http://localhost:5002/aaa123或http://localhost:5002/aaa/123，匹配到nginx中5002端口的/aaa，然后匹配到的该路径又代理到了5001端口，且带了/，即绝对路径，最终就是代理到http://localhost:5001/aaa/yyy/

## 小结

> 实际应用时，localtion最后最好加/
>
> ```nginx
> server {
>     listen       5001;
>     server_name  localhost;
>     location /api/ {
>         proxy_pass http://localhost:5002/;
>     }
> }
> ```
>
> http://localhost:5001/api/ ===> http://localhost:5002
>
> localtion加/的好处是，只有/api/才可以匹配，如果不加/，就只是/api，那样/api123，/api456等等都可匹配到/api，有很多可能性都可以匹配到/api，因此最好就加/，那样只有/api/123，/api/456/等等可以匹配到/api/。
>
> 而下面的proxy_pass，最好只是URL，不要带URI，而最后加不加/就看需求，比如我希望http://localhost:5001直接代理到http://localhost:5002，那么设置location /，proxy_pass是http://localhost:5002/，这样http://localhost:5001就会直接匹配到http://localhost:5002
>
> 那么，假设我服务器的3000端口被nuxt项目占了，而我这个nuxt项目里又要用到3003端口的数据，那么我nuxt项目（3000端口）要如何获取到3003端口的数据呢，这里就可以在nginx的3000端口添加一条路径，localtion为/，proxy_pass http://localhost:3003/，这样就会将http://localhost:3000代理到http://localhost:3003
>
> 但是，因为我的nuxt项目是在443端口的，443端口的localtion /就是代理到我的nuxt项目3000端口，那么这时候就不能使用/来代理到3003了，因此可以换成localtion /api/，proxy_pass不变，这样443端口匹配到/api/就会代理到http://localhost:3003，在nuxt项目里设置请求的前缀都是/api/即可

```nginx
location /chat/ {
    proxy_pass http://localhost:5001/;
}
# http://localhost/chat/  ===> http://localhost:5001/
```

```nginx
location /chat/ {
    proxy_pass http://localhost:5001/webchat/;
}
# http://localhost/chat/  ===> http://localhost:5001/webchat/
```

# 参考

https://blog.csdn.net/agonie201218/article/details/92795522

https://juejin.cn/post/6844903796791836685#heading-3

https://blog.csdn.net/qq_33862644/article/details/79337348

https://blog.csdn.net/xiaoxiangzi520/article/details/78737527

https://blog.csdn.net/zwl18210851801/article/details/81699977