'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { logout } from '@/lib/auth';
import paths from '@/lib/paths';

import { useRouter } from 'next/navigation';

import { FormEvent, type MouseEvent } from 'react';
import { toast } from 'sonner';

export default function LogoutButtonClientBare() {
  const router = useRouter();

  const handleClick = async (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    toast.success('You are signed out!');
    await logout();
    router.push(paths.login());
  };

  return (
    <DropdownMenuItem onClick={handleClick} className="flex cursor-default">
      Log out
    </DropdownMenuItem>
  );
}
