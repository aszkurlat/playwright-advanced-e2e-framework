//zakomentowałam, temat do którego można wrócić później

import fs from "fs";
import { logWithStep } from "./logger.js";


function writeFile(filePath: string, data: string) {
    try {
        fs.writeFileSync(filePath, data);
        logWithStep("info", `Writing file: ${filePath}...`);
    } catch (err) {
        new Error(`Error writing to: ${filePath}, ${err}`);
    }
}

export default { writeFile };