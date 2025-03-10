import BookingsTable from '@/features/bookings/bookingsTable/BookingsTable'
import {
  PageHeader,
  PageHeaderTitle,
} from '@/shared/components/ui-custom/PageHeader'

export default function BookingsPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Bookings</PageHeaderTitle>
      </PageHeader>
      <BookingsTable />
    </>
  )
}
