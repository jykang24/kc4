import { FormEvent, useRef, useState } from 'react';

type BookType = {
  id: number;
  name: string;
  //   editBook?: (id: number) => void;
  //   toggleMark?: () => void;
  // withDel:boolean; //TODO:
};
type Props = {
  bookList: BookType[];
  setBookList: (booklist: BookType[]) => void;
  book?: BookType; //QQQ 단일 book을 받을건지, list로 받을건지?
  toggleEditing: () => void;
  plusCount: () => void;
};

//TODO: book삭제시 plusCount말고 minusCount
export default function BookEditor({
  bookList,
  setBookList,
  book,
  toggleEditing,
  plusCount,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setEditing] = useState(false); //isEditing true= edit할 상태, false=add할 상태
  if (book) setEditing(true); //book있으면 edit, 없으면 add
  const BOOK_ID = book?.id || 0; //book있으면 id,

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!inputRef) {
      alert('inputRef is null');
      return;
    }
    if (!inputRef.current?.value) {
      inputRef.current?.focus(); //QQQ 왜 null?
      return alert('please enter book name');
    }

    if (!isEditing) {
      //add
      console.log('Book Editor adding now');
      console.log('Before bookList add>>', bookList);

      setBookList([
        ...bookList,
        { id: bookList.length + 20, name: inputRef.current.value || '' },
      ]); //TODO: id바꾸기 test중
      //   setBookList((preBookList: BookType[]) => [
      //     ...preBookList,
      //     { id: 1000000, name: inputRef.current?.value || '' },
      //   ]);
      //console.log('bookList added>>', bookList); //여기선 바로 반영이 안됨.
      plusCount();
    } else {
      setBookList(
        bookList.map((book) =>
          book.id === BOOK_ID
            ? { ...book, name: inputRef.current?.value || '' }
            : book
        )
      );
      console.log('Book Editor editing now');
    }

    console.log('Book editor submit now!!');
    toggleEditing(); //save버튼 눌러서 submit하면 toggle
  };
  //book있으면 edit모드, formSubmit할때 edit
  //book없으면 add모드, formSubmit할때 add

  //   const formSubmit1 = (e: FormEvent) => {
  //     e.preventDefault();
  //     if (!inputRef) {
  //       alert('inputRef is null');
  //       return;
  //     }
  //     if (!inputRef.current?.value) {
  //       inputRef.current?.focus(); //QQQ 왜 null?
  //       return alert('please enter book name');
  //     }
  //     //TODO: 여기부터 하는중
  //     //QQQ isAdding? isEditing?
  //     //id = 있으면 받고 || 0;
  //     //Adding이면 (id=0) book.id, book.name추가해서 [...bookList, newBook:{id:xx,name:xxx}]
  //     // if (isEditing) {
  //     //   //edit중
  //     // }
  //     if (!isEditing) {
  //       //add중
  //       setBookList(...bookList);
  //       plusCount();
  //     }
  //     //Editing이면 book.id인 book을 찾아서
  //     // setbooklist( ...boolist.filter(book=>book.id!==id), book={id:id,name:newName}
  //     //})

  //     //setBook(...Book, {id: ,name: inputRef.current.value});
  //     toggleEditing();
  //     console.log('Book Editor Submit!!!');
  //   };

  return (
    <form
      id='container'
      className='flex flex-col gap-4 p-2 bg-slate-200 rounded-sm'
    >
      <p className='text-center'>Book Editor</p>

      <input
        ref={inputRef}
        type='text'
        placeholder='New Book...'
        className='rounded-sm'
      />
      <div className='flex gap-2'>
        <input type='checkbox' id='withdel' />
        <label htmlFor='withdel' className=''>
          이동시 자동 삭제
        </label>
      </div>
      <div className='flex justify-around'>
        <button onClick={toggleEditing} className='rounded-md bg-green-200 p-1'>
          Close
        </button>
        <button
          type='submit'
          onClick={formSubmit}
          className='rounded-md bg-blue-200 p-1'
        >
          Save
        </button>
      </div>
    </form>
  );
}
