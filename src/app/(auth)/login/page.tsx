import { auth } from '@/auth';
import CardWrapper from '@/components/auth/CardWrapper';
import LoginForm from '@/components/auth/LoginForm';
import paths from '@/lib/paths';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();

  if (session && session.user) {
    redirect(paths.dashboard());
  }

  return (
    <CardWrapper
      headerLabel="Login"
      redirectLinkHref={paths.register()}
      redirectLinkLabel="Don't have an account? Register..."
    >
      <LoginForm />
    </CardWrapper>
  );
}
