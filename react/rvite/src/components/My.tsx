import { useSession } from '../hooks/session-context';
import Profile from './Profile';
import Login from './Login';

// type Props = {
//   session: Session;
//   logout: () => void;
//   removeCartItem: (id: number) => void;
//   saveCartItem: (cartItem: CartItem) => void;
//   plusCount: () => void;
// };

export default function My() {
  const { session } = useSession();

  return <>{session.loginUser?.id ? <Profile /> : <Login />}</>;
}
