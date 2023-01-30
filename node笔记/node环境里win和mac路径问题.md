node 环境里 win 和 mac 路径问题

# 测试 1

win 环境，当前文件路径：C:\ldmnq\cloudphone_xdyun_web_app\deploy\ssh.js

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

mac 环境，当前文件路径：/Users/huangshuisheng/Desktop/ldmnq/cloudphone_xdyun_web_app/deploy/ssh.js

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

1. 不管在 win 还是 mac 环境，使用`../`都能识别成返回上层目录；
2. 在 win 环境使用 mac 路径或者在 mac 使用 win 路径，都会造成 path.resolve 或者 path.join 错误。

解决：其实我们可以发现，path.resolve 和 path.join 无非是把路径当做字符串进行处理，看上去我们可以在 mac 环境的时候，将路径里的\给替换成/，在 win 环境的时候，将路径里的/替换成\来解决问题，在 win 环境的时候，将`/Users/huangshuisheng/Desktop/ldmnq/`给替换成`\Users\huangshuisheng\Desktop\ldmnq\`；在 mac 环境的时候，将`C:\\ldmnq\\cloudphone_xdyun_web_app\\deploy`替换成`C:/ldmnq/cloudphone_xdyun_web_app/deploy`，实际上的话其实解决不了问题，因为 win 环境里没有`\Users\huangshuisheng\Desktop\ldmnq\`这个路径，mac 环境里也没有`C:/ldmnq/cloudphone_xdyun_web_app/deploy`这个路径。

实际上因为 mac 和 win 引发的路径问题，大多数是这种情况：

# 测试 2

mac 环境：

```js
console.log(__dirname); //打印：/Users/huangshuisheng/Desktop/hss/galaxy-s10/study-books/node笔记

console.log(__filename); //打印：/Users/huangshuisheng/Desktop/hss/galaxy-s10/study-books/node笔记/win和mac路径.js

console.log(__dirname.split('/').pop()); //打印：node笔记

console.log(__filename.split('/').pop()); //打印：win和mac路径.js
```

win 环境：

```js
console.log(__dirname); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy

console.log(__filename); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy\ssh.js

console.log(__dirname.split('/').pop()); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy

console.log(__filename.split('/').pop()); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy\ssh.js
```

可以看到，我们此时截取的东西不一样，我们希望切割然后获取目录/文件名，但是在不同环境的结果不一样，可以使用`path.sep`替换`/`

mac 环境：

```js
const path = require('path');

console.log(__dirname); //打印：/Users/huangshuisheng/Desktop/hss/galaxy-s10/study-books/node笔记

console.log(__filename); //打印：/Users/huangshuisheng/Desktop/hss/galaxy-s10/study-books/node笔记/win和mac路径.js

console.log(__dirname.split(path.sep).pop()); //打印：node笔记

console.log(__filename.split(path.sep).pop()); //打印：win和mac路径.js
```

win 环境：

```js
console.log(__dirname); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy

console.log(__filename); //打印：C:\ldmnq\cloudphone_xdyun_web_app\deploy\ssh.js

console.log(__dirname.split('/').pop()); //打印：deploy

console.log(__filename.split('/').pop()); //打印：ssh.js
```

即可解决

# 测试 3

mac 环境，当前文件路径：/Users/huangshuisheng/Desktop/hss/galaxy-s10/study-books/test.js

```js
const path = require('path');

console.log(path.resolve('/aaa/bbb', './b.js')); //打印：/aaa/bbb/b.js
console.log(path.resolve('/aaa/bbb/', './b.js')); //打印：/aaa/bbb/b.js
console.log(path.resolve('/aaa/bbb', '../b.js')); //打印：/aaa/b.js
console.log(path.resolve('/aaa/bbb/', '../b.js')); //打印：/aaa/b.js
console.log(path.resolve('/aaa/bbb/ccc', '../b.js')); //打印：/aaa/bbb/b.js
console.log(path.resolve('/aaa/bbb/ccc/', '../b.js')); //打印：/aaa/bbb/b.js
console.log(path.resolve('/aaa/bbb/ccc/a.js', '../b.js')); //打印：/aaa/bbb/ccc/b.js
```

win 环境，当前文件路径：C:\testapp\test.js

```js
const path = require('path');

console.log(path.resolve('/aaa/bbb', './b.js')); //打印：C:\aaa\bbb\b.js
console.log(path.resolve('/aaa/bbb/', './b.js')); //打印：C:\aaa\bbb\b.js
console.log(path.resolve('/aaa/bbb', '../b.js')); //打印：C:\aaa\b.js
console.log(path.resolve('/aaa/bbb/', '../b.js')); //打印：C:\aaa\b.js
console.log(path.resolve('/aaa/bbb/ccc', '../b.js')); //打印：C:\aaa\bbb\b.js
console.log(path.resolve('/aaa/bbb/ccc/', '../b.js')); //打印：C:\aaa\bbb\b.js
console.log(path.resolve('/aaa/bbb/ccc/a.js', '../b.js')); //打印：C:\aaa\bbb\ccc\b.js
```

可以看到，在 mac 环境使用 path.resolve，参数的路径实际是不存在的，但仍旧可以可以正确的处理，

但在 win 环境使用 path.resolve，但是当参数是带`/` 的时候，就会得到和 mac 环境不一样的结果，

如果你希望带 `/`的路径在 win 能得到和 mac 的结果，则win和mac都使用path.posix：

```js
console.log(path.posix.resolve('/aaa/bbb', './b.js')); //打印：/aaa/bbb/b.js
console.log(path.posix.resolve('/aaa/bbb/', './b.js')); //打印：/aaa/bbb/b.js
console.log(path.posix.resolve('/aaa/bbb', '../b.js')); //打印：/aaa/b.js
console.log(path.posix.resolve('/aaa/bbb/', '../b.js')); //打印：/aaa/b.js
console.log(path.posix.resolve('/aaa/bbb/ccc', '../b.js')); //打印：/aaa/bbb/b.js
console.log(path.posix.resolve('/aaa/bbb/ccc/', '../b.js')); //打印：/aaa/bbb/b.js
console.log(path.posix.resolve('/aaa/bbb/ccc/a.js', '../b.js')); //打印：/aaa/bbb/ccc/b.js
```

这样在win和mac的结果就都是一样的了
