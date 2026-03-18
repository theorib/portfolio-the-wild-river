# Architecture

## Directory Structure

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
│   ├── ui/               # shadcn/ui components (Base UI)
│   └── ui-custom/        # Custom UI components (e.g., MainLayout)
├── features/             # Feature-based modules
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

## Feature Pattern

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
├── cabins/               # Similar structure
├── dashboard/            # Dashboard with charts
├── reactQuery/           # React Query provider setup
├── darkMode/             # Theme provider
└── logger/               # Server-side logging
```

**Each feature contains:**
- `hooks/` - React Query hooks for data fetching
- `components/` - Feature-specific UI components
- `schema.ts` - Zod validation schemas
- `types.ts` - TypeScript types
- `actions.ts` - Server actions

## Data Flow

### Remote State (React Query)

- TanStack Query manages all server state
- Default stale time and refetch intervals in `QueryClientProvider`
- Hook naming pattern: `useBookings`, `useBooking(id)`
- Mutations for creates/updates/deletes
- Pre-fetching where possible

### Environment Variables

- Validated via `@t3-oss/env-nextjs` in `src/lib/env.ts`
- Type-safe access throughout the app

## Key Dependencies

- React 19 with experimental features
- Next.js 16 with React Compiler support
- Tailwind CSS 4.x (`@tailwindcss/postcss`)
- Zod 4.x (uses native types)
