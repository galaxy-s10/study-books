## addEventListener

> 可以在文档中添加许多事件，添加的事件不会覆盖已存在的事件。
>
> 可以在同一个元素中添加不同类型的事件。

```html
<body>

<p>该实例使用 addEventListener() 方法在同一个按钮添加两个点击事件。</p>
<button id="myBtn">点我</button>
<script>
var x = document.getElementById("myBtn");
x.addEventListener("click", myFunction);
x.addEventListener("click", someOtherFunction);
function myFunction() 
{
    alert ("Hello World!")
}
function someOtherFunction() 
{
    alert ("该函数也将被执行!")
}
</script>

</body>
```

*element*.addEventListener(*event*, *function*, *useCapture*)

> *function* 当前事件对象会作为第一个参数传入函数。

```html
<body>
    <input type="text" class="search">

    <script>
        var a = 1
        var b = 2
        var c = 3
        var search = document.querySelector('.search')
        search.addEventListener('input', function (a, b, c) {
            console.log(arguments); // Arguments [InputEvent, callee: ƒ, Symbol(Symbol.iterator): ƒ]
            console.log(a);         // InputEvent
            console.log(b);         // undefined
            console.log(c);         // undefined
            console.log(event);     // InputEvent
            console.log(arguments[0] === event);    //true
            console.log(a === event);               //true
        })

    </script>
</body>
```

> 当传递参数值时，使用"匿名函数"调用带参数的函数

```html
<body>
    <input type="text" class="search">

    <script>
        var a = 1
        var b = 2
        var c = 3
        var search = document.querySelector('.search')

        function fn(a, b, c, e) {
            console.log(a, b, c);   // 1 2 3
            console.log(e);         // InputEvent
        }

        search.addEventListener('input', function () {
            fn(a, b, c, event)
        })

    </script>
</body>
```

> 使用bind()

```html
<body>
    <input type="text" class="search">

    <script>
        var a = 1
        var b = 2
        var c = 3
        var search = document.querySelector('.search')

        function fn(a, b, c, e) {
            console.log(arguments); // Arguments(4) [1, 2, 3, InputEvent, callee: ƒ, Symbol(Symbol.iterator): ƒ]
            console.log(a, b, c);   // 1 2 3
            console.log(e);         // InputEvent
        }

        search.addEventListener('input', fn.bind(null, a, b, c))

    </script>
</body>
```

