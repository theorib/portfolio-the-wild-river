import paths, { Paths } from '@/lib/constants/paths';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { TypeID } from 'typeid-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProtectedRoutes(paths: Paths): string[] {
  const protectedRoutes = Object.values(paths).reduce((acc, path) => {
    if (path.isProtectedRoute && typeof path.pathname === 'string')
      acc.push(path.pathname);
    if (path.isProtectedRoute && typeof path.pathname !== 'string')
      acc.push(path.pathname('*'));

    return acc;
  }, [] as string[]);

  return protectedRoutes;
}

export const typeIdString = (prefix?: string) =>
  z.string().refine(
    str => {
      try {
        const parsed = TypeID.fromString(str, prefix);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: `Invalid TypeID string${prefix ? ` with prefix ${prefix}` : ''}`,
    },
  );

export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  const firstInitial = words[0][0];
  const lastInitial = words[words.length - 1][0];

  return (firstInitial + lastInitial).toUpperCase();
}

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};

export const isTypeID = (str: string, prefix?: string) => {
  try {
    const parsed = TypeID.fromString(str, prefix);
    if (parsed) return true;
    return false;
  } catch (error) {
    return false;
  }
};
