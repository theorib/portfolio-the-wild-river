import type { Metadata } from 'next';
import './globals.css';
import { raleway } from '@/lib/fonts';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          raleway.className,
          'flex min-h-screen w-full flex-col items-center justify-center',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
