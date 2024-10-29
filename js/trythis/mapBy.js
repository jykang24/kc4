//모든 Array가 다음 기능을 갖도록 구현하세요.
//1) mapBy(), findBy(), filterBy(), rejectBy(), sortBy()
// 2) firstObject, lastObject

const assert = require("assert");

Array.prototype.mapBy = function (key) {
  return this.map((v) => v[key]);
};

Array.prototype.filterBy = function (key, val, bool = false) {
  if (typeof val == "number") {
    return this.filter((v) => v[key] === val);
  }
  if (typeof val == "string") {
    if (bool === true) return this.filter((v) => v[key].includes(val));
    else return this.filter((v) => !v[key].includes(val));
  }
};

Array.prototype.rejectBy = function (key, val, bool = false) {
  if (typeof val == "number") {
    return this.filter((v) => v[key] !== val);
  }
  if (typeof val == "string") {
    //찾는값을 제외시키고 남은 배열 리턴
    if (bool === true) return this.filter((v) => !v[key].includes(val));
    else return this.filter((v) => v[key].includes(val));
  }
};

Array.prototype.findBy = function (key, val) {
  return this.find((v) => v[key] === val); //해당 요소 하나만 찾을 경우
  //return this.filter((v) => v[key] === val); //여러요소를 찾을 경우
};

Array.prototype.sortBy = function (condition) {
  const [prop, dir = "asc"] = condition.split(":");
  const direction = dir === "desc" ? -1 : 1;
  return this.sort((a, b) => {
    a[prop] > b[prop] ? direction : -direction;
  });
};

Array.prototype.sortBy = function (key) {
  let [prop, order] = key.split(":"); //:기준으로 나눠서 앞에는 정렬기준prop, 뒤에는 정렬순서orderOption
  return this.sort((a, b) => {
    // if (a<b) {
    //   return -1;
    // }
    // if (a>b) {
    //   return 1;
    // }
    // return 0;
    if (a[prop] < b[prop]) return order === "desc" ? 1 : -1;
    if (a[prop] > b[prop]) return order === "desc" ? -1 : 1;
    return 0;
  });
};

Object.defineProperty(Array.prototype, "firstObject", {
  get: function () {
    return this[0];
  },
  set: function (val) {
    this[0] = val;
  },
});

Object.defineProperty(Array.prototype, "lastObject", {
  get: function () {
    return this[this.length - 1]; //this.at(-1)
  },
  set: function (val) {
    this[this?.length - 1] = val; //this.with(-1,val)
  },
});
const arr = [1, 2, 3, 4, 5];
const hong = { id: 1, name: "Hing" };
const kim = { id: 2, name: "Kim" };
const lee = { id: 3, name: "Lee" };
const users = [hong, lee, kim];
// console.log(users.firstObject);
// users.firstObject = kim;
// console.log(users.firstObject);
// console.log(users.mapBy("id"));
// console.log(users.filterBy("id", 2));
// console.log(users.filterBy("name", "i", true));
// console.log(users.rejectBy("name", "i", true));
// console.log(users.findBy("name", "Kim"));
assert.deepStrictEqual([arr.firstObject, arr.lastObject], [1, 5]);
assert.deepStrictEqual(users.mapBy("id"), [1, 3, 2]);
assert.deepStrictEqual(users.mapBy("name"), ["Hing", "Lee", "Kim"]);
assert.deepStrictEqual(users.filterBy("id", 2), [kim]);
assert.deepStrictEqual(users.filterBy("name", "i", true), [hong, kim]);
assert.deepStrictEqual(users.rejectBy("id", 2), [hong, lee]);
assert.deepStrictEqual(users.rejectBy("name", "i", true), [lee]);
assert.deepStrictEqual(users.findBy("name", "Kim"), kim);

assert.deepStrictEqual(users.sortBy("name:desc"), [lee, kim, hong]);
assert.deepStrictEqual(users.sortBy("name"), [hong, kim, lee]);

assert.deepStrictEqual(users.firstObject, hong);
assert.deepStrictEqual(users.lastObject, lee);

users.firstObject = kim;
assert.deepStrictEqual(users.firstObject, kim);
users.lastObject = hong;
assert.deepStrictEqual(users.lastObject, hong);

//"a".localeCompare();
