import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { LoginUser } from '../App';

type Props = {
  login: (user: LoginUser) => void;
};

export default function Login({ login }: Props) {
  const idRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const changeId = (e: ChangeEvent<HTMLInputElement>) => {
    //e.preventDefault();
    setId(+e.currentTarget.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    const id = Number(idRef.current?.value);
    e.preventDefault();
    if (!id || !name) {
      return alert('Input the id and name');
    }
    login({ id, name });
  };

  useEffect(() => {
    if (idRef.current) {
      idRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={submitHandler} className='flex gap-2 border p-3'>
      <div>
        <label htmlFor='loginId'>ID:</label>
        {/* //<Input type='number' id='loginId' onChange={changeId} value={id}/> */}
        <Input type='number' id='loginId' ref={idRef} />
      </div>
      <label htmlFor='loginId'>
        Name:
        <Input
          id='loginId'
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setName(e.currentTarget.value);
          }}
        />
      </label>
      <Button type='submit'>Sign In</Button>
    </form>
  );
}
