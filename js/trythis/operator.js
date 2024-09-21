// #문제 1
for (let i = 0.1; i < 1; i = i + 0.1) {
  console.log(+i.toFixed(1));
}

// #문제 2
for (let i = 1; i < 11; i++) {
  if (Math.sqrt(i) % 1 !== 0) {
    console.log(Math.sqrt(i).toFixed(3));
  }
}

// #문제 3
const WEEK_NAMES = "일월화수목금토";
const today = new Date();
console.log(WEEK_NAMES[today.getDay()]); //요일번호0=일,1=월,.. 6=토

// #문제 4
function addPoints(a, b) {
  const a_len = (a.toString().split(".")[1] || "").length;
  const b_len = (b.toString().split(".")[1] || "").length;
  return +(a + b).toFixed(a_len > b_len ? a_len : b_len);
}
console.log(addPoints(0.21354, 0.1));
console.log(addPoints(0.14, 0.28));
console.log(addPoints(0.34, 0.226));
console.log(addPoints(10.34, 200.226));
console.log(addPoints(0.143, -10.28));
console.log(addPoints(0.143, -10));
