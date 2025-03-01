import { logout } from '@/features/auth/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { $path } from 'next-typesafe-url'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const {
    status,
    isError,
    isPaused,
    isPending,
    isSuccess,
    mutate,
    error,
    isIdle,
  } = useMutation({
    mutationFn: logout,
    onError: () => {
      toast.error(
        'Something went wrong while trying to logout. Please try again.',
      )
    },
    throwOnError: false,
    onSuccess: () => {
      queryClient.clear()
      router.push($path({ route: '/login' }))
      toast('You have successfully logged out.')
    },
  })

  return {
    logout: () => mutate(),
    status,
    isError,
    isPaused,
    isPending,
    isSuccess,
    error,
    isIdle,
  }
}
