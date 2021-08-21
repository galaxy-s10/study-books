# 重写call

```js
Function.prototype.myCall = function (ctx) {
    // 不考虑严格模式下的undefined
    ctx = Object(ctx) || window
    // 谁调用方法，this就指向谁，比如这里的myCall是test调用的，this就是test
    // 给ctx添加一个属性originFn，让他指向this，也就是test
    // 如果执行originFn()，也就是执行test()，而它是ctx调用的，所以this就是ctx
    ctx.originFn = this
    var args = []
    for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']')
    }
    var res = eval('ctx.originFn(' + args + ')')
    delete ctx.originFn
    return res
}

```



# 重写apply

```js
/* 
    apply:
    第一个参数：this
    第二个参数：
        数组，实参列表；
        null，undefined，对象，函数不报错；
        原始值报错；
    第三至最后一个参数忽略
*/
Function.prototype.myApply = function (ctx, arg1) {
    // 不考虑严格模式下的undefined
    ctx = Object(ctx) || window
    ctx.originFn = this
    var args = []
    // var arg1 = arguments[1]

    function myTypeof(v) {
        return typeof (v) === 'object' ? {
            '[object Object]': 'Object',
            '[object Array]': 'Array',
            '[object Number]': 'Number',
            '[object String]': 'String',
            '[object Boolean]': 'Boolean',
        }[({}).toString.call(v)] : typeof (v)
    }
    if (typeof (arg1) != 'undefined' && typeof (arg1) != 'object' && typeof (arg1) != 'function') {
        throw new Error('Uncaught TypeError: CreateListFromArrayLike called on non-object')
    }
    if (!arg1 || myTypeof(arg1) != 'Array') {
        return ctx.originFn()
    }
    for (var i = 0; i < arg1.length; i++) {
        args.push('arg1[' + i + ']')
    }

    var res = eval('ctx.originFn(' + args + ')')
    delete ctx.originFn
    return res
}
        
```



# 重写bind

```

```



# 重写foreach

```js
Array.prototype.myForEach = function (cb) {
    var _arr = this
    var _this = arguments[1] || window
    for (var i = 0; i < _arr.length; i++) {
        cb.apply(_this, [_arr[i], i, _arr])
    }
}

```



# 重写map

```js
Array.prototype.myMap = function (cb) {
    var _arr = this
    var _this = arguments[1] || window
    var _newArr = []
    var _res
    for (var i = 0; i < _arr.length; i++) {
        _res = cb.apply(_this, [_arr[i], i, _arr])
        _res && _newArr.push(_res)
    }
    return _newArr
}

```



# 重写filter

```js
Array.prototype.myFilter = function (cb) {
    var _arr = this
    var _this = arguments[1] || window
    var _newArr = []
    for (var i = 0; i < _arr.length; i++) {
        var _res = cb.apply(_this, [_arr[i], i, _arr])
        _res && _newArr.push(_arr[i])
    }
    return _newArr
}

```



# 重写reduce

```

```



# 重写some

```js
Array.prototype.mySome = function (cb) {
    var _arr = this
    var _this = arguments[1] || window
    // var _res = false
    for (var i = 0; i < _arr.length; i++) {
        if (cb(_this, [_arr[i], i, _arr])) {
            // _res = true
            // break
            return true
        }
    }
    // return _res
    return false
}

```



# 重写every

```js
Array.prototype.myEvery = function (cb) {
    var _arr = this
    var _this = arguments[1] || window
    // var _res = true
    for (var i = 0; i < _arr.length; i++) {
        if (!cb.apply(_this, [_arr[i], i, _arr])) {
            // _res = false
            // break
            return false
        }
    }
    // return _res
    return true
}

```