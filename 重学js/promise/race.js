const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('111');
    // resolve(111);
    reject(111);
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('222');
    resolve(222);
    // reject(222);
  }, 100);
});

// promise三种状态:pending/fulfilled/rejected
// race: 竞技/竞赛
// 只要有一个Promise变成fulfilled状态, 那么就结束，如果在这之前rejected了，也结束
Promise.race([promise1, promise2])
  .then((value) => {
    console.log('ok', value);
  })
  .catch((err) => {
    console.log('err', err);
  });
