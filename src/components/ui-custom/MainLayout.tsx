import PageHeaderComponent from '@/components/ui-custom/PageHeaderComponent';
import { SidebarInset } from '@/components/ui/sidebar';
import { MainSidebarComponent } from '@/features/sidebar/components/MainSidebarComponent';
import { type PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<>
			<MainSidebarComponent />
			<SidebarInset>
				<PageHeaderComponent />
				<div className="p-4">{children}</div>
			</SidebarInset>
		</>
	);
}
