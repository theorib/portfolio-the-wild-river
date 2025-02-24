import { getUser } from '@/features/auth/actions'
import paths from '@/shared/constants/paths'

import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const userQuery = queryOptions({
  queryKey: ['user'],
  queryFn: getUser,
  refetchInterval: Infinity,
})

export default function useUser() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const userQueryResult = useQuery(userQuery)

  const isInvalidUser: boolean =
    userQueryResult.isSuccess && !userQueryResult.data

  if (userQueryResult.status === 'error' || isInvalidUser) {
    queryClient.clear()
    router.push(paths.login.pathname)
    toast('Invalid user, please login with a valid user')
  }

  return userQueryResult
}
