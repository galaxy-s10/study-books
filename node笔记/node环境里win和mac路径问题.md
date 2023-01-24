node环境里win和mac路径问题

# 测试1

win环境，当前文件路径：C:\ldmnq\cloudphone_xdyun_web_app\deploy\ssh.js

```js
let str = `C:\\ldmnq\\cloudphone_xdyun_web_app\\deploy`;
console.log(path.resolve(str, '../aaa')); //打印：C:\ldmnq\cloudphone_xdyun_web_app\aaa
console.log(path.join(str, '../aaa')); //打印：C:\ldmnq\cloudphone_xdyun_web_app\aaa

let str1 = `/Users/huangshuisheng/Desktop/ldmnq/`;
console.log(path.resolve(str1, '../aaa')); //打印：C:\Users\huangshuisheng\Desktop\aaa
console.log(path.join(str1, '../aaa')); //打印：\Users\huangshuisheng\Desktop\aaa

console.log(__dirname); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy

console.log(path.resolve(__dirname, '../aaa')); //打印：C:\ldmnq\cloudphone_xdyun_web_app\aaa
console.log(path.join(__dirname, '../aaa')); //打印：C:\ldmnq\cloudphone_xdyun_web_app\aaa
```

mac环境，当前文件路径：/Users/huangshuisheng/Desktop/ldmnq/cloudphone_xdyun_web_app/deploy/ssh.js

```js
let str = `C:\\ldmnq\\cloudphone_xdyun_web_app\\deploy`;
console.log(path.resolve(str, '../aaa')); //打印：/Users/huangshuisheng/Desktop/ldmnq/cloudphone_xdyun_web_app/aaa
console.log(path.join(str, '../aaa')); //打印：aaa

let str1 = `/Users/huangshuisheng/Desktop/ldmnq/`;
console.log(path.resolve(str1, '../aaa')); //打印：/Users/huangshuisheng/Desktop/aaa
console.log(path.join(str1, '../aaa')); //打印：/Users/huangshuisheng/Desktop/aaa

console.log(__dirname); //打印：/Users/huangshuisheng/Desktop/ldmnq/cloudphone_xdyun_web_app/deploy

console.log(path.resolve(__dirname, '../aaa')); //打印：/Users/huangshuisheng/Desktop/ldmnq/cloudphone_xdyun_web_app/aaa
console.log(path.join(__dirname, '../aaa')); //打印：/Users/huangshuisheng/Desktop/ldmnq/cloudphone_xdyun_web_app/aaa

```

小结：

1. 不管在win还是mac环境，使用`../`都能识别成返回上层目录；
2. 在win环境使用mac路径或者在mac使用win路径，都会造成path.resolve或者path.join错误。

解决：其实我们可以发现，path.resolve和path.join无非是把路径当做字符串进行处理，看上去我们可以在mac环境的时候，将路径里的\给替换成/，在win环境的时候，将路径里的/替换成\来解决问题，在win环境的时候，将`/Users/huangshuisheng/Desktop/ldmnq/`给替换成`\Users\huangshuisheng\Desktop\ldmnq\`；在mac环境的时候，将`C:\\ldmnq\\cloudphone_xdyun_web_app\\deploy`替换成`C:/ldmnq/cloudphone_xdyun_web_app/deploy`，实际上的话其实解决不了问题，因为win环境里没有`\Users\huangshuisheng\Desktop\ldmnq\`这个路径，mac环境里也没有`C:/ldmnq/cloudphone_xdyun_web_app/deploy`这个路径。

实际上因为mac和win引发的路径问题，大多数是这种情况：

# 测试2

mac环境：

```js
console.log(__dirname); //打印：/Users/huangshuisheng/Desktop/hss/galaxy-s10/study-books/node笔记

console.log(__filename); //打印：/Users/huangshuisheng/Desktop/hss/galaxy-s10/study-books/node笔记/win和mac路径.js

console.log(__dirname.split('/').pop()); //打印：node笔记

console.log(__filename.split('/').pop()); //打印：win和mac路径.js
```

win环境：

```js
console.log(__dirname); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy

console.log(__filename); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy\ssh.js

console.log(__dirname.split('/').pop()); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy

console.log(__filename.split('/').pop()); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy\ssh.js
```

可以看到，我们此时截取的东西不一样，我们希望切割然后获取目录/文件名，但是在不同环境的结果不一样，可以使用`path.sep`替换`/`

mac环境：

```js
const path = require('path');

console.log(__dirname); //打印：/Users/huangshuisheng/Desktop/hss/galaxy-s10/study-books/node笔记

console.log(__filename); //打印：/Users/huangshuisheng/Desktop/hss/galaxy-s10/study-books/node笔记/win和mac路径.js

console.log(__dirname.split(path.sep).pop()); //打印：node笔记

console.log(__filename.split(path.sep).pop()); //打印：win和mac路径.js
```

win环境：

```js
console.log(__dirname); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy

console.log(__filename); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy\ssh.js

console.log(__dirname.split('/').pop()); //打印：deploy

console.log(__filename.split('/').pop()); //打印：ssh.js
```

即可解决