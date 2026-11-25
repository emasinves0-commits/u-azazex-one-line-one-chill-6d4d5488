import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The tide as courier: it delivers forty thousand left shoes, a number you can
// count and a thing you can touch. "Still warm at the heels" means the feet
// were in them minutes ago, so the dread is inferred, never announced.
const ENTRY =
  "The tide didn't bring in driftwood this morning; it unloaded forty thousand left shoes, all still warm at the heels.";

const FILE_NAME = "entry.txt";
const DEFAULT_OUTPUT_DIR = "/output";
const MAX_CHARS = 200;

// Throws unless the text is 1-MAX_CHARS characters, not only whitespace,
// and has no trailing newline. Returns the text unchanged.
function guard(text: string): string {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must contain non-whitespace characters");
  }
  if (/[\r\n]$/.test(text)) {
    throw new Error("entry must not end with a newline (CR or LF)");
  }
  return text;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || DEFAULT_OUTPUT_DIR;
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, FILE_NAME), guard(ENTRY), "utf8");
