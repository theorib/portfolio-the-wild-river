'use client';
import { lazy, Suspense } from 'react';
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

import { useDebounce } from 'use-debounce';
import { useServerAction } from 'zsa-react';
import { useRouter } from 'next/navigation';
import paths from '@/lib/constants/paths';
const PasswordStrength = lazy(
  () => import('@/components/auth/PasswordStrength'),
);
import PasswordStrengthSkeleton from '@/components/auth/PasswordStrengthSkeleton';
import { registerUserAction } from '@/lib/auth';
import { RegisterFormSchema } from '@/lib/auth/authZodSchemas';

export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });
  const password = form.watch('password');
  const [debouncedPassword] = useDebounce(password, 200);

  const router = useRouter();
  const { isPending, execute, error, isError, reset, isSuccess } =
    useServerAction(registerUserAction);

  if (isError) {
    toast.error(error.message);
    reset();
    form.reset();
  }

  if (isSuccess) {
    toast.success('Account created successfully!');
    // router.push(paths.dashboard.pathname);
    reset();
    // form.reset();
  }

  async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
    await execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  autoComplete="name"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  autoComplete="email"
                  // placeholder="luke@skywalker.com"
                  {...field}
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
                  disabled={isPending}
                  type="password"
                  autoComplete="new-password"
                  // placeholder="Py#kBf3WbD0kB*!&^r5K*&rZ403%hd"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="password"
                  autoComplete="new-password"
                  // placeholder="Py#kBf3WbD0kB*ja!C3FSJ&^r5K*&rZ403%hd"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Suspense fallback={<PasswordStrengthSkeleton />}>
          <PasswordStrength password={debouncedPassword} />
        </Suspense>
        <Button type="submit" disabled={isPending} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
