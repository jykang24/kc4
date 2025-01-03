import { Button } from '@/components/ui/button';
import { FormEvent, useEffect, useRef } from 'react';
import { fetchData } from '../actions/fetchData';

export type MarkType = {
  id: number;
  url: string;
  imgUrl: string;
  title: string;
  description: string;
};
type Props = {
  markList: MarkType[];
  setMarkList: (marklist: MarkType[]) => void;
  toggleEditing: () => void;
};

export default function MarkEditor({
  markList,
  setMarkList,
  toggleEditing,
}: Props) {
  const urlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Mark Submit!!!');

    if (!urlRef) {
      return alert('Ref is null');
    }

    //TODO:save눌렀을때 저장되는것 처리
    //setMarkList([...markList, { id: Math.max(...markList.map((mark) => mark.id), 0) + 1, title, imgUrl, description }]);
  };

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Fetch Button clicked!!');

    if (!urlRef) return alert('urlRef is null');

    if (urlRef.current != null || urlRef.current != undefined) {
      const { title, imgUrl, description } = await fetchData(
        urlRef.current.value || ' '
      );

      console.log('title', title);
      console.log('description', description);
      console.log('imgUrl', imgUrl);
      console.log('url', urlRef.current.value); //Test용

      setMarkList([
        ...markList,
        {
          id: Math.max(...markList.map((mark) => mark.id), 0) + 1,
          url: urlRef.current.value,
          title,
          imgUrl,
          description,
        },
      ]);
    }
  };

  useEffect(() => {
    console.log('markList updated, MarkEditor rendering..');
  }, [markList]);

  return (
    <form className='flex flex-col gap-4'>
      URL
      <div className='flex gap-2 justify-between'>
        <input
          type='text'
          placeholder='URL...'
          className='flex-1'
          ref={urlRef}
        />
        <Button onClick={handleClick}>Fetch</Button>
      </div>
      {/* <label className='flex flex-col'>
        Title
        <input type='text' placeholder='제목을 입력하세요...' />
      </label>
      <label>Description</label>
      <input type='text' placeholder='페이지 설명을 입력하세요...' />
      Image URL
      <input type='text' placeholder='Image URL...' /> */}
      <div className='flex gap-2 justify-end'>
        <button onClick={toggleEditing} className='rounded-md bg-blue-200 p-1'>
          Close
        </button>
        <button type='reset' className='rounded-md bg-blue-200 p-1'>
          Reset
        </button>
        <button
          onClick={formSubmit}
          type='submit'
          className='rounded-md bg-blue-200 p-1'
        >
          Save
        </button>
      </div>
    </form>
  );
}
