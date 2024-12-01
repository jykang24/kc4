import { FormEvent, useEffect, useRef, useState } from 'react';
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

  const [hasDirty, setDirty] = useState(false);
  const checkDirty = () => {
    setDirty(
      itemNameRef.current?.value !== cartItem?.name ||
        itemPriceRef.current?.value != cartItem?.price
    );
  };
  const submitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = itemNameRef.current?.value;
    const price = Number(itemPriceRef.current?.value);
    if (!name || !price) {
      return alert('Input the name, price!');
    }
    //문제발생구간 edit모드에서 수정후 save누르면 업데이트가 아니라 새로추가됨..
    //const id = Number(idRef.current?.value) || 0;
    const id = cartItem ? cartItem.id : 0;
    console.log('submitHandler id>>', id);
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
      console.log('useEffect 리턴문 실행');
      return;
    }
    console.log('item>>', cartItem);
    itemNameRef.current.focus();

    idRef.current.value = cartItem.id.toString();
    console.log('idRef.value>>', idRef.current.value);
    itemNameRef.current.value = cartItem.name;
    itemPriceRef.current.value = cartItem.price.toString();
  }, [cartItem]);

  return (
    <form onSubmit={submitHanlder} className='flex gap-2'>
      <Input type='hidden' ref={idRef} />
      <Input ref={itemNameRef} placeholder='상품명...' onChange={checkDirty} />
      <Input
        type='number'
        ref={itemPriceRef}
        placeholder='가격...'
        onChange={checkDirty}
      />
      {hasDirty && (
        <div className='flex gap-3'>
          <Button type='reset' onClick={toggleEditing}>
            Cancel
          </Button>
          <Button type='submit'>Save</Button>
        </div>
      )}
    </form>
  );
}
