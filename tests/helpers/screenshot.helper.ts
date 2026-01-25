import { test, type Page } from "@playwright/test";
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

export default { takeFullPageScreenshot };