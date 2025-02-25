import { type Booking } from '@/services/supabase/supabase.types'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/shared/components/ui/dropdown-menu'
import { EllipsisVertical, Eye, LogOut, OctagonX } from 'lucide-react'
import Link from 'next/link'

type BookingListItemDropdownProps = {
  booking: Booking
}

export default function BookingsTableColumnActionsRowItem({
  booking,
}: BookingListItemDropdownProps) {
  const bookingId = booking.id

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{`Booking #${bookingId}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`bookings/${bookingId}`}
              className="flex items-center gap-2"
            >
              <Eye />
              See Details
            </Link>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut /> Check out
            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <OctagonX /> Delete
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
