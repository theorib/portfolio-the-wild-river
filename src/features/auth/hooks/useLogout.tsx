import { logout } from '@/features/auth/actions'
import paths from '@/shared/constants/paths'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
      router.push(paths.login.pathname)
      toast('You have succefully logged out.')
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
