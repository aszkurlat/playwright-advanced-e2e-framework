import { test, expect } from '@playwright/test';

test.describe('Playwright fundamentals – navigation, locators, auto-waiting', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
    });

    test('Should load homepage with correct title and header', async ({ page }) => {
        await expect(page).toHaveTitle('CURA Healthcare Service');

        await expect(
            page.getByRole('heading', { level: 1 })
        ).toHaveText('CURA Healthcare Service');
    });

   
});
