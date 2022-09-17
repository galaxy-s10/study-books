type IList<T> = {
  nowPage: number;
  pageSize: number;
} & T;

interface ITag {
  id: number;
  name: string;
}

// 枚举应用场景？
enum Direction {
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4,
}

let tag: ITag = { id: 1, name: 'vue' };
let tagList: IList<ITag> = { id: 1, name: 'vue', nowPage: 1, pageSize: 1 };
