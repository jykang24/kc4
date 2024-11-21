type Props = {
  name: string | undefined;
  age: number;
  plusCount: () => void;
};
export default function Hello({ name, age, plusCount }: Props) {
  return (
    <>
      <h2>
        Hello {name}!<small className='font-xs'>({age})</small>
      </h2>
      <button onClick={plusCount} className='btn mb-3'>
        PlusCount
      </button>
    </>
  );
}
