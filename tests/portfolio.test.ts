import { test, expect } from '@playwright/test';

test('portfolio page loads with hero content', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toContainText('Jan');
	await expect(page.locator('#about')).toBeVisible();
	await expect(page.locator('#experience')).toBeVisible();
});

test('dark/light theme toggle works', async ({ page }) => {
	await page.goto('/');
	const html = page.locator('html');
	await expect(html).toHaveAttribute('data-theme', 'dark');
	await page.click('[aria-label="Toggle theme"]');
	await expect(html).toHaveAttribute('data-theme', 'light');
	await page.click('[aria-label="Toggle theme"]');
	await expect(html).toHaveAttribute('data-theme', 'dark');
});

