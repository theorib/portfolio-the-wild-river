'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import paths from '@/lib/paths';
import { signIn } from '@/auth';
import { useRouter } from 'next/navigation';
import { LoginFormSchema } from '@/schemas';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';

// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
// import login from '@/actions/login';
import { useTransition } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    startTransition(async () => {
      // const data = await login(values);
      // console.log(data);
    });
    // try {
    //   const response = await signIn('credentials', {
    //     email: values.email,
    //     password: values.password,
    //     redirect: false,
    //   });

    //   console.log(response);

    //   toast.success('You are now signed in!');
    //   router.push(paths.dashboard());
    // } catch (err: unknown) {
    //   console.error(err);
    //   if (err instanceof Error) toast.error(err.message);
    //   toast.error('Something went wrong logging into your account');
    //   return;
    // }
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
                  {...field}
                  placeholder="123*Abc_3aa"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message="Something went wrong logging into your account" />
        <FormSuccess message="Acccount Created!" />

        <Button type="submit" className="w-full" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
}
