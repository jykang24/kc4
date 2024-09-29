// (수정Ver, 테스트코드 추가) class와 Array를 이용하여 Stack과 Queue를 구현하시오.

const assert = require("assert");

class Stack {
  #arr = [];
  constructor(...args) {
    this.#arr = [...args.flat(1)]; // 스프레드후 flat으로 1번만 평탄화 [...args.flat(1)]
  }
  push(val) {
    this.#arr.push(val);
    return this;
  }
  pop() {
    return this.#arr.pop();
  }

  toString() {
    return JSON.stringify(this.#arr); //string을 반환-오버라이드 규칙을 지켜줌
  }
}

class Queue {
  #arr = [];
  constructor(...args) {
    this.#arr = [...args.flat(1)];
  }
  enqueue(val) {
    this.#arr.push(val);
    return this;
  }
  dequeue() {
    return this.#arr.shift();
  }
}

const stack = new Stack();
stack.push(3); // stack에 3 추가

const queue = new Queue();
queue.enqueue(3); // queue에 3 추가하기
queue.enqueue(2); // queue에 2 추가하기

//assert test코드 짜기
assert.deepStrictEqual(stack.pop(), 3, "첫 번째 pop이 3이어야 합니다.");
assert.deepStrictEqual(queue.dequeue(), 3, "첫 번째 dequeue가 3이어야 합니다.");
assert.deepStrictEqual(queue.dequeue(), 2, "두 번째 dequeue가 2이어야 합니다.");
console.debug("Success!");
