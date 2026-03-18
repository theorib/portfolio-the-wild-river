# Testing

## Commands

```bash
pnpm test             # Vitest in watch mode with browser (headless)
pnpm test:ui          # Vitest with UI
pnpm test:coverage    # Generate coverage report
pnpm test:e2e         # Playwright e2e tests
pnpm test:e2e:ui      # Playwright in UI mode
pnpm test:e2e:debug   # Debug Playwright tests
pnpm test:e2e:codegen # Generate Playwright test code
pnpm test:e2e:report  # View Playwright test report
```

## File Patterns

| Type | Pattern | Location |
|------|---------|----------|
| Unit/Integration | `*.{test,spec}.{ts,tsx}` | `src/**/*` |
| JSDOM tests | `*.{test,spec}.jsdom.{ts,tsx}` | `src/**/*` |
| E2E tests | `*.spec.ts` | `src/__tests__/e2e/` |

## Setup

- Test setup file: `src/lib/testUtils/setupTests.ts`
- Coverage provider: v8

## Testing Philosophy

- **Vitest with browser mode** (Playwright) for component tests
- **JSDOM tests** when browser mode not needed (simpler unit tests)
- **E2E with Playwright** for user flow testing
