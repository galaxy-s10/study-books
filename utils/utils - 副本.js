/**
 * 参数：过期时间戳
 * 计算距离过期时间还剩多少天
 */

var computedExpirationTime = function (ExpirationTime) {
  const time = ExpirationTime - +new Date();
  const res = Math.floor(time / (24 * 60 * 60) / 1000);
  return res;
};

/**
 * 两数组合并，去重（es6）,不会修改原数组。
 * [1,2,3]和[3,4,5] ===> [1,2,3,4,5]
 */
var unique = function (arr1, arr2) {
  return Array.from(new Set(arr1.concat(arr2)));
};

/**
 * 对数组某个字段进行进行分组，不会修改原数组
 * 思路：将要排序的字段的值作为键名，将符合键名的对象作为值
 * 原数组：[{"name":"apple x","type":"apple"},{"name":"apple 11","type":"apple"},{"name":"oneplus 7","type":"oneplus"}]
 * 新数组：[[{"name":"apple x","type":"apple"},{"name":"apple 11","type":"apple"}],[{"name":"oneplus 7","type":"oneplus"}]]
 */
function groupByName(arr, groupName) {
  // groups报错所有键值对
  var groups = {};
  arr.forEach(function (item) {
    // group是要排序的键
    var group = item[groupName];
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });
  return groups;
  // return Object.keys(groups).map(function (group) {
  //   return groups[group];
  // });
}

/**
 * 将"2020-10-01 12:24:03"或new Date()或时间戳转换为：2020/10/01 12:24:03
 * 不能传"2020-10-01",会转成"2020-10-01 08:00:00"
 */
function formatTime(v) {
  var date = new Date(v);
  function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
}

/**
 * 将new Date()或时间戳转换为："2020-10-01 12:24:03"
 * 不能传"2020-10-01",会转成"2020-10-01 08:00:00"
 */
function formatTime1(v, format) {
  var date = new Date(v);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
}

/**
 * 将new Date()或时间戳转换为精确到分的时间戳
 */
function formatTime2(v, format) {
  var date = new Date(v);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  var res = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + "00";
  return new Date(res).getTime();
  // return new Date(res).valueOf()
  // return Date.parse(res)
}
