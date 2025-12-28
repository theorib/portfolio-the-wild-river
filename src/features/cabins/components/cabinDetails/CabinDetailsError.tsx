import { useParams } from 'next/navigation';

export default function CabinDetailsError() {
	const { cabinId } = useParams<{ cabinId: string }>();
	return <div>Error retrieving booking #{cabinId}</div>;
}
