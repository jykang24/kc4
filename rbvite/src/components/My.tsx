import { ForwardedRef, forwardRef } from 'react';
import { CartItem, type LoginUser, type Session } from '../App';
import Hello2 from './Hello2';
import Login, { LoginHandler } from './Login';
import Profile from './Profile';

type Props = {
  session: Session;
  //login: (id: number, name: string) => void;
  login: (user: LoginUser) => void;
  logout: () => void;
  plusCount: () => void;
  removeCartItem: (itemId: number) => void;
  addCartItem: (cartItem: CartItem) => void;
};

export default forwardRef(function My(
  { session, login, logout, plusCount, removeCartItem, addCartItem }: Props,
  ref: ForwardedRef<LoginHandler>
) {
  const { id, name } = session.loginUser || { id: 0, name: '' };
  return (
    <>
      <Hello2 name={name} age={id} plusCount={plusCount} />
      {session.loginUser ? (
        <Profile
          session={session}
          logout={logout}
          removeCartItem={removeCartItem}
          addCartItem={addCartItem}
        />
      ) : (
        <Login login={login} ref={ref} />
      )}
    </>
  );
});
