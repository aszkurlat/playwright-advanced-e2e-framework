import fs from "fs";
import { logWithStep } from "./logger.js";

function readFile(filePath: string): any {
    if (!fs.existsSync(filePath)) {
        throw new Error(`No file exists with given name:${filePath}`);
    }
    logWithStep("info", `Reading file: ${filePath}...`);
    let data = fs.readFileSync(filePath, "utf8");
    return data;
}
function writeFile(filePath: string, data: string) {
    try {
        fs.writeFileSync(filePath, data);
        logWithStep("info", `Writing file: ${filePath}...`);
    } catch (err) {
        new Error(`Error writing to: ${filePath}, ${err}`);
    }
}

export default { readFile, writeFile };