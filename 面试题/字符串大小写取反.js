// 大小写取反
// 思路1，遍历每一个字符，将它转化为大写，然后再和原本的比较，如果一样则代表原本的是大写
// 思路2，ASCII表中找到大写字母的取值范围进行判断(65-90)

// 思路1
let str = 'Hello,I am Vue';
str = str.replace(/[a-zA-z]/g, (content) => {
  return content.toUpperCase() === content
    ? content.toLowerCase()
    : content.toUpperCase();
});
console.log(str);

// 思路二
let str1 = 'Hello,I am Vue';
let min = 'A'.charCodeAt();
let max = 'Z'.charCodeAt();
str1 = str1.replace(/[a-zA-z]/g, (content) => {
  // console.log(content.charCodeAt());
  if (content.charCodeAt() >= min && content.charCodeAt() <= max) {
    return content.toLowerCase();
  } else {
    return content.toUpperCase();
  }
});
console.log(str1);
