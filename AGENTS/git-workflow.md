# Git Workflow

## Commits

```bash
pnpm cz      # Commitizen with gitmoji (recommended)
git commit   # Standard commit (triggers husky hooks)
```

## Conventions

- Commits follow **gitmoji** convention via commitlint
- Format: `<emoji> <type>(<scope>): <message>`

## Git Hooks (Husky)

| Hook | Action |
|------|--------|
| pre-commit | lint-staged, vitest tests |
| prepare-commit-msg | Launches Commitizen interactively |

## Workflow

1. Make changes
2. Run `pnpm cz` to commit (guides you through gitmoji format)
3. Pre-commit hook runs linting and tests automatically
4. Push when ready
