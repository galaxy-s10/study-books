let RoleData = {
  name: 'admin',
  desc: 'xxx',
};

// type TRoleData = {
//   name: string;
//   desc: string;
// }
type TRoleData = typeof RoleData;

// type TRoleDataList<T> = {
//   name: string;
//   desc: string;
// } & keyof T
type TRoleDataList<T> = typeof RoleData & { [key in keyof T]: T[key] };
// 约等于：type TRoleDataList<T> = typeof RoleData & T;

let roleList: TRoleDataList<{ page: number; order: string }> = {
  name: 'user',
  desc: 'xxx',
  page: 1,
  order: 'id',
};

// 如果要用TRoleDataList，用TRoleDataList需要一个类型参数，而我又不传这个类型参数，就会报错，那其实可以直接用RoleData不就好了。

// 泛型类型“TRoleDataList”需要 1 个类型参数。ts(2314)
// let roleList1: TRoleDataList = {};
