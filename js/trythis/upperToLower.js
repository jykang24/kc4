const assert = require("assert");

// 1. 문자열 str에서 대문자만 골라 소문자로 변환하세요. (trythis: 대문자 <-> 소문자)

function replacer(match) {
  //콜백함수 따로 만들어주는 방법, match:매칭된 각 문자
  return `*${match.toLowerCase()}*-`;
}
const upperToLower = (str) => {
  //대문자를 소문자로
  return str.replace(/[A-Z]/g, replacer); // (a) => a.toLowerCase()
};

const lowerToUpper = (str) => {
  //소문자를 대문자로
  return str.replace(/[a-z]/g, (a) => a.toUpperCase());
};

//console.log(upperToLower("Senior Coding Learning JS")); // ⇒ '*s*-enior *c*-oding *l*-earning *j*-*s*-'
//console.log(lowerToUpper("senior coding learning js"));

//test code
assert.deepStrictEqual(
  upperToLower("Senior Coding Learning JS"),
  "*s*-enior *c*-oding *l*-earning *j*-*s*-"
);
