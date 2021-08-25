/**
 * 定义数组1：
 */
// let data1: [] = [{ a: 1 }]; //报错：不能将类型“[{ a: number; }]”分配给类型“[]”。源具有 1 个元素，但目标仅允许 0 个。
// let data2: [{ a: number }] = []; //报错：不能将类型“[]”分配给类型“[{ a: number; }]”。源具有 0 个元素，但目标需要 1 个。
// let data3: [{ a: number }] = [{ a: true }]; //报错：不能将类型“boolean”分配给类型“number”
// let data4: [{ a: number }] = [{ b: 1 }]; //报错：不能将类型“{ b: number; }”分配给类型“{ a: number; }”。对象文字可以只指定已知属性，并且“b”不在类型“{ a: number; }”中。
// let data5: [{ a: number }] = [{ a: 1, b: 1 }]; //报错：不能将类型“{ a: number; b: number; }”分配给类型“{ a: number; }”。对象文字可以只指定已知属性，并且“b”不在类型“{ a: number; }”中。
// let data6: [{ a: number }] = [{ a: 1 }, 2]; //报错：不能将类型“[{ a: number; }, number]”分配给类型“[{ a: number; }]”。源具有 2 个元素，但目标仅允许 1 个。
// let data7: [{ a: number }, { b: number }] = [{ a: 1 }]; //报错：不能将类型“[{ a: number; }]”分配给类型“[{ a: number; }, { b: number; }]”。源具有 1 个元素，但目标需要 2 个。
// let data8: [{ a: number }, { b: number }] = [{ a: 1 }, 2, { b: 2 }]; //报错：不能将类型“number”分配给类型“{ b: number; }”。
let data9: [{ a: number }, { b: number }] = [{ a: 1 }, { b: 2 }]; //正确
/**
 * 定义数组2：
 */
// let data7: number[] = ["a"]; //报错：不能将类型“string”分配给类型“number”。
let data19: number[] = ["a"];
