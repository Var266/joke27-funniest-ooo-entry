// funniest-ooo re-entry: a one-line out-of-office auto-reply.
// The entry is built from three beats — a real OOO frame, a confession,
// then the punch — so the program assembles the line instead of
// pasting a single literal.
import { mkdirSync, writeFileSync } from "node:fs";

const beats = [
  "Out of office until Monday.",
  "I have read your email.",
  "I have chosen peace.",
];

const GATE_CHARS = 140;

const entry = beats.join(" ");

// Fail loudly rather than silently shipping an entry the gate refuses:
// one line, 1-140 characters, not only whitespace.
const charCount = [...entry].length;
if (charCount < 1 || charCount > GATE_CHARS || entry.trim().length === 0) {
  throw new Error(`out-of-office reply must be 1-${GATE_CHARS} characters, got ${charCount}`);
}
if (entry.includes("\n") || entry.includes("\r")) {
  throw new Error("out-of-office reply must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
console.log(`${entry} (${charCount} chars)`);
