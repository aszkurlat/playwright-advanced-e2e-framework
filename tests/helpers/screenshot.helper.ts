import { Locator, test, type Page } from "@playwright/test";
/**
 * Take a full page screenshot and attach it to the report
 */
async function takeFullPageScreenshot(page: Page, screenshotName: string) {
    const screenshot = await page.screenshot({ fullPage: true });

    await test.info().attach(screenshotName, {
        body: screenshot,
        contentType: "image/png",
    });
}
/**
 * Take a screenshot of a specific element and attach it to the report
 */
async function takeElementScreenshot(element: Locator, screenshotName: string) {
    const screenshot = await element.screenshot();

    await test.info().attach(screenshotName, {
        body: screenshot,
        contentType: "image/png",
    });
}

export default { takeFullPageScreenshot, takeElementScreenshot };