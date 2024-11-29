import { useRef, useState } from 'react';
import './App.css';
import My from './components/My';
import { type LoginHandler } from './components/Login';
import { useCounter } from './components/hooks/counter-hook';

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
  const [session, setSession] = useState(SampleSession);
  const { count, plusCount } = useCounter();
  //const [count, setCount] = useState(0)
  const loginRef = useRef<LoginHandler>(null);
  const login = ({ id, name }: LoginUser) => {
    if (!id) {
      alert('Id를 입력하세요!');
      return loginRef.current?.focus('id');
    }
    if (!name) {
      alert('Name을 입력하세요!');
      return loginRef.current?.focus('name');
    }
    setSession({ ...session, loginUser: { id, name } });
  };
  const logout = () => {
    setSession({ ...session, loginUser: null });
  };

  const removeCartItem = (itemId: number) => {
    setSession({
      ...session,
      cart: [...session.cart.filter((item) => item.id != itemId)],
    });
  };
  const addCartItem = (cartItem: CartItem) => {
    cartItem.id =
      session.cart.length > 0
        ? Math.max(...session.cart.map(({ id }) => id)) + 1
        : 1;
    setSession({ ...session, cart: [...session.cart, cartItem] });
  };

  return (
    <>
      <My
        session={session}
        login={login}
        logout={logout}
        removeCartItem={removeCartItem}
        addCartItem={addCartItem}
        ref={loginRef}
      />
      <div className='card'>
        <button onClick={plusCount}>App.count is {count}</button>
      </div>
    </>
  );
}

export default App;
