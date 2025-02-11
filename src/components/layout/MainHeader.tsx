import { cn } from '@/lib/utils'

import AvatarDropdownMenu from '@/components/layout/AvatarDropdownMenu'
import DarkModeToggle from '@/components/ui-custom/DarkModeToggle'

type MainHeaderProps = {
  className?: string
}

function MainHeader({ className }: MainHeaderProps) {
  return (
    <header className={cn('', className)}>
      <div className="flex grow items-center justify-end gap-4 text-right">
        <div className="flex h-5 items-center gap-2 text-sm"></div>
        <AvatarDropdownMenu />
        <DarkModeToggle />
      </div>
    </header>
  )
}
export default MainHeader
