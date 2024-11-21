import { ChangeEvent, RefObject } from 'react';

export type Props = {
  type?: string;
  id?: string;
  ref?: RefObject<HTMLInputElement>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: number | string;
};
export default function Input({
  type = 'text',
  id,
  onChange,
  value,
  ref,
}: Props) {
  return (
    <input
      type={type}
      id={id}
      ref={ref}
      onChange={onChange}
      value={value}
      className='border ring-1'
    />
  );
}
