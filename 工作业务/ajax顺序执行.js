let num = 1;
let mockAjax = (num) =>
  new Promise((res) => {
    setTimeout(() => {
      res(num);
    }, 1000);
  });

async function main() {
  while (num <= 3) {
    let res = await mockAjax(num);
    console.log(res);
    num += 1;
  }
}

main();
