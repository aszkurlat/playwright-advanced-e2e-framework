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

    test('Should validate login form elements state', async ({ page }) => {
        await page.getByRole('link', { name: 'Make Appointment' }).click();

        const usernameInput = page.getByLabel('Username');
        const passwordInput = page.getByLabel('Password');
        const loginButton = page.getByRole('button', { name: 'Login' });

        await expect(usernameInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(loginButton).toBeEnabled();
    });
    
    test('Should navigate to login page after clicking Make Appointment', async ({ page }) => {
        await page.getByRole('link', { name: 'Make Appointment' }).click();

        await expect(page).toHaveURL(/.*profile\.php#login/);

        await expect(
            page.getByText('Please login to make appointment.')
        ).toBeVisible();
    });


});
