const assert = require("assert");
const { start } = require("repl");

// isPrime : n이 소수면 true, 아니면 false를 리턴하는 함수
const isPrime = (n) => {
  if (n <= 1) return false;
  const sqrtN = Math.floor(Math.sqrt(n));
  const arr = Array.from({ length: sqrtN - 1 }, (_, i) => i + 2); //2~루트n까지배열생성
  return arr.every((i) => n % i !== 0); //나눠지지않아야 소수, 하나라도 나눠지면 소수아님
};

//1. hasPrime : 특정 배열의 원소 중 소수가 존재하는지 체크하는 함수
const hasPrime = (arr) => arr.some(isPrime);
assert.strictEqual(hasPrime([1, 2, 3]), true);

//2. primeNumbers : 소수만 추출하는 함수
const primeNumbers = (arr) => {
  return arr.filter(isPrime);
};

const arr100 = Array.from({ length: 100 }, (_, i) => i);
assert.deepStrictEqual(
  primeNumbers(arr100),
  [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ]
);
console.debug("success!");
