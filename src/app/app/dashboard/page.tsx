import DashboardStats from '@/features/dashboard/components/DashboardStats'
import DashboardSummary from '@/features/dashboard/components/DashboardSummary'
import SalesChart from '@/features/dashboard/components/SalesChart'
import StayChart from '@/features/dashboard/components/StayChart'
import {
  PageHeader,
  PageHeaderTitle,
} from '@/shared/components/ui-custom/PageHeader'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/components/ui/toggle-group'

function DashboardPage() {
  return (
    <div className="grid w-full grid-cols-4 gap-4">
      <PageHeader className="xs:flex-row col-span-4 flex w-full flex-col items-center justify-between gap-4 md:col-span-4">
        <PageHeaderTitle>Dashboard</PageHeaderTitle>
        <ToggleGroup type="single" defaultValue="Last 7 Days">
          <ToggleGroupItem value="Last 7 Days">Last 7 Days</ToggleGroupItem>
          <ToggleGroupItem value="Last 30 Days">Last 30 Days</ToggleGroupItem>
          <ToggleGroupItem value="Last 90 Days">Last 90 Days</ToggleGroupItem>
        </ToggleGroup>
      </PageHeader>
      <DashboardStats className="col-span-4" />
      <DashboardSummary className="col-span-4 lg:col-span-2" />
      <StayChart className="col-span-4 lg:col-span-2" />
      <SalesChart className="col-span-4" />
    </div>
  )
}
export default DashboardPage
