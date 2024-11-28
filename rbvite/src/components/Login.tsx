import { FormEvent, useEffect, useRef } from 'react';
import { type LoginUser } from '../App';

type Props = {
  //login: (id: number, name: string) => void;
  login: (user: LoginUser) => void;
};

export default function Login({ login }: Props) {
  // const [id, setId] = useState(0);
  // const [name, setName] = useState('');
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const signIn = (e: FormEvent<HTMLFormElement>) => {
    const id = Number(idRef.current?.value);
    const name = nameRef.current?.value;
    e.preventDefault();
    if (!idRef.current || !nameRef.current) {
      return alert('Dom요소 렌더링 전');
    }
    if (!id || !name) {
      idRef.current.focus();
      return alert('Please enter Id and name.');
    }

    login({ id, name });
  };

  useEffect(() => {
    idRef.current?.focus();
  }, []);
  return (
    <form
      onSubmit={signIn}
      className='flex items-center justify-center gap-2 border-4 p-3'
    >
      <div>
        <label htmlFor='loginId'>ID:</label>
        <input type='number' id='loginId' placeholder='Id...' ref={idRef} />
      </div>
      <div>
        <label htmlFor='loginName'>Name:</label>
        <input type='text' id='loginName' placeholder='Name...' ref={nameRef} />
      </div>
      <button type='submit'>Sign In</button>
    </form>
  );
}
