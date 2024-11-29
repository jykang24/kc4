import { useCounter } from './hooks/counter-hook';

type Props = {
  name: string;
  age: number;
  // plusCount: () => void;
};
export default function Hello2({ name, age }: Props) {
  const { plusCount } = useCounter();
  return (
    <div>
      <h2 onClick={plusCount}>
        Hello, {name}! <small className='text-red-500'>({age})</small>
      </h2>
    </div>
  );
}
