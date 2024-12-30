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
  //   editBook?: (id: number) => void;
  // toggleMark?: () => void;
  // withDel:boolean;
};

export default function Home() {
  //const bookList: BookType[] = []; //QQQ books상태관리?
  const [bookList, setBookList] = useState<BookType[]>([
    { id: 1, name: 'Bookmark mark' },
  ]);
  const [count, setCount] = useState(0);
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
        {/* TODO: div>Book컴포넌트로 수정,Book 안에 Mark여러개 들어가도록 변경, 세로로 길게나타내기,스크롤추가 */}

        {bookList.map((book) => {
          return <Book key={book.id} id={book.id} name={book.name} />;
        })}

        {/* TODO: 누르면 book name수정할수있게 변경
          <p onClick={editBook} className='text-center m-2'>
            BookMark BookMark
          </p>
          <Mark
            title='네이버'
            description='네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요'
          />
          <Mark title='Kakao' />
          <Mark title='Youtube' /> */}

        {isAddingBook ? (
          <BookEditor
            bookList={bookList}
            setBookList={setBookList}
            toggleEditing={toggleBook}
            plusCount={() => setCount((pre) => pre + 1)}
          />
        ) : (
          <Button onClick={addBook}>
            + Add Book ({count}) ({bookList.length})
          </Button>
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
