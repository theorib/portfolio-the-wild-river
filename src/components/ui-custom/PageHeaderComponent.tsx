import DarkModeToggle from '@/components/ui-custom/DarkModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { SidebarTrigger } from '@/components/ui/sidebar'

export default function PageHeaderComponent() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-3">
      <div>
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <DarkModeToggle />
      </div>
    </header>
  )
}
