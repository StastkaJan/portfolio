import { test, expect } from '@playwright/test';

test('portfolio page loads with hero content', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toContainText('Jan');
	await expect(page.locator('#about')).toBeVisible();
	await expect(page.locator('#experience')).toBeVisible();
});

