// //과제 1
const hong = { id: 1, name: "Hong" };
const lee = {};
function f1(user) {
  console.log(user.id, user.name);
}
function f2({ id, name }) {
  console.log(id, name);
}
const f3 = ({ id, name }) => {
  console.log(id, name);
};
// 기본값 설정해준 방법
function f4({ id = "default", name = "default" }) {
  console.log(id, name);
}
f1(hong);
f4(lee);

//과제2
let user = { id: 1, name: "Hong", passwd: "xxx", addr: "Seoul" };
let { passwd, ...userInfo } = user;
console.log(userInfo);

//과제3
const arr = [[{ id: 1 }], [{ id: 2 }, { id: 3 }]];
let [[{ id: id1 }], [{ id: id2 }, { id: id3 }]] = arr;
console.log(id1, id2, id3);
// let [{ id: aid }, { id: bid }, { id: cid }] = arr.flat();
// console.log(aid, bid, cid);

//과제4
user = { name: "Hong", passwd: "xyz", addr: "Seoul" };
function getValueExceptInitial(k) {
  const { [k]: val } = user;
  const [, ...rest] = [...val];
  //   let res = "";
  //   for (const item of rest) res += item;
  //   return res;
  return rest.join("");
}
console.log(getValueExceptInitial("name")); // 'ong'
console.log(getValueExceptInitial("passwd")); // 'yz'
console.log(getValueExceptInitial("addr"));
