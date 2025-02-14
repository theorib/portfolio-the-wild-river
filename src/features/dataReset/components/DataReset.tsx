import { Button } from '@/shared/components/ui/button'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/shared/components/ui/sidebar'
import {
  SIDEBAR_ICON_SIZE,
  SIDEBAR_ICON_STROKE_WIDTH,
} from '@/shared/constants'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible'
import { RefreshCw, ChevronRight } from 'lucide-react'

export default function DataReset() {
  return (
    <Collapsible
      key={'canisss'}
      title={'canis'}
      defaultOpen
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <RefreshCw />
              {'Reset Data'}{' '}
              <ChevronRight
                size={SIDEBAR_ICON_SIZE}
                strokeWidth={SIDEBAR_ICON_STROKE_WIDTH}
                className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenuSub className="gap-2">
            <SidebarMenuSubItem>
              <SidebarMenuButton asChild>
                <Button variant="destructive">Reset All</Button>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuButton asChild>
                <Button variant="destructive">Reset Bookings</Button>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
