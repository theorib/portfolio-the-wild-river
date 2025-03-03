'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/shared/components/ui/sidebar'
import Logo from '@/features/logo/components/Logo'
import {
  CalendarDays,
  House,
  LayoutDashboard,
  School,
  Settings,
  Users,
} from 'lucide-react'
import Link from 'next/link'

import {
  DEFAULT_BOOKING_ITEMS_PER_PAGE,
  SIDEBAR_ICON_SIZE,
  SIDEBAR_ICON_STROKE_WIDTH,
} from '@/shared/constants'
import { $path } from 'next-typesafe-url'

const data = {
  navMain: [
    {
      title: 'Home',
      url: $path({ route: '/' }),
      logo: (
        <House
          size={SIDEBAR_ICON_SIZE}
          strokeWidth={SIDEBAR_ICON_STROKE_WIDTH}
        />
      ),
    },
    {
      title: 'Dashboard',
      url: $path({ route: '/app/dashboard' }),
      logo: (
        <LayoutDashboard
          size={SIDEBAR_ICON_SIZE}
          strokeWidth={SIDEBAR_ICON_STROKE_WIDTH}
        />
      ),
    },
    {
      title: 'Bookings',
      url: $path({
        route: '/app/bookings',
        searchParams: {
          sort: {
            columnName: 'id',
            ascending: true,
          },
          pagination: {
            columnName: 'id',
            range: {
              startIndex: 0,
              endIndex: DEFAULT_BOOKING_ITEMS_PER_PAGE - 1,
            },
            numberOfItems: DEFAULT_BOOKING_ITEMS_PER_PAGE,
          },
        },
      }),
      logo: (
        <CalendarDays
          size={SIDEBAR_ICON_SIZE}
          strokeWidth={SIDEBAR_ICON_STROKE_WIDTH}
        />
      ),
    },
    {
      title: 'Cabins',
      url: $path({ route: '/app/cabins' }),
      logo: (
        <School
          size={SIDEBAR_ICON_SIZE}
          strokeWidth={SIDEBAR_ICON_STROKE_WIDTH}
        />
      ),
    },
    {
      title: 'Users',
      url: $path({ route: '/app/users' }),
      logo: (
        <Users
          size={SIDEBAR_ICON_SIZE}
          strokeWidth={SIDEBAR_ICON_STROKE_WIDTH}
        />
      ),
    },
    {
      title: 'Settings',
      url: $path({ route: '/app/settings' }),
      logo: (
        <Settings
          size={SIDEBAR_ICON_SIZE}
          strokeWidth={SIDEBAR_ICON_STROKE_WIDTH}
        />
      ),
    },
  ],
}

export function MainSidebarComponent({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar()

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      {...props}
      //
    >
      <SidebarHeader>
        {isMobile ? <SidebarTrigger /> : null}
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
