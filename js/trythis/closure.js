function makeArray(n) {
  if (n <= 1) return [1];
  return [...makeArray(n - 1), n];
}
console.log(makeArray(10));

function makeReverseArray(n) {
  if (n <= 1) return [1];
  return [n, ...makeReverseArray(n - 1)];
}
console.log(makeReverseArray(5));

//1. for Loop 버전
function fibo_loop(n) {
  if (n <= 1) return n;
  let res = [0, 1];
  for (let i = 2; i <= n; i++) {
    res[i] = res[i - 2] + res[i - 1];
  }
  return res[n];
}
console.log(fibo_loop(7));

//2. 재귀 버전
function fibo_rec(n) {
  if (n <= 1) {
    return n;
  }
  return fibo_rec(n - 2) + fibo_rec(n - 1);
}
console.log(fibo_rec(5));

//3. Memoization 버전
function memo(fn) {
  const memoizedTable = {};
  return function B(k) {
    return memoizedTable[k] ?? (memoizedTable[k] = fn(k));
  };
}
const memoizedFibo = memo(function A(n) {
  if (n <= 1) return n;
  return memoizedFibo(n - 2) + memoizedFibo(n - 1);
});
console.log(memoizedFibo(10100));
