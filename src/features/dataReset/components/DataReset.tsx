import { Button } from '@/shared/components/ui/button';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenuButton,
	SidebarMenuSub,
	SidebarMenuSubItem,
} from '@/shared/components/ui/sidebar';
import { SIDEBAR_ICON_SIZE, SIDEBAR_ICON_STROKE_WIDTH } from '@/shared/constants';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronRight, RefreshCw } from 'lucide-react';

export default function DataReset() {
	return (
		<Collapsible key={'canisss'} title={'canis'} defaultOpen className="group/collapsible">
			<SidebarGroup>
				<SidebarGroupLabel
					render={
						<CollapsibleTrigger
							render={
								<SidebarMenuButton>
									<RefreshCw />
									{'Reset Data'}{' '}
									<ChevronRight
										size={SIDEBAR_ICON_SIZE}
										strokeWidth={SIDEBAR_ICON_STROKE_WIDTH}
										className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
									/>
								</SidebarMenuButton>
							}
						/>
					}
					className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
				/>

				<CollapsibleContent>
					<SidebarMenuSub className="gap-2">
						<SidebarMenuSubItem>
							<SidebarMenuButton render={<Button variant="destructive">Reset All</Button>} />
						</SidebarMenuSubItem>
						<SidebarMenuSubItem>
							<SidebarMenuButton render={<Button variant="destructive">Reset Bookings</Button>} />
						</SidebarMenuSubItem>
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}
