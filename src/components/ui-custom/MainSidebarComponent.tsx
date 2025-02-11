import type * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import Logo from '@/components/layout/Logo'
import {
  CalendarDays,
  House,
  LayoutDashboard,
  School,
  Settings,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import paths from '@/lib/constants/paths'

const iconSize = 40
const strokeWidth = 1
const data = {
  navMain: [
    {
      title: 'Home',
      url: paths.homePage,
      logo: <House size={iconSize} strokeWidth={strokeWidth} />,
    },
    {
      title: 'Dashboard',
      url: paths.dashboard,
      logo: <LayoutDashboard size={iconSize} strokeWidth={strokeWidth} />,
    },
    {
      title: 'Bookings',
      url: paths.bookings,
      logo: <CalendarDays size={iconSize} strokeWidth={strokeWidth} />,
    },
    {
      title: 'Cabins',
      url: paths.cabins,
      logo: <School size={iconSize} strokeWidth={strokeWidth} />,
    },
    {
      title: 'Users',
      url: paths.users,
      logo: <Users size={iconSize} strokeWidth={strokeWidth} />,
    },
    {
      title: 'Settings',
      url: paths.settings,
      logo: <Settings size={iconSize} strokeWidth={strokeWidth} />,
    },
  ],
}

export function MainSidebarComponent({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      {...props}
      //
    >
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item?.logo}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
