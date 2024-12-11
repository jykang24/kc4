import { FormEvent, useRef, useState } from 'react';
import './App.css';
import TodoItemEditor from './TodoItemEditor';
//import TodoItem from './TodoItem';
type todoType = {
  id: number;
  text: string;
}[];

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todo, setTodo] = useState<todoType>([]);
  const [isEdit, setEdit] = useState(false);

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();

    const todoText = inputRef.current?.value;
    if (!todoText) {
      return alert('todoText is null');
    }
    //TODO:???
    setTodo([...todo, { id: Date.now(), text: todoText }]);
    inputRef.current.value = ''; //아이템추가후 인풋창 초기화
  };

  const editTodo = () => {
    setEdit(true);
  };
  const deleteTodo = (todoId: number) => {
    setTodo([...todo.filter((item) => item.id !== todoId)]);
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

      <ul>
        {todo.length > 0 ? (
          todo.map((item) => (
            <li
              key={item.id}
              className='flex justify-center items-center gap-2'
            >
              {item.text}
              {isEdit ? (
                <TodoItemEditor />
              ) : (
                <div>
                  <button onClick={editTodo} className='bg-blue-300'>
                    수정
                  </button>
                  <button
                    onClick={() => deleteTodo(item.id)}
                    className='bg-red-500'
                  >
                    삭제
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>야호! 오늘 할일이 없습니다</p>
        )}
      </ul>
    </>
  );
}

export default App;
