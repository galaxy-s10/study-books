/**
 * 时间戳转换成日期
 * 将new Date()或时间戳转换为："2020-10-01 12:24:03"
 * 不能传"2020-10-01",会转成"2020-10-01 08:00:00"
 */
export const formatTime = (v) => {
  const date = new Date(v);
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
};

/**
 * 使用json进行深拷贝
 */
export const deepCloneByJson = (obj: object) => JSON.parse(JSON.stringify(obj));
