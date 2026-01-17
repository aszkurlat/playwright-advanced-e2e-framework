import { test, expect } from '@playwright/test';;

test.describe("Login Functionality", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await page.getByRole('link', { name: 'Make Appointment' }).click();
    });

    test('Should login successfully', async ({ page }) => {
        await expect(
            page.getByText('Please login to make appointment.')
        ).toBeVisible();

        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(
            page.getByRole('heading', { name: 'Make Appointment' })
        ).toBeVisible();
    });
     test('Should prevent login with incorrect creds', async ({ page }) => {
        await page.getByLabel('Username').fill('Wrong User');
        await page.getByLabel('Password').fill('WrongPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(
            page.locator('.text-danger')
        ).toHaveText('Login failed! Please ensure the username and password are valid.');
    });
});

