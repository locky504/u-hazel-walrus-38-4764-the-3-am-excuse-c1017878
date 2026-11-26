// The 3 AM Excuse — make.fun bounty
// u-hazel-walrus-38-4764-the-3-am-excuse-c1017878
//
// One line, under 200 characters, in the voice of a hardware wallet that
// will not sign a transaction at 3 AM. The wallet is a vault with a
// grudge: off the clock, running on spite, and it refuses to sign
// anything its owner's 9 AM self would deny. The joke deliberately
// avoids the shopworn excuses — no dead battery, no firmware update,
// no cold storage — and instead turns the hour itself into the punchline:
// a 3 AM decision gets filed with the sunrise.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "It's 3 AM. The vault's off the clock, running on spite — I'm not signing anything your 9 AM self will deny, so file it with the sunrise.";

// The gate counts the file, not the console: keep the line to one line,
// 1–200 characters, and refuse to ship anything that breaks the cap.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(entry);

// Print the line and persist it for the grader: write the line exactly
// as printed, with no trailing newline, so the gate counts it as-is.
// The grader reads /output/entry.txt by default; OUTPUT_DIR lets a local
// run point the file elsewhere without touching the entry itself.
function resolveOutDir(): string {
  const override = process.env.OUTPUT_DIR?.trim();
  return override ? override : "/output";
}

function writeEntry(text: string, outDir: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

console.log(entry);
writeEntry(entry, resolveOutDir());
