# 类型[ ] 

```ts
let arr: number[] = [1, 2, 3, 4] // 数字数组 不允许出现其他数据类型
 
let arr2: string[] = ['h', 'h', 'h'] // 字符串数组
 
let arr3: any[] = [1, 'h', 'h', 3] //允许数组中出现任意类型
```

## 用接口表示数组，一般用于描述类数组

```ts
 interface arr {
 
    [index: number]: number
 
  }
 
  let list: arr = [1, 2, 3, 4]
```

用接口描述数组没太大必要，但类数组不能用普通的数组的方式来描述，需要使用接口来表示类数组的形状

常用的类数组都有自己的接口定义，比如IArguments,NodeList,HTMLCollection

## Array<elementType> 用数组泛型表示数组

```ts
let arr: Array<string> = ['bonjour', 'hello']
let arr2: Array<number> = [1, 2]
let arr3: Array<any> = [1, 2, 'hh']
```

