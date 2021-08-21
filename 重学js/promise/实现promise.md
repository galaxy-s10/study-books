# Promise是什么

`promise`表示一个异步操作的最终结果。和一个`promise`进行交互的主要方式是通过它的`then`方法，该方法注册回调要么接收一个`promise`的最终值，要么接收`promise`为什么不能被**满足**的原因。

> Promise 是异步编程的一种解决方案

> Promise是同步的，Promise.then也是同步的，但是Promise.then里面的回调（then,catch,finally）是异步的，这是我自己实现Promise后的得出来的结论，如果有错还请留言指正一下~

# Js事件机制

宏任务：script，setTimeout，setInterval

微任务：Promise

优先级：主线程>微任务>宏任务

```js
var promise = new Promise(function (resolve, reject) {
    console.log('我是promise里的同步代码');
    setTimeout(() => {
        console.log('我是promise里的异步代码');
        resolve('我是promise里的异步代码执行完成')
    }, 2000);
})
console.log('我是promise外的同步代码');

setTimeout(() => {
    console.log('定时器1s');
}, 1000);
promise.then(res => {
    console.log(res);
})

/**
 * 打印顺序：
 * 1.先执行promise里的同步代码，打印：我是promise里的同步代码
 * 2.遇到定时器，加入宏任务，promise里没有同步代码了，返回promise外部
 * 3.遇到同步代码，打印：我是promise外的同步代码
 * 4.又遇到定时器，加入宏任务
 * 5.遇到promise.then，加入微任务
 * 6.此时主线程代码执行完毕，先去微任务队列查看，即5，没有任务
 * 7.查看宏任务队列，4先执行完成，打印：定时器1s
 * 8.再查看微任务任务队列，还是没有，再执行宏任务队列，即执行5，打印：我是promise里的异步代码
 * 9.然后执行resolve，加入微任务队列，然后宏任务队列执行完毕，执行微任务队列，打印：我是promise里的异步代码执行完成
 * 结果：
 * 我是promise里的同步代码
 * 我是promise外的同步代码
 * 定时器1s
 * 我是promise里的异步代码
 * 我是promise里的异步代码执行完成
*/
```

```js
setTimeout(function () {
    console.log('1')
});

new Promise(function (resolve) {
    console.log('2');
    resolve();
}).then(function () {
    console.log('3')
});

console.log('4');

// 2,4,3,1
```

# 实现Promise

## 最基本

> 首先实现最基本的，new _Promise(executor)的时候，传入executor，它是一个函数，有两个形参，第一个是resolve，第二个是reject，这两个形参同时也是一个函数，在executor里面可以执行这两个函数，在执行两个函数的同时，需要改变 _Promise里面的状态以及对于值/原因

```js
/**
 * 根据Promise/A+规范实现Promise
 * Promise/A+为了简便，以下简称为规范
*/
function _Promise(executor) {

    var _this = this // 先保存this
    _this.status = 'pending' //规范要求的状态
    _this.value = undefined //规范要求成功返回的值
    _this.season = undefined //规范要求失败返回的原因
    _this.exception = undefined //规范要求异常抛出的值

    // 成功执行的函数
    function resolve(value) {
        // 规范规定，只能从pending变成fulfilled或者从pending变成rejected
        // 比如：如果当前status从pending变成fulfilled，
        // 则不能再次对status进行修改成pending或者reject。
        if (_this.status == 'pending') {
            _this.status = 'fulfilled'
            _this.value = value
        }
    }
    // 失败执行的函数
    function reject(season) {
        // 规范规定，只能从pending变成fulfilled或者从pending变成rejected
        // 比如：如果当前status从pending变成fulfilled，
        // 则不能再次对status进行修改成pending或者reject。
        if (_this.status == 'pending') {
            _this.status = 'rejected'
            _this.season = season
        }
    }
    // 因为new Promise(fn)时，会立即执行fn
    // 所以实现_Promise时，也要立即执行传进来的executor函数
    executor(resolve, reject)
}

var p = new _Promise(function (resolve, reject) {
    console.log('_Promise里的同步代码')
    resolve(200)
    // reject(500)
})
console.log(p)
// 打印顺序：
// _Promise里的同步代码
// _Promise {status: "fulfilled", value: 200, season: undefined, exception: undefined}
```

## then方法

记住：**Promise执行完成有结果的时候，会调用的then方法**

js，单线程，异步，所以不管Promise执行完executor有没有结果，都会往下执行，执行到then，需要传一个或两个函数分别作为成功/失败结果的回调

这里采用回调的方式，在Promise的executor里面的代码有结果后，会把值/原因，传给then里面对应的回调函数并执行

**then是同步的，只要执行到then了，就会执行里面的代码，但是并不一定会立即执行传给then的回调，因为里面的回调受Promise.executor里面的代码影响，如果这个回调在Promise.executor里面是同步的，就会立即执行，如果是异步的，就不会立即执行**

```js
/**
 * Promise执行完成有结果的时候，会调用的then方法，该方法接收两个参数，
 * 第一个是成功时候的回调函数，第二个是失败时候的回调函数，
 * 所以实现_Promise时，也要实现这个then方法
 */

_Promise.prototype.then = function (onFulfilled, onRejected) {
    if (_this.status == 'fulfilled') {
        onFulfilled(_this.value)
    }
    if (_this.status == 'rejected') {
        onRejected(_this.season)
    }
}

var p = new _Promise(function (resolve, reject) {
    console.log('_Promise里的同步代码')
    // resolve(200)
    reject(500)
})
p.then((res) => {
    console.log(res)
    console.log(p)
}, (err) => {
    console.log(err)
    console.log(p)
})
console.log(111);

// 打印顺序：
// _Promise里的同步代码
// 500
// _Promise {status: "rejected", value: null, season: 500, exception: null}
// 111
```

> 原生Promise的then方法是异步的，应该先打印111，然后再执行then方法，而现在的实现的_Promise是同步的，先执行then再执行打印111，因此需要修改一下，利用定时器模拟异步

```js
_Promise.prototype.then = function (onFulfilled, onRejected) {
    if (_this.status == 'fulfilled') {
        setTimeout(() => {
            onFulfilled(_this.value)
        }, 0);

    }
    if (_this.status == 'rejected') {
        setTimeout(() => {
            onRejected(_this.season)
        }, 0);
    }
}
var p = new _Promise(function (resolve, reject) {
    console.log('_Promise里的同步代码')
    // resolve(200)
    reject(500)
})

p.then((res) => {
    console.log(res)
    console.log(p)
}, (err) => {
    console.log(err)
    console.log(p)
})
console.log(111);

// 打印顺序：
// _Promise里的同步代码
// 111
// 500
// _Promise {status: "rejected", value: null, season: 500, exception: null}
```

## 捕获错误

### 原生Promise的捕获错误

> 原生Promise在遇到错误有两种可能
>
> 1. executor函数里面的代码有错误，但是没有被then的reject捕获，会修改Promise的状态为rejected，并抛出错误
> 2. executor函数里面的代码有错误，但是有被then的reject捕获，不会抛出错误，会修改Promise的状态为rejected，然后返回错误原因
> 3. 如果没有then，但是有Promise.catch，也不会报错，会修改Promise的状态为rejected，然后返回错误原因
>
> 总结：原生Promise只要有错误，都会修改状态为rejected，
>
> 如果有then捕获错误，就会把错误信息通过reject返回，不会抛出错误；
>
> 如果没有then捕获错误，就不会reject，然后抛出错误；
>
> 如果有catch捕获错误，就会把错误信息通过reject返回，不会抛出错误；
>
> 即只要错误有被Promise捕获到，就会通过reject返回

#### 没有Promise.then回调

```js
// executor函数里面的代码有错误，但是没有被then的reject捕获，会修改Promise的状态为rejected，并抛出错误
var p = new Promise((resolve, reject) => {
    throw new Error('xxx')
})
console.log(p);

// 打印顺序：
// Promise {<rejected>: Error: xxx at file:///E:/hss/my-study-notes/%E9%87%8D%E5%AD%A6js/promise/promise%E9%94%99%E8%AF…}
// 报错：Uncaught (in promise) Error: xxx
```

#### 有Promise.then回调，但没有reject回调

如果有Promise.then回调，但then里面没有第二个reject的回调函数，也捕获不到错误，会报错

```js
// executor函数里面的代码有错误，但是没有被then的reject捕获，会修改Promise的状态为reject，并抛出错误
var p = new Promise((resolve, reject) => {
    throw new Error('xxx')
})
p.then(res => {
    console.log(res);
})
console.log(p);

// 打印顺序：
// Promise {<rejected>: Error: xxx at file:///E:/hss/my-study-notes/%E9%87%8D%E5%AD%A6js/promise/promise%E9%94%99%E8%AF…}
// 报错：Uncaught (in promise) Error: xxx
```

#### 有Promise.then回调，且有reject回调

```js
// executor函数里面的代码有错误，但是有被then的reject捕获，不会抛出错误，会修改Promise的状态为rejected，然后通过reject回调返回错误原因
var p = new Promise((resolve, reject) => {
    throw new Error('xxx')
})
p.then(res => {
    console.log('成功');
    console.log(res);
}, err => {
    console.log('失败');
    console.log(err);
})
console.log(p);

// 打印顺序：
// Promise {<rejected>: Error: xxx at file:///E:/hss/my-study-notes/%E9%87%8D%E5%AD%A6js/promise/promise%E9%94%99%E8%AF…}
// 失败
// Error: xxx
```

#### 有Promise.catch回调

```js
// executor函数里面的代码有错误，但是有被Promise.catch捕获，会修改Promise的状态为rejected，然后通过reject回调返回错误原因
var p = new Promise((resolve, reject) => {
    throw new Error('xxx')
})
p.catch(err => {
    console.log('失败catch');
    console.log(err);
})
console.log(p);

// 打印顺序：
// Promise {<rejected>: Error: xxx at file:///E:/hss/my-study-notes/%E9%87%8D%E5%AD%A6js/promise/promise%E9%94%99%E8%AF…}
// 失败catch
// Error: xxx
```

#### 同时有then的reject和Promise.catch

如果异常被then里面的reject抛出了，再使用catch就不生效了，错误只会被捕获一次

```js
var p = new Promise((resolve, reject) => {
    throw new Error('xxx')
})
p.then(res => {
    console.log('成功');
    console.log(res);
}, rej => {
    console.log('失败');
    console.log(rej);
}).catch(err => {
    console.log('失败catch');
    console.log(err);
})
console.log(p);

// 打印顺序：
// Promise {<rejected>: Error: xxx at file:///E:/hss/my-study-notes/%E9%87%8D%E5%AD%A6js/promise/promise%E9%94%99%E8%AF…}
// 失败
// Error: xxx
```

### 实现_Promise的捕获错误

> 需要修改两处，此处虽然修改的内容不多，但是其中的逻辑非常nice，我看的实现Promise视频都没有怎么在意这个捕获错误，但是我自己想了许久，得出下面的代码，这样实现的_Promise就和原生的Promise拥有一致的捕获错误机制了

第一处，也是最主要的，在只执行executor函数外面包一层try/catch，具体看下面代码，重要的是理解其中的逻辑。

```js
// 因为new Promise(fn)时，会立即执行fn
// 所以实现_Promise时，也要立即执行传进来的executor函数
// 捕获异常，如果Promise有reject或catch，就将异常通过reject返回，
// 如果Promise没有捕获异常，就抛出错误
// 实现的_Promise也要和原生Promise一致
try {
    executor(resolve, reject)
} catch (e) {
    // 如果捕获到异常，把异常存在exception里（后面抛不抛出异常再通过其他条件判断）
    _this.exception = e
    // 只要有异常，都要将Promise的状态改为rejected（这样的reason就是报错信息了）
    reject(e)
    // 利用定时器，将抛出错误的操作延迟一个循环，等判断用户有没有执行then的reject再判断抛不抛出错误
    // 步骤：
    // 1，捕获到错误，存到exception；
    // 2，遇到定时器宏任务，把定时器的回调放进宏任务队列，等待函数执行栈全部执行完再执行
    // 3，然后就会继续往下执行，执行完executor里面的代码后，继续执行函数执行栈的其余代码，
    // 4，执行完所有函数执行栈的代码后，如果都没有遇到_Promise.then的reject，
    // 5，那么此时的exception就还是报错信息（因为只要遇到了reject，就会将exception清空）
    // 6，就会执行这个定时器任务回调，
    // 7，exception有值就抛出错误
    setTimeout(() => {
        if (_this.exception) {
            setTimeout(() => {
                throw new Error(e)
            }, 0);
        }
    }, 0);
}
```

第二处就是在reject回调函数里将exception值重设为空，因为原生Promise遇到异常，有reject回调（或者Promise.catch，这里暂不考虑Promise.catch的情况）才会将抛出异常转变为将异常信息通过reject回调返回

```js
// 失败执行的函数
function reject(season) {
    // 规范规定，只能从pending变成fulfilled或者从pending变成rejected
    // 比如：如果当前status从pending变成fulfilled，
    // 则不能再次对status进行修改成pending或者rejected。
    if (_this.status == 'pending') {
        _this.status = 'rejected'
        // 有then回调且then回调里有reject回调就不要抛出错误，将错误通过reject返回
        _this.season = season
        _this.exception = undefined
        // 发布
        _this.onRejectedCbs.forEach(fn => fn())
    }
}
```



## Promise.executor中的异步

> 在实现_Promise的时候，如果 _Promise里面的结果是在异步函数里面，则需要采用发布订阅的方式，让它在异步操作执行完成的时候再执行成功/失败的回调

对于在Promise里的发布订阅模式，这里先简单解释下（因为我还没深入去了解设计模式~~~），首先如果实现的_Promise.executor里面的代码是同步的，遇到resolve或reject，都就会一直执行对应的回调，将 _Promise的状态修改为fulfilled/rejected，然后继续往下执行then，再执行对应状态的回调；

但是，如果此时 _Promise.executor里的代码是异步的，比如resolve方法放在一个异步函数（比如，定时器）的回调里，而又因为js的事件机制，不会等到这个异步函数执行完成再去继续往下执行，他回将这个异步函数的回调放到任务队列里，等主线程执行栈执行完成了再去执行这个任务队列里面的回调，因此，如果resolve方法如果在异步函数里，js就会将他放入任务队列，然后继续往下执行

因此，当js执行完 _Promise.executor后，继续往下执行（遇到then()，这里注意，是遇到then()，加了小括号，是会立即执行这个then的，然后就会执行then函数，）这时候进入then，而当前的状态因为没有被修改（因为那个resolve回调函数被放到任务队列了，还在等着，并没有执行），还是pending，上面实现的then方法只对成功和失败的状态做了处理，没有对pending做处理，因此我们要在状态为pending的情况下操作一下，因为 _Promise.executor里面的回调迟早都是会执行的，**我们不能确定里面的回调什么时候执行，但是能确定的是，如果里面的回调执行了就会 _Promise修改状态**，**因此，我们可以在then的时候，将所有的成功/失败后回调分别放到数组里保存，等 _Promise.executor返回结果了（即执行了 _Promise.executor里面的成功/失败回调函数），就会修改 _Promise的状态值，此时，再加一个操作，遍历执行所有收集到的回调，其实执行的就是then的时候接收到的回调，但是只是因为异步问题， _Promise里面的状态没改变，给延迟了，拖到了现在状态改变了才执行**，

```js
function _Promise(executor) {

    var _this = this // 先保存this
    _this.status = 'pending' //规范要求的状态
    _this.value = undefined //规范要求成功返回的值
    _this.season = undefined //规范要求失败返回的原因
    _this.exception = undefined //规范要求异常抛出的值

    _this.onFulfilledCbs = [] //收集成功回调
    _this.onRejectedCbs = [] //收集失败回调

    // 成功执行的函数
    function resolve(value) {
        // 规范规定，只能从pending变成fulfilled或者从pending变成rejected
        // 比如：如果当前status从pending变成fulfilled，
        // 则不能再次对status进行修改成pending或者rejected。
        if (_this.status == 'pending') {
            _this.status = 'fulfilled'
            _this.value = value
            // 发布
            _this.onFulfilledCbs.forEach(fn => fn())
        }
    }
    // 失败执行的函数
    function reject(season) {
        // 规范规定，只能从pending变成fulfilled或者从pending变成rejected
        // 比如：如果当前status从pending变成fulfilled，
        // 则不能再次对status进行修改成pending或者rejected。
        if (_this.status == 'pending') {
            _this.status = 'rejected'
            // 有then回调且then回调里有reject回调就不要抛出错误，将错误通过reject返回
            _this.season = season
            _this.exception = undefined
            // 发布
            _this.onRejectedCbs.forEach(fn => fn())
        }
    }

    // 因为new Promise(fn)时，会立即执行fn
    // 所以实现_Promise时，也要立即执行传进来的executor函数
    // 捕获异常，如果Promise有reject或catch，就将异常通过reject返回，
    // 如果Promise没有捕获异常，就抛出错误
    // 实现的_Promise也要和原生Promise一致
    try {
        executor(resolve, reject)
    } catch (e) {
        // 如果捕获到异常，把异常存在exception里（后面抛不抛出异常再通过其他条件判断）
        _this.exception = e
        // 只要有异常，都要将Promise的状态改为rejected（这样的reason就是报错信息了）
        reject(e)
        // 利用定时器，将抛出错误的操作延迟一个循环，等判断用户有没有执行then的reject再判断抛不抛出错误
        // 步骤：
        // 1，捕获到错误，存到exception；
        // 2，遇到定时器宏任务，把定时器的回调放进宏任务队列，等待函数执行栈全部执行完再执行
        // 3，然后就会继续往下执行，执行完executor里面的代码后，继续执行函数执行栈的其余代码，
        // 4，执行完所有函数执行栈的代码后，如果都没有遇到_Promise.then的reject，
        // 5，那么此时的exception就还是报错信息（因为只要遇到了reject，就会将exception清空）
        // 6，就会执行这个定时器任务回调，
        // 7，exception有值就抛出错误
        setTimeout(() => {
            if (_this.exception) {
                setTimeout(() => {
                    throw new Error(e)
                }, 0);
            }
        }, 0);
    }

    /**
     * Promise执行完成有结果的时候，会调用的then方法，该方法接收两个参数，
     * 第一个是成功时候的回调函数，第二个是失败时候的回调函数，
     * 所以实现_Promise时，也要实现这个then方法
     */

    _Promise.prototype.then = function (onFulfilled, onRejected) {
        // console.log('then')
        if (_this.status == 'fulfilled') {
            setTimeout(() => {
                onFulfilled(_this.value)
            }, 0);

        }
        if (_this.status == 'rejected') {
            setTimeout(() => {
                onRejected(_this.season)
            }, 0);
        }
        if (_this.status == 'pending') {
            // 采用发布订阅方式，将等待的结果分别保存到成功和失败数组里
            // 订阅
            _this.onFulfilledCbs.push(function () {
                onFulfilled(_this.value)
            })
            // 订阅
            _this.onRejectedCbs.push(function () {
                onRejected(_this.season)
            })
        }
    }
}


```

## Promise的链式调用

待定