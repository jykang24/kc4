// 두 개의 수를 입력 받아 더하기를 수행하는 제너레이터를 작성하시오.

const assert = require("assert");

function* add() {
  const a = yield "첫 번째 수?";
  const b = yield "두 번째 수?";
  return a + b; //맨마지막에 undefined출력되지 않게 리턴
}

const itAdd = add(); //itAdd : 제너레이터객체 반환받음
console.log(itAdd.next().value); // "첫 번째 수?"

const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const r1 = readline.createInterface({ input });

r1.on("line", (answer) => {
  const num = Number(answer); //입력은 스트링으로 들어옴, 숫자로 바꿔주기
  if (isNaN(num)) {
    console.error("숫자를 입력하시오");
    return;
  }

  const { value, done } = itAdd.next(num);
  if (done) {
    console.log("Total:", value);
    r1.close();
  } else {
    console.log(value);
  }
}).on("close", () => {
  process.exit();
});

//테스트 코드
// assert.deepStrictEqual(itAdd.next().value, "첫 번째 수?");
// assert.deepStrictEqual(itAdd.next(1).value, "두 번째 수?");
// assert.deepStrictEqual(itAdd.next(2).value, "Total: 3");
// console.debug("Success");
