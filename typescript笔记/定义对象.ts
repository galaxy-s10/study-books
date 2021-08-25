/**
 * 定义对象1：
 */
let data1: {} = {}; //正确
let data2: { a: number } = {}; //报错：类型 "{}" 中缺少属性 "a"，但类型 "{ a: number; }" 中需要该属性。ts(2741)
let data3: { a: number } = []; //报错：类型 "undefined[]" 中缺少属性 "a"，但类型 "{ a: number; }" 中需要该属性。ts(2741)
let data4: { a: number } = { a: "1" }; //报错：不能将类型“string”分配给类型“number”。ts(2322)
let data5: { a: number } = { a: 1, b: 2 }; //报错：不能将类型“{ a: number; b: number; }”分配给类型“{ a: number; }”。对象文字可以只指定已知属性，并且“b”不在类型“{ a: number; }”中。
let data6: { a: number } = { a: 1 }; //正确

/**
 * 定义对象2：
 */
interface Person {
  a: number;
}

let data7: Person = {}; //报错：类型 "{}" 中缺少属性 "a"，但类型 "Person" 中需要该属性。ts(2741)
let data8: Person = { a: 1 }; //正确
// 无法重新声明块范围变量“data9”。ts(2451)
// 定义数组.ts(12, 5): 此处也声明了 "data9"。
let data9: Person = { b: 1 }; //报错：不能将类型“{ b: number; }”分配给类型“Person”。
