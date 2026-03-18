# Supabase

## Type Generation

```bash
pnpm supabase:generate:types    # Generate TypeScript types
pnpm supabase:generate:schemas  # Generate Zod schemas (supazod)
```

**Output locations:**
- Types: `src/lib/types/supabase.types.ts`
- Schemas: `src/lib/schemas/supabaseSchemas.ts`

Both commands auto-fix with ESLint.

## Supabase Clients

| Client | Use Case | Location |
|--------|----------|----------|
| `supabaseServer.ts` | Server Components, Server Actions | `@supabase/ssr` |
| `supabaseBrowser.ts` | Client Components | Browser-safe |
| `supabaseMiddleware.ts` | Middleware auth refresh | Session management |

All clients use type-safe schema from `supabase.auto.types.ts`.

## Authentication

- Supabase Auth with SSR support
- Middleware refreshes sessions automatically
- Protected routes: `/app/*`
- Auth routes: `/(auth)/*` (login, signup)
