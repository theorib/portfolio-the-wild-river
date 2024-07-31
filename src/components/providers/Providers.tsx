// In Next.js, this file would be called: app/providers.jsx

import QueryClientProvider from '@/components/providers/QueryClientProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SessionProvider, validateSession } from '@/lib/auth';
import { validateSessionClient } from '@/lib/auth/authHelpers';

type ProvidersProps = {
  children: React.ReactNode;
};

export default async function Providers({ children }: ProvidersProps) {
  const session = await validateSessionClient();
  return (
    <SessionProvider value={session}>
      <QueryClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
