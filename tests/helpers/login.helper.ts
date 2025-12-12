import { Page } from "@playwright/test";

export async function login(page: Page) {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
}
