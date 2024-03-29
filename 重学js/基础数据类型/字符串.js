var str = 'abcdefg';
console.log(str.length); //字符串长度7
console.log(str.indexOf('a')); // 0,返回指定的字符串值在字符串中首次出现的位置,找不到返回-1
console.log(str.slice(0, 3)); //abc,提取字符串的片断,从下标为0至下标为3以前的数据
console.log(str.slice(3)); //defg,提取字符串的片断,从下标为3至最后的数据
console.log(str.slice(-3, 6)); //ef,提取字符串的片断,从最后第三个至下标为6以前的数据
console.log(str.slice(-3, -1)); //ef,从最后第三个至最后第一个以前的数据
console.log(str.slice(-3, -6)); //空
//小技巧,提取后三个字符串
console.log(str.slice(-3, str.length)); //efg,从最后第三个至下标为7以前的数据
//小技巧,提取前三个字符串
console.log(str.slice(-str.length, 3)); //abc,从最后第三个至下标为7以前的数据
console.log(str.replace('a', 'b')); //bbcdefg
console.log(str.toLocaleLowerCase()); //abcdefg
console.log(str.toUpperCase()); //ABCDEFG
console.log(str.split('')); //["a", "b", "c", "d", "e", "f", "g"]
console.log(str.trim()); //abcdefg
