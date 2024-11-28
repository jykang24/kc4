import { useState } from 'react';
import './App.css';
import Hello2 from './components/Hello2';
import My from './components/My';

const SampleSession: Session = {
  loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

export type LoginUser = { id: number; name: string };
export type CartItem = { id: number; name: string; price: number };
export type Session = {
  loginUser: LoginUser | null;
  cart: CartItem[];
};

function App() {
  const [count, setCount] = useState(0);
  const [session, setSession] = useState(SampleSession);

  const login = ({ id, name }: LoginUser) => {
    setSession({ ...session, loginUser: { id, name } });
  };
  const logout = () => {
    setSession({ ...session, loginUser: null });
  };
  const plusCount = () => {
    setCount(count + 1);
    console.log('plus count');
  };

  return (
    <>
      <Hello2 name='User' age={22} plusCount={plusCount} />
      <My session={session} login={login} logout={logout} />
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          App.count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
