'use server';
import { AppErrorObject } from '@/lib/errors';
import { LoginFormSchema } from '@/lib/schemas';
import 'server-only';
import { toast } from 'sonner';
import { z } from 'zod';

const login = async function (values: z.infer<typeof LoginFormSchema>) {
  // const validatedValues = LoginFormSchema.safeParse(values);
  // if (!validatedValues.success) {
  //   return {
  //     error: new AppErrorObject('invalidUser'),
  //   };
  // }
  // return {
  //   error: new AppErrorObject('invalidUser'),
  // };
};

export default login;
