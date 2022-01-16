/**
 * 使用indexOf找出指定元素出现的所有位置
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#%E6%89%BE%E5%87%BA%E6%8C%87%E5%AE%9A%E5%85%83%E7%B4%A0%E5%87%BA%E7%8E%B0%E7%9A%84%E6%89%80%E6%9C%89%E4%BD%8D%E7%BD%AE
 */
const findElePos = (ele: number, arr: number[]) => {
  let res = [];
  let index = arr.indexOf(ele);
  while (index !== -1) {
    res.push(index);
    index = arr.indexOf(ele, index + 1);
  }
  return res;
};
console.log(findElePos(1, [2, 1, 3, 4]));
