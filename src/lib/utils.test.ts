import { describe, it, expect } from 'vitest';
import { formatSkills } from './utils';

describe('formatSkills', () => {
	it('joins with separator', () => {
		expect(formatSkills(['React', 'TypeScript'])).toBe('React · TypeScript');
	});
	it('handles single item', () => {
		expect(formatSkills(['React'])).toBe('React');
	});
	it('handles empty array', () => {
		expect(formatSkills([])).toBe('');
	});
});
