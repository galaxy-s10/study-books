/**
 * 需求：有一个数组[1,2,3]，要求随机获取，
 * 但不是每次都重新在[1,2,3]里面随机获取，而是第一次抽到了
 * 1，第二次就重2，3里面随机获取。
 * 抽象：即从[100,200,400]里面随机获取一个，还是获取0-2随机数a，然后arr[a]即可
 */
const arr = [{ a: 100 }, { b: 200 }, { c: 300 }, { d: 400 }];

//随机获取[n-m]之间的随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomOne(originArr, preIndex) {
  let map = new Map();
  let mapIndexArr = [];
  for (let i = 0; i < originArr.length; i++) {
    if (i !== preIndex) {
      map.set(i, originArr[i]);
      mapIndexArr.push(i);
    }
  }
  let randomIndex = getRandomInt(0, map.size - 1);
  return {
    index: mapIndexArr[randomIndex],
    obj: map.get(mapIndexArr[randomIndex]),
  }; //index:下标；obj:下标对应的值
}

for (let i = 0; i < 10; i++) {
  console.log(randomOne(arr, 1));
}
