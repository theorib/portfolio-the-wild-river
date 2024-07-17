import { z } from 'zod';

export const EmailSchema = z.string().email({});

export type Email = z.infer<typeof EmailSchema>;
