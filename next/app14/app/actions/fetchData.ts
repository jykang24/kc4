'use server';

export async function fetchData(url: string) {
  console.log('fetch Data from this url>>', url);
  const data = await fetch(url).then((res) => res.text());
  return data;
}
