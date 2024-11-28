import { FormEvent, useState } from 'react';
import { type LoginUser } from '../App';

type Props = {
  //login: (id: number, name: string) => void;
  login: (user: LoginUser) => void;
};

export default function Login({ login }: Props) {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !name) {
      return alert('Please enter Id and name.');
    }

    login({ id, name });
  };

  return (
    <form
      onSubmit={signIn}
      className='flex items-center justify-center border-4 p-3'
    >
      <div>
        <label htmlFor='loginName'>Name:</label>
        <input
          type='text'
          id='loginName'
          placeholder='Name...'
          onChange={(e) => {
            console.log('Changing Name Now!!');
            setName(e.currentTarget.value);
          }}
        />
      </div>

      <div>
        <label htmlFor='loginId'>ID:</label>
        <input
          type='number'
          id='loginId'
          placeholder='Id...'
          onChange={(e) => {
            console.log('Changing Id Now!!');
            setId(+e.currentTarget.value);
          }}
        />
      </div>

      <button type='submit'>Sign In</button>
    </form>
  );
}
