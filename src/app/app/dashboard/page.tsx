import PageHeader from '@/components/layout/PageHeader';
import { validateSession } from '@/lib/auth/auth.actions/authSession.actions';
import paths from '@/lib/paths';
import { typeIdString } from '@/lib/utils/utils';
import { redirect } from 'next/navigation';

async function DashboardPage() {
  const { user } = await validateSession();

  if (!user) redirect(paths.login());

  return (
    <>
      <PageHeader pageTitle="Dashboard" />
    </>
  );
}
export default DashboardPage;
