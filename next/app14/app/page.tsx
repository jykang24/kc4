'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Book from './components/Book';
import BookEditor from './components/BookEditor';

type BookType = {
  id: number;
  name: string;
  // withDel:boolean;
};

export default function Home() {
  //const [bookList, setBookList] = useState<BookType[]>([]); //QQQ books상태관리?
  const [bookList, setBookList] = useState<BookType[]>([
    { id: 1, name: 'Bookmark mark' },
  ]);
  const [isAddingBook, setAddingBook] = useState(false);

  const addBook = () => {
    setAddingBook(true);
  };
  const toggleBook = () => setAddingBook((pre) => !pre);

  useEffect(() => {
    console.log('updated BookList, rendering now...', bookList);
  }, [bookList]);

  return (
    <div className='snap-x grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <Button>테스트용 버튼</Button>

      <main className='flex gap-8 row-start-2 items-center sm:items-start'>
        {bookList.map((book) => {
          return <Book key={book.id} id={book.id} name={book.name} />;
        })}

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

      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='https://nextjs.org/icons/file.svg'
            alt='File icon'
            width={16}
            height={16}
          />
          Learn
        </a>

        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='https://nextjs.org/icons/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
        <Link href='/hello'>Hello</Link>
      </footer>
    </div>
  );
}
