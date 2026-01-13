'use client';

import { type Cabin } from '@/features/cabins/types';

import CabinsTableColumnActionsRowItem from '@/features/cabins/components/cabinsTable/CabinsTableColumnActionsRowItem';
import { DataTableColumnHeader } from '@/features/dataTable/components/DataTableColumnHeader';
import { formatCurrency } from '@/lib/utils/helpers';
import { createColumnHelper } from '@tanstack/react-table';
import Image from 'next/image';
import { z } from 'zod';

const columnHelper = createColumnHelper<Cabin>();

export const cabinsTableColumns = [
	columnHelper.accessor('image', {
		// id: 'cabinId',
		sortingFn: 'alphanumeric',
		header: 'Image',
		// header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
		cell: (props) => {
			const src = props.getValue();
			if (!src) return;
			return <Image src={src} alt={''} width={90} height={30} />;
		},
	}),

	columnHelper.accessor('id', {
		id: 'cabinId',
		sortingFn: 'alphanumeric',

		header: ({ column }) => <DataTableColumnHeader column={column} title="Cabin ID" />,
		cell: (props) => props.getValue(),
	}),

	columnHelper.accessor('name', {
		// id: 'cabinId',
		sortingFn: 'text',

		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
		cell: (props) => props.getValue(),
	}),

	columnHelper.accessor('maxCapacity', {
		// id: 'cabinId',
		sortingFn: 'alphanumeric',

		header: ({ column }) => <DataTableColumnHeader column={column} title="Capacity" />,
		cell: (props) => props.getValue(),
	}),

	columnHelper.accessor('regularPrice', {
		header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
		cell: (props) => {
			const {
				data: amount,
				error,
				success,
			} = z
				.number()
				.transform((value) => formatCurrency(value))
				.safeParse(props.getValue());

			if (error) return null;

			if (success && amount) return <span className="font-bold opacity-65">{amount}</span>;
		},
	}),
	columnHelper.accessor('discount', {
		header: ({ column }) => <DataTableColumnHeader column={column} title="Discount" />,
		cell: (props) => {
			const {
				data: amount,
				error,
				success,
			} = z
				.number()
				.transform((value) => {
					if (value) return formatCurrency(value);
					else return '—';
				})
				.safeParse(props.getValue());

			if (error) return null;

			if (success && amount)
				return <span className="font-bold opacity-65 text-green-800">{amount}</span>;
		},
	}),

	columnHelper.accessor('description', {
		// id: 'cabinId',
		sortingFn: 'text',

		header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
		cell: (props) => props.getValue(),
	}),

	columnHelper.display({
		id: 'actions',
		header: 'Actions',
		cell: (props) => {
			const cabin = props.row.original;
			return <CabinsTableColumnActionsRowItem cabin={cabin} />;
		},
	}),
];
export type CabinsColumns = typeof cabinsTableColumns;
