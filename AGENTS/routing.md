# Type-Safe Routing

This project uses `next-typesafe-url` for compile-time route validation.

## The `$path` Function

**Always use `$path()` when constructing URLs.** Never use raw string URLs.

### Examples

```typescript
import { $path } from 'next-typesafe-url'

// With redirect()
redirect($path({ route: '/app/dashboard' }))

// With Link
<Link href={$path({ route: '/app/bookings', searchParams: { page: 1, status: 'confirmed' } })}>
  View Bookings
</Link>

// With router.push()
router.push($path({ route: '/app/cabins' }))

// With route params
$path({ route: '/app/bookings/[id]', routeParams: { id: booking.id } })
```

## Route Types

Route types are defined in `routeType.ts` files:

```
src/app/app/bookings/routeType.ts
src/app/app/cabins/routeType.ts
```

## Build Integration

- `pnpm dev` runs next-typesafe-url in watch mode along with the Next.js dev server
- `pnpm build` generates types before making the Next.js build
- `pnpm typeurl` manually rebuilds URL types
