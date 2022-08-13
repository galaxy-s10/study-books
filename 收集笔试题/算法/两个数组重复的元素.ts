const a1 = [10, 20, 30, 40, 50];
const a2 = [10, 30, 50, 70, 90];

function getArrEqual(arr1: number[], arr2: number[]) {
  let res: number[] = [];
  arr1.forEach((v) => {
    arr2.includes(v) && res.push(v);
  });
  return res;
}

console.log(getArrEqual(a1, a2));
