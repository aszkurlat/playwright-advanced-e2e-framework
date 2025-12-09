import { test, expect } from '@playwright/test';;

test.describe("Login Functionality", () => {

    test.beforeEach("Go to login page", async ({ page }) => {
        // Launch URL and assert title and header
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await expect(page).toHaveTitle('CURA Healthcare Service');
        await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');

        // CLick on Make Appointment
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        // Assert title
        await expect(page.getByText('Please login to make appointment.')).toBeVisible();
    });

    test("Should login successfully", async ({ page }) => {
        // Successful Login
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        // Assert a text 
        await expect(page.locator('h2')).toHaveText('Make Appointment');
    });

    test("Should prevent login with incorrect creds", async ({ page }) => {
        // Unsuccessful Login
        await page.getByLabel('Username').fill('John Smith');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        // Assert a error message
        await expect(page.locator('.text-danger')).toHaveText('Login failed! Please ensure the username and password are valid.');
    });
});

