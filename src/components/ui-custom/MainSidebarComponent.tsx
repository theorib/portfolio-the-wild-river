/* eslint-disable jsx-a11y/anchor-is-valid */
import type * as React from 'react'
import { GalleryVerticalEnd } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'

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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map(item => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
