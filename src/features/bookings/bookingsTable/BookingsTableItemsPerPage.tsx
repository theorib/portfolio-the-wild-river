import { Route } from '@/app/app/bookings/routeType';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select';
import { $path } from 'next-typesafe-url';
import { useSearchParams } from 'next-typesafe-url/app';
import { useRouter } from 'next/navigation';

export function BookingsTableItemsPerPage() {
	const { data: searchParams, isLoading } = useSearchParams(Route.searchParams);
	const router = useRouter();

	const itemsPerPage = ['5', '10', '20', '25'];

	if (!isLoading && searchParams?.pagination) {
		const { pagination } = searchParams;

		const handleChange = (value: string | null) => {
			if (!value) return;
			const newUrl = $path({
				route: '/app/bookings',
				searchParams: {
					...searchParams,
					pagination: {
						...pagination,
						numberOfItems: parseInt(value),
					},
				},
			});
			router.push(newUrl);
			//
		};

		return (
			<div className="flex items-center gap-2">
				<span>Page Size</span>
				<Select defaultValue={String(pagination.numberOfItems)} onValueChange={handleChange}>
					<SelectTrigger className="w-20">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Items per page</SelectLabel>
							{itemsPerPage.map((item) => {
								return (
									<SelectItem value={item} key={`itemsPerPage-${item}`}>
										{item}
									</SelectItem>
								);
							})}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		);
	}

	return null;
}
