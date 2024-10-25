//이전 챕터에서 만든 promiseAll 함수를 async/await으로 refactoring 해보세요.

const assert = require("assert");

const vals = [1, 2, 3];

const randTime = (val) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

async function promiseAll(arr) {
  const ret = []; //프로미스 결과배열
  let cnt = 0;

  if (arr.length === 0) {
    return Promise.resolve([]);
  }

  //ver1 - unhandled Rejection 에러발생, 즉시 Rejected된 프로미스를 캐치하지 못하기 때문.
  // for (let i = 0; i < arr.length; i++) {
  //   try {
  //     const p = await arr[i]; //프로미스결과 기다리기
  //     ret[i] = p; //결과배열에 프로미스결과 넣기
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // }
  // return ret;
  //ver2 - try,catch를 for문 밖에 써줌. 여전히 unhandled Rejection 에러발생
  // try {
  //   for (let i = 0; i < arr.length; i++) {
  //     ret[i] = await arr[i]; //프로미스결과 기다리기
  //   }
  //   return ret;
  // } catch (err) {
  //   throw err;
  // }
  //ver3-이것도 Unhandled Rejection Error
  // const promises = arr.map(async (item, index) => {
  //   try {
  //     ret[index] = await item;
  //   } catch (error) {
  //     throw error; // 에러 발생 시 즉시 던집니다
  //   }
  // });
  // 모든 프로미스가 완료될 때까지 기다립니다
  // for (const promise of promises) {
  //   await promise;
  // }
  // return ret;
  let completed = 0;
  return new Promise((resolve, reject) => {
    arr.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          ret[index] = value;
          completed++;
          if (completed === arr.length) {
            resolve(ret);
          }
        })
        .catch(reject);
    });
  });
}

// (async () => {
//   try {
//     const arr = await promiseAll([randTime(1), randTime(2), randTime(3)]);
//     console.table(arr);
//     //assert.deepStrictEqual(arr, vals);
//   } catch (err) {
//     console.error("reject>>", err);
//   }
// })(); //익명 async로 묶으면 최상위 await사용가능함

(async () => {
  try {
    const arr = await promiseAll([
      randTime(11),
      Promise.reject("RR"), //비동기 아님. 즉시 실행되어 동기적으로 오류를 발생.
      randTime(33),
    ]);
    console.table(arr);
    //assert.deepStrictEqual(arr, vals);
  } catch (err) {
    console.error("reject!!!!!!>>", err);
  }
})(); //익명 async로 묶으면 최상위 await사용가능함
