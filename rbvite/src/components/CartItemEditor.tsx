import { FormEvent, useEffect, useRef } from 'react';
import { type CartItem } from '../App';

type Props = {
  addCartItem: (cartItem: CartItem) => void;
  toggleAdding: () => void;
};

export default function CartItemEditor({ addCartItem, toggleAdding }: Props) {
  const idRef = useRef<HTMLInputElement>(null);
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = itemNameRef.current?.value;
    const price = Number(itemPriceRef.current?.value);
    const id = Number(idRef.current?.value);
    if (!idRef.current || !itemNameRef.current || !itemPriceRef.current) {
      return alert('DOM렌더링 전');
    }
    if (!name) {
      alert('상품명을 입력하세요!');
      return itemNameRef.current.focus();
    } else if (!price) {
      alert('가격을 입력하세요');
      return itemPriceRef.current.focus();
    }
    addCartItem({ id, name, price });
    //toggleAdding();
    itemNameRef.current.value = '';
    itemPriceRef.current.value = '';
  };

  useEffect(() => {
    if (!itemNameRef.current) return alert('itemNameRef렌더링 전');
    console.log('useEffect확인용>>');
    itemNameRef.current.focus();
  });

  return (
    <>
      <form onSubmit={submitHandler} className='gap-3'>
        <input type='hidden' ref={idRef} />
        <input placeholder='상품명...' ref={itemNameRef} />
        <input type='number' placeholder='가격...' ref={itemPriceRef} />
        <button type='reset' onClick={toggleAdding}>
          Cancel
        </button>
        <button type='submit'>Save</button>
      </form>
    </>
  );
}
