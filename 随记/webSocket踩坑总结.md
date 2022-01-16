# socket.io

如果用了socket.io

## client

### 小程序端

小程序端使用：weapp.socket.io

weapp.socket.io官方github标明：

> Full feature socket.io style implemented, based-on `socket.io@2.x` version

这句话的意思是：weapp.socket.io是基于socket.io2.x版本的。

现在最新的socket.io是4.0版本的，但是socket.io每个版本实现的websocket不一样，因此，前后端使用的socket.io需要版本对应！即只要你小程序用了weapp.socket.io，后端就要用对应的2.x版本，或者用4.0的版本，4.0版本有一个allowEIO3属性，这个属性代表是否启用Socket兼容性，兼容v2的客户端，但是这个属性默认是false（简直反人类，明知道有兼容性问题，还默认把它关了...），即如果后端用了4.0的socket.io，而客户端用2.x版本的socket.io连接，会存在兼容性问题问题，比如客户端请求后端服务器socket.io，请求成功了，但是连接后端服务器失败！所以，使用socket.io这个库时，需要前后端协调好！

服务端：

```js
const express = require('express');
const app = express();
const port = 5001
const socketIoPort = 5002

const io = require("socket.io")(socketIoPort, {
    allowEIO3: true,	// 兼容v2版本的socket.io客户端，兼容小程序weapp.socket.io(基于socket.io2.x)
});

io.on('connection', function (socket) {
    console.log(`连上了${socket.nsp.name}`);
    io.emit(`连上了${socket.nsp.name}`);
});

app.listen(port, () => {
    console.log(`开始监听${port}端口`);
});
```

如果后端使用了socket.io，小程序端就最好（一定要）使用socket.io，不要用小程序原生的`wx.connectSocket` 这些方法了！

### 浏览器端

和后端配合好就好，这里写个细节吧：

客户端：

```js
const socket = io('ws://www.zhengbeining.com/hello', {
  transports: ["websocket"]
})
```

上面写了ws://www.zhengbeining.com/hello，但是socket.io实际发请求是：ws://www.zhengbeining.com，并不会带上hello，那这个hello哪去了？实际上这个hello会被socket.io认为是命名空间（namespace）,除了匹配/，还会匹配到服务端的对应的命令空间：

```js
const express = require('express');
const app = express();
const port = 5001
const socketIoPort = 5002

const io = require("socket.io")(socketIoPort, {
    path: '/',
    allowEIO3: true,
});

io.on('connection', function (socket) {
    console.log(`连上了${socket.nsp.name}`);
    io.emit(`连上了${socket.nsp.name}`);
});
io.of('hello').on("connection", (socket) => {
    const newNamespace = socket.nsp;
    console.log(`连上了${socket.nsp.name}`);
    newNamespace.emit("hello");
});


app.listen(port, () => {
    console.log(`开始监听${port}端口`);
});
```

结果会打印连上了/和连上了/hello

## serve

同上。问题主要是前后端协调以及看准文档！

## 代理问题

假设服务端架设在代理服务端的80端口，即http，且服务端是这样的：

```js
const express = require('express');
const app = express();
const port = 5001
const socketIoPort = 5002

const io = require("socket.io")(socketIoPort, {
    allowEIO3: true,
});

io.on('connection', function (socket) {
    console.log(`连上了${socket.nsp.name}`);
    io.emit(`连上了${socket.nsp.name}`);
});

app.listen(port, () => {
    console.log(`开始监听${port}端口`);
});
```

也就是说5002是后端的websocket服务，客户端需要代理到后端的5002端口，此时客户端这样写：

```js
const socket = io('ws://www.zhengbeining.com', {
  transports: ["websocket"]
})
```

此时打开控制台查看请求链接，发现发请求的并不是ws://www.zhengbeining.com，而是：ws://www.zhengbeining.com/socket.io/?EIO=3&transport=websocket，路径上的?后面的参数并没有影响（浏览器会解析出uri）但是ws://www.zhengbeining.com和ws://www.zhengbeining.com/socket.io就不一样了，这两个代理到的地方都不一样，这是因为socket.io这个插件库在connect时，path路径默认是socket.io（客户端连接时会带上这个值，服务端匹配时也会带上这个值），且会拼接在地址栏上，因此在配置代理的时候，不能将/匹配到5002端口，要用/socket.io匹配到/5002端口：

```nginx
location /socket.io {
    proxy_pass http://127.0.0.1:5002;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
}
```

如果我非想要在连接的时候不要在路径后面拼接这个/socket.io呢，这样也可以，但是改动有点大，需要客户端和服务端都将path改成/，然后代理服务器就匹配/代理到5002即可：

客户端：

```js
const socket = io('ws://www.zhengbeining.com', {
  path:'/',
  transports: ["websocket"]
})
```

服务端：

```js
const io = require("socket.io")(socketIoPort, {
    path:'/',
    allowEIO3: true,
});
```

代理服务器nginx:

```nginx
location / {
    proxy_pass http://127.0.0.1:5002;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
}
```



# nodejs-websocket

和原生websocket类似，后端如果用nodejs-websocket，则客户端可以使用原生websocket，小程序也可使用小程序原生的`wx.connectSocket`

# ws和wss

默认是ws（因为网站默认是80端口，http）。

如果websocket在代理服务器的80端口，即http，则使用ws；

如果websocket在代理服务器的443端口，即https，则使用wss；

当然了这只是大部分的默认情况，你喜欢的话也可以把其他端口改成https，不用443端口当https也是可以的，别杠~