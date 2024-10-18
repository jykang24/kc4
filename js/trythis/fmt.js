// 오른쪽과 같은 형태로 출력하는 fmt 함수를 작성하시오.

const total = { price: 45000, vat: 4500 };

function fmt(str, ...args) {
  return str[0] + args.toLocaleString() + str[1]; //문자열결합 사용
  //return `${str[0]}${args.toLocaleString()}${str[1]}`; //템플릿태그 사용
}

console.log(fmt`주문합계: ${total.price}원`);
console.log(fmt`세액합계: ${total.vat}원`);
