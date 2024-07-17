'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/lib/actions/auth.actions/logout.actions';
import paths from '@/lib/paths';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AvatarDropdownMenu() {
  const router = useRouter();

  const handleLogout = async () => {
    toast.success('You are signed out!');
    await logout();
    router.push(paths.login());
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar>
          {/* <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        /> */}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>User Name</p>
        <ChevronDown size={16} strokeWidth={1} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
