'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { isSomeTrue } from '@/shared/lib/utils'
import { ChevronDown } from 'lucide-react'

import useUser from '@/features/auth/hooks/useUser'
import useLogout from '@/features/auth/hooks/useLogout'
import { getAvatarDropdownData } from '@/features/avatarDropDown/utils'

export default function AvatarDropdownMenu() {
  console.log('rendering AvatarDropdownMenu')

  const useUserQuery = useUser()
  const { data: user } = useUserQuery
  const useLogoutQuery = useLogout()
  const { logout } = useLogoutQuery

  const isLoading = isSomeTrue([useUserQuery.isLoading, useUserQuery.isPending])
  const isLoggingOut = useLogoutQuery.isPending

  if (isLoggingOut) return <p>logging out...</p>

  if (isLoading) return <p>loading...</p>

  const { avatarUrl, firstName, initials, fullName } = getAvatarDropdownData({
    fullName: user?.user_metadata?.fullName,
    avatarUrl: user?.user_metadata?.avatar,
    isLoading,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar className="size-9">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={`${fullName}'s avatar`} />
          ) : (
            <AvatarFallback className="text-sm">{initials}</AvatarFallback>
          )}
        </Avatar>
        <p>{firstName}</p>
        <ChevronDown size={16} strokeWidth={1} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
