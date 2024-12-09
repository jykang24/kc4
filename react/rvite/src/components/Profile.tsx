import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { useCounter } from '../hooks/counter-context';
import { CartItem, useSession } from '../hooks/session-context';
import Hello from './Hello';
import Button from './ui/Button';
import CartItemEditor from './ui/CartItemEditor';
import { FaTrashCan } from 'react-icons/fa6';
import { useMemo, useRef, useState } from 'react';
import { useDebounce } from '../hooks/timer-hooks';
import { useToggle } from '../hooks/useToggle';
// import Input from './ui/Input';

export default function Profile() {
  const { plusCount } = useCounter();
  const { session, logout, saveCartItem, removeCartItem } = useSession();
  const [isEditing, setEditing] = useState(false);
  const { id, name } = session.loginUser || { id: 0, name: '' };
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  const [, toggleSearch] = useToggle();
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchstr, setSearchstr] = useState('');

  useDebounce(
    () => {
      setSearchstr(searchRef.current?.value || '');
    },
    2000,
    [searchRef.current?.value]
  );

  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  const dcPrice = useMemo(() => totalPrice * 0.1, [totalPrice]);

  const toggleEditing = () => setEditing((pre) => !pre);
  const setItem = (item: CartItem) => {
    //console.log('item:', item);
    //setEditing(true);
    toggleEditing();
    setCartItem(item);
  };
  const clearItem = () => {
    setCartItem(null);
    setEditing(true);
  };

  return (
    <>
      <Hello name={name} age={id} plusCount={plusCount} />
      <span className='text-green-400'>{session.loginUser?.name}</span> logined
      <button onClick={logout} className='btn mb-3'>
        Sign Out
      </button>
      <div className='w-2/3 border border-green-400 p-2'>
        <div className='flex items-center gap-2'>
          <FaSearch />
          <input
            onChange={toggleSearch}
            ref={searchRef}
            type='text'
            placeholder='검색할 상품을 입력하세요.'
            className='w-full border px-2 focus:border-blue-500 focus:outline-none'
          />
        </div>
        <ul className='mt-3 space-y-2'>
          {session.cart
            .filter(({ name }) => name.includes(searchstr))
            .map((item) => (
              <li
                key={item.id}
                className='grid grid-cols-3 justify-around hover:bg-gray-200'
              >
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
              <Button onClick={clearItem}>+ Add</Button>
            )}
          </li>
          <li className='flex gap-5'>
            <span>*총액: {totalPrice.toLocaleString()}원</span>
            <span>*할인액: {dcPrice.toLocaleString()}원</span>
          </li>
        </ul>
      </div>
    </>
  );
}
