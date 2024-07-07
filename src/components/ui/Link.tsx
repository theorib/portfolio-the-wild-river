import { cn } from '@/lib/utils';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

export interface LinkProps extends NextLinkProps {
  className?: string;
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <NextLink
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-primary underline-offset-4 ring-offset-background transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </NextLink>
    );
  },
);

Link.displayName = 'Link';

export default Link;
