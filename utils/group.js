export function groupname(arr) {
  function groupBy(array, f) {
    const groups = {};
    array.forEach(function (o) {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }

  function ngOnInit(arr) {
    const sorted = groupBy(arr, function (item) {
      // firstabc是要排序的字段
      return [item.firstabc];
    });
    return sorted
  }
  return ngOnInit(arr)
}