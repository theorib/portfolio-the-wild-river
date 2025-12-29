import { PageHeader, PageHeaderTitle } from '@/components/ui-custom/PageHeader';
import BookingsTable from '@/features/bookings/bookingsTable/BookingsTable';

export default function BookingsPage() {
	return (
		<>
			<PageHeader>
				<PageHeaderTitle>Bookings</PageHeaderTitle>
			</PageHeader>
			<BookingsTable />
		</>
	);
}
