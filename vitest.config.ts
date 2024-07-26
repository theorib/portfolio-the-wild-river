import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
// If you are using TypeScript, this give vite the ability to resolve imports using TypeScript's path mapping.
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    // If you are using TypeScript, this give vite the ability to resolve imports using TypeScript's path mapping.
    tsconfigPaths(),
  ],
  test: {
    // If you want to use global variables
    globals: true,
    environment: 'jsdom',
    // Add the correct path to the setup file
    setupFiles: ['./src/lib/testUtils/setupTests.ts'],
    // alias: {
    //   '@/': new URL('./src/', import.meta.url).pathname,
    // },
    coverage: {
      provider: 'v8',
      reporter: ['html'],
    },
  },
});
