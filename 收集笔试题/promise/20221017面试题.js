async function asnyc1() {
  console.log('async1 start'); //
  await async2();
  console.log('async1 end'); //
}
async function async2() {
  console.log('async2'); //
}
console.log('script start'); //

setTimeout(() => {
  console.log('settimeout0');
}, 0);

setTimeout(() => {
  console.log('settimeout3');
}, 3);

asnyc1();

new Promise((resolve) => {
  console.log('promise1'); //
  resolve();
  console.log('promise2'); //
}).then(function () {
  console.log('promise3');
});

console.log('script end'); //

// 正确答案
// script start
// async1 start
// async2
// promise1
// promise2
// script end
// async1 end
// promise3
// settimeout0
// settimeout3

// 我的答案
// script start
// async1 start
// promise1
// promise2
// script end
// async2---
// async1 end
// promise3
// settimeout0
// settimeout3
