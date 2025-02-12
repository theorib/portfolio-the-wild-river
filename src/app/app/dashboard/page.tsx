import {
  DashboardFilter,
  DashboardFilterButton,
} from '@/components/dashboard/DashboardFilter'
import DashboardStats from '@/components/dashboard/DashboardStats'
import DashboardSummary from '@/components/dashboard/DashboardSummary'
import SalesChart from '@/components/dashboard/SalesChart'
import StayChart from '@/components/dashboard/StayChart'
import { PageHeader, PageHeaderTitle } from '@/components/layout/PageHeader'

function DashboardPage() {
  // const { user } = await validateSession();

  // if (!user) redirect(paths.login.path);

  return (
    <div className="grid w-full grid-cols-4 gap-4">
      <PageHeader className="xs:flex-row col-span-4 flex w-full flex-col items-center justify-between gap-4 md:col-span-4">
        <PageHeaderTitle>Dashboard</PageHeaderTitle>
        <DashboardFilter>
          <DashboardFilterButton data-active>Last 7 Days</DashboardFilterButton>
          <DashboardFilterButton>Last 30 Days</DashboardFilterButton>
          <DashboardFilterButton>Last 90 Days</DashboardFilterButton>
        </DashboardFilter>
      </PageHeader>
      <DashboardStats className="col-span-4" />
      <DashboardSummary className="col-span-4 lg:col-span-2" />
      <StayChart className="col-span-4 lg:col-span-2" />
      <SalesChart className="col-span-4" />
    </div>
  )
}
export default DashboardPage
