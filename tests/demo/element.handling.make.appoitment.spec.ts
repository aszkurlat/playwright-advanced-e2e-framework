import { test, expect } from "@playwright/test";
import { login } from "../helpers/login.helper";

test.describe("Make Appointment", () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test("Should make an appointment with non-default values", async ({ page }) => {
        /**
         * ELEMENT: Dropdown
         *
         * @actions
         * 1. ✅ Assert default option
         * 2. ✅ Select by:
         *  - label
         *  - Index
         * 3. ✅ Assert the count
         * 4. ✅ Get all dropdown values
         *
         * @notes
         * - Selenium - Select class and 3 selectBy* methods
         * - WebdriverIO - 3 selectBy* methods
         */

        // 📍Dropdown

        // Assert default option
        await expect(page.getByLabel("Facility")).toHaveValue("Tokyo CURA Healthcare Center");
        await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");

        // Select by Label or index
        await page.getByLabel("Facility").selectOption({ label: "Seoul CURA Healthcare Center" });
        await page.getByLabel("Facility").selectOption({ index: 0 });

        // Assert the count
        let drpdwnOptionsEle = page.getByLabel("Facility").locator("option");
        await expect(drpdwnOptionsEle).toHaveCount(3);

        // Get all dropdown values
        let listOfDrpdwnElems = await page.getByLabel("Facility").all();

        // for ... of loop
        let listOfOptions = [];

        for (let ele of listOfDrpdwnElems) {
            let eleTxt = await ele.textContent();
            if (eleTxt) {
                listOfOptions.push(eleTxt);
            }
        }

        console.log(`>> List of Options: ${listOfOptions}`);
        /**
        * ELEMENT: Checkbox/Radio button
        *
        * @actions
        * 1. ✅Assert the default option - to be checked/unchecked
        * 2. ✅ Check/uncheck
        *
        * @notes
        * - Radio button - Allows to select only one option
        * - Checkbox - Allows for multi-entry
        */

        // Checkbox
        // await page.getByText("Apply for hospital readmission").click();
        await page.getByText("Apply for hospital readmission").check();
        await page.getByText("Apply for hospital readmission").uncheck();

        // Radio button
        // Assert the default option - to be checked/unchecked
        await expect(page.getByText("Medicare")).toBeChecked();

        await page.getByText("Medicaid").check();
        await expect(page.getByText("Medicare")).not.toBeChecked();

        // Date input box
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill("05/10/2027");
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");

        // Multi-line comments input box
        await page.getByRole("textbox", { name: "Comment" }).click();
        await page.getByRole("textbox", { name: "Comment" }).fill("This is a multi-line comments\ncaptured by Playwright codegen!");

        // Button
        await page.getByRole("button", { name: "Book Appointment" }).click();

        // Assertion
        await expect(page.locator("h2")).toContainText("Appointment Confirmation");
        await expect(page.getByRole("link", { name: "Go to Homepage" })).toBeVisible();

    });
});