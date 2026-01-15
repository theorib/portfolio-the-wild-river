# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a hotel booking management full-stack application built with TypeScript, React, Next.js (App Router) and Supabase. It's an internal tool for hotel employees to manage bookings, cabins, users, and settings.

## Development Commands

### Package Manager

**Use pnpm exclusively** - the project enforces this with a preinstall hook.

### Development

```bash
pnpm dev              # Start dev server with next-typesafe-url watch mode
pnpm dev:url          # Run next-typesafe-url in watch mode only
pnpm build            # Generate typesafe URLs, then build for production
pnpm start            # Start production server
```

### Testing

```bash
pnpm test             # Run Vitest in watch mode with browser (headless)
pnpm test:ui          # Run Vitest with UI
pnpm test:coverage    # Generate coverage report
pnpm test:e2e         # Run Playwright e2e tests
pnpm test:e2e:ui      # Run Playwright in UI mode
pnpm test:e2e:debug   # Debug Playwright tests
pnpm test:e2e:codegen # Generate Playwright test code
pnpm test:e2e:report  # View Playwright test report
```

**Testing Structure:**

- Unit/integration tests: `src/**/*.{test,spec}.{ts,tsx}`
- JSDOM tests: `src/**/*.{test,spec}.jsdom.{ts,tsx}`
- E2E tests: `src/__tests__/e2e/`
- Setup: `src/shared/lib/testUtils/setupTests.ts`

### Task tracking

This project uses **bd (beads)** for issue tracking.
Run `bd prime` for workflow context, or install hooks (`bd hooks install`) for auto-injection.

**Quick reference:**

- `bd ready` - Find unblocked work
- `bd create "Title" --type task --priority 2` - Create issue
- `bd close <id>` - Complete work
- `bd sync` - Sync with git (run at session end)

For full workflow details: `bd prime`

### Linting and Formatting

```bash
pnpm lint             # Run ESLint (quiet) and TypeScript check
pnpm lint:fix         # Fix ESLint issues with cache
pnpm lint:tsc         # TypeScript check only
pnpm lint:next        # Next.js linter
pnpm lint:staged      # Run lint-staged (used in pre-commit)
pnpm format           # Format all files with Prettier
pnpm format:check     # Check formatting without changes
```

**Note:** Build intentionally ignores TypeScript errors (handled by git hooks).

### Commits

```bash
pnpm cz               # Use enhanced commit flow with Commitizen (gitmoji)
git commit            # Standard commit (uses husky hooks)
```

- Commits follow gitmoji convention via commitlint
- Pre-commit runs lint-staged and vitest tests
- Prepare-commit-msg launches Commitizen interactively

### Supabase Type Generation

```bash
pnpm supabase:generate:types    # Generate TypeScript types from Supabase
pnpm supabase:generate:schemas  # Generate Zod schemas from types using supazod
```

- Types output: `src/lib/types/supabase.types.ts`
- Schemas output: `src/lib/schemas/supabaseSchemas.ts`
- Both commands auto-fix with ESLint

### Other Commands

```bash
pnpm shad             # Add shadcn/ui components (alias for shadcn add)
pnpm lint:inspect     # Open ESLint config inspector
pnpm typeurl          # Runs next-typesafe-url command to rebuild urls
```

## Architecture

### Directory Structure

```
src/
├── app/                   # Next.js App Router
│   ├── (auth)/           # Auth routes (login, signup)
│   ├── app/              # Protected app routes (/app/*)
│   │   ├── bookings/
│   │   ├── cabins/
│   │   ├── dashboard/
│   │   ├── settings/
│   │   └── users/
│   ├── layout.tsx        # Root layout with Providers
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # shadcn/ui components
│   └── ui-custom/        # Custom UI components (e.g., MainLayout)
├── features/             # Feature-based modules (see below)
├── hooks/                # Shared custom hooks
├── lib/
│   ├── constants/        # App-wide constants
│   ├── env.ts            # Environment validation (@t3-oss/env-nextjs)
│   ├── schemas/          # Zod schemas (generated from Supabase)
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Utility functions (helpers, pagination)
└── services/
    └── supabase/         # Supabase client configuration
```

### Feature Structure

Features are organized by domain with colocation of related code:

```
features/
├── auth/                 # Authentication
│   ├── actions.ts        # Server actions
│   └── authSchemas.ts    # Validation schemas
├── bookings/
│   ├── bookingDetails/   # Booking detail views
│   ├── bookingsTable/    # Table components
│   ├── components/       # Feature-specific components
│   ├── hooks/            # Feature-specific hooks (useBooking, etc.)
│   ├── schema.ts         # Zod schemas
│   └── types.ts          # TypeScript types
├── cabins/               # Similar structure to bookings
├── dashboard/            # Dashboard with charts
├── reactQuery/           # React Query provider setup
├── darkMode/             # Theme provider
├── logger/               # Server-side logging (loglayer + tslog)
└── [other features]/
```

**Feature Pattern:**

- Each feature contains: hooks, components, schemas, types, and actions
- Hooks typically use React Query for data fetching
- Server actions in `actions.ts` files
- Zod schemas for validation

### Data Flow and State Management

**Remote State (Supabase):**

- React Query (TanStack Query) manages all server state
- Default stale time and refetch intervals set in `QueryClientProvider`
- Queries follow pattern: `useBookings`, `useBooking(id)`, etc.
- Mutations handle creates/updates/deletes
- When possible uses pre-fetching to improve performance

**Supabase Clients:**

- `supabaseServer.ts` - Server Components/Actions (uses `@supabase/ssr`)
- `supabaseBrowser.ts` - Client Components
- `supabaseMiddleware.ts` - Middleware for auth refresh
- Type-safe database schema from `supabase.auto.types.ts`

**Environment Variables:**

- Validated via `@t3-oss/env-nextjs` in `src/lib/env.ts`
- Required vars include Supabase URL, anon key, project ID
- Type-safe access throughout the app

### Type-Safe Routing

- Uses `next-typesafe-url` for type-safe route params and search params
- Route types in `routeType.ts` files (e.g., `app/app/bookings/routeType.ts`)
- Must run `next-typesafe-url` before build (already on build script)
- **Always use the `$path` function** from `next-typesafe-url` when constructing URLs:
  - With `redirect()`: `redirect($path({ route: '/app/dashboard' }))`
  - With `<Link>`: `<Link href={$path({ route: '/app/bookings', searchParams: { ... } })}>`
  - With `router.push()`: `router.push($path({ route: '/app/cabins' }))`
- Never use raw string URLs - this ensures compile-time validation of routes and params

### UI and Styling

- **shadcn/ui components** in `components/ui/` - **IMPORTANT:** This project uses a custom version of shadcn/ui built on **Base UI** (`@base-ui/react`) instead of Radix UI, please refer to the Base UI documentation using the context7_mcp for up to date documentation on how to use it
  - Base UI is a styling-agnostic headless component library
  - All new components should be built when possible using the shadcn/ui components from `./src/components/ui/` that use the Base UI primitives
  - Base UI LLM documentation through context7_mcp, alternativelly, there is an llm documentation index at: https://base-ui.com/llms.txt
  - Components are fully accessible and composable
- **Tailwind CSS 4.x** with custom configuration
- **Dark mode** via next-themes (default: dark)
- **Lucide React** for icons
- **Recharts** for dashboard visualizations
- **Sonner** for toast notifications

### Forms and Validation

- TanStack Form with Zod Schemas
- Schema-first approach: define Zod schemas, generate types
- Use tanstack_mcp for up to date TanStack Form documentation

### Authentication

- Supabase Auth with SSR support
- Middleware refreshes sessions
- Protected routes under `/app/*`
- Auth routes under `/(auth)/*`

### Logging

- Server-side only (`loglayer` + `tslog`)
- Located in `features/logger/`
- Includes redaction and sprintf plugins

### Testing Philosophy

- Vitest with browser mode (Playwright) for component tests
- Separate JSDOM tests when browser mode not needed
- E2E tests with Playwright
- Coverage with v8 provider

## Important Notes

### Build Behavior

- TypeScript errors are **intentionally ignored** during build (`ignoreBuildErrors: true`)
- Type checking happens via linting and git hooks instead
- This prevents blocking deployments for non-critical type issues

### Path Aliases

- `@/*` maps to `src/*`
- `public/*` maps to `./public/*`

### Dependencies to Note

- React 19 with experimental features
- Next.js 16 with React Compiler support
- Tailwind CSS 4.x (using `@tailwindcss/postcss`)
- Zod 4.x (uses native types instead of deprecated methods)

### Code comments and documentation

- Use descriptive variable and function names that are clear, consise and self explanatory
- Refrain from adding unnecessary comments that are self explanatory from the code itself such as explaining what a function does if the name of the function makes it obvious
- Never use magic numbers unless it's unavoidable, create variables that clearly label their purpose and only then use them in the code. If it's completely unavoidable, use a comment to explain why

### Documentation to assist with the project

- Before implementing new features and fixes, check if feature is already implemente in the project and use it as a reference or refer to the mcp servers below for up to date documentation on each library
- Use tanstack_mcp for up to date documentation for all TanStack libraries such as TanStack Form, TanStack Query (React Query), TanStack Devtools and TanStack Table
- For other libraries use context7_mcp for up to date information and documentation
