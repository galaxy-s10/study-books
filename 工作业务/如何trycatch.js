let ajax1 = async () => {
  //   try {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej(1);
    }, 500);
  });
  //   } catch (error) {
  //     console.log(error);
  //   }
};

async function main() {
  try {
    let res = await ajax1();
    console.log(res);
  } catch (error) {
    console.log(error, 222);
  }
}

main();
