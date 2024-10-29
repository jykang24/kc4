//특정 유저의 정보와 게시글 목록을 리턴하는 함수를 작성하시오.
// - 예) 1번 유저의 정보: https://jsonplaceholder.typicode.com/users/1
// - 예) 1번 유저의 글목록: https://jsonplaceholder.typicode.com/posts?userId=1

// async function getUserPosts1(id) {
//   result = fetch(url);
// }
//fecth결과 받는쪽에서 await

const getUserPosts = (id) => {
  const promiarr = Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`), //각각 fetch해오기(병렬)
  ])
    .then((arr) => {
      return Promise.all(arr.map((p) => p.json()));
    }) //fetch한 결과 json변환
    .then((arr) => {
      const { id, name } = arr[0];
      const posts = arr[1].map(({ userId, ...args }) => ({
        ...args,
      }));
      console.log({ id, name, posts });
    });
};

getUserPosts(1);
//⇒ 다음 형식으로 리턴 (format 준수!)
//   {
//     id: 유저ID,
//     name: 유저명,
//     posts: [
//        {id: 글ID, title: 글제목, body: 글내용}, {...
//     ]
//   }
