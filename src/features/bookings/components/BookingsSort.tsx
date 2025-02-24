import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
} from '@/shared/components/ui/select'
import { cn } from '@/shared/lib/utils'
import {
  ArrowDownAZ,
  ArrowDownZA,
  CalendarArrowDown,
  CalendarArrowUp,
} from 'lucide-react'

function SelectItemContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="select-item-content"
      className={cn('flex items-center gap-4', className)}
      {...props}
    />
  )
}
function SelectItemText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-content"
      className={cn('inline-block', className)}
      {...props}
    />
  )
}

export default function BookingsSort() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Start Date</SelectLabel>
          <SelectItem value="startDate-asc">
            <SelectItemContent>
              <CalendarArrowDown />

              <SelectItemText>Ascending</SelectItemText>
            </SelectItemContent>
          </SelectItem>
          <SelectItem value="startDate-desc">
            <SelectItemContent>
              <CalendarArrowUp />
              <SelectItemText>Descending</SelectItemText>
            </SelectItemContent>
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Total Price</SelectLabel>
          <SelectItem value="totalPrice-asc">
            <SelectItemContent>
              <ArrowDownAZ />
              <SelectItemText>Ascending</SelectItemText>
            </SelectItemContent>
          </SelectItem>
          <SelectItem value="totalPrice-desc">
            <SelectItemContent>
              <ArrowDownZA />
              <SelectItemText>Descending</SelectItemText>
            </SelectItemContent>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
