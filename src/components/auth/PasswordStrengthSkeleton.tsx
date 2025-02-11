import { Skeleton } from '@/components/ui/skeleton'

export default function PasswordStrengthSkeleton() {
  return (
    <div className="w-full space-y-2">
      <Skeleton className="h-4 w-[180px] rounded-full" />
      <Skeleton className="h-4 w-full rounded-full" />
      <Skeleton className="h-4 w-full rounded-full" />
    </div>
  )
}
