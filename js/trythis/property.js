// for (let index in Object.keys(arr)) {
//   console.log(index);
// }
const assert = require("assert");

const arr = [100, 200, 300, 400, 500, 600, 700];

// //1. for-in문으로 배열의 인덱스 출력하기
for (let index in arr) {
  console.log(index);
}

// //2. for-in문으로 배열의 원소 출력하기
for (let index in arr) {
  console.log(arr[index]);
}
//2. for-of버전
for (let element of arr) {
  console.log(element);
}

const obj = { name: "Kim", addr: "Yongsan", level: 1, role: 9, receive: false };

// 3. for-in문으로 프로퍼티 이름(키) 출력하기
for (let key in obj) {
  console.log(key); // 3. for-in문으로 프로퍼티 이름(키) 출력하기
  console.log(obj[key]); //4. for-in문으로 프로퍼티 값 출력하기
}

// 5. for-of문으로 프로퍼티 값 출력하기
for (let element of Object.values(obj)) {
  console.log(element);
}

//6. level 프로퍼티를 열거되지않도록 설정
Object.defineProperty(obj, "level", {
  enumerable: false,
});

//7. role 프로퍼티를 읽기전용으로 설정
Object.defineProperty(obj, "role", {
  writable: false,
});
for (let key in obj) {
  console.log(obj[key]);
}

function makeObjectFromArray(arr) {
  let obj = {};
  for (let [key, ...vals] of arr) {
    //destructuring
    obj[key] = vals;
  }
  return obj;
}
function makeArrayFromObject(obj) {
  let arr = [];
  for (let key in obj) {
    arr.push([key, ...obj[key]]);
  }
  return arr;
}

function makeArrayFromObject2(obj) {
  let result = [];
  for (const [key, val] of Object.entries(obj)) {
    result.push([key, ...val]);
  }
  return result;
}
const arrObj = makeObjectFromArray([
  ["A", 10, 20],
  ["B", 30, 40],
  ["C", 50, 60, 70],
]);
assert.deepStrictEqual(
  arrObj,
  { A: [10, 20], B: [30, 40], C: [50, 60, 70] },
  "is not equals"
);

// console.log(arrObj);
// const objArr = makeArrayFromObject(arrObj);
// console.log(objArr);

//1. shallowCopy
function shallowCopy(obj) {
  //   return Object.assign({}, obj);
  let newObj = Array.isArray(obj) ? [] : {}; //obj가 array일 경우를 체크
  for (let key in obj) {
    newObj[key] = obj[key];
  }
  return newObj;
}

const kim = { nid: 3, nm: "Kim", addr: "Pusan" };
const newKim = shallowCopy(kim);
newKim.addr = "Daegu";
//console.log(kim.addr !== newKim.addr);

assert.notDeepStrictEqual(kim, newKim);
assert.deepStrictEqual(newKim, { ...newKim }); //shallow copy

//2. 재귀로 구현한 deepCopy
function deepCopy(obj) {
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      newObj[key] = deepCopy(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

//Map, set일 경우, 객체타입이 아니라 이렇게 복사불가, 따로 만들어줘야함..!
function deepCopy2(obj) {
  if (typeof obj === "object" || obj == null) return obj;
  const resultObj = {};
  for ([k, v] of Object.entries(obj)) {
    resultObj[k] = deepCopy(v);
  }
  return resultObj;
}

// const arrKim = [0, [1, 2, 3, [5]], 4];
// const deepArrKim = deepCopy(arrKim);
// console.log(deepArrKim);
// const deepArrKim2 = deepCopy2(arrKim);
// console.log(deepArrKim2);

function deepCopy2(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item)); // 배열 요소를 각각 깊은 복사
  } else if (obj !== null && typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = deepCopy(obj[key]); // 객체 속성을 각각 깊은 복사
    }
    return newObj;
  } else {
    return obj; // 기본형은 그대로 반환
  }
}
