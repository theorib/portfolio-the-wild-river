'use server';
import 'server-only';

import { Cookie } from 'lucia';
import { cookies } from 'next/headers';
import { lucia } from '@/lib/auth/auth';

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
