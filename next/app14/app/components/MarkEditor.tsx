import { FormEvent } from 'react';

type Props = {
  toggleEditing: () => void;
};

export default function MarkEditor({ toggleEditing }: Props) {
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Mark Submit!!!');
    //TODO:save눌렀을때 저장되는것 처리, input4개박스 모두 ref로 할건지?
    //addMark([...book,])
  };

  return (
    <form className='flex flex-col gap-4'>
      URL
      <div className='flex gap-2 justify-between'>
        <input type='text' placeholder='URL...' className='flex-1' />
        <button className='bg-blue-200 rounded-md p-1'>Import</button>
      </div>
      <label className='flex flex-col'>
        Title
        <input type='text' placeholder='제목을 입력하세요...' />
      </label>
      <label>Description</label>
      <input type='text' placeholder='페이지 설명을 입력하세요...' />
      Image URL
      <input type='text' placeholder='Image URL...' />
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
