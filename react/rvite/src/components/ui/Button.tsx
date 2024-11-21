import { ReactNode } from 'react';

type Props = {
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
};

export default function Button({
  type,
  children,
  onClick = () => {},
  className = '',
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className} flex items-center justify-center`}
    >
      {children}
    </button>
  );
}
