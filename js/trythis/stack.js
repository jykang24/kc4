// class와 Array를 이용하여 Stack과 Queue를 구현하시오.

const assert = require("assert");

class Stack extends Array {
  constructor() {
    super();
  }
  push(item) {
    this[this.length] = item;
  }
  pop() {
    if (this.length > 0) {
      let ret = this[this.length - 1];
      this.length -= 1;
      return ret;
    } else return;
  }
}

class Queue extends Array {
  constructor() {
    super();
  }
  enqueue(item) {
    this[this.length] = item;
  }
  dequeue() {
    if (this.length > 0) {
      return this.shift();
    } else return;
  }
}
const stack = new Stack();
stack.push(3);
console.log(stack.pop());

const queue = new Queue();
queue.enqueue(3); // 추가하기
queue.enqueue(2); // 추가하기
console.log(queue.dequeue());
console.log(queue.dequeue());
