import { useCallback, useEffect, useRef } from 'react';

type TimerFn = typeof setTimeout | typeof setInterval;
type ClearFn = typeof clearTimeout | typeof clearInterval;

function useTimer<T extends (...args: Parameters<T>) => ReturnType<T>>(
  this: { timerFn: TimerFn; clearFn: ClearFn },
  cb: T,
  delay: number,
  ...args: Parameters<T>
) {
  const cbRef = useRef(cb);
  const argsRef = useRef(args);
  const timerRef = useRef<ReturnType<typeof this.timerFn>>();

  const { timerFn, clearFn } = this;
  const setup = useCallback(() => {
    timerRef.current = timerFn(cbRef.current, delay, ...argsRef.current);
  }, [delay, timerFn]);
  const clear = useCallback(() => clearFn(timerRef.current), [clearFn]);
  const reset = useCallback(() => {
    clear();
    setup();
  }, [clear, setup]);

  useEffect(() => {
    setup();
    return clear;
  }, [setup, clear]);

  return { reset, clear };
}

export const useDebounce = <T extends (...args: unknown[]) => ReturnType<T>>(
  cb: T,
  delay: number,
  depArr: unknown[] = []
) => {
  const { reset } = useTimeout(cb, delay);
  useEffect(reset, [...depArr, delay]);
};

export const useTimeout = useTimer.bind({
  timerFn: setTimeout,
  clearFn: clearTimeout,
});

export const useTimeout2 = (cb: () => void, delay: number) => {
  useEffect(() => {
    const intl = setTimeout(cb, delay);
    return () => clearTimeout(intl);
  }, [cb, delay]);
};

export const useInterval = <T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number,
  ...args: T
) => {
  //5번 돌고 멈추려면??
  useEffect(() => {
    let runCnt = 0;
    const intl = setInterval(() => {
      runCnt += 1;
      if (runCnt >= 5) clearInterval(intl);
      cb(...args);
    }, delay);

    return () => clearInterval(intl);
  }, [args, cb, delay]);
};
