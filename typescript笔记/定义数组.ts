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
let data9: [{ a: number }] = [{ a: 1 }]; //正确
let data10: [{ a: number }, { b: number }] = [{ a: 1 }, { b: 2 }]; //正确
/**
 * 定义数组2：
 */
// let data11: number[] = ["1"]; //报错：不能将类型“string”分配给类型“number”。
// let data12: number[] = [1]; //正确
// let data13: string[] = [1]; //报错：不能将类型“number”分配给类型“string”。
// let data14: string[] = ["1"]; //正确
// let data15: any[] = [1, "1", true, [], {}]; //正确

/**
 * 定义数组3：
 */
// let data16: Array<number> = ["1"]; //报错：不能将类型“string”分配给类型“number”
// let data17: Array<number> = [1]; //正确
// let data18: Array<string> = [1]; //报错：不能将类型“number”分配给类型“string”。
// let data19: Array<string> = ["1"]; //正确
// let data20: Array<any> = [1, "1", true, [], {}]; //正确

/**
 * 定义数组4：
 * 定义数组里面的每一项都是类似{b:number}这样的数据，要么就数组是空数组，
 * 要是数组不是空数组，则每一项都要类似{b:number}这样
 */
let data21: { b: number }[] = []; //正确
let data22: { b: number }[] = [1]; //报错：不能将类型“number”分配给类型“{ b: number; }”。
let data23: { b: number }[] = [1, 2]; //报错：不能将类型“number”分配给类型“{ b: number; }”。
let data24: { b: number }[] = [{ b: 2, a: 1 }]; //报错：不能将类型“{ b: number; a: number; }”分配给类型“{ b: number; }”。对象文字可以只指定已知属性，并且“a”不在类型“{ b: number; }”中。
let data25: { b: number }[] = [{ a: 1 }]; //报错：不能将类型“{ a: number; }”分配给类型“{ b: number; }”。对象文字可以只指定已知属性，并且“a”不在类型“{ b: number; }”中
let data26: { b: number }[] = [{ b: 1 }, 1]; //报错：不能将类型“number”分配给类型“{ b: number; }”。
let data27: { b: number }[] = [{ b: 1 }, { a: 1 }]; //报错：不能将类型“{ a: number; }”分配给类型“{ b: number; }”。对象文字可以只指定已知属性，并且“a”不在类型“{ b: number; }”中。
let data28: { b: number }[] = [{ a: 1 }, { b: 1 }]; //报错：不能将类型“{ a: number; }”分配给类型“{ b: number; }”。对象文字可以只指定已知属性，并且“a”不在类型“{ b: number; }”中。
let data29: { b: number }[] = [{ b: 1 }, { b: 2 }]; //正确
