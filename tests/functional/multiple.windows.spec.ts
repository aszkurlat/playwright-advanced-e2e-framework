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
  test('should open a new window and display correct header', async ({ page }) => {
    // ---------- Arrange ----------
    await page.goto('https://the-internet.herokuapp.com/');
    const multipleWindowsLink = page.getByRole('link', { name: 'Multiple Windows' });
    const clickHereLink = page.getByRole('link', { name: 'Click Here' });

    // ---------- Act ----------
    await multipleWindowsLink.click();
    const popup = await openPopup(page, () => clickHereLink.click());

    // ---------- Assert ----------
    await expect(page.locator('h3')).toHaveText('Opening a new window');
    await expect(popup.locator('h3')).toHaveText('New Window');
    await expect(page).toHaveURL(/\/windows$/);

    await popup.close();
  });
});
