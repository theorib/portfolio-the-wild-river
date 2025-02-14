import AvatarDropdownMenu from '@/features/avatarDropDown/AvatarDropdownMenu'
import DarkModeToggle from '@/features/darkMode/components/DarkModeToggle'
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
