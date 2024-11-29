import { PropsWithChildren } from 'react';

type Props = {
  type?: 'submit' | 'reset' | 'button' | undefined;
  classNames?: string;
  onClick?: () => void;
};
export default function Button({
  type = 'submit',
  children,
  classNames = '',
  onClick = () => {},
}: PropsWithChildren<Props>) {
  return (
    <button
      type={type}
      className={`btn ${classNames} inline-flexflex items-center gap-1`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
