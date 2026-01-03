import { test, expect } from "@playwright/test";
import HomePage from "../page-objects/nopcommerce-login.page";

test("Login to NopCommerce Web App", async ({ page }, testInfo) => {
    // Env Config
    const envConfig = testInfo.project.use as any;

    // Create a page object
    const loginPage = new HomePage(page);

    // Login
    await loginPage.loginToNopeCommerceApp(
        envConfig.nopCommerceWeb,
        process.env.NOP_COMMERCE_TEST_USERNAME,
        process.env.NOP_COMMERCE_TEST_PASSWORD
    );
});
