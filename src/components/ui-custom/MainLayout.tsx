import { type PropsWithChildren } from 'react'

import { SidebarInset } from '@/components/ui/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { getCookie } from 'cookies-next/server'
import { cookies } from 'next/headers'
import { MainSidebarComponent } from '@/components/ui-custom/MainSidebarComponent'
import PageHeaderComponent from '@/components/ui-custom/PageHeaderComponent'
import { SIDEBAR_COOKIE_NAME } from '@/lib/constants'

export default async function MainLayout({ children }: PropsWithChildren) {
  const defaultOpen =
    (await getCookie(SIDEBAR_COOKIE_NAME, { cookies })) === 'true'

  return (
    <>
      <SidebarProvider
        defaultOpen={defaultOpen}
        // className="flex min-h-screen w-full grow flex-col items-center justify-center"
        className="flex w-full grow"
      >
        <MainSidebarComponent />
        <SidebarInset>
          <PageHeaderComponent />
          <main className="flex p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
