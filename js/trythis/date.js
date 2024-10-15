//const moment = require("moment");
// moment.locale("ko");
// const m = moment();
// console.log("m:", m.format("llll"));

//const d1 = new Date(0);
//const d2 = new Date(0); //현재시간 받아오기
//console.log(d2.valueOf());
// let date = new Date("2017-01-26");
// console.log(date.getTime());
//console.log("d2.getTime>>", d2.getTime());
// console.log(
//   "parse>>",
//   Date.parse("Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)")
// );

//1. 1970년 1월 1일과 1970년 1월 2일의 차이를 초로 나타내시오.
// const Jan01_1970 = new Date(0).getTime(); //1970-01-01의 ms
const Jan02_1970 = new Date("1970-01-02").getTime(); //1970-01-01~1970-01-02까지 ms
//console.log("seconds from 1970-01-01>>", Jan02_1970 / 1000); //ms를 s로 변환해 출력

//2. 이 달의 날짜 5개를 무작위로 만들어 역순으로 정렬하시오.
//TODO : 중복제거, 해당월 마지막날 구해서 31까지도 나올수있게 수정
const gen_date = () => {
  //무작위 날짜 생성 함수
  let newDate = new Date().setDate(Math.floor(Math.random() * 30 + 1)); //1~30 날짜 생성후 setDate설정
  return new Date(newDate);
};

const d1 = gen_date();
const d2 = gen_date();
const d3 = gen_date();
const d4 = gen_date();
const d5 = gen_date();
console.log("이달의 날짜 랜덤>>", d1);
console.log("이달의 날짜 랜덤>>", d2);
console.log("이달의 날짜 랜덤>>", d3);
console.log("이달의 날짜 랜덤>>", d4);
console.log("이달의 날짜 랜덤>>", d5);
const dates = [d1, d2, d3, d4, d5];
dates.sort((a, b) => b.getDate() - a.getDate()); //역순정렬
dates.forEach((date) => console.log(`날짜 역순>>${date}`)); //출력

// //3. 내년(2025년)의 오늘(6월 29일)의 요일을 출력하시오.
// const WEEK_DAY = "일월화수목금토";
// const nextYearday = new Date();
// nextYearday.setFullYear(2025); //const nextYear = nextYearDate.getFullYear()+1 //nextYearDate.setFullYear(nextYear)
// console.log(
//   "내년의 오늘날짜의 요일은>>",
//   WEEK_DAY[nextYearday.getDay() + 1],
//   "요일 입니다."
// );

// //4. 오늘(10월 7일)로 부터 100일 후의 날짜는?
// const today_date = new Date(); //오늘날짜
// today_date.setDate(today_date.getDate() + 100); //오늘날짜+100일
// console.log("오늘부터 100일 후 날짜>>", today_date);

// const today_after_100 = new Date(
//   today_date.setDate(today_date.getDate() + 100)
// );
// console.log("오늘부터 100일 후 날짜>>", today_after_100);

// const date = new Date(2024, 10, 5);
// console.log(date.getMonth());
