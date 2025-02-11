// In Next.js, this file would be called: app/providers.jsx

import QueryClientProvider from '@/components/providers/QueryClientProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { SIDEBAR_COOKIE_NAME, SidebarProvider } from '@/components/ui/sidebar'
import { getCookie } from 'cookies-next/server'
import { cookies } from 'next/headers'
// import { SessionProvider, validateSession } from '@/lib/auth';
// import { validateSessionClient } from '@/lib/auth/authHelpers';
import { type PropsWithChildren } from 'react'

export default async function Providers({ children }: PropsWithChildren) {
  // const session = await validateSessionClient();
  const defaultOpen =
    (await getCookie(SIDEBAR_COOKIE_NAME, { cookies })) === 'true'

  return (
    // <SessionProvider value={session}>
    <QueryClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider
          defaultOpen={defaultOpen}
          className="flex min-h-screen grow flex-col items-center justify-center"
        >
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
    // </SessionProvider>
  )
}
