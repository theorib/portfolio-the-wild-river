import CabinsTable from '@/features/cabins/components/CabinsTable';
import { PageHeader, PageHeaderTitle } from '@/shared/components/ui-custom/PageHeader';

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
