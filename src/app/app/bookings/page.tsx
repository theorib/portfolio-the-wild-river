import BookingsFilter from '@/features/bookings/components/BookingsFilter'
import BookingsSort from '@/features/bookings/components/BookingsSort'
import BookingsTable from '@/features/bookings/components/BookingsTable'
import {
  PageHeader,
  PageHeaderTitle,
} from '@/shared/components/ui-custom/PageHeader'

export default function BookingsPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Bookings</PageHeaderTitle>
        <div className="flex items-center gap-3">
          <BookingsFilter />
          <BookingsSort />
        </div>
      </PageHeader>
      <BookingsTable />
    </>
  )
}
