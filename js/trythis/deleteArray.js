// deleteArray를 순수함수로 작성하기

const assert = require("assert");

function deleteArray(arr, ...args) {
  let newarr = []; // 삭제된 새 배열을 리턴함

  if (args.length === 0) {
    console.log("No args");
  }

  if (args.length === 1) {
    return arr.slice(0, args[0]);
  }

  if (args.length === 2) {
    //key가 args[0]이고 value가 args[1]인 요소삭제
    if (typeof args[0] === "string") {
      let OBJ_KEY = args[0];
      let OBJ_VAL = args[1];

      return arr.filter((element) => {
        return element[OBJ_KEY] !== OBJ_VAL;
      });
    } else {
      return [...arr.slice(0, args[0]), ...arr.slice(args[1])];
    }
  }
  return newarr;
}

const arr = [1, 2, 3, 4];
assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

const Hong = { id: 1, name: "Hong" };
const Kim = { id: 2, name: "Kim" };
const Lee = { id: 3, name: "Lee" };
const users = [Hong, Kim, Lee];
assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, "id", 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, "name", "Lee"), [Hong, Kim]);
