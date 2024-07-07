import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import paths from '@/lib/paths';

type MenuItemProps = {
  children: React.ReactNode;
};

function MenuItem({ children }: MenuItemProps) {
  return (
    <CommandItem
      className="text-md p- flex cursor-pointer items-center gap-4 p-4 font-semibold"
      asChild
    >
      {children}
    </CommandItem>
  );
}

const iconSize = 20;
const strokeWidth = 1;

import {
  CalendarDays,
  LayoutDashboard,
  School,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
function SidebarNav() {
  return (
    <>
      <Command>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <MenuItem>
              <Link href={paths.dashboard()}>
                <LayoutDashboard size={iconSize} strokeWidth={strokeWidth} />{' '}
                Dashboard
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href={paths.bookings()}>
                <CalendarDays size={iconSize} strokeWidth={strokeWidth} />{' '}
                <span>Bookings</span>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href={paths.cabins()}>
                <School size={iconSize} strokeWidth={strokeWidth} />
                <span>Cabins</span>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href={paths.users()}>
                <Users size={iconSize} strokeWidth={strokeWidth} />
                <span>Users</span>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href={paths.settings()}>
                <Settings size={iconSize} strokeWidth={strokeWidth} /> Settings
              </Link>
            </MenuItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}
export default SidebarNav;
