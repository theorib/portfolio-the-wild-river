import Logo from '@/components/layout/Logo'

type AuthLayoutProps = {
  children: React.ReactNode
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {children}
    </div>
  )
}
