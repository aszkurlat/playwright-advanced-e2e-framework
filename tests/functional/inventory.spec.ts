import { test, expect } from '@playwright/test';

test.describe('Inventory Management', () => {
    test.beforeEach("Login with valid credential", async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // Assertion
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL(/.*\/inventory.html/);
    });


    test("Should confirm all prices are non-zero values", async ({ page }) => {
        // Get a list of products
        let productsElms = page.locator(".inventory_item");
        await expect(productsElms).toHaveCount(6);

        // Get product name and prices
        let totalProducts = await productsElms.count();

        let priceArr: string[] = [];
        for (let i = 0; i < totalProducts; i++) {
            let eleNode = productsElms.nth(i);

            // Product name
            let productName = await eleNode.locator(".inventory_item_name").innerText();

            // Price
            let price = await eleNode.locator(".inventory_item_price").innerText();

            // Print results
            console.log(`Product: ${productName}, price: ${price}`);

            priceArr.push(price);
        }

        console.log(`Original Price Array: ${priceArr}`);

        // let priceArrNum = priceArr.map((item) => parseFloat(item.replace("$", "")));
        // console.log(`>> Modified arr: ${priceArrNum}`);
        // let priceArrWithInvalidVals = priceArrNum.filter((item) => item <= 0);

        const invalidPrices = priceArr
            .map(price => parseFloat(price.replace("$", "")))
            .filter(price => price <= 0);

        // Assertion
        expect(invalidPrices, `Found invalid prices: ${invalidPrices}`).toHaveLength(0);
    });

});


