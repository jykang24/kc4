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
    if (!name || !price) {
      return alert('상품명,가격을 모두 입력하세요!');
    }

    addCartItem({ id, name, price });
    toggleAdding();
  };

  useEffect(() => {
    if (!itemNameRef.current) return alert('itemNameRef렌더링 전');
    itemNameRef.current.focus();
  });

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type='hidden' ref={idRef} />
        <input placeholder='상품명...' ref={itemNameRef} />
        <input type='number' placeholder='가격...' ref={itemPriceRef} />
        <button type='submit'>Save</button>
      </form>
    </>
  );
}
