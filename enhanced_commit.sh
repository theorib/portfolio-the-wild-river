#!/bin/bash

# Save current hooks
mv .husky/commit-msg .husky/commit-msg.bak
mv .husky/post-merge .husky/post-merge.bak
mv .husky/pre-commit .husky/pre-commit.bak
mv .husky/prepare-commit-msg .husky/prepare-commit-msg.bak

# Create temporary hooks
echo '#!/bin/sh
pnpm dlx commitlint --edit $1' > .husky/commit-msg

echo '#!/bin/sh
pnpm install' > .husky/post-merge

echo '#!/bin/sh
pnpm lint-staged -v && pnpm vitest run' > .husky/pre-commit

echo '#!/bin/sh
exec < /dev/tty && npx cz --hook || true' > .husky/prepare-commit-msg

# Make hooks executable
chmod +x .husky/commit-msg .husky/post-merge .husky/pre-commit .husky/prepare-commit-msg

# Perform the commit
git commit

# Restore original hooks
mv .husky/commit-msg.bak .husky/commit-msg
mv .husky/post-merge.bak .husky/post-merge
mv .husky/pre-commit.bak .husky/pre-commit
mv .husky/prepare-commit-msg.bak .husky/prepare-commit-msg
