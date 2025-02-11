import { cn } from '@/lib/utils'

type CardHeaderProps = {
  label: string
  className?: string
}

export default function CardHeading({ label, className }: CardHeaderProps) {
  return <h1 className={cn('text-2xl', className)}>{label}</h1>
}
