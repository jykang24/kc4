//JS로 작성했던 memoized 함수를 범용성을 고려하여 TS로 작성하기.
//(1,2)=(2,1)은 같아야함.. 인자 크기비교해서 키로 넣기
function memoized<T extends unknown[]>(cb: (...args: T) => number) {
  let cache: { [k: string]: number } = {};
  return (...args: T) => {
    args.sort();
    const key = args.join(":");
    console.log("key=", key, cache);
    return cache[key] ?? (cache[key] = cb(...args));
  };
}

// test
const memoizeAdd = memoized((a: number, b: number) => {
  return a + b;
});

console.log(memoizeAdd(1, 2)); // 3
console.log(memoizeAdd(3, 4)); // 7
console.log(memoizeAdd(4, 3)); // 7

const memoizeFactorial = memoized((n: number): number => {
  if (n <= 1) return 1;
  return n * memoizeFactorial(n - 1);
});
console.log("🚀 memoFactorial(6):", memoizeFactorial(6));
console.log("🚀 memoFactorial(8):", memoizeFactorial(8)); //40320
console.log("🚀 memoFactorial(9):", memoizeFactorial(9)); //362880
