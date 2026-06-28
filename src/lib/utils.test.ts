import { describe, it, expect } from 'vitest';
import { getInitials, formatSkills } from './utils';

describe('getInitials', () => {
	it('extracts initials from full name', () => {
		expect(getInitials('Jan Šťastka')).toBe('JŠ');
	});
	it('handles single name', () => {
		expect(getInitials('Jan')).toBe('J');
	});
});

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
