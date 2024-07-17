'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { MenubarShortcut } from '@/components/ui/menubar';
import {
  NavigationMenuVertical,
  NavigationMenuVerticalContent,
  NavigationMenuVerticalItem,
  NavigationMenuVerticalLink,
  NavigationMenuVerticalList,
  NavigationMenuVerticalTrigger,
  NavigationMenuVerticalViewport,
} from '@/components/ui/navigation-menu-vertical';
import { users } from '@/db/db.schemas';
import paths from '@/lib/paths';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from '@radix-ui/react-menubar';

type MenuItemProps = {
  children: React.ReactNode;
};

// function MenuItem({ children }: MenuItemProps) {
//   return <CommandItem>{children}</CommandItem>;
// }
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

function MenuItem2({ children }: MenuItemProps) {
  return (
    <NavigationMenuVerticalLink
      className="text-md p- flex cursor-pointer items-center gap-4 p-4 font-semibold"
      asChild
    >
      {children}
    </NavigationMenuVerticalLink>
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
import { ReactNode } from 'react';
function SidebarNav() {
  return (
    <div>
      {/* <Command className="h-auto">
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <MenuItem>
              <Link href={paths.dashboard()}>
                <LayoutDashboard size={iconSize} strokeWidth={strokeWidth} />
                Dashboard
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href={paths.bookings()}>
                <CalendarDays size={iconSize} strokeWidth={strokeWidth} />
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
      </Command> */}

      <NavigationMenuVertical>
        <NavigationMenuVerticalList>
          <NavigationMenuVerticalItem>
            <NavigationMenuVerticalLink asChild>
              <Link href={paths.dashboard()}>
                <LayoutDashboard size={iconSize} strokeWidth={strokeWidth} />
                Dashboard
              </Link>
            </NavigationMenuVerticalLink>
          </NavigationMenuVerticalItem>
          <NavigationMenuVerticalItem>
            <NavigationMenuVerticalLink asChild>
              <Link href={paths.bookings()}>
                <CalendarDays size={iconSize} strokeWidth={strokeWidth} />
                <span>Bookings</span>
              </Link>
            </NavigationMenuVerticalLink>
          </NavigationMenuVerticalItem>
          <NavigationMenuVerticalItem>
            <NavigationMenuVerticalLink asChild>
              <Link href={paths.cabins()}>
                <School size={iconSize} strokeWidth={strokeWidth} />
                <span>Cabins</span>
              </Link>
            </NavigationMenuVerticalLink>
          </NavigationMenuVerticalItem>
          <NavigationMenuVerticalItem>
            <NavigationMenuVerticalLink asChild>
              <Link href={paths.users()}>
                <Users size={iconSize} strokeWidth={strokeWidth} />
                <span>Users</span>
              </Link>
            </NavigationMenuVerticalLink>
          </NavigationMenuVerticalItem>
          <NavigationMenuVerticalItem>
            <NavigationMenuVerticalLink asChild>
              <Link href={paths.settings()}>
                <Settings size={iconSize} strokeWidth={strokeWidth} />
                <span>Settings</span>
              </Link>
            </NavigationMenuVerticalLink>
          </NavigationMenuVerticalItem>
          <NavigationMenuVerticalItem>
            <NavigationMenuVerticalTrigger>
              <LayoutDashboard size={iconSize} strokeWidth={strokeWidth} />
              Dashboard
            </NavigationMenuVerticalTrigger>
            <NavigationMenuVerticalContent>
              <NavigationMenuVerticalLink asChild>
                <Link href={paths.dashboard()}>
                  <LayoutDashboard size={iconSize} strokeWidth={strokeWidth} />
                  Dashboard
                </Link>
              </NavigationMenuVerticalLink>
              <NavigationMenuVerticalLink>
                Dashboard Sub Item 2
              </NavigationMenuVerticalLink>
            </NavigationMenuVerticalContent>
          </NavigationMenuVerticalItem>
        </NavigationMenuVerticalList>
        {/* <div className="absolute left-60 top-0 -mt-2">
          <NavigationMenuVerticalViewport />
        </div> */}
      </NavigationMenuVertical>
    </div>
  );
}
export default SidebarNav;
