import { type FullConfig } from "@playwright/test";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export default async function globalTeardown(_config: FullConfig) {
    console.log("[INFO]: Starting global teardown...");

    const runner = process.env.RUNNER?.toUpperCase();

    if (runner !== "LOCAL") {
        console.log(`[INFO]: RUNNER=${runner ?? "undefined"} - skipping Allure serve.`);
    } else {
        const resultsDir = path.resolve(process.cwd(), "allure-results");

        if (!fs.existsSync(resultsDir)) {
            console.log(`[INFO]: No Allure results found at: ${resultsDir}. Skipping report.`);
        } else {
            console.log("[INFO]: Local run detected - starting Allure server...");
            exec(`allure serve "${resultsDir}"`, (error, _stdout, stderr) => {
                if (error) {
                    console.error("[ERROR]: Failed to start Allure server:", error.message);
                    return;
                }
                if (stderr) console.error("[WARN]: Allure stderr:", stderr);
            });
        }
    }

    console.log("[INFO]: Global teardown completed.");
}
