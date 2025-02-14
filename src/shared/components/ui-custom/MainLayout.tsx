import { MainSidebarComponent } from '@/shared/components/ui-custom/MainSidebarComponent'
import PageHeaderComponent from '@/shared/components/ui-custom/PageHeaderComponent'
import { SidebarInset } from '@/shared/components/ui/sidebar'
import { type PropsWithChildren } from 'react'

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
