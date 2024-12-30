import Link from 'next/link';

export default function Nav() {
  return (
    <nav className='flex shadow-md justify-around p-2'>
      <Link href='/' className='text-green-400'>
        Bookmark Home
      </Link>
      <a>Login</a>
    </nav>
  );
}
