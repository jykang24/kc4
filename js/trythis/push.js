//1. Push, Pop, Shift, Unshift를 순수함수로 작성하시오.

const assert = require("assert");

const arr = [1, 2, 3, 4];

function push(array, ...args) {
  return [...array, ...args];
}

function pop(array, arg = 1) {
  //arg개수만큼 pop한걸 리턴
  let ret = [];
  if (arg !== undefined) {
    ret = array.slice(array.length - arg, array.length);
  } else {
    ret = array[array.length - 1];
  }
  return ret;
}

function unshift(array, ...args) {
  //맨앞에 인자추가
  return [...args, ...array];
}

function shift(array, arg = 1) {
  // [shift된 원소들, 남은원소들] 리턴
  if (arg !== undefined) {
    return [array.slice(0, arg), array.slice(arg)];
  } else {
    return [[array[0]], array.slice(1)];
  }
}

assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);
assert.deepStrictEqual(pop(arr), 4);
assert.deepStrictEqual(pop(arr, 2), [3, 4]); // 2개 팝!
assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
assert.deepStrictEqual(shift(arr), [[1], [2, 3, 4]]);
assert.deepStrictEqual(shift(arr, 2), [
  [1, 2],
  [3, 4],
]); // 2개 shift
// assert.deepStrictEqual(shift(arr), [2, 3, 4]);
// assert.deepStrictEqual(shift(arr, 2), [3, 4]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
console.debug("Success!");
