const a = `               total        used        free      shared  buff/cache   available
Mem:        3825904     1965676     1511812        2336      348416     1627892
Swap:             0           0           0`;
const arr = a.match(/\S+/g);

let mem = 'Mem:';
let swap = 'Swap:';
const res = [];
let obj = {};

res.push(arr.splice(0, 6));
res.push(arr.splice(0, 7));
res.push(arr.splice(0, arr.length));

res[0].forEach((key, index) => {
  console.log(res[1][index + 1], key);
  res[1][index + 1] && (obj[mem + key] = res[1][index + 1]);
  res[2][index + 1] && (obj[swap + key] = res[2][index + 1]);
});

console.log(obj);
