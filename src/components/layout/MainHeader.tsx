import { DarkModeToggle } from '@/components/DarkModeToggle';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { logout } from '@/lib/actions/auth.actions/logout.actions';
import LogoutButtonClientBare from '@/components/auth/LogoutButtonClientBare';
import { MouseEvent } from 'react';
import { toast } from 'sonner';
import AvatarDropdownMenu from '@/components/layout/AvatarDropdownMenu';

type MainHeaderProps = {
  className?: string;
};

function MainHeader({ className }: MainHeaderProps) {
  return (
    <header className={cn('', className)}>
      <div className="flex grow items-center justify-end gap-4 text-right">
        <div className="flex h-5 items-center gap-2 text-sm"></div>
        <AvatarDropdownMenu />
        <DarkModeToggle />
      </div>
    </header>
  );
}
export default MainHeader;
