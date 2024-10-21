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

  //ver1
  for (i = 0; i < arr.length; i++) {
    try {
      const p = await Promise.resolve(arr[i]); //프로미스결과 기다리기
      ret[i] = p; //결과배열에 프로미스결과 넣기
      cnt++;
    } catch {
      return Promise.reject(p);
    }
  }

  if (cnt === arr.length) return Promise.resolve(ret); //마지막에 한번만 resolve
}

(async () => {
  try {
    const arr = await promiseAll([randTime(1), randTime(2), randTime(3)]);
    console.table(arr);
    //assert.deepStrictEqual(arr, vals);
  } catch (err) {
    console.error("reject>>", err);
  }
})(); //익명 async로 묶으면 최상위 await사용가능함

(async () => {
  try {
    const arr = await promiseAll([
      randTime(11),
      Promise.reject("RRR"), //비동기 아님. 태스크큐 바로 들어감. 즉시 실행되어 동기적으로 오류를 발생.
      randTime(33),
    ]);
    console.table(arr);
    //assert.deepStrictEqual(arr, vals);
  } catch (err) {
    console.error("reject!!!!!!>>", err);
  }
})(); //익명 async로 묶으면 최상위 await사용가능함
