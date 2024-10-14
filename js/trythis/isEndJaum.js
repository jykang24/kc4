//1. 문자열이 한글자음으로 끝나는지 체크하는 함수

const assert = require("assert");

const isEndJaum = (str) => {
  //자음으로 끝나면 true, 모음으로 끝나면 false
  let last_char = str[str.length - 1]; //마지막 글자 추출
  //console.log("마지막글자는 >>", last_char.charCodeAt(0)); //마지막글자 유니코드값

  //1. 한국어로 끝날경우 - 모음으로끝나는경우는 2가지뿐 (모음만 있거나, 받침이 없거나)
  if (/[ㄱ-ㅎ]/.test(last_char)) return true; //자음만 있으면 true

  if (/[ㅏ-ㅣ]/.test(last_char)) return false; //모음만 있으면 false

  if (/[가-힣]/.test(last_char)) {
    let last_char_code = last_char.charCodeAt(0);
    //[가~히] 사이 받침없는 경우 false (모음으로끝나니까) //44032=가, 55176=히
    if ((last_char_code - 44032) % 28 === 0 && last_char_code <= 55176)
      return false;
    else return true; //그외 자음으로 끝나니까 true
  }

  //2. 영어로 끝날경우 - 영어(lmnr)로 끝나면 true
  if (/[A-Z]/i.test(last_char)) return /[L|M|N|R]/i.test(last_char);

  //3. 숫자로 끝날경우 - 숫자(2459)로 끝나면 false
  if (/[0-9]/.test(last_char)) return !/[2|4|5|9]/i.test(last_char);
};

//console.log("결과는>>", isEndJaum("점수 L")); //true?? false여야함

//2. 조사 '이/가, 을/를, 은/는'를 알아서 붙이는 함수를 작성하시오.

const eulul = (str) => (isEndJaum(str) ? "을" : "를"); //받침있으면 을, 받침없으면 를
const iga = (str) => (isEndJaum(str) ? "이" : "가"); //받침있으면 이, 받침없으면 가
const eunun = (str) => (isEndJaum(str) ? "은" : "는"); //받침있으면 은, 받침없으면 는

//console.log(`고성군${iga("고성군")}`);

//test code
assert.equal(isEndJaum("아지오"), false);
assert.equal(isEndJaum("북한강"), true);
assert.equal(isEndJaum("뷁"), true);
assert.equal(isEndJaum("강원도"), false);
assert.equal(isEndJaum("바라당"), true);
assert.equal(isEndJaum("ㅜㅜ"), false);
assert.equal(isEndJaum("케잌"), true);
assert.equal(isEndJaum("점수 A"), false);
assert.equal(isEndJaum("알파벳L"), true);
assert.equal(isEndJaum("24"), false);
assert.equal(isEndJaum("23"), true);
console.debug("Success");
