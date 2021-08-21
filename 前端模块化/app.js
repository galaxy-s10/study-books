// es6模块化 app.js
import react1, * as all from './mode/myReact.js';
console.log(react1);
console.log(all);
console.log(react1 === all.default);    //true