import { ReactNode, useState } from 'react';
type TitleProps = { text: string; name: string };
const Title = ({ text, name }: TitleProps) => (
  <h1 className='text-3xl'>
    {text} {name}
  </h1>
);
const Body = ({ children }: { children: ReactNode }) => {
  //   console.log('Bodyyyy!!!');
  return (
    <div className='red' style={{ color: 'blue' }}>
      {children}
    </div>
  );
};
type Props = {
  name: string;
  age: number;
  plusCount: () => void;
};
export default function Hello({ name, age, plusCount }: Props) {
  const [myState, setMyState] = useState(0);
  let v = 1;
  //   console.log('Hello Again!!! v,myState', v, myState);
  return (
    <div className='border-slate-300 p-3'>
      <Title text='hi~' name={name} />
      <Body>
        This is Hello Body Component {v}-{myState}-{age}
      </Body>
      <button
        onClick={() => {
          v++;
          plusCount();
          setMyState(myState + 1);
          //console.log('v/myState', v, myState);
        }}
      >
        Click here!
      </button>
      <strong className='mx-5'>{v}</strong>
    </div>
  );
}
