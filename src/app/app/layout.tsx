import MainHeader from '@/components/layout/MainHeader';
import SideBar from '@/components/layout/SideBar';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="grid min-h-screen grid-rows-[min-content_1fr_min-content] sm:grid-cols-[minmax(10px,_1fr)_minmax(10px,_4fr)]">
      <MainHeader className="flex items-center justify-between border-b px-4 py-2 text-right dark:border-neutral-600 sm:col-start-2 sm:col-end-2" />
      <SideBar className="flex flex-col p-4 dark:border-neutral-600 sm:col-start-1 sm:col-end-1 sm:row-start-1 sm:row-end-3 sm:border-r" />
      <main className="bg-neutral-100/40 p-4 dark:bg-neutral-800/50 sm:col-start-2 sm:col-end-2">
        {children}
      </main>
    </div>
  );
}
