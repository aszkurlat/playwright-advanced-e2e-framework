import { test, expect } from '@playwright/test';

test.describe('Multiple windows flow', () => {
  test('should open a new window and assert header', async ({ page }) => {
    // Navigate to the site and go to Multiple Windows page
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Multiple Windows' }).click();
    await expect(page.locator('h3')).toHaveText('Opening a new window');

    // Open new window (popup)
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('link', { name: 'Click Here' }).click(),
    ]);

    await popup.waitForLoadState();
    await expect(popup.locator('h3')).toHaveText('New Window');

    // Close popup and verify parent page
    await popup.close();
    await expect(page).toHaveURL(/\/windows$/);
  });
});
