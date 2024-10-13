const assert = require("assert");

// 2. 전화번호를 정확한 형식으로 출력하는 함수를 작성하시오.

const telfmt = (tel) => {
  const reg244 = /^(\d{1}[2]{1})(\d{3,4})(\d{4})$/; //2-(3,4)-4패턴
  const reg334 = /^(\d{3})(\d{3})(\d{4})$/; //3-3-4패턴
  const reg344 = /^(\d{3,4})(\d{4})(\d{4})$/; //(3,4)-4-4패턴
  const reg44 = /^(\d{4})(\d{4})$/; // 4-4패턴

  if (reg244.test(tel)) {
    return tel.replace(reg244, "$1-$2-$3");
  }
  if (reg334.test(tel)) {
    return tel.replace(reg334, "$1-$2-$3");
  }
  if (reg344.test(tel)) {
    return tel.replace(reg344, "$1-$2-$3");
  }
  if (reg44.test(tel)) {
    return tel.replace(reg44, "$1-$2");
  }
};

//telfmt("0101234567"); // '010-123-4567'
// telfmt("01012345678"); // '010-1234-5678'
// telfmt("0212345678"); // '02-1234-5678'
// telfmt("021234567"); // '02-123-4567'
// telfmt("0331234567"); // '033-123-4567'
//telfmt("15771577"); // '1577-1577'
// telfmt("07012341234"); // '070-1234-1234'

//test code
assert.deepStrictEqual(telfmt("0101234567"), "010-123-4567");
assert.deepStrictEqual(telfmt("01012345678"), "010-1234-5678");
assert.deepStrictEqual(telfmt("0212345678"), "02-1234-5678");
assert.deepStrictEqual(telfmt("021234567"), "02-123-4567");
assert.deepStrictEqual(telfmt("0331234567"), "033-123-4567");
assert.deepStrictEqual(telfmt("15771577"), "1577-1577");
assert.deepStrictEqual(telfmt("07012341234"), "070-1234-1234");
assert.deepStrictEqual(telfmt("050712345678"), "0507-1234-5678");
console.debug("Success");
