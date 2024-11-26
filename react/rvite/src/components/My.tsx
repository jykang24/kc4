import { FaTrashCan } from 'react-icons/fa6';
import { CartItem, Session } from '../App';
import Button from './ui/Button';
import Hello from './Hello';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Input from './ui/Input';
import { FaPencilAlt } from 'react-icons/fa';

type Props = {
  session: Session;
  logout: () => void;
  removeCartItem: (id: number) => void;
  saveCartItem: (cartItem: CartItem) => void;
  plusCount: () => void;
};

export default function My({
  session,
  logout,
  removeCartItem,
  saveCartItem,
  plusCount,
}: Props) {
  const { id, name } = session.loginUser || { id: 0, name: '' };
  const [isEditing, setEditing] = useState(false);

  const idRef = useRef<HTMLInputElement>(null);
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const addFormHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = itemNameRef.current?.value;
    const price = Number(itemPriceRef.current?.value);
    if (!name || !price) {
      return alert('Input the name, price!');
    }
    const id = Number(idRef.current?.value) || 0;
    saveCartItem({ id, name, price });
    setEditing(false);
  };

  const setItem = (item: CartItem) => {
    console.log('item:', item);
    setEditing(true);
    if (!idRef.current || !itemNameRef.current || !itemPriceRef.current) {
      return;
    }
    console.log('item>>', item);
    idRef.current.value = item.id.toString();
    itemNameRef.current.value = item.name;
    itemPriceRef.current.value = item.price.toString();
  };

  useEffect(() => {
    if (isEditing) {
      itemNameRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <>
      <Hello name={name} age={id} plusCount={plusCount} />

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
            <form onSubmit={addFormHanlder} className='flex gap-2'>
              <Input type='hidden' ref={idRef} />
              <Input ref={itemNameRef} placeholder='상품명...' />
              <Input type='number' ref={itemPriceRef} placeholder='가격...' />
              <Button type='submit'>Save</Button>
            </form>
          ) : (
            <Button onClick={() => setEditing(true)}>+ Add</Button>
          )}
        </li>
      </ul>
    </>
  );
}
