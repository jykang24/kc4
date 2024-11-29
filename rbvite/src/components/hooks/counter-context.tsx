import { createContext, PropsWithChildren, useContext, useState } from 'react';
type CounterContextProps = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};

const CounterContext = createContext<CounterContextProps>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});
export const CounterProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  const plusCount = () => {
    setCount((pre) => pre + 1);
    //console.log('plus count');
  };
  const minusCount = () => {
    setCount((pre) => pre - 1);
  };
  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCounter = () => {
  const ctx = useContext(CounterContext);
  if (!ctx) throw new Error('CounterContext is null');
  return ctx;
};
