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
  //TODO: type수정하기
  id: number;
  imgUrl?: string;
  title: string;
  description: string;
};

const sampleMark = [
  {
    id: 999,
    title: '네이버',
    description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
  },
];

//TODO: 길어지면 스크롤되도록
export default function Book({ id, name }: Props) {
  const [markList, setMarkList] = useState<MarkType[]>(sampleMark);

  //const [isEditingBook, setEditingBook] = useState(false);
  const [isAddingMark, setAddingMark] = useState(false);

  //   const editBook = (id) => {
  //     setEditingBook(true);
  //   };
  //   const toggleBook = () => setEditingBook(true);

  const toggleMark = () => setAddingMark((pre) => !pre);

  useEffect(() => {
    console.log('markList updated rendering now...');
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
      <p className='text-center m-2'>
        {id} {name}
      </p>

      <ul>
        <li>여기에 Mark가 들어갈 자리임</li>
      </ul>

      {markList.length > 0 ? (
        markList.map((mark) => (
          <Mark
            key={mark.id}
            id={mark.id}
            title={mark.title}
            description={mark.description}
            imgUrl={mark.imgUrl}
          />
        ))
      ) : (
        <p>There is no mark here.</p>
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

      {/* <div>{여기에 mark들이 들어갈것임}</div> */}
    </div>
  );
}
