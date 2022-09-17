// 接口数据：
let ArticleListData = [
  { id: 1, title: 'vue' },
  { id: 2, title: 'react', click: 100 },
];

// type TArticleData = ({
//   id: number;
//   title: string;
//   click?: undefined;
// } | {
//   id: number;
//   title: string;
//   click: number;
// })[]
type TArticleData = typeof ArticleListData;

// type TArticleDataItem = {
//   id: number;
//   title: string;
//   click?: undefined;
// } | {
//   id: number;
//   title: string;
//   click: number;
// }
type TArticleDataItem = typeof ArticleListData[number];

// type TArticle = {
//   id: number;
//   title: string;
//   click?: number | undefined;
// }
type TArticle = {
  [key in keyof TArticleDataItem]: TArticleDataItem[key];
};
