import Logo from '@/components/layout/Logo';
import SidebarNav from '@/components/layout/SidebarNav';
import { cn } from '@/lib/utils';

type SideBarProps = {
  className?: string;
};
function SideBar({ className }: SideBarProps) {
  return (
    <aside className={cn('flex flex-col gap-4', className)}>
      <Logo />
      <SidebarNav />
    </aside>
  );
}
export default SideBar;
