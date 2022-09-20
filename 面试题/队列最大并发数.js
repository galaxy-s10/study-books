function concurrentPoll() {
  this.tasks = []; // 任务队列
  this.max = 5; // 最大并发数
  setTimeout(() => {
    // 函数主体执行完后立即执行
    this.run();
  }, 0);
}
concurrentPoll.prototype.addTask = function (task) {
  // 原型添加任务方法
  this.tasks.push(task);
};

concurrentPoll.prototype.run = function () {
  console.log('run了');
  // 原型任务运行方法
  if (this.tasks.length == 0) {
    // 判断是否还有任务
    return;
  }
  var min = Math.min(this.tasks.length, this.max); // 取任务个数与最大并发数最小值
  for (var i = 0; i < min; i++) {
    // this.max--; // 执行最大并发递减
    var task = this.tasks.shift(); // 从数组头部取任务
    task()
      .then((res) => {
        // 重：此时可理解为，当for循环执行完毕后异步请求执行回调,此时max变为0
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // 重：当所有请求完成并返回结果后，执行finally回调，此回调将按照for循环依次执行，此时max为0.
        // this.max++; // 超过最大并发10以后的任务将按照任务顺序依次执行。此处可理解为递归操作。
        this.run();
      });
  }
};

var poll = new concurrentPoll(); // 实例

function delay() {
  console.log('开始请求数据...', new Date().toLocaleString());
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('请求数据成功！');
      resolve('ok');
    }, 3000);
  });
}

for (var i = 0; i < 20; i++) {
  // 数据模拟
  poll.addTask(delay);
}
