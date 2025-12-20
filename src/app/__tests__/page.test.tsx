import { describe, expect, test } from 'vitest';

import { render } from 'vitest-browser-react';

import HomePage from '@/app/page';
import { Suspense } from 'react';

describe('Temp Test', () => {
	test('Home Page Temp', async () => {
		const screen = await render(
			<Suspense>
				<HomePage />
			</Suspense>,
		);
		const heading = screen.getByRole('heading', {
			name: 'I am the home page',
		});

		await expect.element(heading).toBeVisible();
	});
});
