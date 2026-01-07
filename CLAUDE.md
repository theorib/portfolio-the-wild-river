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
- Must run `next-typesafe-url` before build

### UI and Styling
- **shadcn/ui** components in `components/ui/`
- **Tailwind CSS 4.x** with custom configuration
- **Dark mode** via next-themes (default: dark)
- **Lucide React** for icons
- **Recharts** for dashboard visualizations
- **Sonner** for toast notifications

### Forms and Validation
- React Hook Form with Zod resolvers
- TanStack Form for advanced form state
- Schema-first approach: define Zod schemas, generate types

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

### Commit Workflow
- The `enhanced_commit.sh` script temporarily modifies hooks for better commit experience
- Standard `git commit` uses husky hooks with commitlint validation
- All commits must follow gitmoji convention

### Path Aliases
- `@/*` maps to `src/*`
- `public/*` maps to `./public/*`

### Dependencies to Note
- React 19 with experimental features
- Next.js 16 with React Compiler support
- Tailwind CSS 4.x (using `@tailwindcss/postcss`)
- Zod 4.x (uses native types instead of deprecated methods)
