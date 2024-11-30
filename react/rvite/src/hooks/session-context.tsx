import {
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { LoginHandler } from '../components/Login';
import { useFetch } from './useFetch';

// export const SampleSession = {
//   loginUser: { id: 1, name: 'Hong' },
//   cart: [
//     { id: 100, name: '라면', price: 3000 },
//     { id: 101, name: '컵라면', price: 2000 },
//     { id: 200, name: '파', price: 5000 },
//   ],
// };
export type CartItem = {
  id: number;
  name: string;
  price: number;
};
export type LoginUser = {
  id: number;
  name: string;
};
export type Session = {
  loginUser: LoginUser | null;
  cart: CartItem[];
};

type ContextProps = {
  session: Session;
  loginRef: RefObject<LoginHandler>;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  saveCartItem: (cartItem: CartItem) => void;
  removeCartItem: (itemid: number) => void;
};

const SessionContext = createContext<ContextProps | null>(null);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>({
    loginUser: null,
    cart: [],
  });
  console.log('SessionProvider실행중');

  const data = useFetch<Session>('/data/sample.json');
  useEffect(() => {
    if (data) {
      setSession(data);
    }
  }, [data]);

  const loginRef = useRef<LoginHandler>(null);
  const login = ({ id, name }: LoginUser) => {
    if (!id || isNaN(id) || !name) {
      loginRef.current?.focusInput();
      return;
    }
    setSession({ ...session, loginUser: { id, name } });
  };

  const logout = () => setSession({ ...session, loginUser: null });

  const saveCartItem = (cartItem: CartItem) => {
    const isAdding = !cartItem.id;
    if (isAdding) {
      console.log('Adding Now>>');

      cartItem.id =
        session.cart.length > 0
          ? Math.max(...session.cart.map(({ id }) => id)) + 1
          : 1;
      setSession({ ...session, cart: [...session.cart, cartItem] });
    } else {
      console.log('Editing>>', cartItem);
      setSession({
        ...session,
        cart: [
          ...session.cart.map((item) =>
            item.id === cartItem.id ? cartItem : item
          ),
        ],
      });
    }
  };

  const removeCartItem = (itemid: number) => {
    setSession({
      ...session,
      cart: session.cart.filter(({ id }) => id !== itemid),
    });
  };

  return (
    <SessionContext.Provider
      value={{ session, loginRef, login, logout, saveCartItem, removeCartItem }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('SessionContext is null');
  return ctx;
};
