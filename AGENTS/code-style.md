# Code Style

## Naming

Use descriptive, self-explanatory names for variables, functions, and components. Names should convey intent without needing comments.

```typescript
// Good
const bookingStartDate = new Date()
const isGuestCheckedIn = booking.status === 'checked-in'
function calculateTotalPrice(nights: number, pricePerNight: number)

// Avoid
const d = new Date()
const flag = booking.status === 'checked-in'
function calc(n: number, p: number)
```

## Constants Over Magic Numbers

Never use unexplained numeric literals. Define named constants.

```typescript
// Good
const MAX_GUESTS_PER_CABIN = 10
const BOOKING_CANCELLATION_WINDOW_DAYS = 7

if (guests > MAX_GUESTS_PER_CABIN) { ... }

// Avoid
if (guests > 10) { ... }
```

## Comments

Only add comments when the code alone cannot convey the "why":

- **Do comment:** Business logic rationale, workarounds, non-obvious decisions
- **Don't comment:** What the code does (the code should be self-explanatory)

```typescript
// Good - explains WHY
// Supabase RLS requires the user ID in this format for policy matching
const formattedUserId = `auth.${userId}`

// Avoid - just restates the code
// Get the user ID
const userId = user.id
```

## Existing Patterns

Before implementing new features, check if similar patterns exist in the codebase:
- Look at existing features in `src/features/`
- Follow established hook patterns
- Reuse existing components from `src/components/ui/`
