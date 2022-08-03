var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];

// WARN: 三种都不能去除{}
// 最简洁写法
function distinct1(arr) {
  return [...new Set(arr)];
}
console.log('distinct1', distinct1(arr));

// 写法二
function distinct2(arr) {
  var temp = [];
  for (let i = 0; i < arr.length; i++) {
    if (temp.includes(arr[i]) == false) {
      temp.push(arr[i]);
    }
  }
  return temp;
}
console.log('distinct2', distinct2(arr));
// 写法三
function distinct3(arr) {
  var temp = [];
  arr.forEach((item, index) => {
    if (temp.includes(item) == false) {
      temp.push(item);
    }
  });
  return temp;
}
console.log('distinct3', distinct3(arr));
