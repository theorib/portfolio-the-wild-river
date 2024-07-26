'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

// const SidebarMenu = AccordionPrimitive.Root;

const SidebarMenu = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, children, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'nav';
  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cn('border-b', className)}
      asChild
      {...props}
    >
      <Comp>{children}</Comp>
    </AccordionPrimitive.Root>
  );
});
SidebarMenu.displayName = 'SidebarMenu';

export interface SidebarMenuListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  asChild?: boolean;
}

const SidebarMenuList = React.forwardRef<
  HTMLUListElement,
  SidebarMenuListProps
>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'ul';
  return <Comp className={cn('')} ref={ref} {...props} />;
});
SidebarMenuList.displayName = 'SidebarMenuList';

const SidebarMenuItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, children, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'li';
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn('border-b', className)}
      {...props}
      asChild
    >
      <Comp>{children}</Comp>
    </AccordionPrimitive.Item>
  );
});
SidebarMenuItem.displayName = 'SidebarMenuItem';

const SidebarMenuTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
SidebarMenuTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const SidebarMenuContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));

SidebarMenuContent.displayName = AccordionPrimitive.Content.displayName;

export {
  SidebarMenu,
  SidebarMenuList,
  SidebarMenuItem,
  SidebarMenuTrigger,
  SidebarMenuContent,
};
