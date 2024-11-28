import { type LoginUser, type Session } from '../App';
import Hello2 from './Hello2';
import Login from './Login';
import Profile from './Profile';

type Props = {
  session: Session;
  //login: (id: number, name: string) => void;
  login: (user: LoginUser) => void;
  logout: () => void;
  plusCount: () => void;
  removeCartItem: (itemId: number) => void;
};

export default function My({
  session,
  login,
  logout,
  plusCount,
  removeCartItem,
}: Props) {
  const { id, name } = session.loginUser || { id: 0, name: '' };
  return (
    <>
      <Hello2 name={name} age={id} plusCount={plusCount} />
      {session.loginUser ? (
        <Profile
          session={session}
          logout={logout}
          removeCartItem={removeCartItem}
        />
      ) : (
        <Login login={login} />
      )}
    </>
  );
}
