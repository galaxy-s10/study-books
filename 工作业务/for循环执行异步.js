let mockAjax = (num) =>
  new Promise((res) => {
    setTimeout(() => {
      res(num);
    }, 1000);
  });

async function main() {
  for (let i = 0; i < 3; i += 1) {
    let res = await mockAjax(i);
    console.log(res);
  }
}

main();
