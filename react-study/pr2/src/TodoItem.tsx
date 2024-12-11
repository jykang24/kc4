import { useState } from 'react';
import TodoItemEditor from './TodoItemEditor';
import { todoType } from './App';

type Props = {
  todo: todoType;
  deleteTodo: (todoId: number) => void;
};

export default function TodoItem({ todo, deleteTodo }: Props) {
  const [isEdit, setEdit] = useState(false);
  const editTodo = () => {
    setEdit(true);
  };

  return (
    <ul>
      {todo.map((item) => (
        <li key={item.id} className='flex justify-center items-center gap-2'>
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
      ))}
    </ul>
  );
}
