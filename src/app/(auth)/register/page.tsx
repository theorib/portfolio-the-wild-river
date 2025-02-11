import CardWrapper from '@/components/auth/CardWrapper'
import RegisterForm from '@/components/auth/RegisterForm'
import paths from '@/lib/constants/paths'
import { redirect } from 'next/navigation'

export default async function RegisterPage() {
  // const session = await auth();

  // if (session && session.user) {
  //   redirect(paths.dashboard());
  // }

  return (
    <CardWrapper
      headerLabel="Register"
      redirectLinkHref={paths.login.pathname}
      redirectLinkLabel="Already have an account? Login..."
    >
      <RegisterForm />
    </CardWrapper>
  )
}
