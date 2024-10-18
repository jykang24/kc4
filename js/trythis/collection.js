//Stack과 Queue에 공통 기능을 확장하시오.(Collection)

const assert = require("assert");

class Collection {
  #arr = []; //private이라 자식에게 상속불가 >> 해결 : get메서드로 protected처럼 구현함.

  constructor(...args) {
    this.#arr = [...args.flat(1)];
  }
  get _arr() {
    return this.#arr;
  }
  get size() {
    return this.#arr.length;
  }
  get isEmpty() {
    return this.#arr.length === 0;
  }
  get isStack() {
    return this.constructor.name === "Stack";
  }

  get peek() {
    //요소반환(삭제없이) 스택-top, 큐-front요소
    return this.#arr.at(this.isStack ? -1 : 0);
    if (this.isStack) return this.#arr[this.length - 1];
    else return this.#arr[0];
  }
  get poll() {
    //요소반환&삭제 스택-top, 큐-front요소
    return this.remove();
  }

  remove() {
    //요소삭제 스택-top, 큐-front요소
    if (this.isStack) return this.#arr.pop();
    else return this.#arr.shift();
  }
  clear() {
    this.#arr.length = 0;
  }
  print() {
    console.log(`${this.constructor.name}${this.toString()}`);
  }
  toString() {
    return JSON.stringify(this.#arr);
  }
  toArray() {
    return [...this.#arr];
    //return this._arr;
  }
}

class Stack extends Collection {
  push(val) {
    this._arr.push(val);
    return this;
  }
  pop() {
    return this._arr.pop();
  }
}

class Queue extends Collection {
  enqueue(val) {
    this._arr.push(val);
    return this;
  }
  dequeue() {
    return this._arr.shift();
  }
}

const stack = new Stack(3, 5, 8);
stack.push(11);
stack.print();

console.log("stack.poll>> ", stack.poll);
console.log("stack.peek>> ", stack.peek);
stack.print();

const queue = new Queue();
//queue.enqueue(3).enqueue(10).enqueue(1);
Array.from({ length: 5 }, (_, i) => i + 1).forEach((a) => queue.enqueue(a));
queue.print();
console.log("queue.toString>> ", queue.toString());
const arr = queue.toArray().map((a) => console.log(a));
arr[1] = 5;
queue.print();
if (!stack.isEmpty) stack.clear();
// if (queue.length) queue.clear();
stack.print();
// queue.print();
