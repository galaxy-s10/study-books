# Promise

promise有三个状态：
 1、pending[待定]初始状态
 2、fulfilled[实现]操作成功
 3、rejected[被否决]操作失败
 当promise状态发生改变，就会触发then()里的响应函数处理后续步骤；
 promise状态一经改变，不会再变。

Promise对象的状态改变，只有两种可能：
 从pending变为fulfilled
 从pending变为rejected。
 这两种情况只要发生，状态就凝固了，不会再变了。

```js
new Promise(resolve => {
    resolve()
}).then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
})

new Promise(resolve => {
    resolve()
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(4);
})
//执行结果：1,3,2,4
```

```js
Promise.resolve()
    .then(function () {
        console.log('1')
    })
    .then(function () {
        console.log('2')
    })

Promise.resolve()
    .then(function () {
        console.log('3')
    })
    .then(function () {
        console.log('4')
    })
//执行结果：1,3,2,4
```

注意：.then()一定是返回一个promise对象！

# async/await

`async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数。

例子：下面代码中，函数`getTitle`内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行`then`方法里面的`console.log`。

```js
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
```

### async

`async` 定义的函数，当它被调用时，它返回的是一个Promise对象

```js
async function foo() {}
console.log(foo());	// Promise {<fulfilled>: undefined}
```

`async`定义的函数约等于普通函数返回Promise对象

```js
function foo() {
    return new Promise(resolve => {
        resolve()
    })
}
console.log(foo())  //Promise {<fulfilled>: undefined}
```

`async`函数内部没有return也没有`await`，返回Promise {<fulfilled>: undefined}

```js
async function bar() {
    console.log('bar');
}
console.log(bar()); //Promise {<fulfilled>: undefined}
```

`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。

```js
async function foo() {
    return 'hello world'

}
// console.log(foo())  //Promise {<fulfilled>: "hello world"}
foo().then(v => console.log(v), e => console.log(e))    //hello world
```

`await`函数内部没有return，但是只要有await（不管await有没有resolve或reject，有他们只会影响async后面代码的执行，并不会影响async的返回值），会使整个async函数返回Promise {<pending>}

```js
async function bar() {
    await new Promise((resolve, reject) => {
        console.log('bar');
        // resolve(1)
    })
}
console.log(bar());	//Promise {<pending>}
```

`async`函数内部抛出错误，会导致返回的 Promise 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。

```js
async function foo() {
    throw new Error('出错了')
}
console.log(foo())  //Promise {<rejected>: Error: 出错了}
foo().then(v => console.log(v), e => console.log(e))    //Error: 出错了
// foo().then(v => console.log(v)).catch(e => console.log(e))
```

在`async`函数return一个promise对象，它的状态是pending。

```js
async function foo() {
    return new Promise(resolve => {
        resolve(1)
    })
}
console.log(foo()); //Promise {<pending>}
foo().then(v => console.log(v)) //1
```

### await

await 表达式会暂停当前 `async function`的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 `async function`。若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。

另外，如果 await 操作符后的表达式的值不是一个 Promise，则返回该值本身。

正常情况下，`await`命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

```js
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))	//123
```

`await`命令后面的 Promise 对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数接收到。注意，下面面代码中，`await`语句前面没有`return`，但是`reject`方法的参数依然传入了`catch`方法的回调函数。这里如果在`await`前面加上`return`，效果是一样的。

```js
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
```

任何一个`await`语句后面的 Promise 对象变为`reject`状态，那么整个`async`函数都会中断执行。

```js
async function f() {
    var res = await Promise.resolve('hello world');
    console.log(res);   //hello world
    var res1 = await Promise.reject('出错了');
    console.log(res1);  // 不会执行
    var res2 = await Promise.resolve('es6'); // 不会执行
    console.log(res2);  // 不会执行
}
// console.log(foo()); //Promise {<pending>}
f().then(v => console.log(v)).catch(e => console.log(e))    //出错了
```

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个`await`放在`try...catch`结构里面，这样不管这个异步操作是否成功，第二个`await`都会执行。

```js
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world
```

第二点，多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

```javascript
let foo = await getFoo();
let bar = await getBar();
```

上面代码中，`getFoo`和`getBar`是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有`getFoo`完成以后，才会执行`getBar`，完全可以让它们同时触发。

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

上面两种写法，`getFoo`和`getBar`都是同时触发，这样就会缩短程序的执行时间。

## 面试题

### 面试题1

首先，这道题白给。

```js
async function foo() {
    console.log('foo');
    await bar()
    bar()
    console.log('foo_end');
}
async function bar() {
    console.log('bar');
}
foo()
console.log('end');
```

执行结果：foo，bar，end，bar，foo_end

### 面试题2

​		贺师俊老师：“一般来说，当遇到Chrome和Node.js在JavaScript运行方面有差异，应以最新的Chrome的行为为准。虽然Chrome和Node.js都使用V8为其JavaScript引擎，但两者的V8更新策略不同。Chrome每次升级会同时更新到V8的最新版。而Node更新小版本时V8也只更新小版本，只有Node更新大版本时才会更新V8大版本。所以绝大部分时候Node的V8会比同时期的Chrome的V8要落后。然后，比较老的V8（即目前Node使用的V8）对Promise和Async/Await的处理可能有少许不完全符合标准之处。

这道题，执行结果会根据浏览器版本不同而有差异

```js
// chorme版本84.0.4147.89
async function foo() {
    console.log('foo')
    await bar()
    console.log('foo_end')
}
async function bar() {
    console.log('bar')
}
foo();

new Promise(function (resolve) {
    console.log('p1')
    resolve();
}).then(function () {
    console.log('p2')
})
```

chorme版本66环境下的执行结果：foo，bar，p1，p2，foo_end
chorme版本84.0.4147.89环境下的执行结果：foo，bar，p1，foo_end，p2
个人理解：
两版本区别主要在于对await bar()的处理，从结果可看出，chrome66版本下，await bar()会先处理完结果再往下执行，因此把微任务队列清空，所以先打印p2，然后在往下执行，打印foo_end；而chrome84版本下，不会等await bar()处理完再往下执行，即继续执行下面的同步代码，等主线程清空了再执行微任务队列，因此会先打印foo_end，然后在执行微任务队列，打印p2。

两版本区别主要在于对await bar()的处理，从结果可看出，chrome66版本下，await bar()会先处理完结果再往下执行，因此把微任务队列清空，所以先打印p2，然后在往下执行，打印foo_end；而chrome84版本下，不会等await bar()处理完再往下执行，即继续执行下面的同步代码，等主线程清空了再执行微任务队列，因此会先打印foo_end，然后在执行微任务队列，打印p2。

执行步骤：

1. 首先是2个函数声明，虽然有async关键字，但不是调用，继续看下面代码。
2. 遇到foo()，执行foo函数，进入foo函数体，首先打印同步代码foo，然后遇到await bar()，首先中断async foo函数，然后执行bar()。
3. 执行async bar()，首先打印bar，同时返回promise对象（Promise {\<fulfilled\>: undefined}）。然后继续向下执行。
4. 遇到new Promise，首先直接打印同步代码p1，然后执行遇到.then()，发现这是个微任务，不执行，将他推到微任务队列。
5. 然后async后面的代码执行完毕，回到await表达式，执行await Promie.resolve(undefined)，它也是一个微任务，不执行，将他推到微任务队列
6. 继续向下执行，打印同步代码foo_end，然后主线程清空，查看任务队列，发现微任务队列有两个在等待执行，首先执行第一个new Promise的微任务打印p2，然后执行第二个await bar()的微任务，什么都没有干，然后执行完毕。