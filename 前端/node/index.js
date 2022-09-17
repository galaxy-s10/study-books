const fs = require('fs');

// WARN: 当前node版本：v14.19.1
//判断路径是否存在
const pathExists = (path) => fs.existsSync(path);
//判断是否是文件夹（如果path不存在会直接报错）
const isDir = (path) => fs.statSync(path).isDirectory();
//判断是否是文件（如果path不存在会直接报错）
const isFile = (path) => fs.statSync(path).isFile();
// 写入文件（如果path不存在不会报错，会直接新建一个）
const writeFile = (path, data) => fs.writeFileSync(path, data);
// 读取文件（如果path不存在会直接报错）
const readFile = (path) => fs.readFileSync(path);
// 对文件或文件夹进行重命名/移动（如果oldPath不存在会直接报错）
const rename = (oldPath, newPath) => fs.renameSync(oldPath, newPath);
// 删除文件（如果path不存在会直接报错）
const rmFile = (path) => fs.rmSync(path);
// 删除空文件夹（只能删除空文件夹，如果path不存在会直接报错）
const rmNullDir = (path) => fs.rmdirSync(path);
// 删除文件夹（包括文件夹里的内容，如果path不存在不会报错！！！）
const rmDir = (path) => fs.rmSync(path, { recursive: true, force: true });
// 读取目录，返回该目录的第一层文件或文件夹名字（如果path不存在会直接报错）
const readDir = (path) => fs.readdirSync(path);

console.log(
  readDir('/Users/huangshuisheng/Desktop/hss/github/study-books/前端/node/sd')
);
