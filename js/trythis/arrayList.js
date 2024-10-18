//Collection 클래스를 상속받아 List 메소드들과 클래스 메소드 arrayToList, listToArray를 보유한 ArrayList 클래스를 구현하시오. (assert로 Test코드 작성)

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
    //요소반환(삭제없이)
    return this.#arr.at(this.isStack ? -1 : 0);
    if (this.isStack) return this.#arr[this.length - 1];
    else return this.#arr[0];
  }
  get poll() {
    //요소반환,삭제
    return this.remove();
  }

  remove() {
    //요소삭제
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
    return JSON.stringify(this.#arr); //오버라이딩!!
  }
  toArray() {
    return [...this.#arr];
    //return this._arr;
  }
  iterator() {
    let i = 0;
    return {
      next: () => ({
        value: this.#arr[i++],
        done: i > this.#arr.length,
      }),
    };
  }
}

class ArrayList extends Collection {
  // list를 array로 구현
  static arrayToList(arr) {
    let list = null;
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!list) {
        //list == null null,undefined둘다
        list = { value: arr[i] };
      } else {
        list = { value: arr[i], rest: list };
      }
    }
    return list;
  }
  static listToArray(list) {
    let arr = [];
    while (true) {
      if (!list) break;
      arr.push(list.value);
      list = list.rest;
    }
    return arr;
  }
  print() {
    //리스트로 변환해 출력
    console.log(ArrayList.arrayToList(this._arr));
  }
  add(val, idx) {
    idx = idx ?? this._arr.length; //idx안주면 맨끝에 추가
    this._arr.splice(idx, 0, val);
  }
  remove(val) {
    //**remove가 idx2번요소 지우는거? 아님 2값을 찾아지우는거? //removeByIdx(idx)가 idx번째요소를 지우는거.
    const idx = this._arr.indexOf(val);
    this._arr.splice(idx, 1);
  }
  indexOf(val) {
    return this._arr.indexOf(val);
  }
  contains(val) {
    return this._arr.includes(val);
  }
  set(idx, val) {
    //**idx위치에 val업데이트
    this._arr[idx] = val;
    return true;
  }
  get(idx) {
    //idx위치의 값 반환
    return this._arr[idx];
  }
  get peek() {
    return this._arr.at(-1);
  }
}

const alist = new ArrayList([1, 2]); // alist.toString() ⇒ { value: 1, rest: { value: 2 } }

// alist.add(3); // { value: 1, rest: { value: 2, rest: { value: 3 } } }
// alist.add(5, 1); // { value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3 } }}
alist.remove(2); //{ value: 1, rest: { value: 5, rest: { value: 3, rest: null } } }
// alist.add(22, 1); // { value: 1, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } }
// alist.add(33, 1); //{ value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 3 } } } }
// alist.print(); // ArrayList(4) { value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 3 } } } }
// alist.set(1, 300); // { value: 1, rest: { value: 300, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } }}
// alist.print();
// console.log(alist.get(2)); //22
// console.log("size>>", alist.size); //  5
// console.log("indexOf(300)>>", alist.indexOf(300)); // 1
// console.log("contains(300)>>", alist.contains(300)); //true
// console.log("contains(301>>", alist.contains(301)); //false
// console.log(alist.isEmpty); // false,
// console.log("peek>>", alist.peek); // 3
// console.log(alist.toArray()); // [ 1, 300, 22, 5, 3 ]
// alist.iterator().next(); // { value: 1, done: false }
// alist.clear(); // all clear
alist.print();

// assert.deepStrictEqual(
//   ArrayList.listToArray({ value: 1, rest: { value: 2, rest: null } }),
//   [1, 2]
// );

assert.deepStrictEqual(
  ArrayList.listToArray({ value: 1, rest: { value: 2 } }),
  [1, 2]
);
assert.deepStrictEqual(ArrayList.arrayToList([1, 2]), {
  value: 1,
  rest: { value: 2 },
});

return;

//TODO : test code 필요!!
assert.deepStrictEqual(alist.add(3), [1, 2, 3], "Add 3 Not Equal");
assert.deepStrictEqual(alist.add(5, 1), [1, 5, 2, 3], "Add 5 Not Equal");
console.debug("Success!");

//list로 구현한 버전
class ArrayList2 {
  #list = null;
  constructor(args) {
    this.#list = ArrayList.arrayToList(args); //list생성
  }
  static arrayToList(arr) {
    let list = null;
    for (let i = arr.length - 1; i >= 0; i--) {
      //역순으로 넣기
      list = { value: arr[i], rest: list };
    }
    return list;
  }
  static listToArray(list) {
    let arr = [];
    while (true) {
      arr.push(list.value);
      list = list.rest;
      if (!list) break;
    }
    return arr;
  }

  get size() {
    let p = this.#list;
    let cnt = 0;
    while (true) {
      if (!p) break;
      cnt += 1;
      p = p.rest;
    }
    return cnt;
  }
  get isEmpty() {
    return !this.#list;
    //return this.#list ? false : true; //존재하면 false, 비어있으면 true
  }
  get peek() {
    //맨끝 tail 원소 리턴
    let p = this.#list;
    while (true) {
      if (!p.rest) return p.value;
      p = p.rest;
    }
  }
  contains(val) {
    return !!this.get(val); //val가 리스트에 존재하면 true, 없으면 false
  }
  toArray() {
    //리스트를 배열로 바꿔 리턴
    return Array.listToArray(this.#list);
  }
  indexOf(val) {
    //val의 위치=인덱스를 반환
    let p = this.#list;
    let i = 0;
    while (true) {
      if (!p) break;
      if (p.value === val) return i;
      i += 1;
    }
    return;
  }
  clear() {
    this.#list = null;
  }
  print() {
    console.log("print>>", this.#list.toString());
  }
  toString() {
    //string반환
    //return `${this.#list}`; //[object Object]로 출력됨
    //return this.#list.toString()
    return JSON.stringify(this.#list); //stringify함수자체에서 프로퍼티에 ""를 자동으로 붙여줌..없애려면?
  }
  add(val, idx) {
    if (!idx) idx = this.#list.size;
    let p = this.#list;
    for (let i = 0; i < idx - 1; i++) {
      //리스트 중간에 삽입
      p = p?.rest;
    }
    if (p === null) {
    }
    p.rest = { value: val, rest: p.rest };
  }
  remove(val) {
    //val값을 리스트에서 찾아 삭제
    let prev = this.#list;
    if (prev.value === val) {
      //맨처음위치 삭제
      this.#list = prev.rest; //list시작위치를 prev.rest로 설정
      prev.rest = null;
      return true;
    }
    while (true) {
      if (prev.rest.value === val) {
        let curr = prev.rest;
        prev.rest = curr.rest;
        curr.rest = null;
        break;
      }
    }
    return true;
  }
  set(idx, val) {
    //idx위치의 노드값을 val로 변경
    let p = this.#list;
    for (let i = 0; i < idx; i++) {
      p = p.rest;
    }
    p.value = val;
    return true;
  }
  get(idx) {
    //idx위치의 value값을 찾아 리턴
    let p = this.#list;
    let cnt = 0;
    while (true) {
      if (!p) break;
      if (cnt === idx) return p.val;
      cnt += 1;
    }
    return;
  }
}

// const alist = new ArrayList([1, 2]); // alist.toString() ⇒ { value: 1, rest: { value: 2 } }
// alist.print();
//console.log("alist.toString()>> ", alist.toString()); //{"value":2,"rest":{"value":1,"rest":null}}
//alist.add(3); // { value: 1, rest: { value: 2, rest: { value: 3 } } }
