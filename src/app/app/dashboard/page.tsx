import PageHeader from '@/components/layout/PageHeader';

async function DashboardPage() {
  // const { user } = await validateSession();

  // if (!user) redirect(paths.login.path);

  return (
    <>
      <PageHeader pageTitle="Dashboard" />
    </>
  );
}
export default DashboardPage;
