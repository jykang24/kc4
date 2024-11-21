import { FaTrashCan } from 'react-icons/fa6';
import { Session } from '../App';
import Button from './ui/Button';
import Hello from './Hello';

type Props = {
  session: Session;
  logout: () => void;
  removeCartItem: (id: number) => void;
  plusCount: () => void;
};

export default function My({
  session,
  logout,
  removeCartItem,
  plusCount,
}: Props) {
  const { id, name } = session.loginUser || { id: 0, name: '' };
  return (
    <>
      <Hello name={name} age={id} plusCount={plusCount} />

      <button onClick={logout} className='btn'>
        Sign Out
      </button>
      <ul className='space-y-2 border border-green-400 p-2'>
        {session.cart.map((item) => (
          <li key={item.id} className='grid grid-cols-3 justify-around'>
            {item.name} <small>{item.price.toLocaleString()}</small>
            <Button
              onClick={() => removeCartItem(item.id)}
              className='btn-danger py-0'
            >
              <FaTrashCan />
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
