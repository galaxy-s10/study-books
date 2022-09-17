interface ICat {
  name: string;
  age: number;
  hobby: string;
}

// ts内置的Readonly
type TSReadonly = Readonly<ICat>;
// type TSReadonly = {
//   readonly name: string;
//   readonly age: number;
//   readonly hobby: string;
// }

type MyReadonly<T> = { readonly [key in keyof T]: T[key] };

type MyReadonly1 = MyReadonly<ICat>;
// type MyReadonly1 = {
//   readonly name: string;
//   readonly age: number;
//   readonly hobby: string;
// }
