# 原理

请求：**浏览器** 访问 project.hsslive.cn 的时候，会带上`Accept-Language`请求头，它的值一般是你电脑的设置的语言，如：zh-CN、en-US 等等，浏览器发起请求后，经过了 nginx，nginx 里可以通过`$http_accept_language`来读取 http 请求中的 Accept-Language，从而根据拿到的值重定向对应的地址~

# 测试

浏览器直接输入：[http://project.hsslive.cn/lang/](http://project.hsslive.cn/lang/) 回车，会根据你当前浏览器的语言重定向到：http://lang.hsslive.cn/tw/、http://lang.hsslive.cn/ch/ 等连接

# 配置

```sh
server {
   listen 80;
   server_name project.hsslive.cn;

   # 开启gzip，关闭用off
   gzip on;
   # 选择压缩的文件类型，其值可以在 mime.types 文件中找到。
   gzip_types text/plain text/css application/json application/javascript
   # 是否在http header中添加Vary: Accept-Encoding，建议开启
   gzip_vary on;
   # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间，推荐6
   gzip_comp_level 6;

   location = /lang/ {
       # 请求localhost/xxx/,会请求到服务器的/node/xxx/index.html
       # zh-tw（台湾）,zh-hk（香港）,zh-mo（澳门）,zh-hant和zh-cht(繁体)
       if ($http_accept_language ~* ^zh-(TW|HK|MO|Hant|CHT)) {
           # 请求localhost/xxx/,会请求到服务器的/node/xxx/index.html
           return 301 http://lang.hsslive.cn/tw/;
       }
       # zh-Hans，简体中文，适用区域范围是全宇宙用中文简体的地方，内容包括各种用简体的方言等。
       # zh-CN，简体中文，中国大陆区域的中文。包括各种大方言、小方言、繁体、简体等等都可以被匹配到。
       if ($http_accept_language ~* ^zh-(CN|Hans)) {
           return 301 http://lang.hsslive.cn/ch/;
       }
       # 英语
       if ($http_accept_language ~* ^en) {
           return 301 http://lang.hsslive.cn/en;
       }
       # 韩文
       if ($http_accept_language ~* ^ko) {
           return 301 http://lang.hsslive.cn/ko;
       }
       # 日语
       if ($http_accept_language ~* ^ja) {
           return 301 http://lang.hsslive.cn/ja;
       }
   }
}
```
