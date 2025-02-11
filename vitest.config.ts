import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    // If you are using TypeScript, this give vite the ability to resolve imports using TypeScript's path mapping.
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    setupFiles: ['./src/lib/testUtils/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['html'],
    },
  },
})
