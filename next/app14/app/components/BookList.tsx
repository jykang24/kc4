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
  const [book, setBook] = useState<BookType | null>(null);
  const [bookList, setBookList] = useState<BookType[]>([]); //books상태관리?
  const [isAddingBook, setAddingBook] = useState(false);

  const addBook = () => {
    setAddingBook(true);
  };
  const toggleBook = () => setAddingBook((pre) => !pre);

  // const editBook = (book: BookType) => {//TODO: book수정하기
  //   toggleBook();
  //   setBook(book);
  // };
  const deleteBook = (id: number) => {
    const isDeleting = confirm('현재 book폴더를 삭제할까요?');
    if (isDeleting) {
      alert('book폴더를 삭제했습니다');
      setBookList(bookList.filter((book) => book.id !== id));
    }
  };

  const saveBookList = ({ id, name }: { id: number; name: string }) => {
    const isEditing = id;
    if (isEditing != 0) {
      //edit모드
      console.log('Edit book, bookList edit>>', bookList);
      setBookList(
        bookList.map((book) => (book.id === id ? { id, name } : book))
      );
    } else {
      //add모드
      console.log('Add book now...', bookList);
      setBookList([
        ...bookList,
        { id: Date.now(), name }, //newBook
      ]);
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
          // saveBookList={saveBookList}
          toggleBook={toggleBook}
          deleteBook={deleteBook}
        />
      ))}

      {isAddingBook ? (
        <BookEditor
          book={book}
          saveBookList={saveBookList}
          toggleBook={toggleBook}
        />
      ) : (
        <Button onClick={addBook}>+ Add Book ({bookList.length})</Button>
      )}
    </main>
  );
}
