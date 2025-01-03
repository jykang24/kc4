import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Mark from './Mark';
import MarkEditor from './MarkEditor';

type Props = {
  id: number;
  name: string;
  //   editBook?: (id: number) => void;
  toggleMark?: () => void;
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
export default function Book({ id, name }: Props) {
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
      <p className='text-center m-2'>
        {id} {name}
      </p>

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
