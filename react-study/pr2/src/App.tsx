import { FormEvent, useRef, useState } from 'react';
import './App.css';
//import TodoItemEditor from './TodoItemEditor';
import TodoItem from './TodoItem';
export type todoType = {
  id: number;
  text: string;
}[];

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todo, setTodo] = useState<todoType>([]);

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();

    const todoText = inputRef.current?.value;
    if (!todoText) {
      inputRef.current?.focus();
      return alert('todo를 입력하세요');
    }

    setTodo([...todo, { id: Date.now(), text: todoText }]);
    inputRef.current.value = ''; //아이템추가후 인풋창 초기화
  };

  const deleteTodo = (todoId: number) => {
    setTodo(todo.filter((item) => item.id !== todoId));
  };

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Todo List</h1>
      <form className='m-3'>
        <input
          type='text'
          ref={inputRef}
          placeholder='todo를 입력하세요.'
          className='bg-slate-200'
        />
        <button onClick={formSubmit} className='btn bg-blue-500 mx-3'>
          추가
        </button>
      </form>
      {todo.length > 0 ? (
        <TodoItem todo={todo} deleteTodo={deleteTodo} />
      ) : (
        <p>야호! 오늘 할일이 없습니다</p>
      )}
    </>
  );
}
//TODO: 이렇게 바꿔보기
//todo.map((item)=><li><Todoitem id={item,id} ></li>)
export default App;
