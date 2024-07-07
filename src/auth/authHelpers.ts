'use server';
import 'server-only';
import { auth, signIn as NextAuthSignIn, signOut as NextAuthSigOut } from '.';
import { AppError } from '@/lib/errors';

export async function signIn() {
  await NextAuthSignIn();
}

export async function signOut() {
  await NextAuthSigOut();
}

export async function getUserOrThrow(data?: unknown) {
  try {
    const session = await auth();

    if (!session || !session?.user) {
      throw new AppError('invalidSession', { data });
    }
    if (!session.user.id) {
      throw new AppError('invalidUser', { data });
    }
    if (session && session.user && session.user.id) {
      return session.user;
    }
    throw new AppError('unknownAuthError', { data });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
