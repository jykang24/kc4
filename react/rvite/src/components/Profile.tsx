import { FaPencilAlt } from 'react-icons/fa';
import { useCounter } from '../hooks/counter-context';
import { CartItem, useSession } from '../hooks/session-context';
import Hello from './Hello';
import Button from './ui/Button';
import CartItemEditor from './ui/CartItemEditor';
import { FaTrashCan } from 'react-icons/fa6';
import { useState } from 'react';

export default function Profile() {
  const { plusCount } = useCounter();
  const { session, logout, saveCartItem, removeCartItem } = useSession();
  const [isEditing, setEditing] = useState(false);
  const { id, name } = session.loginUser || { id: 0, name: '' };
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  const toggleEditing = () => setEditing((pre) => !pre);
  const setItem = (item: CartItem) => {
    //console.log('item:', item);
    //setEditing(true);
    toggleEditing();
    setCartItem(item);
  };

  return (
    <>
      <Hello name={name} age={id} plusCount={plusCount} />
      <span className='text-green-400'>{session.loginUser?.name}</span> logined
      <button onClick={logout} className='btn mb-3'>
        Sign Out
      </button>
      <ul className='space-y-2 border border-green-400 p-2'>
        {session.cart.map((item) => (
          <li key={item.id} className='grid grid-cols-3 justify-around'>
            {item.name} <small>{item.price.toLocaleString()}</small>
            <div className='grid grid-cols-2 gap-3'>
              <Button
                onClick={() => removeCartItem(item.id)}
                className='btn-danger py-0'
              >
                <FaTrashCan />
              </Button>
              <Button onClick={() => setItem(item)}>
                <FaPencilAlt className='text-slate-700' />
              </Button>
            </div>
          </li>
        ))}
        <li className='grid grid-cols-3 justify-around'>
          {isEditing ? (
            <CartItemEditor
              cartItem={cartItem}
              saveCartItem={saveCartItem}
              toggleEditing={toggleEditing}
            />
          ) : (
            <Button onClick={() => setEditing(true)}>+ Add</Button>
          )}
        </li>
      </ul>
    </>
  );
}
