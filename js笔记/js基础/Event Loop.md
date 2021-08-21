# Js的Event Loop

## js单线程

​		总所周知，JavaScript是单线程的，也就是说同一时间只能做一件事，那为什么JavaScript不能是多线程的呢，这跟它的用途有关，作为浏览器脚本语言，JavaScript主要用途是操作DOM，如果JavaScript同时有两个线程，同时对同一个DOM进行操作，这是浏览器该执行哪个？因此为了避免这种问题，js必须是一门单线程的语言！

## 任务队列

​		所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

异步任务又分为两种：宏任务和微任务

> 常见的宏任务：setTimeout，setInterval，Ajax(网络请求)，i/o(操作文件)
>
> 常见的微任务：Promise

## 执行栈

- `执行栈`中的代码永远最先执行

#### 微任务(microtask)

- 当`执行栈`中的代码执行完毕，会在执行`宏任务队列`之前先看看`微任务队列`中有没有任务，如果有会先将`微任务队列`中的任务清空才会去执行`宏任务队列`

#### 宏任务(task)

- 等待`执行栈`和`微任务队列`都执行完毕才会执行，并且在执行完每一个`宏任务`之后，会去看看`微任务队列`有没有新添加的任务，如果有，会先将`微任务`队列中的任务清空，才会继续执行下一个`宏任务`

为了更好地理解Event Loop，请看下图（转引自Philip Roberts的演讲[《Help, I'm stuck in an event-loop》](http://vimeo.com/96425312)）



# 案例

## 案例1

```js
console.log(111);
setTimeout(function () {
    console.log(222)
    for (var i = 0; i < 2; i++) {
        console.log(888)
    }
    setTimeout(function () {
        console.log(333)
    }, 0)
}, 0)

for (var i = 0; i < 2; i++) {
    console.log(999)
}
setTimeout(() => {
    console.log(444);
}, 1000);
console.log(555)
```

> 一张图表示执行过程：

![](C:\Users\0\AppData\Roaming\Typora\typora-user-images\image-20200721174806304.png)

执行步骤：

1. 首先打印同步代码111
2. 遇到定时器，宏任务1，放进宏任务队列并延时0秒后执行定时器里面的代码
3. 遇到同步代码，for循环打印2次999
4. 遇到定时器，宏任务2，放进宏任务队列并延时1000毫秒后执行定时器里面的代码
5. 打印同步代码555
6. 主线程完成，查看任务队列，发现有两个宏任务，宏任务1最先执行，首先打印222，然后遇到for循环打印2次888
7. 然后在宏任务1里又遇到定时器，宏任务3，放进宏任务并延时0秒后开始执行定时器里面的代码，然后宏任务1完成，值得注意的是，当前宏任务2在后来的宏任务3前面，但是宏任务2延时1000毫秒后执行（从进入任务队列一刻算起，到过了1000毫秒才会执行，比如是18:30:01秒进入的，就会等到18:30:02秒才会执行），宏任务1执行完全部代码后，不需要1000毫秒，所以，宏任务2会等1000毫秒后才开始执行，而宏任务3虽然是后面进来的，但是它是延时0秒后执行，所以，宏任务3会先执行
8. 执行宏任务3，打印333，执行完成后看宏任务，还剩一个宏任务2
9. 任执行宏任务2，由于之前的操作很快，还没到1000毫秒就已经执行完了，这时宏任务还是会会继续等到了1000毫秒（即18:30:02秒），才打印444。
10. 执行完成，打印结果：111,999,999,555,222,888,888,333,444

## 案例2

```js
console.log('script start');

setTimeout(function() {
  console.log('timeout1');
}, 10);

new Promise(resolve => {
    console.log('promise1');
    resolve();
    setTimeout(() => console.log('timeout2'), 10);
}).then(function() {
    console.log('then1')
})

console.log('script end');
```

执行结果：

script start
promise1
script end
then1
timeout1
timeout2

## 案例3

```js
new Promise(resolve => {
    resolve(1);
    Promise.resolve().then(() => console.log(2));
    console.log(4)
}).then(t => console.log(t));
console.log(3);
```

分析：

```js
new Promise(resolve => {
    resolve(1);
    
    Promise.resolve().then(() => {
    	// t2
    	console.log(2)
    });
    console.log(4)
}).then(t => {
	// t1
	console.log(t)
});
console.log(3);
```

执行流程：

1. script 任务先运行。首先遇到 `Promise` 实例，构造函数首先执行，所以首先输出了 4。此时 microtask 的任务有 `t2` 和 `t1`
2. script 任务继续运行，输出 3。至此，第一个宏任务执行完成。
3. 执行所有的微任务，先后取出 `t2` 和 `t1`，分别输出 2 和 1
4. 代码执行完毕，输出是：4321

为什么会t2先执行，理由如下：

> https://es6.ruanyifeng.com/#docs/promise#Promise-resolve

​		`Promise.resolve()`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。需要注意的是，立即`resolve()`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

