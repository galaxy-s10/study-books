export function formatdate(date) {
  // 把正常时间，转化为UTC
  let odate = new Date(date)
  let y = odate.getFullYear();
  let m = odate.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = odate.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = odate.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = odate.getMinutes();
  let second = odate.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  let mydate = y + '-' + m + '-' + d + 'T' + h + ':' + minute + ':' + second

  let utc = 0 - new Date().getTimezoneOffset() / 60 //8
  if (utc < 10) {
    utc = '0' + utc + ':00'
  }
  console.log(mydate + '+' + utc)
  return mydate + '+' + utc
}
export function formatdate1(date) {
  // 时间戳转正常时间
  let odate = new Date(date)
  let y = odate.getFullYear();
  let m = odate.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = odate.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = odate.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = odate.getMinutes();
  let second = odate.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  let mydate = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  return mydate
}

export function formatdate2(inputTime) {
  // 把服务器传回来的带T,Z的转为正常时间
  if (!inputTime && typeof inputTime !== 'number') {
    return '';
  }
  let localTime = '';
  inputTime = new Date(inputTime).getTime();
  const offset = (new Date()).getTimezoneOffset();
  localTime = (new Date(inputTime - offset * 60000)).toISOString();
  localTime = localTime.substr(0, localTime.lastIndexOf('.'));
  localTime = localTime.replace('T', ' ');
  return localTime;
}

export function formatdate3(date) {
  // 时间戳转精确到分的正常时间，2020-04-09 10:38:00
  let odate = new Date(date)
  let y = odate.getFullYear();
  let m = odate.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = odate.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = odate.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = odate.getMinutes();
  let second = odate.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  let mydate = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + '00'
  return mydate
}

// 将时间戳转化为精确到分的时间戳
export function formatdate4(date1) {
  // 先将时间戳转精确到分的正常时间，2020-04-09 10:38:00
  let odate = new Date(date1)
  let y = odate.getFullYear();
  let m = odate.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = odate.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = odate.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = odate.getMinutes();
  let second = odate.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  let mydate = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + '00'

  let date = new Date(mydate);
  // 有三种方式获取
  let time1 = date.getTime();
  return time1
}

//先将时间转化为精确到分(2020-04-09 10:38:00),然后再随便用一个转成时间戳即可
export function formatdate5() {
  let date = new Date('2014-04-23 18:55:49:12');
  // 有三种方式获取
  let time1 = date.getTime();
  let time2 = date.valueOf();
  let time3 = Date.parse(date);
  console.log(time1); //1398250549123
  console.log(time2); //1398250549123
  console.log(time3); //1398250549000
}