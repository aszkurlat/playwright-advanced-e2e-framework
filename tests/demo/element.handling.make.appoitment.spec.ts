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

    });
});