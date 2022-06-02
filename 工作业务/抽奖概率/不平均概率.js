/**
 * 需求：根据rate来获取随机数，即不是等分概率，
 * rate越大，获取概率越高，0代表不可能获取。
 */
const arr = [
  { rate: 0, name: "MacBook Pro" },
  { rate: 5, name: "1 ￥" },
  { rate: 1, name: "100 ￥" },
  { rate: 1, name: "200 ￥" },
  { rate: 2, name: "10 ￥" },
];

//随机获取[n-m]之间的随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomOne(originArr) {
  let map = [];
  let mapIndexArr = [];
  for (let i = 0; i < originArr.length; i++) {
    originArr[i]._index = i;
    let rate = originArr[i].rate;

    while (rate--) {
      map.push(originArr[i]);
      mapIndexArr.push(originArr[i]._index);
    }
  }
  let randomIndex = getRandomInt(0, mapIndexArr.length - 1);
  return {
    index: map[randomIndex]._index,
    obj: map[randomIndex],
  }; //index:下标；obj:下标对应的值
}

for (let i = 0; i < 10; i++) {
  console.log(randomOne(arr));
}
