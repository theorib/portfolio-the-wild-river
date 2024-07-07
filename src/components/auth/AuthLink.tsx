import Link from '@/components/ui/Link';
import { cn } from '@/lib/utils';

type AuthLinkProps = {
  label: string;
  href: string;
  className?: string;
};

export default function AuthLink({ label, href, className }: AuthLinkProps) {
  return (
    <Link href={href} className={cn('text-center text-sm', className)}>
      {label}
    </Link>
  );
}
