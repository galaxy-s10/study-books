/**
 * warn: 在ts里面引入js文件的数据，会导致类型检测失效！
 */
export interface tab {
  id: number;
  name: string;
  /**
   * children: tab[] | []
   * 意思是必须有children，且children要么就是空数组(注意，这里的空数组不是指的值是空数组，而是指的是[]这个类型，
   * 而这个[]类型不接受任何参数，即约等于就是空数组)，
   * 要么就是tab[]
   */
  //   children: tab[] | []

  /**
   * 意思是必须有children，且children要么就是[]，第一个参数是一个对象{a:number}，要么就是tab[]
   * 如果希望要么是tab[]要么是[{a:number}]
   */
  children: { a: number }[];
  // children: tab[] | [{ a: number }]
}
