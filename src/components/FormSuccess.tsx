import { cn } from '@/lib/utils'
import { CircleCheck } from 'lucide-react'

type FormErrorProps = {
  message?: string
  className?: string
}

export default function FormMessage({ message, className }: FormErrorProps) {
  if (!message) return null
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-md bg-emerald-500/15 p-4 text-sm text-emerald-600',
        className,
      )}
    >
      <CircleCheck className="h-8 w-8" strokeWidth={1} />
      <p>{message}</p>
    </div>
  )
}
