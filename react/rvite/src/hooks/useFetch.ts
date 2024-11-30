import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(url, { signal })
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);

    // (async function () {
    //   setData(
    //     await fetch(url, { signal })
    //       .then((res) => res.json())
    //       .catch(console.error)
    //   );
    // })();

    return () => controller.abort();
  }, [url]);

  return data;
};
