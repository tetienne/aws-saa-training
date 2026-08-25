// Guards the escaping of bank content in app.js. Bank text reaches the DOM through
// HTML template literals, so an unescaped interpolation turns any "<" in a question
// into markup, and would turn a third-party bank into script execution.
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./app.js", import.meta.url), "utf8");
let failed = 0;
const check = (label, ok) => { if (!ok) { console.error(`FAIL  ${label}`); failed++; } };

// 1. The helper behaves.
const line = src.split("\n").find((l) => l.startsWith("const esc ="));
if (!line) {
  console.error("FAIL  esc() helper not found in app.js");
  process.exit(1);
}
const esc = eval(line.slice(line.indexOf("=") + 1).replace(/;\s*$/, ""));

check("strips angle brackets", !/[<>]/.test(esc('<img src=x onerror="alert(1)">')));
check("escapes ampersand", esc("a & b") === "a &amp; b");
check("escapes double quote", !esc('say "hi"').includes('"'));
check("escapes single quote", !esc("it's").includes("'"));
check("leaves plain text alone", esc("Amazon S3 Glacier Deep Archive") === "Amazon S3 Glacier Deep Archive");
check("handles a missing field", esc(undefined) === "undefined");

// 2. Every HTML interpolation of bank content still goes through it. These are the
// five sites where a question's text, options or explanation is written as HTML.
const sites = [
  ['question option', 'class="label">${esc(opt)}'],
  ['practice explanation', "<br><br>${esc(q.explanation)}"],
  ['review option', "<span>${esc(opt)}"],
  ['review stem', '<div class="ri-q">${esc(d.q)}'],
  ['review explanation', "Explanation:</strong> ${esc(d.explanation)}"],
];
for (const [label, needle] of sites) check(`${label} is escaped`, src.includes(needle));

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log(`escaping OK (${6 + sites.length} checks)`);
