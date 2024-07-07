'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SocialLoginBtnProps = {
  children: React.ReactNode;
  className?: string;
  handleClick?: () => void;
};

export default function SocialLoginBtn({
  children,
  className = '',
  handleClick = () => {},
}: SocialLoginBtnProps) {
  return (
    <Button
      className={cn('flex w-full gap-2', className)}
      size="lg"
      variant="outline"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
