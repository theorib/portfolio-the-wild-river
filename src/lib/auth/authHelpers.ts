'use server';
import 'server-only';
import { cache } from 'react';
import { z } from 'zod';
import { Argon2id } from 'oslo/password';
// import Argon2 from '@node-rs/argon2';
import { Cookie, Session } from 'lucia';
import { cookies } from 'next/headers';
import { lucia } from '@/lib/auth/lucia';
import { SelectUserAuth, SelectUserAuthSchema } from '@/db/schemas';
import { redirect } from 'next/navigation';
import paths from '@/lib/constants/paths';
import { AppError } from '@/lib/errors';
import { ErrorCatalogMessage } from '@/lib/constants/errorCatalog';
import { NextRequest } from 'next/server';

/**
 * Passwords
 **/
const argon2id = new Argon2id();

export async function hashInput(input: string) {
  // const hashedInput = await Argon2.hash(input);
  const hashedInput = await argon2id.hash(input);
  return hashedInput;
}

export async function verifyInputAgainstHash(input: string, hash: string) {
  // const isInputCorrect = await argon2.verify(input, hash);
  const isInputCorrect = await argon2id.verify(hash, input);
  return isInputCorrect;
}

/**
 * Cookies
 **/
export async function setCookie(cookie: Cookie) {
  try {
    cookies().set(cookie.name, cookie.value, cookie.attributes);
  } catch (error) {
    // Next.js throws an error when attempting to set cookies when rendering page
  }
}

export async function createSessionCookie(sessionId: string) {
  const sessionCookie = lucia.createSessionCookie(sessionId);
  await setCookie(sessionCookie);
}

export async function invalidateSessionCookie() {
  const sessionCookie = lucia.createBlankSessionCookie();
  await setCookie(sessionCookie);
}

/**
 * Sessions
 **/
export async function setSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  await createSessionCookie(session.id);
}

export type ValidateSessionSuccessResult = {
  user: SelectUserAuth;
  session: Session;
  isSuccess: true;
  error: null;
};
export type ValidateSessionErrorResult = {
  user: null;
  session: null;
  isSuccess: false;
  error: AppError;
};

export type ValidateSessionResult =
  | ValidateSessionSuccessResult
  | ValidateSessionErrorResult;

export type ValidateSessionResultClient =
  | ValidateSessionSuccessResult
  | (Omit<ValidateSessionErrorResult, 'error'> & {
      error: ErrorCatalogMessage;
    });

export const validateSession = cache(
  async (): Promise<ValidateSessionResult> => {
    try {
      const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
      if (!sessionId) throw new AppError('INVALID_SESSION');

      const { user, session } = await lucia.validateSession(sessionId);

      if (session && session.fresh) await createSessionCookie(session.id);
      if (!session) throw new AppError('INVALID_SESSION');

      if (!user || !session) throw new AppError('INVALID_SESSION');

      const parsedUserResults = z
        .optional(SelectUserAuthSchema)
        .safeParse(user);
      if (!parsedUserResults.success || !parsedUserResults.data) {
        throw new AppError('ZOD_PARSING_ERROR', {
          cause: parsedUserResults.error,
        });
      }

      return {
        user: parsedUserResults.data,
        session,
        isSuccess: true,
        error: null,
      };
    } catch (error) {
      await invalidateSessionCookie();

      const parsedError: AppError =
        error instanceof AppError
          ? error
          : new AppError('UNKNOWN_ERROR', {
              cause: error,
            });

      // TODO log Error

      return {
        user: null,
        session: null,
        isSuccess: false,
        error: parsedError,
      };
    }
  },
);

export const isSessionValid = async function (): Promise<boolean> {
  const { isSuccess } = await validateSession();
  return isSuccess;
};

export const validateSessionClient = cache(
  async (): Promise<ValidateSessionResultClient> => {
    const { user, session, isSuccess, error } = await validateSession();
    if (!isSuccess) return { user, session, isSuccess, error: error.message };
    return { user, session, isSuccess, error };
  },
);

export type ValidateSessionApiResponse =
  | {
      data: ValidateSessionSuccessResult;
      success: true;
      status: 200;
    }
  | {
      data: ValidateSessionErrorResult;
      success: false;
      status: 401;
    };

export const validateSessionViaApi = async function (
  request: NextRequest,
): Promise<ValidateSessionApiResponse> {
  const response = await fetch(
    `${request.nextUrl.origin}/auth/validate-session`,
    {
      method: 'GET',
      headers: {
        Cookie: request.headers.get('Cookie') || '',
      },
    },
  );
  const data = await response.json();
  return data;
};

export const isSessionValidApi = async function (
  request: NextRequest,
): Promise<boolean> {
  const { success } = await validateSessionViaApi(request);
  return success;
};

export const logout = async () => {
  const { session } = await validateSession();
  if (!session) throw new AppError('INVALID_SESSION');

  await lucia.invalidateSession(session.id);
  await invalidateSessionCookie();
  return redirect(paths.login.pathname);
};
