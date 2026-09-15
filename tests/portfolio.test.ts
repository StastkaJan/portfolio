import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';

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
	await page.goto('http://127.0.0.1:4173/');
	for (const id of ['hero', 'about', 'experience', 'projects', 'skills', 'languages', 'contact']) {
		await expect(page.locator(`#${id}`)).toBeVisible();
		await expect(page.locator(`#${id}`)).toHaveCSS('opacity', '1');
	}
	await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
	await context.close();
});

