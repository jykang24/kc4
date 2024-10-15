const print_cal = (date) => {
  //해당 월 달력을 출력하는 함수
  const month = date.getMonth() + 1; //해당 월
  const this_date = new Date(date); //충돌방지를 위해 객체복사

  // 해당월의 마지막날짜 : setMonth로 다음달로 바꾼뒤 setDate(0)해주기
  this_date.setMonth(month);
  this_date.setDate(0); //this_date는 해당월의 마지막날이 됨
  let last_day = this_date.getDate();

  //달력 출력
  this_date.setDate(1); //시작일=1로 설정
  let i = this_date.getDay();
  let current_date = this_date.getDate(); //날짜표시용
  let strweek = "".padStart(i * 4, " "); //주마다 출력함, 첫주에 맨앞 공백있다면 출력

  console.log(`       ${this_date.getFullYear()}년 ${month}월`); //출력형식 맞춰주기위한 앞공백
  console.log("일  월  화  수  목  금  토");
  while (current_date <= last_day) {
    //이달 마지막날짜까지 반복
    if (i > 6) {
      //i=요일인덱스
      console.log(strweek); //이번주week출력후 줄바꾸고
      i = 0; //요일인덱스 초기화
      strweek = ""; //주가 바뀌었으니 week 비우고 다시시작
    }
    strweek += String(current_date).padStart(2, " ").padEnd(4, " ");
    current_date += 1;
    i++;
  }
  if (strweek.length > 0) console.log(strweek); //마지막주 출력
};

const date = new Date("2024-10-09");
print_cal(date);
