import { useState } from 'react';
import { CartItem, Session } from '../App';
import CartItemEditor from './CartItemEditor';
import { FaTrashCan } from 'react-icons/fa6';
import Button from './ui/Button';
type Props = {
  session: Session;
  logout: () => void;
  removeCartItem: (itemId: number) => void;
  addCartItem: (cartItem: CartItem) => void;
};

export default function Profile({
  session,
  logout,
  removeCartItem,
  addCartItem,
}: Props) {
  const [isAdding, setAdding] = useState(false);
  const toggleAdding = () => setAdding((pre) => !pre);

  return (
    <div>
      <span className='text-green-400'>{session.loginUser?.name}</span> logined
      <button onClick={logout} className='mx-2'>
        Sign Out
      </button>
      <ul className='border border-slate-300 p-2'>
        {session.cart.length > 0 ? (
          session.cart.map((item) => (
            <li key={item.id}>
              <strong>{item.name} </strong>
              {item.price.toLocaleString()}원
              <Button onClick={() => removeCartItem(item.id)}>
                <FaTrashCan />
              </Button>
            </li>
          ))
        ) : (
          <li>There is no item.</li>
        )}
        {isAdding ? (
          <CartItemEditor
            addCartItem={addCartItem}
            toggleAdding={toggleAdding}
          ></CartItemEditor>
        ) : (
          <Button onClick={() => setAdding(true)}>+Add Item</Button>
        )}
      </ul>
    </div>
  );
}
