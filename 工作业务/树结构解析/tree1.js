var tree = [
  {
    p_id: 0,
    id: 1,
    name: "北京市",
  },
  {
    p_id: 200,
    id: 204,
    name: "南开区",
  },
  {
    p_id: 200,
    id: 206,
    name: "红桥区",
  },
  {
    p_id: 2,
    id: 200,
    name: "市辖区",
  },
  {
    p_id: 0,
    id: 2,
    name: "天津市",
  },
  {
    p_id: 6,
    id: 645,
    name: "抚顺市",
  },
  {
    p_id: 0,
    id: 6,
    name: "辽宁省",
  },
  {
    p_id: 3477,
    id: 3479,
    name: "中西区",
  },
  {
    p_id: 0,
    id: 33,
    name: "港澳",
  },
  {
    p_id: 33,
    id: 3477,
    name: "香港特别行政区",
  },
  {
    p_id: 33,
    id: 3478,
    name: "澳门特别行政区",
  },
  {
    p_id: 3478,
    id: 3502,
    name: "路凼城",
  },
  {
    p_id: 1675,
    id: 1716,
    name: "涧西区",
  },
  {
    p_id: 1675,
    id: 1714,
    name: "西工区",
  },
  {
    p_id: 0,
    id: 16,
    name: "河南省",
  },
  {
    p_id: 16,
    id: 1675,
    name: "洛阳市",
  },
  {
    p_id: 16,
    id: 1677,
    name: "开封市",
  },
  {
    p_id: 1677,
    id: 1800,
    name: "开封1",
  },
  {
    p_id: 1677,
    id: 1801,
    name: "开封2",
  },
];

function toTree(arr, pid) {
  // 循环，获取该id的children

  function loop(pid) {
    // 保存得到的数据
    var res = [];
    // 遍历原数组
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (item.p_id === pid) {
        // 如果遍历到当前item的p_id等于目标pid，在将该item插入到res前，
        // 先遍历该item的id，找到原数组arr里面该item的所有children后，再将该item连同找到的children一起插入到res
        item.children = loop(item.id);
        // 如果当前item的p_id等于目标pid，则将这个item插入res
        res.push(item);
      }
    }
    return res;
  }

  return loop(pid);
}

function formatTree1(arr) {
  // 因为数组里面的是对象（引用），因此为了不改变原数组最好先深拷贝一下
  var _arr = JSON.parse(JSON.stringify(arr));

  // 遍历所有数据
  var newarr = _arr.filter((p) => {
    // 获取当前父数据的所有children
    var temp = _arr.filter((c) => p.id == c.p_id);
    // var temp = arr.filter(c => p.id == c.p_id)   //错误写法，这样的话并不会将
    // 如果获取到了有children，则将该children给父
    temp.length && (p.children = temp);
    // 最后返回这个p
    return p.p_id == 0;
  });
  return newarr;
}
// console.log(toTree(tree, 0));
console.log(formatTree1(tree));
