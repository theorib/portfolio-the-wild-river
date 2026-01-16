'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { isSomeTrue } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

import useLogout from '@/features/auth/hooks/useLogout';
import useUser from '@/features/auth/hooks/useUser';
import { getAvatarDropdownData } from '@/features/avatarDropDown/utils';

export default function AvatarDropdownMenu() {
	const useUserQuery = useUser();
	const { data: user } = useUserQuery;
	const useLogoutQuery = useLogout();
	const { logout } = useLogoutQuery;

	const isLoading = isSomeTrue([useUserQuery.isLoading, useUserQuery.isPending]);
	const isLoggingOut = useLogoutQuery.isPending;

	if (isLoggingOut) return <p>logging out...</p>;

	if (isLoading) return <p>loading...</p>;

	const fullName = user?.userMetadata
		? `${user.userMetadata.first_name ?? ''} ${user.userMetadata.last_name ?? ''}`.trim()
		: undefined;

	const { avatarUrl, firstName, initials, fullName: displayName } = getAvatarDropdownData({
		fullName,
		avatarUrl: user?.userMetadata?.avatar_url,
		isLoading,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center gap-2">
				<Avatar className="size-9">
					{avatarUrl ? (
						<AvatarImage src={avatarUrl} alt={`${displayName}'s avatar`} />
					) : (
						<AvatarFallback className="text-sm">{initials}</AvatarFallback>
					)}
				</Avatar>
				<p>{firstName}</p>
				<ChevronDown size={16} strokeWidth={1} />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
