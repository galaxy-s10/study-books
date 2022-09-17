interface IMusic {
  id: number;
  music_url: string;
  music_name: string;
}

interface IWorks {
  id: number;
  works_url: string;
  works_name: string;
}

type FormItem<T> = {
  field: T extends string ? string : keyof T;
  label: string;
};

let worksFormItem: FormItem<IWorks> = {
  field: 'aaa', //不能将类型“"aaa"”分配给类型“keyof IWorks”。ts(2322)
  label: '作品编号',
};

let worksFormItem1: FormItem<IWorks> = {
  field: 'id', //ok
  label: '作品编号',
};

let musicFormItem: FormItem<string> = {
  field: 'aaa', //ok
  label: '作品编号',
};
