const assert = require("assert");

//1. 1초후에 강아지이름 출력하기
function ex1() {
  const dog = {
    name: "Maxx",
    showMyName() {
      console.log(`My name is ${this.name}.`);
    },
    whatsYourName() {
      setTimeout(() => this.showMyName(), 1000);
    },
  };
  dog.whatsYourName();
}
ex1();

//2. 한번만 실행하는 once함수
//once함수 : af을 한번만 실행하도록 만들어주는 함수
function once(af) {
  let done = false;
  return function (...args) {
    done = true;
    if (done) {
      return;
    }
    return af(...args);
  };
}

function ex2() {
  const fn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
  console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
  console.log(fn(2, 7)); // undefined
  console.log(fn(3, 8)); // undefined
  assert.strictEqual(fn(1, 6), "금일 운행금지 차량은 끝번호 1, 6입니다!");
  assert.strictEqual(fn(2, 7), undefined);
}

function ex2_1() {
  const fn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
  console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
  console.log(fn(2, 7)); // undefined
  console.log(fn(3, 8)); // undefined
  assert.strictEqual(fn(1, 6), "금일 운행금지 차량은 끝번호 1, 6입니다!");
  assert.strictEqual(fn(2, 7), undefined);
  console.debug("Done!!!");
  //console.table({id:1,name:'Hong'}) //table형태로 찍기
}

// 3. template함수 작성하기
function ex3() {
  const before = () => console.log("before....");
  const after = () => console.log("after...");

  const someFn = (name, greeting) => console.log(`${greeting}, ${name}`);
  const someFn2 = (id, nickname, email, level) =>
    console.log(`${id}/${nickname}/${email}/${level}`);

  const template = function (fn) {
    return function template(...arg) {
      before();
      fn(...arg);
      after();
    };
  };
  const temp = template(someFn); // before → someFn → after 실행
  const temp2 = template(someFn2); // before → someFn2 → after 실행

  temp("sico", "hello");
  console.log("----------------------------------");
  temp2(1, "sico", "sico@gmail.com", 5);
}

//4. getNextWeek함수를 부수효과가 없도록 변경하시오. (클로저,즉시실행함수)
const WEEKS = "일월화수목금토";
const weeks = ["일", "월", "화", "수", "목", "금", "토"];
let widx = -1;
const getNextWeek = (() => {
  let i = -1;
  return function () {
    i += 1;
    if (i >= weeks.length) i = 0;
    return `${weeks[i]}요일`;
  };
})();

let cnt = 0;
const intl = setInterval(() => {
  console.log("call", cnt, getNextWeek());
  if ((cnt += 1) === 8) clearInterval(intl);
}, 1000);

//**수정필요 */
//5. getNextWeek 발전시킨 함수 작성하기 + pure.html
// const getNextWeek2 = (() => {
//   let i = -1;
//   return function () {
//     i += 1;
//     if (i >= weeks.length) i = 0;
//     document.querySelector(".korean").innerHTML = `${weeks[i]}요일`;
//   };
// })();
// const getNextWeek3 = (() => {
//   let i = -1;
//   return function () {
//     i += 1;
//     if (i >= weeks.length) i = 0;
//     document.querySelector(".math").innerHTML = `${weeks[i]}요일`;
//   };
// })();
// const button1 = document.getElementById("btn1");
// const button2 = document.getElementById("btn2");
// button1.addEventListener("click", getNextWeek2);
// button2.addEventListener("click", getNextWeek3);

// const d1 = new Date(dt1);

// getTime1.call(d1) - getTime2.call(d2);
// assert.strictEqual(func(), -86400000);
