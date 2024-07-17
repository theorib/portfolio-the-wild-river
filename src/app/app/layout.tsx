import MainHeader from '@/components/layout/MainHeader';
import SideBar from '@/components/layout/SideBar';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="grid min-h-screen w-full grid-rows-[min-content_1fr_min-content] md:grid-cols-[minmax(240px,_1fr)_minmax(10px,_4fr)]">
      <MainHeader className="flex items-center justify-between border-b px-4 py-2 text-right dark:border-neutral-600 md:col-start-2 md:col-end-2" />
      <SideBar className="flex flex-col p-4 dark:border-neutral-600 sm:border-r md:col-start-1 md:col-end-1 md:row-start-1 md:row-end-3" />
      <main className="bg-neutral-100/40 p-4 dark:bg-neutral-800/50 md:col-start-2 md:col-end-2">
        {children}
      </main>
    </div>
  );
}
