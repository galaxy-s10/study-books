# http协议

超文本传输协议（HyperText Transfer Protocol）是一种无状态的，以请求/应答方式运行的协议

## 优点

1. **「灵活可扩展」**。一个是语法上只规定了基本格式，空格分隔单词，换行分隔字段等。另外一个就是传输形式上不仅可以传输文本，还可以传输图片，视频等任意数据。
2. **「请求-应答模式」**，通常而言，就是一方发送消息，另外一方要接受消息，或者是做出相应等。
3. **「可靠传输」**，HTTP是基于TCP/IP，因此把这一特性继承了下来。
4. **「无状态」**。

## 缺点

1. **「无状态」**，有时候，需要保存信息，比如像购物系统，需要保留下顾客信息等等，另外一方面，有时候，无状态也会减少网络开销，比如类似直播行业这样子等，这个还是分场景来说。
2. **「明文传输」**，即协议里的报文(主要指的是头部)不使用二进制数据，而是文本形式。这让HTTP的报文信息暴露给了外界，给攻击者带来了便利。
3. **「队头阻塞」**，当http开启长连接时，共用一个TCP连接，当某个请求时间过长时，其他的请求只能处于阻塞状态，这就是队头阻塞问题。

# http报文格式

## 请求报文

### 请求行

> 请求行由请求`Method`, `URL` 字段和`HTTP Version`三部分构成, 总的来说请求就是定义了本次请求的请求方式, 请求的地址, 以及所遵循的HTTP协议版本例如：
>
> ```http
> GET /example.html HTTP/1.1 (CRLF)
> ```
>
> HTTP协议的方法有： 
>
> *`GET`： 请求**获取**Request-URI所标识的资源* 
>
> `POST`： 在Request-URI所标识的资源后**增加**新的数据
>
> `HEAD`： 请求获取由Request-URI所标识的资源的**响应消息报头**
>
> `PUT`： 请求服务器**存储或修改**一个资源，并用Request-URI作为其标识 
>
> `DELETE`： 请求服务器**删除**Request-URI所标识的资源
>
> `TRACE`： 请求服务器回送收到的请求信息，主要用于**测试或诊断**
>
> `CONNEC`： 保留将来使用
>
> `OPTIONS`： 请求查询服务器的性能，或者查询与资源相关的选项和需求

### 请求头

> 消息报头由一系列的键值对组成，允许客户端向服务器端发送一些附加信息或者客户端自身的信息，主要包括：

- Accept:用户代理可处理的媒体类型
- Accept-charset:优先的字符集
- Accept-Encoding:优先的编码格式
- Accept-Lauguage:有限的语言（中文，英文等）
- Authorization:Web认证信息(常用来携带token)
- Host:请求资源所在的服务器（唯一一个必须的）
- Range:实体请求的字节范围
- User-Agent:HTTP客户端程序的信息
- If-Match：比较实体标记(ETage)
- If-None-Match：比较实体标记(ETage) 与lf-Match相反
- lf-Modified-Since：比较资源更新时间(Last-Modified)
- lf-Unmodified-Since：比较资源更新时间(Last-Modified)，与lf-Modified-Since相反
- If-Rnages：资源未更新时发送实体byte的范围请求

### 请求正文

> 只有在发送`POST`请求时才会有请求正文，`GET`方法并没有请求正文。

## 响应报文

HTTP响应也由三部分组成，包括状态行，消息报头，响应正文。

### 响应行

响应行也由三部分组成，包括HTTP协议的版本，状态码，以及对状态码的文本描述。例如：

```bash
HTTP/1.1 200 OK （CRLF）
```

#### 状态码

> 1xx：指示信息--表示请求已接收，继续处理
>
> 2xx：成功--表示请求已被成功接收、理解、接受
>
> 3xx：重定向--要完成请求必须进行更进一步的操作
>
> 4xx：客户端错误--请求有语法错误或请求无法实现
>
> 5xx：服务器端错误--服务器未能实现合法的请求

- 200 OK 表示从客户端发来的请求在服务器端被正确请求。

- 204 No content，表示请求成功，但没有资源可返回。

- 200 from memory cache 不访问服务器，直接读缓存，从内存中读取缓存。此时的数据时缓存到内存中的，当kill进程后，也就是浏览器关闭以后，数据将不存在。但是这种方式只能缓存派生资源

- 200 from disk cache 不访问服务器，直接读缓存，从磁盘中读取缓存，当kill进程时，数据还是存在。这种方式也只能缓存派生资源

- 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL，这时应该按 Location 首部字段提示的 URI 重新保存。

- 302 found，临时性重定向，表示资源临时被分配了新的 URL。

- 304 Not Modified 访问服务器，发现数据没有更新，服务器返回此状态码。然后从缓存中读取数据。

- > 当 301、302、303 响应状态码返回时，几乎所有的浏览器都会把 POST 改成 GET，并删除请求报文内的主体，之后请求会自动再次发送 301、302 标准是禁止将 POST 方法改变成 GET 方法的，但实际使用时大家都会这么做400 bad request，请求报文存在语法错误。

- 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息。

- 403 forbidden，表示对请求资源的访问被服务器拒绝。

- 404 not found，表示在服务器上没有找到请求的资源。

- 405 Method Not Allowed，服务器禁止使用该方法，客户端可以通过options方法来查看服务器允许的访问方法

- 500 internal sever error，表示服务器端在执行请求时发生了错误。
- 502 Bad Gateway，服务器自身是正常的，访问的时候出了问题，具体啥错误我们不知道。

> 如果没有设置http缓存，浏览器发送请求但是返回的数据和上次的一样，返回状态码：304 Not Modified；如果设置了http缓存，如果命中强缓存会返回200 OK (from disk cache，from memory cache等)；如果命中协商缓存，会返回304 Not Modified

### 响应头

- Accept-Range:是否接收范围请求
- Age:推算资源创建时间
- Server:HTTP服务器的安装信息
- ETag:资源的匹配信息(相当于资源的id)
- location:令客户端重定向的URL
- Retry-After:对客户端再次发起请求的时机要求(主要配合503状态码使用)
- Vary:代理服务器缓存的管理信息

### 响应报文

## 通用首部字段

> 请求报文和响应报文都会使用的首部字段。

- cache-Control:控制缓存的行为
- Connection:连接的管理(keep-alive)
- Data:创建报文的日期
- via:代理服务器的相关信息
- pragma:报文指令
- Trailer:报文末端首部
- Upgrade:升级为其他协议
- Transfer-Encoding:报文主体的编码方式

## 实体首部字段

> 实体首部字段是包含在请求报文和响应报文中的实体部分所使用的首部。

- Allow，告诉客户端，服务器能接受的http请求方法，比如GET、POST、DELETE、OPTIONS、PUT等，当客户端使用的方法，服务器不能够支持的时候就会响应405 Method Not Allowed
- Content-Encoding:实体主体的编码方式
- Content-Charset:实体主体的字符集
- Content-Language:实体主体的语言
- Cntent-Length:实体主体的大小(字节长度）
- Content-Type:实体主体的媒体类型
- Content-Range:实体主体的位置范围
- Expires:实体主体的过期时间(配合cache-control来使用，控制缓存)
- Last-Modify:实体主体的最后修改时间



# HTTP 缓存机制

http缓存机制主要在http响应头中设定，响应头中相关字段为Expires、Cache-Control、Last-Modified、If-Modified-Since、Etag。

## 强缓存

不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的Network选项中可以看到该请求返回200的状态码，并且size显示from disk cache或from memory cache两种（灰色表示缓存）。

- **Expires ：**response header里的过期时间，浏览器再次加载资源时，如果在这个过期时间内，则命中强缓存。
- **Cache-Control:**当值设为max-age=300时，则代表在这个请求正确返回时间（浏览器也会记录下来）的5分钟内再次加载资源，就会命中强缓存。

> 区别：Expires 是http1.0的产物，Cache-Control是http1.1的产物
> 两者同时存在的话，Cache-Control优先级高于Expires
> Expires其实是过时的产物，现阶段它的存在只是一种兼容性的写法

```js
app.use('/star', function (req, res,) {
    res.setHeader('Cache-Control', 'max-age=3')
    var data = { code: new Date().getTime() }
    res.json(data)
})
```

设置了/star接口为强缓存，第一次请求star，返回200，然后在3秒内不管请求多少次star，都是从缓存里面读数据，如果三秒后请求，服务器收到请求后判断，获取到的数据和上一次获取的数据对比没有更新（即请求头If-None-Match和返回的响应头etag一致），就会返回304状态码和新的response header通知浏览器从缓存中读取资源；如果对比后发现数据更新了，就会返回200状态码并且从请求响应里读取数据

## 协商缓存

> 协商缓存使用Cache-Control的no-cache和no-store实现

向服务器发送请求，服务器接收到这个请求，会根据这个请求的request header的一些参数如：If-None-Match，来判断是否命中协商缓存，如果服务器接收到这个请求的请求头有If-None-Match，就会判断这个If-None-Match是否和这次请求返回的Etag一致，如果一致就代表命中协商缓存，就会返回304状态码和带上新的response header通知浏览器从缓存中读取资源

```js
app.use('/tag', function (req, res,) {
    /**
     * 协商缓存，每次都会发请求判断资源是否更新，
     * 如果资源更新了，就返回200状态码，如果没更新就返回304状态码
    */
    // 设置协商缓存
    res.setHeader('Cache-Control', 'no-cache')
    // 获取请求头的if-none-match
    console.log(req.headers['if-none-match'])
    var data = { code: new Date().getFullYear() }
    res.json(data)
    // 设置了Cache-Control:no-cache后，手动设置status状态码不管用。
    // res.status(200).json(data)
})
```

上面是node设置了/tag接口的协商缓存，浏览器第一次请求/tag时，会在请求头if-none-match带上上次响应头的Etag（因为是第一次请求，因此获取到的if-none-match为undefined），node收到这个请求后，判断if-none-match，发现是undefined，即代表是第一次请求，因此就返回200状态码以及根据返回的data数据生成的唯一标识给响应头Etag；

浏览器第二次请求/tag时，会把上次请求的/tag时的响应头Etag，设置在请求头if-none-match上，node服务器收到请求后，判断请求头的if-none-match，发现这个if-none-match和这次返回的data生成的唯一标识一样（因为data都是{code:2021}，因此生成的标识也一样），则命中协商缓存，返回304状态码和新的response header通知浏览器从缓存中读取资源。

```js
app.use('/tag', function (req, res,) {
    /**
     * 协商缓存，每次都会发请求判断资源是否更新，
     * 如果资源更新了，就返回200状态码，如果没更新就返回304状态码
    */
    // 设置协商缓存
    res.setHeader('Cache-Control', 'no-cache')
    // 获取请求头的if-none-match
    console.log(req.headers['if-none-match'])
    var data = { code: new Date().getTime() }
    res.json(data)
    // 设置了Cache-Control:no-cache后，手动设置status状态码不管用。
    // res.status(200).json(data)
})
```

这里虽然设置了协商缓存，但是因为每次返回的数据都不一样（每次请求的时间戳都不一样），因此每次请求都不会取缓存里的数据。node每次都会返回200状态码并且从请求响应里读取数据。

```js
app.use('/link', function (req, res,) {
    res.setHeader('Cache-Control', 'no-store')
    var data = { code: new Date().getFullYear() }
    res.json(data)
})
```

```js
app.use('/link', function (req, res,) {
    res.setHeader('Cache-Control', 'no-store')
    var data = { code: new Date().getTime() }
    res.json(data)
})
```

设置了no-store后，所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存。每次请求不管数据是不是最新的，都从服务器重新拿数据。

## 强缓存和协商缓存区别

> 共同点：都会从客户端缓存中读取资源；
> 不同点：强缓存不会发请求，协商缓存会发请求。
>
> 协商缓存既然都要发起请求了，为什么还要判断资源有没有更新，直接将请求返回的数据进行读取不就完事了吗？当然不是。
>
> 服务器端判断资源有没有更新，如果服务器端判断到返回是数据和上次的不一样，即更新了，服务端就返回200状态码和新数据给客户端，并通知客户端使用新数据；客户端接收到后，就用服务端返回的新数据；
>
> 如果服务器端判断到返回是数据和上次的一样，即没有更新，就不会返回数据，返回一个304状态码通知客户端直接从缓存里面拿之前的处理好的数据即可，这样的好处是节省了两个环节的时间，一个是服务端不用把新数据重新返回给客户端，直接返回304状态码就可以了（返回一个状态码总比返回一堆数据的传输时间来的快。），另一个是客户端收到304后，知道了资源没有更新，不用花时间处理新数据，而是直接从缓存里面读取之前处理好的数据即可。

##  Expires

HTTP 1.0协议中的。简而言之，就是告诉浏览器在约定的这个时间前，可以直接从缓存中获取资源（representations），而无需跑到服务器去获取。

**另：**Expires因为是对时间设定的，且时间是Greenwich Mean Time （GMT），而不是本地时间，所以对时间要求较高。

## Cache-Control

HTTP1.1协议中的，因为有了它，所以可以忽略上面提到的Expires。因为Cache-Control相对于Expires更加具体，细致。且就算同时设置了Cache-Control和Expires，Cache-Control的优先级也高于Expires。

下面就来看看，Cache-Control响应头中常用字段的具体含义：

max-age：用来设置资源（representations）可以被缓存多长时间，单位为秒；设置了max-age后，会在缓存时间内不发请求，从客户端缓存里读取数据，图片对应的是 memory cache、css等资源是 disk cache，且状态码是：**304 Not Modified**；如果客户端禁用了缓存（即开启Disable Cache），则max-age会失效，照常发请求。

s-maxage：和max-age是一样的，不过它只针对代理服务器缓存而言；

public：指示响应可被任何缓存区缓存；

private：只能针对个人用户，而不能被代理服务器缓存；

no-cache：强制客户端直接向服务器发送请求,也就是说每次请求都必须向服务器发送。服务器接收到请求，然后判断资源是否变更，是则返回新内容，否则返回304，未变更。这个很容易让人产生误解，使人误以为是响应不被缓存。实际上Cache-Control: no-cache是会被缓存的，只不过每次在向客户端（浏览器）提供响应数据时，缓存都要向服务器评估缓存响应的有效性。

no-store：禁止一切缓存（这个才是响应不被缓存的意思）。

## Last-Modified和If-Modified-Since

Last-Modified和If-Modified-Since表示响应资源在服务器最后修改时间。

与Etag相比，不足为：

- Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话（比如日志文件，一秒钟内有十个人访问，就会修改十次这个文件），它将不能准确标注文件的修改时间；

- 如果某些文件内容并没有变化，但Last-Modified却改变了，也会导致无法使用缓存(如果Etag和Last-Modified两种都使用的话，虽然文件没更新etag就不会更新，但是最后修改时间更新了即Last-Modified更新了，所以结果还是不会触发缓存，除非不使用Last-Modified，只是用Etag的方式设置缓存。)；

  ```js
  app.get('/http1', function (req, res) {
      // Last-Modified只有是数字，或者数字字符串缓存才会起作用
      // 如果Last-Modified是非数字的话，不会起到缓存作用
      res.setHeader('Last-Modified', new Date().getTime())
      res.json({ code: new Date().getFullYear() })
  })
  // 每次请求/http1，都会改变响应头的Last-Modified，但是内容却都是一样的，会造成缓存无法使用。
  ```

- 有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形。

- 然而，Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，能够更加准确的控制缓存。

## Etag和If-None-Match

1. ETag与If-None-Match是一对报文，属于http 1.1。
2. ETag可以用来解决这种问题。ETag是一个文件的唯一标志符。就像一个哈希或者指纹，每个文件都有一个单独的标志，只要这个文件发生了改变，这个标志就会发生变化。
3. ETag机制类似于乐观锁机制，如果请求报文的ETag与服务器的不一致，则表示该资源已经被修改过来，需要发最新的内容给浏览器。
4. **同时使用这两个报文头，在完全匹配If-Modified-Since和If-None-Match即检查完修改时间和Etag之后，如都与服务器的相符，服务器返回304，否则，发送最新内容给浏览器。**

Etag/lastModified过程如下：

1. 客户端请求一个页面（A）。
2. 服务器返回页面A，并在给A的响应头加上Last-Modified/ETag。
3. 客户端展现该页面，并将页面连同Last-Modified/ETag一起缓存。
4. 客户再次请求页面A，并将上次请求时服务器返回的Last-Modified/ETag作为请求头的If-Modified-Since/If-None-Match一起传递给服务器。
5. 服务器检查该Last-Modified/ETag，并判断出该页面自上次客户端请求之后还未被修改，直接返回响应304和一个空的响应体。



# HTTP0.9

最早版本是1991年发布的0.9版。该版本极其简单，只有一个命令`GET`。

> ```http
> GET /index.html
> ```

上面命令表示，TCP 连接（connection）建立后，客户端向服务器请求（request）网页`index.html`。

协议规定，服务器只能回应HTML格式的字符串，不能回应别的格式。

> ```html
> <html>
>   <body>Hello World</body>
> </html>
> ```

服务器发送完毕，就关闭TCP连接。

# HTTP1.0

1996年5月，HTTP/1.0 版本发布，内容大大增加。

任何格式的内容都可以发送。这使得互联网不仅可以传输文字，还能传输图像、视频、二进制文件。这为互联网的大发展奠定了基础。

除了`GET`命令，还引入了`POST`命令和`HEAD`命令

HTTP请求和回应的格式也变了。除了数据部分，每次通信都必须包括头信息（HTTP header），用来描述一些元数据。

其他的新增功能还包括状态码（status code）、多字符集支持、多部分发送（multi-part type）、权限（authorization）、缓存（只有If-Modified-Since 和 Expires）、内容编码（content encoding）等。

### 缺点

HTTP/1.0 版的主要缺点是，每个TCP连接只能发送一个请求。发送数据完毕，连接就关闭，如果还要请求其他资源，就必须再新建一个连接。

http1.0，在浏览器请求一个包含有许多图像的网页，如：www.aaa.com/index.html，首先和www.aaa.com建立tcp连接，拿到了index.html后就断开连接，拿到index.html后发现里面还有很多图片，继续建立tcp连接获取图片，如果有十个图片就会进行十次tcp连接过程

为了解决这个问题，有些浏览器在请求时，用了一个非标准的`Connection`字段。

> ```http
> Connection: keep-alive
> ```

这个字段要求服务器不要关闭TCP连接，以便其他请求复用。服务器同样回应这个字段。

> ```http
> Connection: keep-alive
> ```

一个可以复用的TCP连接就建立了，直到客户端或服务器主动关闭连接。但是，这不是标准字段，不同实现的行为可能不一致，因此不是根本的解决办法。

# HTTP1.1

http1.1是目前最为主流的http协议版本，从1999年发布至今，仍是主流的http协议版本。

## 持久连接

HTTP/1.1 最大的变化就是引入了持久连接（persistent connection），在HTTP/1.1中默认开启 `Connection: keep-alive`，即TCP连接默认不关闭，可以被多个请求复用。

> 一个包含有许多图像的网页文件中并没有包含真正的图像数据内容，而只是指明了这些图像的URL地址，当WEB浏览器访问这个网页文件时，浏览器首先要发出针对该网页文件的请求，当浏览器解析WEB服务器返回的该网页文档中的HTML内容时，发现其中的图像标签后，浏览器将根据标签中的src属性所指定的URL地址再次向服务器发出下载图像数据的请求。显然，访问一个包含有许多图像的网页文件的整个过程包含了多次请求和响应，每次请求和响应都需要建立一个单独的连接，每次连接只是传输一个文档和图像，上一次和下一次请求完全分离。即使图像文件都很小，但是**客户端和服务器端每次建立和关闭连接却是一个相对比较费时的过程，并且会严重影响客户机和服务器的性能**

> 同一个 tcp 连接，http1.1 允许一次发送多个 http1.1 请求，也就是说，不必等前一个响应收到，就可以发送下一个请求，这样就解决了 http1.0 的客户端的队首阻塞。但是，http1.1 规定，服务器端的响应的发送要根据请求被接收的顺序排队，也就是说，先接收到的请求的响应也要先发送。这样造成的问题是，如果最先收到的请求的处理时间长的话，响应生成也慢，就会阻塞已经生成了的响应的发送。也会造成队首阻塞。可见，http1.1 的队首阻塞发生在服务器端。

## 管道机制

HTTP/1.1 版还引入了管道机制（pipelining），即在同一个TCP连接里面，客户端可以同时发送多个请求。这样就进一步改进了HTTP协议的效率。即在同一个TCP连接里面，客户端可以同时发送多个请求。这样就进一步改进了HTTP协议的效率。举例来说，客户端需要请求两个资源。以前的做法是，在同一个TCP连接里面，先发送A请求，然后等待服务器做出回应，收到后再发出B请求。管道机制则是允许浏览器同时发出A请求和B请求，但是服务器还是按照顺序，先回应A请求，完成后再回应B请求。

## 缓存处理

HTTP/1.0 使用 `Pragma:no-cache + Last-Modified/If-Modified-Since`来作为缓存判断的标准；

HTTP/1.1 引入了更多的缓存控制策略：`Cache-Control`、`Etag/If-None-Match`等。

## 其他功能

1.1版还新增了许多动词方法：`PUT`、`PATCH`、`HEAD`、 `OPTIONS`、`DELETE`。

支持断点续传，通过使用请求头中的 `Range` 来实现。

另外，客户端请求的头信息新增了`Host`字段，用来指定服务器的域名。

> ```http
> Host: www.example.com
> ```

有了`Host`字段，就可以将请求发往同一台服务器上的不同网站，为虚拟主机的兴起打下了基础。

## 缺点

虽然HTTP/1.1版允许复用TCP连接，但是同一个TCP连接里面，所有的数据通信是按次序进行的。服务器只有处理完一个回应，才会进行下一个回应。要是前面的回应特别慢，后面就会有许多请求排队等着。这称为["队头堵塞"](https://zh.wikipedia.org/wiki/队头阻塞)（Head-of-line blocking）。

为了避免这个问题，只有两种方法：一是减少请求数，二是同时多开持久连接（就等于原本只有一个队列，全部请求都会排队，一个阻塞了后面的就都阻塞了，这时候就多开几个队列，不用耗在这一个队列里白等。）。这导致了很多的网页优化技巧，比如合并脚本和样式表、将图片嵌入CSS代码、域名分片（domain sharding）等等。如果HTTP协议设计得更好一些，这些额外的工作是可以避免的。

# HTTP2.0

## 头部压缩

HTTP 1.1版本会出现 **「User-Agent、Cookie、Accept、Server、Range」** 等字段可能会占用几百甚至几千字节，而 Body 却经常只有几十字节，所以导致头部偏重。

HTTP 2.0 使用 `HPACK` 算法进行压缩。

## 多路复用

HTTP 1.x 中，如果想并发多个请求，必须使用多个 TCP 链接，且浏览器为了控制资源，还会对单个域名有 6-8个的TCP链接请求限制。

HTTP2中：

- 同域名下所有通信都在单个连接上完成。
- 单个连接可以承载任意数量的双向数据流。
- 数据流以消息的形式发送，而消息又由一个或多个帧组成，多个帧之间可以乱序发送，因为根据帧首部的流标识可以重新组装，也就是`Stream ID`，流标识符，有了它，接收方就能从乱序的二进制帧中选择ID相同的帧，按照顺序组装成请求/响应报文。

## 服务器推送

浏览器发送一个请求，服务器主动向浏览器推送与这个请求相关的资源，这样浏览器就不用发起后续请求。

- 推送资源可以由不同页面共享
- 服务器可以按照优先级推送资源
- 客户端可以缓存推送的资源
- 客户端可以拒收推送过来的资源

## 二进制分帧

> 

# HTTPS

HTTP 是明文传输协议，HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全。

HTTPS比HTTP更加安全，对搜索引擎更友好，利于SEO，谷歌、百度优先索引HTTPS网页。

HTTPS标准端口443，HTTP标准端口80。

HTTPS需要用到SSL证书，而HTTP不用。

# 参考

http://www.blogjava.net/zjusuyong/articles/304788.html

https://blog.csdn.net/shadow_zed/article/details/82534283

https://www.jianshu.com/p/3e2afe089e11

https://www.yuque.com/u1339897/kb/pt2nba

http://www.ruanyifeng.com/blog/2016/08/http.html

HTTP 1.1与HTTP 1.0的比较：https://blog.csdn.net/hejingyuan6/article/details/50365641

http://caibaojian.com/http-cache-code.html

https://www.dazhuanlan.com/2020/02/03/5e379909e56c4/

https://juejin.cn/post/6844903618890465294#heading-10

https://juejin.cn/post/6857287743966281736#heading-2

https://www.v2ex.com/t/525759