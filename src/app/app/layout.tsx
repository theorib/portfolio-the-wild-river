import MainLayout from '@/components/ui-custom/MainLayout'

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <MainLayout>{children}</MainLayout>
}
