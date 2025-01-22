import Link from 'next/link';
import { auth } from '@/lib/auth';

export default async function Nav() {
  const session = await auth();
  const didLogin = session?.user?.email;
  console.log('Nav - session:', session);
  return (
    <nav className='flex shadow-md justify-around p-2'>
      <Link href='/' className='text-green-400'>
        Bookmark Home
      </Link>
      {didLogin ? (
        <Link href='/api/auth/signout'>SignOut</Link>
      ) : (
        <Link href='/api/auth/signin'>SignIn</Link>
      )}
    </nav>
  );
}
