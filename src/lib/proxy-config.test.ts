import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const readProjectFile = (path: string) =>
	readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');

describe('edge proxy configuration', () => {
	it('loads exact-host meal plan preview routes on the shared Docker network', () => {
		const caddyfile = readProjectFile('Caddyfile');
		const compose = readProjectFile('docker-compose.yml');

		expect(caddyfile).toContain('import preview-routes/*');
		expect(compose).toContain('./preview-routes:/etc/caddy/preview-routes:ro');
		expect(compose).toContain('name: public-web');
	});
});
