import { test, expect, Page } from '@playwright/test';

async function openPopup(
  parentPage: Page,
  action: () => Promise<void>
): Promise<Page> {
  const [popup] = await Promise.all([
    parentPage.waitForEvent('popup'),
    action(),
  ]);

  await popup.waitForLoadState();
  return popup;
}

test.describe('Multiple windows flow', () => {
  test('should open a new window and assert header', async ({ page }) => {
    // Navigate to the site and go to Multiple Windows page
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Multiple Windows' }).click();
    await expect(page.locator('h3')).toHaveText('Opening a new window');

    // Open popup using helper
    const popup = await openPopup(page, () =>
      page.getByRole('link', { name: 'Click Here' }).click()
    );

    await expect(popup.locator('h3')).toHaveText('New Window');

    await popup.close();
    await expect(page).toHaveURL(/\/windows$/);
  });
});
