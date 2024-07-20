'use server';
import 'server-only';
import { lucia } from '@/lib/auth';
import { Cookie } from 'lucia';
import { cookies } from 'next/headers';

export const setCookie = async (cookie: Cookie) => {
  try {
    cookies().set(cookie.name, cookie.value, cookie.attributes);
  } catch (error) {
    // Next.js throws an error when attempting to set cookies when rendering page
  }
};

export const createSessionCookie = async (sessionId: string) => {
  const sessionCookie = lucia.createSessionCookie(sessionId);
  await setCookie(sessionCookie);
};

export const invalidateSessionCookie = async () => {
  const sessionCookie = lucia.createBlankSessionCookie();
  await setCookie(sessionCookie);
};
