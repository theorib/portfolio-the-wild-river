'use server';
import * as argon2 from 'argon2';

import 'server-only';

export async function argonVerify(password1: string, password2: string) {
  return await argon2.verify(password1, password2);
}
