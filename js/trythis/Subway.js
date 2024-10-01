//다음의 지하철 노선 중에서, 출발역 ~ 도착역까지만을 반환하는 클래스를 작성하시오. (단방향만!)

class Subway {
  LINE2 = ["신도림", "성수", "신설동", "용두", "신답", "용답"];
  constructor(from, to) {
    this.from = this.LINE2.indexOf(from); //from: 시작인덱스
    this.to = this.LINE2.indexOf(to); //to: 끝인덱스
  }
  [Symbol.iterator]() {
    //첫번째 방법 : i가 배열길이 넘어가면 0으로 초기화
    let i = this.from;
    return {
      next: () => {
        if (i === this.to + 1) return { done: true }; //i===this.to와 같을시 done:true라 ...연산자에서 제외되어 to까지 결과를 얻을 수없다!
        if (i >= this.LINE2.length) {
          //배열길이 넘어가면 다시 0으로 초기화
          i = 0;
        }
        return { value: this.LINE2[i++], done: false };
      },
    };
  }
  iterator() {
    //두번재 방법 : 나머지연산으로 순환하도록 (i를 0으로초기화 필요없음)
    let i = this.from;
    return {
      next: () => {
        if (i === this.to + 1 || (this.to === this.LINE2.length - 1 && i === 0))
          //i가 도착+1이면 종료, to가 맨마지막 인덱스를 가질경우 종료조건 추가
          return { done: true }; //i===this.to와 같을시 done:true라 ...연산자에서 제외되어 to까지 결과를 얻을 수없다!
        const value = this.LINE2[i]; // 현재인덱스의 값 저장
        i = (i + 1) % this.LINE2.length; //i인덱스 0~5 순환, (주의)to=5일경우 절대 i!==to+1이 될수없어서 무한루프 빠짐. 종료조건에 추가하였음
        return { value, done: false };
      },
    };
  }
}

const routes = new Subway("신도림", "용답"); //from<to 인 경우
console.log("[...routes} 결과>> ", [...routes]); // [ '신도림', '성수', '신설동', '용두', '신답' ]

const it1 = routes[Symbol.iterator]();
console.log(it1.next()); // { value: '신도림', done: false }
console.log(it1.next()); // { value: '성수', done: false }
console.log(it1.next()); //{ value: '신설동', done: false }
console.log(it1.next()); //{ value: '용두', done: false }
console.log(it1.next()); //{ value: '신답', done: false }
console.log(it1.next()); //{ value: '용답', done: false }
console.log(it1.next());

const routes2 = new Subway("용답", "성수"); //from>to 인 경우
console.log("[...routes2} 결과>> ", [...routes2]);

const it2 = routes2[Symbol.iterator]();
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
//const it3 = routes2.iterator();
// console.log(it3.next());
// console.log(it3.next());
// console.log(it2.next());
