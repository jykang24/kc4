//1. 배열의 각 원소를 String으로 변환하시오.

const assert = require("assert");

const arr = [1, 2, 3, true];
const ret1 = arr.map((v) => v?.toString()); //v가 널일수도
//const ret_1 = arr.map(String);

assert.deepStrictEqual(ret1, ["1", "2", "3", "true"]);

//** 2. classNames함수
const classNames = (...args) => {
  return args.filter((v) => v != "").join(" ");
};

const ret2 = classNames("", "a b c", "d", "", "e");
assert.strictEqual(ret2, "a b c d e");
