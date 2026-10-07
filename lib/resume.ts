import { existsSync } from "node:fs";
import path from "node:path";
import { site } from "./site";

/** True when public/resume.pdf exists at build time — the resume buttons only render then. */
export const hasResume = existsSync(path.join(process.cwd(), "public", site.resumePath));
