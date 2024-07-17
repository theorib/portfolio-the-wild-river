'use server';

import { hash, verify } from 'crypto';
import { Argon2id } from 'oslo/password';

import 'server-only';

const argon2id = new Argon2id();

export async function hashInput(input: string) {
  const hashedInput = await argon2id.hash(input);
  return hashedInput;
}

export async function verifyInputAgainstHash(input: string, hash: string) {
  console.log('running verifyInputAgainstHash');

  const isInputCorrect = await argon2id.verify(hash, input);
  console.log(
    'running verifyInputAgainstHash - isInputCorrect',
    isInputCorrect,
  );
  return isInputCorrect;
}

export const getPasswordHash = hashInput;
export const verifyPasswordAgainstHash = verifyInputAgainstHash;
