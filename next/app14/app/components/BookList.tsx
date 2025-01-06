import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Book from './Book';
import BookEditor from './BookEditor';

type BookType = {
  id: number;
  name: string;
  // withDel:boolean;
};

export default function BookList() {
  const [bookList, setBookList] = useState<BookType[]>([]); //books상태관리?
  const [isAddingBook, setAddingBook] = useState(false);

  const addBook = () => {
    setAddingBook(true);
  };
  const toggleBook = () => setAddingBook((pre) => !pre);

  const editBook = (id: number) => {
    toggleBook();
  };
  const deleteBook = (id: number) => {
    const isDeleting = confirm('현재 book폴더를 삭제할까요?');
    if (isDeleting) {
      alert('book폴더를 삭제했습니다');
      setBookList(bookList.filter((book) => book.id !== id));
    }
  };

  useEffect(() => {
    console.log('updated BookList, rendering page now...', bookList);
  }, [bookList]);

  return (
    <main className='flex gap-8 row-start-2 items-center sm:items-start'>
      {bookList.map((book) => (
        <Book
          key={book.id}
          id={book.id}
          name={book.name}
          editBook={editBook}
          deleteBook={deleteBook}
        />
      ))}

      {isAddingBook ? (
        <BookEditor
          bookList={bookList}
          setBookList={setBookList}
          toggleEditing={toggleBook}
        />
      ) : (
        <Button onClick={addBook}>+ Add Book ({bookList.length})</Button>
      )}
    </main>
  );
}
