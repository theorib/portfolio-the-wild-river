import { z } from 'zod';
import { TypeID } from 'typeid-js';

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
