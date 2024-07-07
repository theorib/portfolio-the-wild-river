import { auth } from '@/auth';
import CardWrapper from '@/components/auth/CardWrapper';
import RegisterForm from '@/components/auth/RegisterForm';
import paths from '@/lib/paths';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await auth();

  if (session && session.user) {
    redirect(paths.dashboard());
  }

  return (
    <CardWrapper
      headerLabel="Register"
      redirectLinkHref={paths.login()}
      redirectLinkLabel="Already have an account? Login..."
    >
      <RegisterForm />
    </CardWrapper>
  );
}
