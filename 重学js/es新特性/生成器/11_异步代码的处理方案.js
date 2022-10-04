// 模拟请求
function request(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
    }, 500);
  });
}

// 第一种方案: 多次回调
// request('aaa').then((res) => {
//   request(res + 'bbb').then((res1) => {
//     request(res1 + 'ccc').then((res2) => {
//       console.log(res2); //aaabbbccc
//     });
//   });
// });

// 第二种方案: Promise中then的返回值来解决
// request('aaa')
//   .then((res) => {
//     return request(res + 'bbb');
//   })
//   .then((res1) => {
//     return request(res1 + 'ccc');
//   })
//   .then((res2) => {
//     console.log(res2);
//   });

// 第三种方案: Promise + generator实现
// function* getData() {
//   const res = yield request('aaa');
//   const res1 = yield request(res + 'bbb');
//   const res2 = yield request(res1 + 'ccc');
//   return res2;
// }
// const gen = getData();
// gen.next().value.then((res) => {
//   gen.next(res).value.then((res) => {
//     gen.next(res).value.then((res) => {
//       console.log(res); //aaabbbccc
//     });
//   });
// });

// 第三张方案优化
// function* getData() {
//   const res = yield request('aaa');
//   const res1 = yield request(res + 'bbb');
//   const res2 = yield request(res1 + 'ccc');
//   console.log(res2);
//   return res2;
// }
// const gen = getData();
// function exec(val) {
//   const res = gen.next(val);
//   if (!res.done) {
//     res.value.then((res) => {
//       exec(res);
//     });
//   }
// }
// exec();

// co
// function* getData() {
//   const res = yield request('aaa');
//   const res1 = yield request(res + 'bbb');
//   const res2 = yield request(res1 + 'ccc');
//   console.log(res2);
//   return res2;
// }

// function co(generatorFn) {
//   const gen = generatorFn();
//   function exec(val) {
//     const res = gen.next(val);
//     if (!res.done) {
//       res.value.then((res) => {
//         exec(res);
//       });
//     }
//   }
//   exec();
// }

// co(getData);

// async/await
async function getData() {
  const res = await request('aaa');
  const res1 = await request(res + 'bbb');
  const res2 = await request(res1 + 'ccc');
  console.log(res2);
  return res2;
}

getData();
