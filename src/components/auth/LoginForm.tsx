'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import paths from '@/lib/paths';

import { useRouter } from 'next/navigation';
import { LoginFormSchema } from '@/lib/zod.schemas';

import { useServerAction } from 'zsa-react';
import { loginEmailPassword } from '@/lib/auth';

export default function LoginForm() {
  const router = useRouter();
  const { isPending, execute, error, isError, reset, isSuccess } =
    useServerAction(loginEmailPassword);
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  if (isError) {
    console.error(error);
    toast.error(error.message);
    reset();
    form.reset();
  }

  if (isSuccess && !isPending) {
    toast.success('You are signed in!');
    console.log('Login Success, calling router.push');
    // router.push(paths.dashboard());
    reset();
    // form.reset();
  }

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    await execute(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="email"
                  {...field}
                  placeholder="luke@skywalker.com"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="123*Abc_3aa"
                  disabled={isPending}
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormError message="Something went wrong logging into your account" /> */}
        {/* <FormSuccess message="Acccount Created!" /> */}

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}
