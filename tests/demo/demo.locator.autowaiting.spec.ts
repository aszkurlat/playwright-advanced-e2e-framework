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
    test('Should demonstrate different locator strategies', async ({ page }) => {
        // getByRole
        await page.getByRole('link', { name: 'Make Appointment' }).click();

        // getByText
        await expect(
            page.getByText('Please login to make appointment.')
        ).toBeVisible();

        // getByLabel
        await page.getByLabel('Username').fill('John Doe');

        // locator (CSS)
        await expect(
            page.locator('#txt-username')
        ).toHaveValue('John Doe');
    });
    test('Should rely on Playwright auto-waiting', async ({ page }) => {
        await page.getByRole('link', { name: 'Make Appointment' }).click();

        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(
            page.getByRole('heading', { name: 'Make Appointment' })
        ).toBeVisible();
    });


});
