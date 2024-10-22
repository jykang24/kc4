const randTime = (val) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, val * 1000, val);
  });

const promiseAllSettled = (arr) => {
  return new Promise((resolve, reject) => {
    const res = []; //프로미스결과 저장할 배열
    //let cnt = 0; //완료된 프로미스개수 카운트

    if (arr.length === 0) {
      return resolve([]); //빈 배열 입력시 resolve,프라미스,함수 종료
    }

    arr.forEach((p, i) => {
      Promise.resolve(p)
        .then((resolved) => {
          res[i] = { status: "fulfilled", value: resolved };
        })
        .catch((rejected) => {
          res[i] = { status: "rejected", reason: rejected };
        })
        .finally(() => {
          if (res.length === arr.length) resolve(res); //모든 프로미스 완료되면 resolve한번만 호출
        });
    });
  });
};

promiseAllSettled([randTime(11), Promise.reject("RRR"), randTime(33)])
  .then((array) => {
    console.table(array);
    // console.log(JSON.stringify(array, null, '  '));
    console.log("여긴 과연 호출될까?!"); //호출됨!
    //assert.deepStrictEqual(array, allSettledResults);
  })
  .catch((error) => {
    console.log("reject!!!!!!>>", error); //then실행시 이 catch는 무시
  });

const allSettledResults = [
  {
    status: "fulfilled",
    value: 11,
  },
  {
    status: "rejected",
    reason: "RRR",
  },
  {
    status: "fulfilled",
    value: 33,
  },
];
