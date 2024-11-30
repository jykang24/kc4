type Props = {
  name: string | undefined;
  age: number;
  plusCount: () => void;
};
export default function Hello({ name, age, plusCount }: Props) {
  return (
    <>
      <h2 onClick={plusCount} style={{ cursor: 'pointer' }}>
        Hello {name}!<small className='font-xs'>({age})</small>
      </h2>
    </>
  );
}
