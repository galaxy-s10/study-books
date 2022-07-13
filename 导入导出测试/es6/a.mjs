export const obj = { age: 10 };
export const num = 1;

export const sum = () => {
  console.log("a.mjs的obj", obj);
  const res = num + 1;
  // console.log(res);
  return res;
};

setTimeout(() => {
  console.log("定时器obj", obj);
}, 1000);
