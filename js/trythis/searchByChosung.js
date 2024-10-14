// 초성 검색을 하는 search함수를 정규식을 이용하여 작성하시오.

const assert = require("assert");

const chosung = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
// //초성19개

// const map = new Map();
// for (const i in chosung) {
//   let key = 44032 + i * 588 + 0 * 28; //ㅏ부터
//   let val = Array.from({ length: 20 }, (_, i) => (i + 1) * 28 + key);
//   map.set(key, val);
// }
// console.log("map>>", map);

const genReg = (str) => {
  //입력받은문자열에 대해 정규식을 만들어주는 함수
  let reg = "";
  for (const s of str) {
    //입력문자열을 돌면서
    //한글인 경우,
    if (/[ㄱ-ㅎ가-힣]/.test(s)) {
      let startcode = 44032 + chosung.indexOf(s) * 588; //초성+'ㅏ'코드값 (cf. "가")
      let endcode = startcode + 560 + 27; //초성+'ㅣ'+'ㅎ'코드값 (cf. "깋")
      let startchar = String.fromCharCode(startcode);
      let endchar = String.fromCharCode(endcode);
      reg = reg + `[${s}${startchar}-${endchar}]`; // [ㄱ가-깋]형태로 만들어주기
    } //한글이외 경우,
    else reg += `[${s}]`;
  }
  //console.log("genReg>>", `/${reg}/`); //테스트
  return new RegExp(`${reg}`); //   return `/${reg}/`;
};

//console.log(genReg("ㄱ1ㅅ").test("김1수")); //테스트

//참고) 한글유니코드계산 = "가".charCodeAt(0) + (chosungIdx*588)+(jungIdx*28) + jongIdx

const searchByKoreanInitialSound = (input, chosung) => {
  let reg = genReg(chosung);
  let matched = []; //매칭된 결과만 담을 배열
  for (const elem of input) {
    let m = elem.match(reg);
    if (m) {
      //일치하는게 있다면 결과ret에 push
      matched.push(elem);
    }
  }
  return matched;
};
s = ["강원도 고성군", "고성군 토성면", "토성면 북면", "북면", "김1수"];
// console.log(searchByKoreanInitialSound(s, "ㄱㅅㄱ"));
// console.log(searchByKoreanInitialSound(s, "ㅌㅅㅁ"));
// console.log(searchByKoreanInitialSound(s, "ㅂㅁ"));
// console.log(searchByKoreanInitialSound(s, "ㅍㅁ"));
// console.log(searchByKoreanInitialSound(s, "ㄱ1ㅅ"));

//test code
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱㅇ"), [
  "강원도 고성군",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱㅅㄱ"), [
  "강원도 고성군",
  "고성군 토성면",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅌㅅㅁ"), [
  "고성군 토성면",
  "토성면 북면",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅂㅁ"), [
  "토성면 북면",
  "북면",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅍㅁ"), []);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱ1ㅅ"), ["김1수"]);
console.debug("Success");
