import { useEffect } from 'react';

export const useTimeout = (cb: () => void, delay: number) => {
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
    const intl = setInterval((...args: T) => {
      cb(...args);
      if (runCnt > 5) clearInterval(intl);
      runCnt += 1;
    }, delay);

    return () => clearInterval(intl);
  }, [args, cb, delay]);
};
