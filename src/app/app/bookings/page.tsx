import BookingsTableRender from '@/features/bookings/bookingsTable/BookingsTableRender'
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
      <BookingsTableRender />
    </>
  )
}
