interface ICat {
  name: string;
  age: number;
  hobby: string;
}

// ts内置的Pick，通过从Type中挑选一组属性Key（字符串文字或字符串的字符串文字或联合）来构造一种类型。
type TSPick = Pick<ICat, 'age' | 'name'>;
// type TSPick = {
//   age: number;
//   name: string;
// };

// 自己实现的Pick
type MyPick<T, K extends keyof T> = { [key in K]: T[key] };
type MyPick1 = MyPick<ICat, 'age' | 'hobby'>;
// type MyPick1 = {
//   age: number;
//   name: string;
// };

// 类似的应用场景
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let obj = { a: 1, b: 2, c: 3 };
// 类型“1”的参数不能赋给类型“"a" | "b" | "c"”的参数。ts(2345)
getProperty(obj, 1);
