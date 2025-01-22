import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Email',
      credentials: {
        email: {
          label: '이메일',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        console.log('auth - credentials:', credentials);
        const user = {
          id: '2',
          email: credentials.email,
          name: 'Hong',
        } as User;

        return user;
      },
    }),

    Google,
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log('account', account);
      console.log('profile', profile);
      return true;
    },
    async session({ session, token }) {
      console.log('🚀 cb - session:', session);
      console.log('🚀 cb - token:', token);

      return session;
    },
  },
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  pages: {
    // custom-login 페이지 만들때 사용
    //signIn: `/login`,
  },
});
