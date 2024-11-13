export {};
class BothLogger<OnInstance> {
  instanceLog(value: OnInstance) {
    console.log("instanceLog.value > ", value);
    return value;
  }

  // static A: OnInstance; //Error!
  static staticLog<OnStatic>(value: OnStatic) {
    //let instanceLogValue: OnInstance; //Error!

    console.log("staticLog.value > ", value);
    return value;
  }
}

const logger = new BothLogger<number[]>();
const value = logger.instanceLog([1, 2, 3]); // number[]
// logger.instanceLog(['A', 'B', 'C']); // arguments must be number[]

const logger2 = new BothLogger(); //타입지정 안해준 경우
const value2 = logger2.instanceLog("Hello"); // unknown 으로 추론됨

BothLogger.staticLog<string[]>(["a", "b", "c"]);
BothLogger.staticLog([true, false, false]);

type Color = "red" | "blue" | "green";
type Address = { sigungu: string; zipcode: string };
interface Info<T> {
  id: number;
  name: string;
  additional?: T;
}
const info1: Info<Color> = {
  id: 1,
  name: "lim",
  additional: "red",
};
const info2: Info<Address> = {
  id: 2,
  name: "hong",
  additional: { sigungu: "Seoul", zipcode: "04112" },
};

interface IUser {
  id: number;
  age: number;
  name: string;
}
interface IDept {
  id: number;
  age: string;
  dname: string;
  captain: string;
}
type KeyIntersection<T, K> = keyof T & keyof K; // key들의 intersection은 교집합! 결과는 id|age
type KeysOfIntersection<T, K> = keyof (T & K); // 'id' | 'age' | 'name' | 'dname' | 'captain'

//두 타입을 합치는 Combine 유틸리티 타입 만들기
//* 힌트: 두 타입의 같은 key 라면 union type, 그렇지 않다면 각 타입의 key type
//- 공통키: 키들의 교집합(keyof T & keyof U)
type Combine<T, U> = {
  [k in keyof (T & U)]: k extends keyof T & keyof U ? T[k] | U[k] : (T & U)[k];
};
type ICombined = Combine<IUser, IDept>;

//type Record2<K extends string|number>={}

//특정 key의 타입을 변경하는 Change 유틸리티 타입 만들기
//type Change2<T, K extends keyof T, U> = Omit<T, K> & { [K in U]: U }; //Pick<U, K>; //T의 k타입을 U타입으로 바꿔 {K: U}
type Change<T, K extends keyof T, U> = {
  [k in keyof T]: k extends K ? U : T[k];
};
type DeptCaptain = Change<IDept, "captain", IUser>;
//type Err = Change<IDept, "xxx", IUser>; // 존재하지 않는 키는 Error!!!

//다음 코드가 오류가 나지 않도록 수정하시오. 단, itemPrices의 item에는 재고(stock)에 있는 item들만 가능합니다.
//우리가 원하는 구조
//type ItemPrice<T, U> = {item: 'X' | 'Y' | 'Z'; price: number};
type ItemPrice<T, U> = { [k in keyof T]: k extends "item" ? keyof U : T[k] };

type Item = { item: string; price: number };
const stock = { X: 1, Y: 2, Z: 30 };

type XYZ = ItemPrice<Item, typeof stock>[];
const itemPrices: ItemPrice<Item, typeof stock>[] = [
  { item: "X", price: 1000 },
  { item: "Y", price: 2000 },
  { item: "Z", price: 3000 },
];

const total = itemPrices.reduce(
  (curr, itemPrice) => curr + stock[itemPrice.item] * itemPrice.price,
  0
);

class MissingInitializer {
  mayBeUndefined: number | undefined;
  property: string; // StrictNullCheck가 false라면 오류 안남! (모두 off)
  // {StrictNullCheck: true} && (strictPropertyInitialization: false) //런타임시 에러남
  constructor() {
    this.property = "1";
  }
}
new MissingInitializer().property.length;
// TypeError : Cannot read property 'length' of undefined
class MissingInitializer2 {
  readonly prop: string = "1";
  //property? : string;
  constructor() {
    this.prop = "2";
  }
}
//new MissingInitializer2().property?.length; // OK
//new MissingInitializer2().property.length;

//typeof add = (a: number, b: string) => string
//void는 리턴값을 안쓰겠다는 의미.
function add(a: number, b: string) {
  return `${a} - ${b}`;
}

type FirstArgs<F> = F extends (first: infer First, ...args: any[]) => any
  ? First
  : unknown;

type SecondArgs<F> = F extends (
  first: any,
  second: infer Second,
  ...args: any[]
) => void
  ? Second
  : unknown;

type Args<F> = F extends (...args: infer Args) => void ? Args[number] : never;

type FirstA = FirstArgs<typeof add>; // number
type B = SecondArgs<typeof add>; // string
type C = Args<typeof add>; // number | string

type AX = Args<typeof String.prototype.endsWith>;
// ⇒ string | number | undefined
type AX2 = Args<typeof String.prototype.charAt>;
// ⇒ number

//indexed access type
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
type Person = (typeof MyArray)[number];

type R = Record<string, number>;
// type R = { [k:string]: number };

//유틸리티 타입 - 다음 객체들을 하나로 합쳐(extend) 보세요. (id, name, age, addr)
let users = [{ name: "Hong" }, { age: 23 }, { id: 1, addr: "Seoul" }];

type FullUser = Record<string, number>;
const ret: FullUser = users.reduce((acc, user) => ({ ...acc, ...user }), {});
console.log("🚀  ret:", ret);

//regist 함수가 다음과 같을 때 파라미터 처리를 해보세요.
function registUserObj({ name, age }: { name: string; age: number }) {
  const id = 100;
  return { id, name, age };
}

type RegistUserObj = Parameters<typeof registUserObj>[number];

const paramObj: RegistUserObj = { name: "Hong", age: 32 };
const newUser2 = registUserObj(paramObj);
console.log("🚀  newUser2:", newUser2);
