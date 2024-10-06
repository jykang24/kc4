//깊은 복사 deepCopy 함수 작성 (Map, Set, WeakMap, WeakSet도 복사)

const assert = require("assert");

function deepCopy(obj) {
  if (obj instanceof Map) {
    const resultMap = new Map();
    for (const [k, v] of obj) {
      resultMap.set(deepCopy(k), deepCopy(v));
    }
    return resultMap;
  }
  if (obj instanceof Set) {
    const resultSet = new Set();
    for (const v of obj) {
      resultSet.add(deepCopy(v));
    }
    return resultSet;
  }

  if (typeof obj !== "object" || obj === null) return obj;
  const resultObj = Array.isArray(obj) ? [] : {};
  for (const key of Reflect.ownKeys(obj)) {
    //Object.entries로하면 심볼은 안나옴! Reflect.ownKeys해야 심볼 키까지 복사됨
    resultObj[key] = deepCopy(obj[key]); //객체의 키는 문자열 또는 심볼! 객체일수없다
  }
  return resultObj;
}

const kim = {
  nid: 3,
  addr: "Pusan",
  arr: [1, 2, 3, { aid: 1 }, [10, 20]],
  oo: { id: 1, name: "Hong", addr: { city: "Seoul" } },
  xx: null,
  yy: function () {
    console.log(this.oo);
  },
  yyy() {
    console.log(this.oo);
  },
  [Symbol()]: 9,
  [Symbol()]: Symbol("symbol2"),
  hong: { id: 1, name: "Hong", dept: 1 },
  zs: new Set(), //new Set([this.arr, this.hong])는 에러. this는 객체속성이나 메서드내부에서만 유효
  zws: new WeakSet(),
  zm: new Map(),
  zwm: new WeakMap(),
  initSet() {
    const SET_VAL = [this.arr, this.hong];
    this.zs.add(SET_VAL);
    this.zws.add(SET_VAL);
  },
  initMap() {
    this.zm.set(this.arr, this.hong);
    this.zwm.set(this.arr, this.hong);
  }, //방법1: 객체 내 메서드로 초기화하는 메서드 넣어주고, 객체생성후 초기화메서드 호출하기. 이때는 this사용가능
};
//방법1
// kim.initSet();
// kim.initMap();

//방법2: 객체생성후 직접 멤버변수에 접근해 하나씩 초기화하기
const SET_VAL = [kim.arr, kim.hong];
kim.zs.add(SET_VAL); //kim.zs.add([kim.arr, kim.hong]); //[arr,hong]의 새로운배열을 만들어 추가하기때문에, 따로 변수에 담아주어야함(참조를 유지하려면)
kim.zws.add(SET_VAL);
kim.zm.set(kim.arr, kim.hong);
kim.zwm.set(kim.arr, kim.hong);

const newKim = deepCopy(kim);
//weakset,weakmap은 복사불가! 방법은 weakset, weakmap를 직접복사하는것..
newKim.zws = new WeakSet();
newKim.zwm = new WeakMap();
newKim.zws.add(SET_VAL);
newKim.zwm.set(kim.arr, kim.hong);

//console.log("newKim>>", newKim);
//테스트코드
assert.deepStrictEqual(newKim, kim, "deepCopy equal fail!"); //weakset,weakmap은 복사불가!
newKim.addr = "Daegu";
newKim.oo.name = "Kim";
assert.notDeepStrictEqual(newKim, kim, "Not Valid Deep Copy!");
newKim.arr[0] = 100;
newKim.arr[3].aid = 200;
newKim.arr[4][1] = 300;
newKim.oo.addr.city = "Daejeon";
assert.notStrictEqual(kim.arr[4][1], newKim.arr[4][1], "pass2: 다르지 않아요!");
assert.notStrictEqual(
  kim.oo.addr.city,
  newKim.oo.addr.city,
  "Not Pass3: city가 다르지 않아요!"
);
console.debug("Success");
