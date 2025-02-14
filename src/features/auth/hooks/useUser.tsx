import { getUser } from '@/features/auth/actions'
import useLogout from '@/features/auth/hooks/useLogout'

import { queryOptions, useQuery } from '@tanstack/react-query'

export const userQuery = queryOptions({
  queryKey: ['user'],
  queryFn: getUser,
})

export default function useUser() {
  const { mutate: logout } = useLogout()
  const userQueryResult = useQuery(userQuery)
  const unkwnownErrorMessage = 'Unknown user error'

  if (userQueryResult.status !== 'error') {
    return userQueryResult
  }
  if (userQueryResult.status === 'error') {
    logout()
    throw new Error(unkwnownErrorMessage)
  } else throw new Error(unkwnownErrorMessage)
}
