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
