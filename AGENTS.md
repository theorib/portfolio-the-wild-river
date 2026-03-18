# The Wild River - Hotel Booking Management

Internal tool for hotel employees to manage bookings, cabins, and users. Built with Next.js (App Router), React, TypeScript, and Supabase.

## Quick Start

```bash
pnpm dev      # Start dev server
pnpm build    # Production build
pnpm lint     # ESLint + TypeScript check
pnpm test     # Run tests
```

**Package manager:** pnpm (enforced via preinstall hook)

## Critical Rules

### Routing - Always use `$path()`

```typescript
// Correct
redirect($path({ route: '/app/dashboard' }))
<Link href={$path({ route: '/app/bookings', searchParams: { page: 1 } })}>

// Wrong - never use raw strings
redirect('/app/dashboard')
```

### UI Components - Base UI, not Radix

This project uses shadcn/ui built on **Base UI** (`@base-ui/react`), not Radix UI. Use `context7_mcp` for Base UI documentation.

```typescript
// Use existing components from src/components/ui/
import { Button } from '@/components/ui/button'
```

### Path Aliases

- `@/*` → `src/*`
- `public/*` → `./public/*`

## Task Tracking

This project uses **bd (beads)** for issue tracking. Run `bd prime` for full workflow context.

## Detailed Documentation

- [Architecture](AGENTS/architecture.md) - Directory structure, feature patterns, data flow
- [Commands](AGENTS/commands.md) - Full command reference
- [Testing](AGENTS/testing.md) - Test setup, patterns, commands
- [Routing](AGENTS/routing.md) - Type-safe routing with next-typesafe-url
- [UI & Styling](AGENTS/ui-styling.md) - Base UI, Tailwind, theming
- [Supabase](AGENTS/supabase.md) - Clients, auth, type generation
- [Git Workflow](AGENTS/git-workflow.md) - Commits, hooks, conventions
- [Code Style](AGENTS/code-style.md) - TypeScript conventions, naming

## Documentation Sources

- **TanStack libraries**: Use `tanstack_mcp` for Form, Query, Table docs
- **Other libraries**: Use `context7_mcp` for up-to-date documentation
