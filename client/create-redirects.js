import * as fs from "fs";
import path from "path";

const redirectsPath = path.join(process.cwd(), "dist", "_redirects");
const content = "/* /index.html 200";
fs.writeFileSync(redirectsPath, content);
