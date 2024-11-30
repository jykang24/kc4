import { ChangeEvent, ForwardedRef, forwardRef, RefObject } from 'react';

export type Props = {
  type?: string;
  id?: string;
  ref?: RefObject<HTMLInputElement>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: number | string;
  placeholder?: string;
};
const Input = forwardRef(
  (
    { type = 'text', id, onChange, value, placeholder }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        type={type}
        id={id}
        ref={ref}
        onChange={onChange}
        value={value}
        className='border ring-1'
        placeholder={placeholder}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
