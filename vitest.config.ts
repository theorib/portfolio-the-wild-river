import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: { tsconfigPaths: true },
	test: {
		globals: true,
		exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.next/**'],
		setupFiles: ['./src/shared/lib/testUtils/setupTests.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['html'],
		},
		projects: [
			{
				test: {
					name: 'react-jsdom',
					include: ['src/**/*.{test,spec}.jsdom.{ts,tsx,js,jsx}'],
					exclude: ['**/e2e/**', 'node_modules/**'],
					environment: 'jsdom',
				},
			},
			{
				test: {
					name: 'react-browser-mode',
					include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}'],
					exclude: ['**/e2e/**', 'node_modules/**', '**/*.jsdom.*'],
					browser: {
						enabled: true,
						headless: true,
						provider: playwright(),
						instances: [{ browser: 'chromium' }],
					},
				},
			},
		],
	},
});
