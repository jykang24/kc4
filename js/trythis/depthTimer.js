// 다음 코드를 Promise를 이용하여 refactoring 하시오.

const depthTimer = (val) =>
  new Promise((resolve, reject) => {
    setTimeout(
      (x) => {
        console.log(`depth${val} ${new Date().toISOString()}`);
        if (x >= 4) {
          reject(new Error("Already 3-depth!!"));
        }
        resolve(x);
      },
      1000 * val,
      val + 1
    );
  });
console.log("Start!", new Date().toISOString());
depthTimer(1).then(depthTimer).then(depthTimer).catch(console.error);

//리팩토링 전
// setTimeout(function () {
//   console.log("depth1", new Date());
//   setTimeout(function () {
//     console.log("depth2", new Date());
//     setTimeout(function () {
//       console.log("depth3", new Date());
//       throw new Error("Already 3-depth!!");
//     }, 3000);
//   }, 2000);
// }, 1000);
