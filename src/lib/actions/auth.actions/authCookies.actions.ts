'use server';
import 'server-only';
import { lucia } from '@/lib/auth';
import { Cookie } from 'lucia';
import { cookies } from 'next/headers';
import { setCookie as setCookiesNext } from 'cookies-next';
// Set's cookies in the user's browser via Next.js cookies function
export const setCookie = async (cookie: Cookie) => {
  console.log('running setCookie');
  // console.log('running setCookie', cookie);
  try {
    cookies().set(cookie.name, cookie.value, cookie.attributes);
    // setCookiesNext('test_cookie', 'test-cookie-value', { cookies });
    // setCookiesNext(cookie.name, cookie.value, cookie.attributes);
    console.log('successfully ran setCookie');
  } catch (error) {
    console.log('setCookie threw an error');

    // Next.js throws an error when attempting to set cookies when rendering page
    // console.error(
    //   'Next.js throws an error when attempting to set cookies when rendering page',
    //   // error,
    // );
  }
};

export const createSessionCookie = async (sessionId: string) => {
  console.log('running createSessionCookie');
  const sessionCookie = lucia.createSessionCookie(sessionId);
  await setCookie(sessionCookie);
  console.log('successfully ran createSessionCookie');
};

export const invalidateSessionCookie = async () => {
  console.log('running invalidateSessionCookie');
  const sessionCookie = lucia.createBlankSessionCookie();
  await setCookie(sessionCookie);
  console.log('successfully ran  invalidateSessionCookie');
};
