import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Mark from './Mark';
import MarkEditor from './MarkEditor';

type BookType = {
  id: number;
  name: string;
};
type Props = {
  id: number;
  name: string;
  // bookList: BookType[];
  // setBookList: (booklist: BookType[]) => void;
  deleteBook: (id: number) => void;
  editBook: (id: number) => void;
  // withDel:boolean;
};
type MarkType = {
  id: number;
  url: string;
  imgUrl: string;
  title: string;
  description: string;
};

//TODO: 길어지면 스크롤되도록
export default function Book({ id, name, editBook, deleteBook }: Props) {
  const [markList, setMarkList] = useState<MarkType[]>([]);

  //const [isEditingBook, setEditingBook] = useState(false);
  const [isAddingMark, setAddingMark] = useState(false);

  //   const editBook = (id) => {
  //     setEditingBook(true);
  //   };
  //   const toggleBook = () => setEditingBook(true);

  const toggleMark = () => setAddingMark((pre) => !pre);

  useEffect(() => {
    console.log('markList updated Book rendering now...');
  }, [markList]);

  return (
    <div className='flex flex-col gap-4 bg-slate-200 p-2 rounded-sm'>
      {/* {isEditingBook ? (
        <BookEditor toggleEditing={toggleBook} />
      ) : (
        <p onClick={() => editBook(id)} className='text-center m-2'>
          {id} {name}
        </p>
      )} */}

      {/* /* TODO: 누르면 book name수정할수있게 변경 */}
      <p className='text-center m-2' onClick={() => editBook(id)}>
        {name} <Button onClick={() => deleteBook(id)}>Delete Book</Button>
      </p>

      {/* <span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
            />
          </svg>
        </span> */}
      {markList.length > 0 ? (
        markList.map((mark) => (
          <Mark
            key={mark.id}
            id={mark.id}
            url={mark.url}
            title={mark.title}
            description={mark.description}
            imgUrl={mark.imgUrl}
          />
        ))
      ) : (
        <p>There is no mark here... (っ °Д °;)っ</p>
      )}

      {isAddingMark ? (
        <MarkEditor
          markList={markList}
          setMarkList={setMarkList}
          toggleEditing={toggleMark}
        />
      ) : (
        <Button onClick={toggleMark}>+ Add Mark</Button>
      )}
    </div>
  );
}
