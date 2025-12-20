import { describe, expect, test } from 'vitest';

describe('Boolean Generic Test', () => {
	test('Expect True to be True', () => {
		expect(true).toBe(true);
	});
	test.fails('Expect True to be False', () => {
		expect(true).toBe(false);
	});
});
