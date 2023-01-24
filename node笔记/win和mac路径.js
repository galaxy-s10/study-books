const path = require('path');

console.log(__dirname); //打印：/Users/huangshuisheng/Desktop/hss/galaxy-s10/study-books/node笔记

console.log(__filename); //打印：/Users/huangshuisheng/Desktop/hss/galaxy-s10/study-books/node笔记/win和mac路径.js

console.log(__dirname.split(path.sep).pop()); //打印：node笔记

console.log(__filename.split(path.sep).pop()); //打印：win和mac路径.js
