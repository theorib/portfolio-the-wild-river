import type * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import Logo from '@/components/layout/Logo'

const data = {
  navMain: [
    {
      title: 'Home',
      url: '#',
      // items: [
      //   {
      //     title: 'Installation',
      //     url: '#',
      //   },
      //   {
      //     title: 'Project Structure',
      //     url: '#',
      //   },
      // ],
    },
    {
      title: 'Bookings',
      url: '#',
      // items: [
      //   {
      //     title: 'Routing',
      //     url: '#',
      //   },
      //   {
      //     title: 'Data Fetching',
      //     url: '#',
      //     isActive: true,
      //   },
      // ],
    },
    {
      title: 'Cabins',
      url: '#',
      // items: [
      //   {
      //     title: 'Components',
      //     url: '#',
      //   },
      //   {
      //     title: 'File Conventions',
      //     url: '#',
      //   },
      // ],
    },
    {
      title: 'Users',
      url: '#',
      // items: [
      //   {
      //     title: 'Accessibility',
      //     url: '#',
      //   },
      //   {
      //     title: 'Fast Refresh',
      //     url: '#',
      //   },
      // ],
    },
    {
      title: 'Settings',
      url: '#',
    },
  ],
}

export function MainSidebarComponent({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="inset"
      collapsible="offcanvas"
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
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {/* {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map(item => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null} */}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
