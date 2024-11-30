import { createContext, PropsWithChildren, useContext, useState } from 'react';

type ContextProps = {
  count: number;
  plusCount: () => void;
};

const CounterContext = createContext<ContextProps | null>(null);

export const CounterProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  const plusCount = () => setCount((pre) => pre + 1);

  return (
    <CounterContext.Provider value={{ count, plusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

//사용할때는 useCounter()
// eslint-disable-next-line react-refresh/only-export-components
export const useCounter = () => {
  const ctx = useContext(CounterContext);
  if (!ctx) throw new Error('CounterContext is null!!'); //null이면 thrwo Error!
  return ctx;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCount = () => {
  const [count, setCount] = useState(0);
  const plusCount = () => setCount((count) => count + 1);
  const minusCount = () => setCount((count) => count - 1);

  return [count, plusCount, minusCount];
};
