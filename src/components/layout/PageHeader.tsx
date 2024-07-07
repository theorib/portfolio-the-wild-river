type PageHeaderProps = {
  pageTitle: string;
  children?: React.ReactNode;
};

export default function PageHeader({ pageTitle, children }: PageHeaderProps) {
  return (
    <header className="mb-4 flex items-center justify-between">
      <h1 className="text-4xl font-bold">{pageTitle}</h1>
      {children}
    </header>
  );
}
