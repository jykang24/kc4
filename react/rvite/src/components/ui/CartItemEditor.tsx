import { FormEvent, useEffect, useRef } from 'react';
import { CartItem } from '../../hooks/session-context';
import Input from './Input';
import Button from './Button';

type Props = {
  cartItem: CartItem | null;
  saveCartItem: (cartItem: CartItem) => void;
  toggleEditing: () => void;
};
export default function CartItemEditor({
  cartItem,
  saveCartItem,
  toggleEditing,
}: Props) {
  const idRef = useRef<HTMLInputElement>(null);
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const submitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = itemNameRef.current?.value;
    const price = Number(itemPriceRef.current?.value);
    if (!name || !price) {
      return alert('Input the name, price!');
    }
    const id = Number(idRef.current?.value) || 0;
    saveCartItem({ id, name, price });
    toggleEditing();
  };

  useEffect(() => {
    if (
      !cartItem ||
      !idRef.current ||
      !itemNameRef.current ||
      !itemPriceRef.current
    ) {
      return;
    }
    console.log('item>>', cartItem);
    itemNameRef.current?.focus();

    idRef.current.value = cartItem.id.toString();
    itemNameRef.current.value = cartItem.name;
    itemPriceRef.current.value = cartItem.price.toString();
  }, [cartItem]);

  return (
    <form onSubmit={submitHanlder} className='flex gap-2'>
      <Input type='hidden' ref={idRef} />
      <Input ref={itemNameRef} placeholder='상품명...' />
      <Input type='number' ref={itemPriceRef} placeholder='가격...' />
      <Button type='submit'>Save</Button>
    </form>
  );
}
