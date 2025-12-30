import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(_config: FullConfig) {
    console.log("[INFO]: Starting global setup...");

    const runner = process.env.RUNNER?.toUpperCase();

    if (runner === "LOCAL") {
        console.log("[INFO]: Local run detected. Cleaning Allure results...");

        const resultsDir = path.resolve(process.cwd(), "allure-results");

        if (fs.existsSync(resultsDir)) {
            fs.rmSync(resultsDir, { recursive: true, force: true });
            console.log("[INFO]: Allure results directory removed.");
        } else {
            console.log("[INFO]: No Allure results directory found. Skipping cleanup.");
        }
    }

    // Example: cleanup one-off env values used in tests
    delete process.env.LOGIN_COOKIES;

    console.log("[INFO]: Global setup completed.");
}
