import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';

test('Google stylesheet preload allows first paint without direct font preloads', async ({ page }) => {
	let releaseStylesheet!: () => void;
	const stylesheetReady = new Promise<void>((resolve) => { releaseStylesheet = resolve; });
	await page.route('https://fonts.gstatic.com/**', (route) => route.abort());
	await page.route('https://fonts.googleapis.com/**', async (route) => {
		await stylesheetReady;
		await route.fulfill({ contentType: 'text/css', body: ':root { --font-css-loaded: 1; }' });
	});
	try {
		await page.goto('/', { waitUntil: 'domcontentloaded' });
		await expect.poll(() => page.evaluate(() => performance.getEntriesByName('first-contentful-paint').length)).toBe(1);
		await expect(page.locator('link[rel="preload"][as="font"]')).toHaveCount(0);
		await expect(page.locator('link[rel="preload"][as="style"]')).toHaveAttribute('href', /fonts\.googleapis\.com.*display=swap/);
	} finally {
		releaseStylesheet();
	}
	await expect(page.locator('link[rel="stylesheet"][href*="fonts.googleapis.com"]')).toHaveAttribute('href', /display=swap/);
	await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--font-css-loaded').trim())).toBe('1');
});

for (const deviceScaleFactor of [1, 2]) {
	test(`mobile portrait selects an optimized image at ${deviceScaleFactor}x density`, async ({ browser }) => {
		const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor });
		const page = await context.newPage();
		await page.goto('http://127.0.0.1:4173/');
		const portrait = page.locator('#hero img');
		await expect(portrait).toHaveAttribute('fetchpriority', 'high');
		expect(await portrait.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
		const src = await portrait.evaluate((img: HTMLImageElement) => img.currentSrc);
		expect(src).toMatch(new RegExp(`/_app/immutable/assets/avatar-${deviceScaleFactor === 1 ? 400 : 800}\\.[^/]+\\.webp$`));
		const response = await context.request.get(src);
		expect((await response.body()).length).toBeLessThan(11000);
		await context.close();
	});
}

test('skill ratings expose their names and values to assistive technology', async ({ page }) => {
	const { coreStack } = JSON.parse(readFileSync('content/data.json', 'utf8'));
	await page.goto('/');
	await expect(page.getByRole('meter')).toHaveCount(coreStack.length);
	for (const skill of coreStack) {
		const meter = page.getByRole('meter', { name: `${skill.name} proficiency`, exact: true });
		await expect(meter).toHaveAttribute('aria-valuemin', '0');
		await expect(meter).toHaveAttribute('aria-valuemax', '5');
		await expect(meter).toHaveAttribute('aria-valuenow', String(skill.level));
		await expect(meter).toHaveAttribute('aria-valuetext', `${skill.level} out of 5`);
	}
});

test('mobile defers project images and loads smaller variants when scrolled into view', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	const projectRequests: string[] = [];
	page.on('request', (request) => {
		if (new URL(request.url()).pathname.startsWith('/projects/')) projectRequests.push(request.url());
	});
	await page.goto('/');
	expect(projectRequests).toHaveLength(0);
	await expect(page.locator('link[rel="stylesheet"][href*="/_app/"]:not([disabled])')).toHaveCount(0);
	await expect(page.locator('#hero img')).toHaveAttribute('fetchpriority', 'high');
	for (const img of await page.locator('#projects img').all()) {
		await img.scrollIntoViewIfNeeded();
		await expect.poll(() => img.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
		expect(await img.evaluate((node: HTMLImageElement) => node.currentSrc)).toMatch(/-640\.webp$/);
	}
});

test('portfolio page loads with hero content', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toContainText('Jan');
	await expect(page.locator('#about')).toBeVisible();
	await expect(page.locator('#experience')).toBeVisible();
});

test('static output contains crawlable content, metadata, and discovery files', async ({ page, request }) => {
	const html = readFileSync('build/index.html', 'utf8');
	expect(html).toContain('<h1');
	expect(html).toContain('Full Stack Developer');
	expect(html).toContain('application/ld+json');
	expect(existsSync('build/index.js')).toBe(false);

	await page.goto('/');
	await expect(page).toHaveTitle(/Jan.*Full Stack Developer/);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://stastka.dev/');
	await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://stastka.dev/');
	await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /React architecture/);
	await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary');
	const profile = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
	expect(profile['@type']).toBe('ProfilePage');
	expect(profile.mainEntity.name).toBe(await page.locator('h1').innerText());
	expect(profile.mainEntity.sameAs).toContain('https://github.com/StastkaJan');
	const imageUrl = await page.locator('meta[property="og:image"]').getAttribute('content');
	const image = await request.get(new URL(imageUrl!).pathname);
	expect(image.ok()).toBe(true);
	expect(image.headers()['content-type']).toContain('image/jpeg');
	const robots = await request.get('/robots.txt');
	expect(robots.ok()).toBe(true);
	expect(await robots.text()).toContain('Sitemap: https://stastka.dev/sitemap.xml');
	const sitemap = await request.get('/sitemap.xml');
	expect(sitemap.ok()).toBe(true);
	expect(await sitemap.text()).toContain('<loc>https://stastka.dev/</loc>');
});

test('all portfolio sections remain readable without JavaScript', async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	const page = await context.newPage();
	await page.route('https://fonts.googleapis.com/**', (route) => route.fulfill({
		contentType: 'text/css', body: ':root { --font-css-loaded: 1; }'
	}));
	await page.goto('http://127.0.0.1:4173/');
	await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--font-css-loaded').trim())).toBe('1');
	for (const id of ['hero', 'about', 'experience', 'projects', 'skills', 'languages', 'contact']) {
		await expect(page.locator(`#${id}`)).toBeVisible();
		await expect(page.locator(`#${id}`)).toHaveCSS('opacity', '1');
	}
	await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
	await context.close();
});

