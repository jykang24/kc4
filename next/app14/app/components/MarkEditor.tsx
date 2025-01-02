import { Button } from '@/components/ui/button';
import { FormEvent, useEffect, useRef } from 'react';
import { fetchData } from '../actions/fetchData';

// import FetchButton from './fetchButton';

export type MarkType = {
  id: number;
  imgUrl?: string;
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
    //TODO:save눌렀을때 저장되는것 처리
    if (!urlRef) {
      return alert('Ref is null');
    }

    setMarkList([
      ...markList,
      {
        id: 9999,
        description: '임시설명... 나중에 변경할것', //TODO:
        title: titleRef.current?.value || '',
        imgUrl: imgRef.current?.value || '',
      },
    ]);
  };

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Fetch Button clicked!!');
    if (!urlRef) return alert('urlRef is null');
    const metadata = await fetchData(urlRef.current?.value || ' ');
    console.log('metadata>>', metadata);
    // setMarkList()
  };

  useEffect(() => {
    console.log('markList updated, Mark Editor rendering..');
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
        {/* <button className='bg-blue-200 rounded-md p-1'>Import</button> */}
        {/* <FetchButton url={urlRef.current.value} markList={markList}></FetchButton> */}
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
