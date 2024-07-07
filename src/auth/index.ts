// import paths from '@/lib/paths';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from '@/db';
import type { Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/db/actions';
import { argonVerify } from '@/lib/serverUtils';
import { LoginFormSchema } from '@/schemas';

// declare module 'next-auth' {
//   interface User {
//     user: {
//       id: number;
//       name: string;
//       email: string;
//     };
//   }
// }

const providers: Provider[] = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: {},
      password: {},
    },
    async authorize(credentials) {
      const validatedCredentials = LoginFormSchema.safeParse(credentials);

      if (validatedCredentials.success) {
        const user = await getUserByEmail(validatedCredentials.data.email);
        if (!user || !user.password) return null;

        const isPasswordMatch = await argonVerify(
          user.password,
          validatedCredentials.data.password,
        );

        if (isPasswordMatch) return user;
      }
      return null;
    },
  }),
];

// const authorizedEmails = ['theo@theoribeiro.com', 'adam@hiddenartfilms.com'];

export const authConfig = {
  session: {
    strategy: 'jwt',
  },
  providers,
  // basePath: paths.authBasePath(),
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  // debug: true,
  callbacks: {
    // authorized: async ({ auth }) => {
    //   return !!auth;
    // },
    // signIn: ({ profile }) => {
    //   if (!profile || !profile.email) {
    //     return false;
    //   }
    //   return authorizedEmails.includes(profile.email);
    // },
    // jwt: async ({ user, token, trigger, session }) => {
    //   if (trigger === "update") {
    //     return { ...token, ...session.user };
    //   }
    //   return { ...token, ...user };
    // },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
