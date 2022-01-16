// \s	匹配任何空白字符，包括空格，制表符，换页符等等。等价于[\f\n\r\t\v]
// \S	匹配任何非空白字符。等价于[^\f\n\r\t\v]
let reg1 = /\/\/\S/g; //匹配//后面不是空格的字符串，可以用在代码格式校验上，注释后面需要加一个空格
console.log(reg1.test('//1')); //true
console.log(reg1.test('// 1')); //false

let reg2 = /\/\/\s{2,}/g; //匹配//后面有两个或两个以上的空格，也是用在代码格式校验上。
console.log(reg2.test('//  1')); //true
console.log(reg2.test('// 1')); //false

let reg3 = /, url[^)]+\)/g; //匹配$bg-main-tab: var(--bg-main-tab, url(xxx));中的:, url(xxx)
let reg4 = /, [^\)]+/g; // 匹配$theme-color2: var(--theme-color2, #2c5430);中的:, #2c5430
let reg5 = /, rgba[^\)]+\)/g; //匹配$theme-color6: var(--theme-color6, rgba(255, 168, 32, 1));中的：, rgba(255, 168, 32, 1)
