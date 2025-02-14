import { cn } from '@/lib/utils'
import { TriangleAlert } from 'lucide-react'

type FormErrorProps = {
  message?: string
  className?: string
}

export default function FormError({ message, className }: FormErrorProps) {
  if (!message) return null
  return (
    <div
      className={cn(
        'bg-destructive text-destructive-foreground flex items-center gap-4 rounded-md p-4 text-sm',
        className,
      )}
    >
      <TriangleAlert className="h-8 w-8" strokeWidth={1} />
      <p>{message}</p>
    </div>
  )
}
