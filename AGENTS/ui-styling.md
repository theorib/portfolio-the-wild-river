# UI & Styling

## Component Library

**shadcn/ui with Base UI** - This project uses a custom shadcn/ui built on Base UI (`@base-ui/react`), NOT Radix UI.

```bash
pnpm shad    # Add shadcn/ui components
```

### Using Components

```typescript
// Always import from src/components/ui/
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
```

### Documentation

- Use `context7_mcp` for Base UI documentation
- Alternative: https://base-ui.com/llms.txt

Base UI is a styling-agnostic headless component library. Components are fully accessible and composable.

## Styling Stack

| Tool | Purpose |
|------|---------|
| Tailwind CSS 4.x | Utility-first CSS (`@tailwindcss/postcss`) |
| next-themes | Dark mode (default: dark) |
| Lucide React | Icons |
| Recharts | Dashboard visualizations |
| Sonner | Toast notifications |

## Forms

- TanStack Form with Zod schemas
- Schema-first: define Zod schema, derive types
- Use `tanstack_mcp` for TanStack Form documentation
