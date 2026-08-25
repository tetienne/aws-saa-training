// Integrity check for the question bank. Run: node validate.mjs [audit.json]
import { readFileSync } from 'node:fs';

const TASK_STATEMENTS = {
  1.1: 'Design secure access to AWS resources',
  1.2: 'Design secure workloads and applications',
  1.3: 'Determine appropriate data security controls',
  2.1: 'Design scalable and loosely coupled architectures',
  2.2: 'Design highly available and/or fault-tolerant architectures',
  3.1: 'Determine high-performing and/or scalable storage solutions',
  3.2: 'Design high-performing and elastic compute solutions',
  3.3: 'Determine high-performing database solutions',
  3.4: 'Determine high-performing and/or scalable network architectures',
  3.5: 'Determine high-performing data ingestion and transformation solutions',
  4.1: 'Design cost-optimized storage solutions',
  4.2: 'Design cost-optimized compute solutions',
  4.3: 'Design cost-optimized database solutions',
  4.4: 'Design cost-optimized network architectures',
};
const WEIGHTS = { 1: 30, 2: 26, 3: 24, 4: 20 };

function load(src) {
  return JSON.parse(src.slice(src.indexOf('['), src.lastIndexOf(']') + 1));
}

const questions = load(readFileSync('questions.js', 'utf8'));
const errors = [];
const warnings = [];
const err = (id, msg) => errors.push(`q${id}: ${msg}`);
const warn = (id, msg) => warnings.push(`q${id}: ${msg}`);

// ---------- per-question ----------
const seen = new Set();
for (const q of questions) {
  if (seen.has(q.id)) err(q.id, 'duplicate id');
  seen.add(q.id);

  if (!WEIGHTS[q.domain]) err(q.id, `bad domain ${q.domain}`);
  if (!TASK_STATEMENTS[q.ts]) err(q.id, `missing or unknown ts "${q.ts}"`);
  else if (q.ts[0] !== String(q.domain)) err(q.id, `ts ${q.ts} outside domain ${q.domain}`);

  const multi = q.multi === true;
  if (multi !== Array.isArray(q.correct)) err(q.id, 'multi flag and correct type disagree');

  if (multi) {
    if (q.options.length < 5) err(q.id, `multi with ${q.options.length} options, needs >= 5`);
    if (q.correct.length !== 2) err(q.id, `multi with ${q.correct.length} correct, expected 2`);
    if (!/\(Select TWO\.\)$/.test(q.q.trim())) err(q.id, 'multi stem must end with (Select TWO.)');
    if (new Set(q.correct).size !== q.correct.length) err(q.id, 'repeated correct index');
  } else {
    if (q.options.length !== 4) err(q.id, `${q.options.length} options, expected 4`);
    if (!Number.isInteger(q.correct)) err(q.id, 'correct must be an integer');
  }
  for (const c of [q.correct].flat()) {
    if (!(c >= 0 && c < q.options.length)) err(q.id, `correct index ${c} out of range`);
  }

  if (/\byou(r|rs)?\b/i.test(q.q)) err(q.id, 'second person in stem');
  if (!/^(A|An|The|Users|Several|Two|Multiple)\b/.test(q.q.trim())) {
    warn(q.id, `stem opener: "${q.q.slice(0, 40)}..."`);
  }
  if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== q.options.length) {
    err(q.id, 'duplicate option text');
  }
  if (!q.explanation || q.explanation.split(/\s+/).length < 25) err(q.id, 'explanation too short');
}

// ---------- distribution ----------
const byDomain = {};
const byTs = {};
for (const q of questions) {
  byDomain[q.domain] = (byDomain[q.domain] || 0) + 1;
  byTs[q.ts] = (byTs[q.ts] || 0) + 1;
}
for (const [d, w] of Object.entries(WEIGHTS)) {
  const pct = (byDomain[d] / questions.length) * 100;
  if (Math.abs(pct - w) > 1) err(`domain ${d}`, `${pct.toFixed(1)}% vs official ${w}%`);
}
for (const ts of Object.keys(TASK_STATEMENTS)) {
  if (!byTs[ts]) err(`ts ${ts}`, 'no question covers this task statement');
}

// Correct-answer position must not fingerprint the generator.
const singles = questions.filter((q) => !q.multi);
const pos = [0, 0, 0, 0];
singles.forEach((q) => pos[q.correct]++);
pos.forEach((n, i) => {
  const pct = (n / singles.length) * 100;
  if (pct < 15 || pct > 35)
    err('distribution', `correct index ${i} at ${pct.toFixed(1)}% (want 15-35%)`);
});

// ---------- near-duplicate stems ----------
// Compared on the stem AND the keyed answer: two stems can read differently and still test the
// same mechanism, which is what a candidate actually notices.
const STOP = new Set(
  'a an the to of and or in on for with that this is are be it its as at by from must needs wants company application solution which what should meets requirements aws amazon combination steps take select two solutions architect'.split(
    ' ',
  ),
);
const tokens = (s) =>
  new Set(
    s
      .toLowerCase()
      .match(/[a-z0-9-]{3,}/g)
      ?.filter((t) => !STOP.has(t)) || [],
  );
const sets = questions.map((q) => [
  q.id,
  tokens(
    q.q +
      ' ' +
      [q.correct]
        .flat()
        .map((i) => q.options[i])
        .join(' '),
  ),
]);
for (let i = 0; i < sets.length; i++) {
  for (let j = i + 1; j < sets.length; j++) {
    const [a, A] = sets[i],
      [b, B] = sets[j];
    const inter = [...A].filter((t) => B.has(t)).length;
    const jac = inter / (A.size + B.size - inter);
    if (jac > 0.42) warn(a, `near-duplicate of q${b} (Jaccard ${jac.toFixed(2)})`);
  }
}

// ---------- answer-preservation gate ----------
// Each rewrite batch reports the pre-rewrite correct option verbatim. Checking it against the
// committed bank proves the agent rewrote the option that was actually correct.
const auditPath = process.argv[2];
if (auditPath) {
  const { execSync } = await import('node:child_process');
  const before = new Map(
    load(execSync('git show HEAD:questions.js', { encoding: 'utf8' })).map((q) => [q.id, q]),
  );
  const audit = JSON.parse(readFileSync(auditPath, 'utf8'));
  for (const entry of audit) {
    const old = before.get(entry.id);
    if (!old) {
      err(entry.id, 'audit entry for an id absent from HEAD');
      continue;
    }
    const oldCorrect = [old.correct]
      .flat()
      .map((i) => old.options[i])
      .sort();
    const claimed = [entry.origCorrect].flat().sort();
    if (JSON.stringify(oldCorrect) !== JSON.stringify(claimed)) {
      err(
        entry.id,
        `audit claims original correct answer was ${JSON.stringify(claimed)}, HEAD says ${JSON.stringify(oldCorrect)}`,
      );
    }
  }
  const rewritten = new Set(audit.map((e) => e.id));
  for (const id of before.keys())
    if (!rewritten.has(id)) warn(id, 'present at HEAD but no audit entry');
}

// ---------- report ----------
console.log(`${questions.length} questions`);
console.log(
  'per domain:',
  Object.entries(byDomain)
    .map(([d, n]) => `${d}:${n} (${((n / questions.length) * 100).toFixed(0)}%)`)
    .join('  '),
);
console.log(
  'per task statement:',
  Object.keys(TASK_STATEMENTS)
    .map((t) => `${t}:${byTs[t] || 0}`)
    .join('  '),
);
console.log(
  'correct index:',
  pos.map((n, i) => `${i}:${((n / singles.length) * 100).toFixed(0)}%`).join('  '),
);
console.log(`multi: ${questions.filter((q) => q.multi).length}`);

if (warnings.length) console.log(`\n${warnings.length} warnings\n  ` + warnings.join('\n  '));
if (errors.length) {
  console.error(`\n${errors.length} ERRORS\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log('\nOK');
