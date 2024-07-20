'use client';
import paths from '@/lib/paths';
import { useRouter } from 'next/navigation';

type LoginButtonProps = {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
};

export default function LoginButton({ children, mode }: LoginButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(paths.login());
  };

  if (mode === 'modal') {
    return <span>To do Modal</span>;
  }

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
}
