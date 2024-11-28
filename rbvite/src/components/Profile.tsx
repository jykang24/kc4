import { Session } from '../App';
type Props = {
  session: Session;
  logout: () => void;
  removeCartItem: (itemId: number) => void;
};

export default function Profile({ session, logout, removeCartItem }: Props) {
  return (
    <div>
      <span className='text-green-400'>{session.loginUser?.name}</span> logined
      <button onClick={logout} className='mx-2'>
        Sign Out
      </button>
      <ul className='border border-slate-300 p-2'>
        {session.cart.map((item) => (
          <li key={item.id}>
            {item.name} {item.price.toLocaleString()}원
            <div>
              <button onClick={() => removeCartItem(item.id)}> Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
