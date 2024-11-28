import { type LoginUser, Session } from '../App';
import Login from './Login';
import Profile from './Profile';

type Props = {
  session: Session;
  //login: (id: number, name: string) => void;
  login: (user: LoginUser) => void;
  logout: () => void;
};

export default function My({ session, login, logout }: Props) {
  return (
    <>
      {session.loginUser ? (
        <Profile session={session} logout={logout} />
      ) : (
        <Login login={login} />
      )}
    </>
  );
}
