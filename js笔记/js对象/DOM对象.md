# 什么是DOM

DOM，文档对象模型（Document Object Model）。

# HTMLCollection 对象

注意：IE9及以上版本才支持！

> 根据id获取元素，返回一个：document.getElementById()
>
> 根据标签获取元素，返回多个：document.getElementsByTagName()
>
> 根据选择器或标签获取第一个元素，返回一个：document.querySelector()
>
> 根据选择器或标签获取所有元素，返回多个：document.querySelectorAll()

```html
<body>
    <div id="wrap">
        <p class="ppp">我是p1</p>
        <p class="ppp">我是p2</p>
        <span>我是span</span>
    </div>
    <script>
        var ele = document.getElementById('wrap')
        console.log(ele);   //<div id="wrap">...</div>
        var ele1 = document.getElementsByTagName('p')
        console.log(ele1);  //HTMLCollection(2) [p, p]
        console.log(ele1[0]);  //<p class="ppp">我是p1</p>
        var ele2 = document.getElementsByClassName('ppp')
        console.log(ele2);  //HTMLCollection(2) [p.ppp, p.ppp]
        console.log(ele2[0]);  //HTMLCollection(2) [p.ppp, p.ppp]
        var ele3 = document.querySelector('#wrap')
        console.log(ele3);  //<div id="wrap">...</div>
        var ele4 = document.querySelector('p')
        console.log(ele4);  //<p class="ppp">我是p1</p>
        var ele5 = document.querySelectorAll('p')
        console.log(ele5);      //NodeList(2) [p, p]
        console.log(ele5[0]);  //<p class="ppp">我是p1</p>
    </script>
</body>
```

## 创建新的HTML元素 - appendChild()

要创建新的 HTML 元素 (节点)需要先创建一个元素，然后在已存在的元素中添加它。

> 创建一个新的元素：document.createElement()
>
> 创建一个新的文本节点：document.createTextNode()
>
> 在一个已存在的元素的尾部添加元素：appendChild()
>
> 在一个已存在的元素的开头添加元素：insertBefore('要添加的元素','已存在的元素')

```html
<body>
    <div id="ele">
        <p id="firstp">我是firstp</p>
        <p id="secondp">我是secondp</p>
    </div>
    <script>
        // 创建一个新的元素
        var ele1 = document.createElement('p')
        // 创建一个新的文本节点
        var ele2 = document.createTextNode('我是新增的p')
        // 将文本节点添加到元素中
        ele1.appendChild(ele2)

        var ele = document.getElementById('ele')
        // 在一个已存在的元素的末尾添加元素
        // ele.appendChild(ele1)

        var secondp = document.getElementById('secondp')
        // 在一个已存在的元素的开头添加元素
        ele.insertBefore(ele1, secondp)
    </script>
</body>
```

## 移除已存在的元素 - removeChild()

要移除一个元素，你需要知道该元素的父元素。

```html
<body>
    <div id="ele">
        <p id="firstp">我是firstp</p>
        <p id="secondp">我是secondp</p>
    </div>
    <script>
        var ele = document.getElementById('ele')
        var firstp = document.getElementById('firstp')
        ele.removeChild(firstp)
    </script>
</body>
```

## 替换 HTML 元素 - replaceChild()

```html
<body>
    <div id="ele">
        <p id="firstp">我是firstp</p>
        <p id="secondp">我是secondp</p>
    </div>
    <script>
        // 新建元素
        var newele = document.createElement('h1')
        // 新建文本节点
        var newtext = document.createTextNode('我是替换的h1')
        // 将文本节点添加到元素上
        newele.appendChild(newtext)

        var ele = document.getElementById('ele')
        var secondp = document.getElementById('secondp')

        // 将新的元素和旧的元素进行替换
        ele.replaceChild(newele, secondp)
    </script>
</body>
```

# 操作样式CSS

```html
<body>
    <a id="link" href="">baidu</a>
    <script>
        var link = document.getElementById('link')
        console.log(link);
        link.href = 'http://www.baidu.com'
        link.style.color = 'red'
        link.style.fontSize = '24px'
    </script>
</body>
```



# 操作类Class

## 获取/设置类 - className()

## 添加类 - classList.add()

## 移除类 - classList.remove()

```html
<body>
    <div class="hi hii" id="first"></div>
    <div class="hello"></div>

    <script>
        var mybtn = document.getElementsByTagName('button')

        var myclass = document.getElementsByTagName('div')
        console.log(myclass[0].className);  //hi hii

        myclass[0].classList.add('hiii')
        console.log(myclass[0].className);  //hi hii hiii
        myclass[0].classList.add('ho', 'hoo')
        console.log(myclass[0].className);  //hi hii hiii ho hoo
        myclass[0].classList.remove('hi')
        console.log(myclass[0].className);  //hii hiii ho hoo
        myclass[0].classList.remove('hii', 'ho')
        console.log(myclass[0].className);  //hiii hoo
        myclass[0].className = 'aaa'
        console.log(myclass[0].className);  //aaa
    </script>
</body>
```



# 操作属性

## 获取属性 - getAttribute()

## 设置属性 - setAttribute()

## 删除属性 - removeAttribute()

```html
<body>
    <input id="ipt" type="text" placeholder="我是input">
    <script>
        var ipt = document.getElementById('ipt')
        console.log(ipt.getAttribute('type'))   //text
        ipt.setAttribute('type', 'password')
        console.log(ipt.getAttribute('type'));   //password
        ipt.removeAttribute('type')
        console.log(ipt);   //<input id="ipt" placeholder="我是input">
    </script>
</body>
```

# innerHTML/innerText

```html
<body>
    <div id="res"></div>
    <div id="res1"></div>
    <script>
        document.getElementById('res').innerText = "<h1>我是h1</h1>"
        document.getElementById('res1').innerHTML = "<h1>我是h1</h1>"
    </script>
</body>
```

#	节点

所有节点都有的属性：

nodeName，元素节点的 `nodeName` 是标签名称（大写），属性节点的 `nodeName` 是属性名称，文本节点的 `nodeName` 永远是 `#text`，文档节点的 `nodeName` 永远是 `#document`

nodeType，**元素节点返回1**，属性节点返回2，元素或属性中的文本内容返回3

nodeValue，对于文本节点，`nodeValue` 属性包含文本。对于属性节点，`nodeValue` 属性包含属性值。文档节点和元素节点，`nodeValue` 属性的值始终为 `null`。

## 获取所有子节点 - childNodes()

获取所有子节点（文本节点，属性节点，元素节点，注释节点等等），有多个

```html
<body>
    <div id="test">
        <span>我是span</span>
        <p>我是p</p>
        <!-- 我是注释 -->
    </div>

    <script>
        var node = document.getElementById('test')
        //NodeList(7) [text, span#span, text, p, text, comment, text]
        console.log(node.childNodes);
    </script>
</body>
```

## 获取父节点 - parentNode()

获取父节点，只有一个

```html
<body>
    <div id="test">
        <span id="span">我是span</span>
        <p>我是p</p>
        <!-- 我是注释 -->
    </div>

    <script>
        var pnode = document.getElementById('span')
        /* 
        <div id="test">
            <span id="span">我是span</span>
            <p>我是p</p>
            <!-- 我是注释 -->
        </div> 
        */
        console.log(pnode.parentNode);
    </script>
</body>
```

## 获取第一个节点 - firstchildren()

```html
<body>
    <div id="test">
        <span id="span">我是span</span>
        <p>我是p</p>
        <!-- 我是注释 -->
    </div>

    <script>
        var cnode = document.getElementById('test')
        //获取第一个节点
        console.log(cnode.firstChild);  //#text
    </script>
</body>
```

## 获取最后一个节点 - lastChild()

```html
<body>
    <div id="test">
        <span id="span">我是span</span>
        <p>我是p</p>
        <!-- 我是注释 -->
    </div>

    <script>
        var cnode = document.getElementById('test')
        //获取最后一个节点
        console.log(cnode.lastChild);  //#text
    </script>
</body>
```



# 元素节点

## 获取所有元素节点 - children()

获取所有元素节点

```html
<body>
    <div id="test">
        <span id="span">我是span</span>
        <p>我是p</p>
        <!-- 我是注释 -->
    </div>

    <script>
        var cnode = document.getElementById('test')
        //HTMLCollection(2) [span#span, p, span: span#span]
        console.log(cnode.children);
    </script>
</body>
```

## 获取第一个元素节点 - firstElementChild()

```html
<body>
    <div id="test">
        <span id="span">我是span</span>
        <p>我是p</p>
        <!-- 我是注释 -->
    </div>

    <script>
        var cnode = document.getElementById('test')
        //获取第一个元素节点
        console.log(cnode.firstElementChild);//<span id="span">我是span</span>
    </script>
</body>
```

## 获取最后一个元素节点 - lastElementChild()

```html
<body>
    <div id="test">
        <span id="span">我是span</span>
        <p>我是p</p>
        <!-- 我是注释 -->
    </div>

    <script>
        var cnode = document.getElementById('test')
        //获取最后一个元素节点
        console.log(cnode.lastElementChild);// <p>我是p</p>
    </script>
</body>
```

# DOM事件

> addEventListener()允许在目标事件中注册监听事件
>
> removeEventListener()在目标事件中移除监听事件

```html
<body>
    <button onclick="show()">提示框</button>
    <button id="test1">提示框1</button>
    <script>
        function show() {
            var mes = prompt('提示标题', '提示内容')
            console.log(mes);
        }
        function show1() {

            console.log('show1');
        }
        document.getElementById('test1').addEventListener('click', show)
        document.getElementById('test1').addEventListener('click', show1)
        document.getElementById('test1').removeEventListener('click', show)
    </script>
</body>
```

## 事件冒泡/事件捕获

> 事件传递有两种方式：冒泡与捕获
>
> 在 *冒泡* 中，内部元素的事件会先被触发，然后再触发外部元素
>
> 在 *捕获* 中，外部元素的事件会先被触发，然后才会触发内部元素的事件

addEventListener() 方法可以指定 "useCapture" 参数来设置传递类型，addEventListener(*event*, *function*, ***useCapture***);默认值为 false, 即冒泡传递，当值为 true 时, 事件使用捕获传递。

## 阻止事件冒泡

w3c的方法是event.stopPropagation()

IE则使用event.cancelBubble = true

```html
<div onclick="show1()" style="width: 200px;height: 200px;background-color: red;">
    <button onclick="show();event.stopPropagation()">show</button>
    <button onclick="show();event.cancelBubble=true">show</button>
    <button id="hello">hello</button>
</div>
<script>
    window.onload = function () {
        var hellotbn = document.getElementById('hello')
        console.log(hellotbn);
        hellotbn.addEventListener('click', hello)
        function hello() {
            // event.stopPropagation()
            // event.cancelBubble=true	// ie下取消冒泡
            console.log('hello');
        }
    }
    function show() {
        console.log('show');
    }
    function show1() {
        console.log('show1');
    }
</script>
```

## 取消默认事件

1，可在onclick=""上直接加return false

2，通过获取dom元素，监听事件，event.preventDefault()

```html
<div onclick="show1()" style="width: 200px;height: 200px;background-color: red;">
    <a href="http://www.baidu.com" onclick="link(); return false">link</a>
    <a href="http://www.baidu.com" id="alink">alink</a>
</div>
    <script>
        window.onload = function () {
            var alink = document.getElementById('alink')
            
            // 方法1
            // alink.onclick = function () {
            //     event.preventDefault()
            //     console.log('xxxxxxxx');
            //     console.log(event);
            // }
            
            // 方法二
            // alink.onclick = function () {
            //     console.log('xxxxxxxx');
            //     console.log(event);
            //     return false
            // }
            
            // 方法三
            alink.addEventListener('click', aalink)
            function aalink() {
                event.preventDefault()
                console.log('aalink');
                //在这里使用return false不管用，只能用event.preventDefault()
                // return false
            }
        }
        function link() {
            console.log('link');
        }
    </script>
```



