/**
 * DEMO FILE
 * This spec demonstrates Playwright hook execution order and scope:
 * - file-level hooks
 * - describe-level hooks
 * Intended for learning and reference purposes only.
 */

import { test, expect } from "@playwright/test";

test.beforeAll(async () => {
    console.log(">> [file] beforeAll (runs once per worker)");
});

test.beforeEach(async () => {
    console.log(">> [file] beforeEach (runs before each test in this file)");
});

test.describe("Suite A: navigation sanity", () => {
    test.beforeAll(async () => {
        console.log(">> [suite A] beforeAll");
    });

    test.beforeEach(async () => {
        console.log(">> [suite A] beforeEach");
    });

    test("should open example.com and show heading", async ({ page }) => {
        await page.goto("https://example.com");
        await expect(page.getByRole("heading", { name: "Example Domain" })).toBeVisible();
    });

    test("should show More information link", async ({ page }) => {
        await page.goto("https://example.com");
        await expect(page.getByRole("link", { name: "More information..." })).toBeVisible();
    });

    test("should have correct page title", async ({ page }) => {
        await page.goto("https://example.com");
        await expect(page).toHaveTitle("Example Domain");
    });
});

test.describe("Suite B: second suite scope demo", () => {
    test.beforeEach(async () => {
        console.log(">> [suite B] beforeEach");
    });

    test("should open example.com", async ({ page }) => {
        await page.goto("https://example.com");
        await expect(page.locator("h1")).toHaveText("Example Domain");
    });
});
