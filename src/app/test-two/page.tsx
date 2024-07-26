import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuTrigger,
  SidebarMenuContent,
  SidebarMenuList,
} from '@/components/ui/SidebarMenu';
import {
  CalendarDays,
  LayoutDashboard,
  School,
  Settings,
  Users,
} from 'lucide-react';
import paths from '@/lib/constants/paths';
import Link from 'next/link';

const iconSize = 20;
const strokeWidth = 1;

export default function TestTwoPage() {
  return (
    <SidebarMenu type="single" collapsible>
      <SidebarMenuList>
        <SidebarMenuItem value={'Dashboard'}>
          <Link href={paths.dashboard.pathname}>
            <LayoutDashboard size={iconSize} strokeWidth={strokeWidth} />
            Dashboard
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem value={'Bookings'}>
          <Link href={paths.bookings.pathname}>Bookings</Link>
        </SidebarMenuItem>
        <SidebarMenuItem value={'Cabins'}>
          <Link href={paths.cabins.pathname}>Cabins</Link>
        </SidebarMenuItem>
        <SidebarMenuItem value={'Cabins'}>
          <Link href={paths.users.pathname}>Users</Link>
        </SidebarMenuItem>
        <SidebarMenuItem value={'Settings'}>
          <Link href={paths.settings.pathname}>Settings</Link>
        </SidebarMenuItem>
        <SidebarMenuItem value={'Sub'}>
          <SidebarMenuTrigger>Menu With SubItems</SidebarMenuTrigger>
          <SidebarMenuContent>
            <SidebarMenuItem value="Sub1">
              <Link href="#">Sub Item 1</Link>
            </SidebarMenuItem>
            <SidebarMenuItem value="Sub2">
              <Link href="#">Sub Item 2</Link>
            </SidebarMenuItem>
          </SidebarMenuContent>
          {/* <Link href={paths.settings.pathname}>Settings</Link> */}
        </SidebarMenuItem>
      </SidebarMenuList>
    </SidebarMenu>
  );
}
