//import { useRef } from 'react';

export default function TodoItemEditor() {
  //const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input type='text' placeholder='수정할 todo를 입력하세요' />
      <button>수정할래요</button>
      <button type='reset'>취소할래요</button>
    </>
  );
}
