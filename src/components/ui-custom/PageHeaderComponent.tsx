import DarkModeToggle from '@/components/ui-custom/DarkModeToggle'
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb'
// import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
// import Link from 'next/link'
export default function PageHeaderComponent() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-3">
      <div>
        <SidebarTrigger />
      </div>

      <div className="ali">
        <DarkModeToggle />
      </div>
    </header>
  )
}
