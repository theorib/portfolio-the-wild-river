import { type PropsWithChildren } from 'react'

import { SidebarInset } from '@/components/ui/sidebar'
import { MainSidebarComponent } from '@/components/ui-custom/MainSidebarComponent'
import PageHeaderComponent from '@/components/ui-custom/PageHeaderComponent'

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainSidebarComponent />
      <SidebarInset>
        <PageHeaderComponent />
        <div className="p-4">{children}</div>
      </SidebarInset>
    </>
  )
}
