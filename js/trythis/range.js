//정수 배열을 생성하는 range 함수를 구현하시오.

const assert = require("assert");

function range(s, e, step) {
  const arr = [];

  if (arguments.length === 3) {
    if ((s - e) * step > 0) {
      //예외처리, 올바른 범위가 아닌경우
      return arr;
    }
  }

  if (arguments.length === 1) {
    //인자가 1개만 들어온경우 (s만 들어옴)
    if (s === 0) {
      return [0];
    }
    if (s > 0) {
      step = 1;
      e = s;
      s = 1;
    } else {
      step = 1;
      e = -1;
    }
  }

  if (arguments.length === 2) {
    //인자가 2개만 들어온 경우 (step이 안들어옴)
    if (s === e) {
      return [s];
    }
    step = s > e ? -1 : 1;
  }

  if (step === 0) {
    return [s];
  }

  for (let i = s; step > 0 ? i <= e : i >= e; i += step) {
    arr.push(i);
  }

  return arr;
}

// console.log(range(1, 10, 1));
// console.log(range(1, 10, 2));
// console.log(range(1, 10));
// console.log(range(10, 1));
// console.log(range(10, 1, -2));
// console.log(range(5));
// console.log(range(100));
// console.log(range(-5));
// console.log(range(5, 5));
// console.log(range(5, 5, 0));
// console.log(range(5, 5, -1));
// console.log(range(5, 1, 1));
// console.log(range(0));
// console.log(range(2, 1, -5));
assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

assert.deepStrictEqual(range(5, 5, 0), [5]);
assert.deepStrictEqual(range(1, 5, 0), [1]);
assert.deepStrictEqual(range(5, 5, -1), [5]);
assert.deepStrictEqual(range(5, 5), [5]);
assert.deepStrictEqual(range(0, 0, 5), [0]);
assert.deepStrictEqual(range(1, 5, -1), []);

assert.deepStrictEqual(range(1, 5, 6), [1]);
assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);

assert.deepStrictEqual(range(5, 1, 1), []);
assert.deepStrictEqual(range(0, -1), [0, -1]);
assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);

assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(0), [0]);
assert.deepStrictEqual(range(0, 0), [0]);
assert.deepStrictEqual(range(2, 1, -5), [2]);
assert.deepStrictEqual(range(0, -1, -5), [0]);
assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
assert.deepStrictEqual(
  range(50),
  Array.from({ length: 50 }, (_, i) => i + 1)
);
assert.deepStrictEqual(
  range(1, 150, 3),
  Array.from({ length: 50 }, (_, i) => i * 3 + 1)
);
