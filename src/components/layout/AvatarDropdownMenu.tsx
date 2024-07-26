'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout, useSession } from '@/lib/auth';

import paths from '@/lib/constants/paths';
import { getInitials } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AvatarDropdownMenu() {
  const router = useRouter();
  const { user } = useSession();
  // if (!user) router.push(paths.login());

  const initials = user?.name ? getInitials(user?.name) : '**';

  const handleLogout = async () => {
    toast.success('You are signed out!');
    await logout();
    router.push(paths.login.pathname);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={user?.image ? user.image : undefined}
            alt={`${user?.name}'s avatar`}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <p>{user?.name}</p>
        <ChevronDown size={16} strokeWidth={1} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
