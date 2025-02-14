import AvatarDropdownMenu from '@/shared/components/ui-custom/AvatarDropdownMenu'
import DarkModeToggle from '@/shared/components/ui-custom/DarkModeToggle'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'

export default function PageHeaderComponent() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-3">
      <div>
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-4">
        <AvatarDropdownMenu />
        <DarkModeToggle />
      </div>
    </header>
  )
}
