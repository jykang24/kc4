import { useState } from 'react';

export const useToggle = () => {
  const [isShow, setShow] = useState(false);
  const toggle = () => setShow((preState) => !preState);
  return [isShow, toggle] as const;
};
//const [,toggle]=useToggle()
