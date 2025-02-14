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

import { getInitials } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

import useUser from '@/features/auth/hooks/useUser'
import useLogout from '@/features/auth/hooks/useLogout'
import { z } from 'zod'

export default function AvatarDropdownMenu() {
  const { data: user } = useUser()
  const logoutQuery = useLogout()

  const { data: userFullName } = z
    .string()
    .safeParse(user?.user_metadata?.fullName)

  const { data: avatarUrl } = z
    .string()
    .url()
    .safeParse(user?.user_metadata?.avatar)

  const initials = userFullName ? getInitials(userFullName) : '**'

  const userName = userFullName || 'unkwnown user'
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar>
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={`${userName}'s avatar`} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <p>{userName}</p>
        <ChevronDown size={16} strokeWidth={1} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logoutQuery.mutate()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
