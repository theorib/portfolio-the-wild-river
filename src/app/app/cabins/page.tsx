import { PageHeader, PageHeaderTitle } from '@/components/ui-custom/PageHeader';
import CabinsTable from '@/features/cabins/components/cabinsTable/CabinsTable';

export default function CabinsPage() {
	return (
		<>
			<PageHeader>
				<PageHeaderTitle>Cabins</PageHeaderTitle>
			</PageHeader>
			<CabinsTable />
		</>
	);
}
