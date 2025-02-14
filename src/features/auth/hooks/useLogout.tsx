import { logout } from '@/features/auth/actions'
import paths from '@/shared/constants/paths'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
      router.push(paths.login.pathname)
      toast('You are not logged in. Please log in to continue.')
    },
  })
}
