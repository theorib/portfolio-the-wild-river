import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/components/ui/toggle-group'

export default function BookingsFilter() {
  return (
    <ToggleGroup type="single" defaultValue="all" variant="outline">
      <ToggleGroupItem value="all" aria-label="Toggle all bookings">
        All
      </ToggleGroupItem>
      <ToggleGroupItem
        value="checked-out"
        aria-label="Toggle only checked out bookings"
      >
        Checked Out
      </ToggleGroupItem>
      <ToggleGroupItem
        value="checked-in"
        aria-label="Toggle only checked in bookings"
      >
        Checked In
      </ToggleGroupItem>
      <ToggleGroupItem
        value="unconfirmed"
        aria-label="Toggle only unconfirmed bookings"
      >
        Unconfirmed
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
