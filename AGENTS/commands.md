# Commands Reference

## Development

```bash
pnpm dev              # Dev server with next-typesafe-url watch mode
pnpm dev:url          # next-typesafe-url watch mode only
pnpm build            # Generate URLs + production build
pnpm start            # Start production server
```

## Testing

```bash
pnpm test             # Vitest watch mode (browser, headless)
pnpm test:ui          # Vitest with UI
pnpm test:coverage    # Generate coverage report
pnpm test:e2e         # Playwright e2e tests
pnpm test:e2e:ui      # Playwright UI mode
pnpm test:e2e:debug   # Debug Playwright
pnpm test:e2e:codegen # Generate test code
pnpm test:e2e:report  # View test report
```

## Linting & Formatting

```bash
pnpm lint             # ESLint (quiet) + TypeScript check
pnpm lint:fix         # Fix ESLint issues with cache
pnpm lint:tsc         # TypeScript check only
pnpm lint:next        # Next.js linter
pnpm lint:staged      # Run lint-staged (pre-commit)
pnpm format           # Format all files with Prettier
pnpm format:check     # Check formatting
```

## Supabase

```bash
pnpm supabase:generate:types    # Generate TypeScript types
pnpm supabase:generate:schemas  # Generate Zod schemas
```

## Other

```bash
pnpm shad             # Add shadcn/ui components
pnpm lint:inspect     # Open ESLint config inspector
pnpm typeurl          # Rebuild next-typesafe-url types
pnpm cz               # Commitizen commit flow (gitmoji)
```

## Build Notes

TypeScript errors are **intentionally ignored** during build (`ignoreBuildErrors: true`). Type checking happens via linting and git hooks instead.
