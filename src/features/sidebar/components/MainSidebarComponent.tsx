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

type DataItem = {
  title: string
  onMouseEnter: () => void
  url: string
  logo: React.ReactNode
}

type Data = {
  navMain: Array<DataItem>
}

const data: Data = {
  navMain: [
    {
      title: 'Home',
      onMouseEnter: () => {},
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
      onMouseEnter: () => {},
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
      onMouseEnter: () => {},
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
      onMouseEnter: () => {},
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
      onMouseEnter: () => {},
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
      onMouseEnter: () => {},
      url: $path({ route: '/app/settings' }),
      logo: (
        <Settings
          size={SIDEBAR_ICON_SIZE}
          strokeWidth={SIDEBAR_ICON_STROKE_WIDTH}
        />
      ),
    },
  ],
} as const

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
                  <Link
                    href={item.url}
                    className="font-medium"
                    onMouseEnter={item.onMouseEnter}
                  >
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
