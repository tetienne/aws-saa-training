// app.js — AWS SAA-C03 mock exam logic
'use strict';

const DOMAINS = {
  1: { name: 'Design Secure Architectures', short: 'Security', weight: 30, color: '#f85149' },
  2: { name: 'Design Resilient Architectures', short: 'Resilience', weight: 26, color: '#4493f8' },
  3: {
    name: 'Design High-Performing Architectures',
    short: 'Performance',
    weight: 24,
    color: '#3fb950',
  },
  4: { name: 'Design Cost-Optimized Architectures', short: 'Cost', weight: 20, color: '#d29922' },
};
const PASS_THRESHOLD = 72; // approx. % to pass the SAA-C03 (720/1000)
const STORAGE_KEY = 'aws_saa_session_v1';

let state = null; // current session
let timerInterval = null;

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const show = (id) => {
  $$('.screen').forEach((s) => s.classList.remove('active'));
  $('#' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
// Bank content is interpolated into the HTML templates below, so escape it: a
// question mentioning "<VPC-ID>" or "a < b" must render literally, not as markup.
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

// ---------- Start screen: domain stats ----------
function renderDomainStats() {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  QUESTIONS.forEach((q) => counts[q.domain]++);
  const total = QUESTIONS.length;
  const wrap = $('#domainStats');
  wrap.innerHTML = '';
  Object.keys(DOMAINS).forEach((d) => {
    const dm = DOMAINS[d];
    const n = counts[d];
    const pct = total ? Math.round((n / total) * 100) : 0;
    const row = document.createElement('div');
    row.className = 'dom-row';
    row.innerHTML = `
      <span style="min-width:130px">${dm.short} <span style="color:var(--muted)">(${dm.weight}%)</span></span>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${dm.color}"></div></div>
      <span style="color:var(--muted);min-width:74px;text-align:right">${n} question${n > 1 ? 's' : ''}</span>`;
    wrap.appendChild(row);
  });
}

// ---------- Session startup ----------
function buildSession(opts) {
  let pool = QUESTIONS.slice();
  if (opts.shuffle) pool = shuffle(pool);
  if (opts.numQ > 0 && opts.numQ < pool.length) pool = pool.slice(0, opts.numQ);

  const questions = pool.map((q) => {
    let order = q.options.map((_, i) => i);
    if (opts.shuffle) order = shuffle(order);
    return {
      id: q.id,
      domain: q.domain,
      q: q.q,
      multi: !!q.multi,
      options: order.map((i) => q.options[i]),
      // correct indices remapped to the new order
      correct: (Array.isArray(q.correct) ? q.correct : [q.correct]).map((c) => order.indexOf(c)),
      explanation: q.explanation,
    };
  });

  return {
    config: opts,
    questions,
    answers: {}, // id -> [selected indices]
    flagged: {}, // id -> bool
    current: 0,
    startedAt: Date.now(),
    finished: false,
    timeLimit: opts.timeLimitSec || 0,
    elapsed: 0,
  };
}

function startSession() {
  const numQ = parseInt($('#numQ').value, 10);
  const mode = $('#mode').value;
  const timerOpt = $('#timerOpt').value;
  const shuffleOpt = $('#shuffle').value === '1';

  let timeLimitSec = 0;
  if (timerOpt === 'auto') {
    const n = numQ > 0 ? Math.min(numQ, QUESTIONS.length) : QUESTIONS.length;
    timeLimitSec = n * 120;
  } else if (timerOpt !== '0') {
    timeLimitSec = parseInt(timerOpt, 10) * 60;
  }

  state = buildSession({ numQ, mode, shuffle: shuffleOpt, timeLimitSec });
  persist();
  show('screen-quiz');
  startTimer();
  renderQuestion();
  renderNav();
}

// ---------- Timer ----------
function startTimer() {
  clearInterval(timerInterval);
  const el = $('#timer');
  if (!state.timeLimit) {
    el.style.display = 'none';
    return;
  }
  el.style.display = 'inline';
  function tick() {
    const remaining = state.timeLimit - state.elapsed;
    if (remaining <= 0) {
      el.textContent = '00:00';
      clearInterval(timerInterval);
      finishExam(true);
      return;
    }
    const m = Math.floor(remaining / 60),
      s = remaining % 60;
    el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    el.classList.toggle('warn', remaining <= 300);
  }
  tick();
  timerInterval = setInterval(() => {
    state.elapsed++;
    tick();
    if (state.elapsed % 5 === 0) persist();
  }, 1000);
}

// ---------- Render a question ----------
function renderQuestion() {
  const q = state.questions[state.current];
  const dm = DOMAINS[q.domain];
  const total = state.questions.length;

  $('#qNum').textContent = `Question ${state.current + 1} / ${total}`;
  $('#qDom').textContent = dm.short;
  $('#qDom').style.background = dm.color;
  $('#qMulti').style.display = q.multi ? 'inline' : 'none';
  $('#qText').textContent = q.q;
  $('#progressMini').textContent = `${Object.keys(state.answers).length} / ${total} answered`;

  // flag
  const flagBtn = $('#flagBtn');
  flagBtn.classList.toggle('flagged', !!state.flagged[q.id]);
  flagBtn.textContent = state.flagged[q.id] ? '⚑ Flagged' : '⚑ Flag for review';

  // options
  const selected = state.answers[q.id] || [];
  const optWrap = $('#options');
  optWrap.innerHTML = '';
  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className =
      'option' + (q.multi ? ' multi' : '') + (selected.includes(i) ? ' selected' : '');
    div.innerHTML = `<div class="marker">${selected.includes(i) ? (q.multi ? '✓' : '●') : letters[i]}</div><div class="label">${esc(opt)}</div>`;
    div.onclick = () => selectOption(q, i);
    optWrap.appendChild(div);
  });

  // feedback in practice mode — for multi-answer questions, wait until the
  // user has picked as many options as there are correct answers, otherwise
  // the feedback fires on the first click and marks the question wrong early.
  const fb = $('#practiceFeedback');
  fb.innerHTML = '';
  const needed = q.correct.length;
  if (state.config.mode === 'practice' && selected.length >= needed) {
    renderPracticeFeedback(q, selected);
  }

  // navigation buttons
  $('#btnPrev').disabled = state.current === 0;
  const isLast = state.current === total - 1;
  $('#btnNext').style.display = isLast ? 'none' : 'inline-flex';
  $('#btnFinish').style.display = isLast ? 'inline-flex' : 'none';

  updateNav();
}

function renderPracticeFeedback(q, selected) {
  const correct = q.correct.slice().sort();
  const sel = selected.slice().sort();
  const isCorrect = correct.length === sel.length && correct.every((v, i) => v === sel[i]);
  const fb = $('#practiceFeedback');
  const correctLabels = q.correct.map((i) => letters[i]).join(', ');
  fb.innerHTML = `
    <div class="ri-expl" style="margin-top:18px; border-left-color:${isCorrect ? 'var(--green)' : 'var(--red)'}">
      <strong style="color:${isCorrect ? 'var(--green)' : 'var(--red)'}">${isCorrect ? '✓ Correct!' : '✗ Incorrect.'}</strong>
      &nbsp;Correct answer: <strong>${correctLabels}</strong><br><br>${esc(q.explanation)}
    </div>`;
}

function selectOption(q, i) {
  let sel = state.answers[q.id] ? state.answers[q.id].slice() : [];
  if (q.multi) {
    if (sel.includes(i)) sel = sel.filter((x) => x !== i);
    else sel.push(i);
  } else {
    sel = [i];
  }
  if (sel.length) state.answers[q.id] = sel;
  else delete state.answers[q.id];
  persist();
  renderQuestion();
  renderNav();
}

// ---------- Navigation panel ----------
function renderNav() {
  const grid = $('#navGrid');
  grid.innerHTML = '';
  state.questions.forEach((q, idx) => {
    const cell = document.createElement('button');
    cell.className = 'nav-cell';
    if (state.answers[q.id]) cell.classList.add('answered');
    if (state.flagged[q.id]) cell.classList.add('flagged');
    if (idx === state.current) cell.classList.add('current');
    cell.textContent = idx + 1;
    cell.onclick = () => {
      state.current = idx;
      renderQuestion();
      renderNav();
      collapseNavOnMobile();
    };
    grid.appendChild(cell);
  });
}
function setNavCollapsed(collapsed) {
  const nav = $('.q-nav');
  const toggle = $('#navToggle');
  if (!nav || !toggle) return;
  nav.classList.toggle('collapsed', collapsed);
  toggle.setAttribute('aria-expanded', String(!collapsed));
}
function collapseNavOnMobile() {
  if (window.matchMedia('(max-width: 820px)').matches) setNavCollapsed(true);
}
function updateNav() {
  $$('#navGrid .nav-cell').forEach((cell, idx) => {
    cell.classList.toggle('current', idx === state.current);
    const q = state.questions[idx];
    cell.classList.toggle('answered', !!state.answers[q.id]);
    cell.classList.toggle('flagged', !!state.flagged[q.id]);
  });
}

// ---------- Navigation ----------
function next() {
  if (state.current < state.questions.length - 1) {
    state.current++;
    renderQuestion();
    renderNav();
  }
}
function prev() {
  if (state.current > 0) {
    state.current--;
    renderQuestion();
    renderNav();
  }
}
function toggleFlag() {
  const q = state.questions[state.current];
  state.flagged[q.id] = !state.flagged[q.id];
  persist();
  renderQuestion();
  renderNav();
}

// ---------- Score computation ----------
function computeResults() {
  let correctCount = 0;
  const perDomain = { 1: { c: 0, t: 0 }, 2: { c: 0, t: 0 }, 3: { c: 0, t: 0 }, 4: { c: 0, t: 0 } };
  const details = [];

  state.questions.forEach((q) => {
    const sel = (state.answers[q.id] || []).slice().sort();
    const cor = q.correct.slice().sort();
    const isCorrect =
      sel.length > 0 && cor.length === sel.length && cor.every((v, i) => v === sel[i]);
    if (isCorrect) {
      correctCount++;
      perDomain[q.domain].c++;
    }
    perDomain[q.domain].t++;
    details.push({
      ...q,
      selected: state.answers[q.id] || [],
      isCorrect,
      flagged: !!state.flagged[q.id],
      answered: !!(state.answers[q.id] && state.answers[q.id].length),
    });
  });

  const total = state.questions.length;
  const pct = total ? Math.round((correctCount / total) * 100) : 0;
  return { correctCount, total, pct, perDomain, details };
}

// ---------- End of exam ----------
function finishExam(auto = false) {
  clearInterval(timerInterval);
  state.finished = true;
  state.finishedAt = Date.now();
  persist();
  const res = computeResults();
  renderResults(res, auto);
  show('screen-results');
}

function renderResults(res, auto) {
  const { correctCount, total, pct, perDomain, details } = res;

  // score ring
  const passed = pct >= PASS_THRESHOLD;
  const ringColor = passed ? 'var(--green)' : pct >= 55 ? 'var(--yellow)' : 'var(--red)';
  $('#scoreRing').style.background =
    `conic-gradient(${ringColor} ${pct * 3.6}deg, var(--border) 0deg)`;
  $('#scorePct').textContent = pct + '%';
  $('#scoreFrac').textContent = `${correctCount} / ${total}`;
  const verdict = $('#verdict');
  verdict.textContent = passed ? '✓ Passed' : '✗ Below threshold';
  verdict.className = 'verdict ' + (passed ? 'pass' : 'fail');
  $('#verdictSub').textContent =
    (auto ? "⏱ Time's up. " : '') +
    `Estimated passing score: ${PASS_THRESHOLD}% (≈720/1000 on the real exam).`;

  // stats
  const skipped = details.filter((d) => !d.answered).length;
  const flaggedCount = details.filter((d) => d.flagged).length;
  const timeUsed = state.finishedAt
    ? Math.round((state.finishedAt - state.startedAt) / 1000)
    : state.elapsed;
  const mm = Math.floor(timeUsed / 60),
    ss = timeUsed % 60;
  $('#statsRow').innerHTML = `
    <div class="stat"><div class="num" style="color:var(--green)">${correctCount}</div><div class="lbl">Correct</div></div>
    <div class="stat"><div class="num" style="color:var(--red)">${total - correctCount - skipped}</div><div class="lbl">Mistakes</div></div>
    <div class="stat"><div class="num" style="color:var(--muted)">${skipped}</div><div class="lbl">Unanswered</div></div>
    <div class="stat"><div class="num" style="color:var(--yellow)">${flaggedCount}</div><div class="lbl">Flagged</div></div>
    <div class="stat"><div class="num">${mm}m${String(ss).padStart(2, '0')}s</div><div class="lbl">Time</div></div>`;

  // domains
  const dWrap = $('#resultDomains');
  dWrap.innerHTML = '';
  Object.keys(DOMAINS).forEach((d) => {
    const dm = DOMAINS[d];
    const pd = perDomain[d];
    if (pd.t === 0) return;
    const dpct = Math.round((pd.c / pd.t) * 100);
    const row = document.createElement('div');
    row.className = 'db-row';
    row.innerHTML = `
      <div class="db-head"><span>${dm.name}</span><span style="color:var(--muted)">${pd.c}/${pd.t} · ${dpct}%</span></div>
      <div class="db-track"><div class="db-fill" style="width:${dpct}%;background:${dm.color}"></div></div>`;
    dWrap.appendChild(row);
  });

  // detailed review
  renderReview(details, 'all');

  // prompt + json
  buildPrompt(res);
  state._lastResults = res;
}

// ---------- Detailed review ----------
function renderReview(details, filter) {
  const list = $('#reviewList');
  list.innerHTML = '';
  let shown = details;
  if (filter === 'wrong') shown = details.filter((d) => !d.isCorrect);
  if (filter === 'flagged') shown = details.filter((d) => d.flagged);

  if (!shown.length) {
    list.innerHTML = `<p style="color:var(--muted);padding:12px 0">No questions in this category. 🎉</p>`;
    return;
  }

  shown.forEach((d) => {
    const idx = details.indexOf(d);
    const dm = DOMAINS[d.domain];
    const status = !d.answered ? 'skipped' : d.isCorrect ? 'correct' : 'wrong';
    const statusLabel = !d.answered ? 'Unanswered' : d.isCorrect ? '✓ Correct' : '✗ Mistake';
    const statusColor = !d.answered ? 'var(--muted)' : d.isCorrect ? 'var(--green)' : 'var(--red)';

    const item = document.createElement('div');
    item.className = 'review-item ' + status;

    let optsHtml = '';
    d.options.forEach((opt, i) => {
      const isCor = d.correct.includes(i);
      const isSel = d.selected.includes(i);
      let cls = 'neutral',
        tag = '';
      if (isCor) {
        cls = 'is-correct';
        tag = '✓ Correct answer';
      }
      if (isSel && !isCor) {
        cls = 'is-yourwrong';
        tag = '✗ Your choice';
      }
      if (isSel && isCor) {
        tag = '✓ Your choice (correct)';
      }
      optsHtml += `<div class="ri-opt ${cls}"><span class="tag" style="min-width:18px">${letters[i]}.</span><span>${esc(opt)}${tag ? ` <em style="color:var(--muted);font-style:normal">— ${tag}</em>` : ''}</span></div>`;
    });

    item.innerHTML = `
      <div class="ri-head">
        <span class="pill qnum">Q${idx + 1}</span>
        <span class="pill dom" style="background:${dm.color}">${dm.short}</span>
        ${d.flagged ? '<span class="pill" style="background:rgba(210,153,34,.15);color:var(--yellow);border:1px solid var(--yellow)">⚑ Flagged</span>' : ''}
        <span style="margin-left:auto;font-weight:700;color:${statusColor};font-size:13px">${statusLabel}</span>
      </div>
      <div class="ri-q">${esc(d.q)}</div>
      ${optsHtml}
      <div class="ri-expl"><strong>Explanation:</strong> ${esc(d.explanation)}</div>`;
    list.appendChild(item);
  });
}

// ---------- Build the prompt for Claude ----------
function buildPrompt(res) {
  const { correctCount, total, pct, perDomain, details } = res;
  const lines = [];
  lines.push('I just took an AWS Certified Solutions Architect Associate (SAA-C03) mock exam.');
  lines.push(`Score: ${correctCount}/${total} (${pct}%). Passing threshold ≈ 72%.`);
  lines.push('');
  lines.push('Results by domain:');
  Object.keys(DOMAINS).forEach((d) => {
    const pd = perDomain[d];
    if (pd.t === 0) return;
    lines.push(`- ${DOMAINS[d].name}: ${pd.c}/${pd.t} (${Math.round((pd.c / pd.t) * 100)}%)`);
  });
  lines.push('');
  lines.push('Here is a breakdown of my answers (especially my mistakes):');
  lines.push('');

  details.forEach((d, idx) => {
    const selLabels = d.selected.length
      ? d.selected.map((i) => letters[i]).join(',')
      : '(no answer)';
    const corLabels = d.correct.map((i) => letters[i]).join(',');
    const mark = !d.answered ? 'UNANSWERED' : d.isCorrect ? 'CORRECT' : 'WRONG';
    lines.push(`Q${idx + 1} [${DOMAINS[d.domain].short}] — ${mark}`);
    lines.push(`  Question: ${d.q}`);
    d.options.forEach((opt, i) => lines.push(`    ${letters[i]}. ${opt}`));
    lines.push(`  My answer: ${selLabels} | Correct answer: ${corLabels}`);
    lines.push('');
  });

  lines.push('---');
  lines.push('Generate a report for me as a standalone HTML page that:');
  lines.push('1. Restates my score and my per-domain analysis;');
  lines.push(
    '2. For EACH mistake, explains why my answer is wrong, why the correct one is right, and the underlying AWS concept I need to review;',
  );
  lines.push('3. Identifies my top 3 priority weak areas and proposes a targeted study plan;');
  lines.push('4. Lists the AWS services I absolutely must master based on my mistakes.');

  $('#promptOut').value = lines.join('\n');
}

// ---------- Export JSON ----------
function resultsAsJson() {
  const res = state._lastResults || computeResults();
  return {
    exam: 'AWS SAA-C03',
    generatedAt: new Date().toISOString(),
    score: {
      correct: res.correctCount,
      total: res.total,
      percent: res.pct,
      passed: res.pct >= PASS_THRESHOLD,
    },
    perDomain: Object.fromEntries(
      Object.keys(DOMAINS).map((d) => [DOMAINS[d].short, res.perDomain[d]]),
    ),
    timeUsedSec: state.finishedAt
      ? Math.round((state.finishedAt - state.startedAt) / 1000)
      : state.elapsed,
    answers: res.details.map((d, idx) => ({
      n: idx + 1,
      id: d.id,
      domain: DOMAINS[d.domain].short,
      question: d.q,
      yourAnswer: d.selected.map((i) => letters[i]),
      correctAnswer: d.correct.map((i) => letters[i]),
      isCorrect: d.isCorrect,
      answered: d.answered,
      flagged: d.flagged,
    })),
  };
}

function downloadJson() {
  const blob = new Blob([JSON.stringify(resultsAsJson(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'aws-saa-results.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast('JSON file downloaded');
}

async function saveToFile() {
  if (!window.showSaveFilePicker) {
    toast('Browser not supported — use the download instead');
    downloadJson();
    return;
  }
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: 'results.json',
      types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
    });
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(resultsAsJson(), null, 2));
    await writable.close();
    toast('Written to file ✓');
  } catch (e) {
    if (e.name !== 'AbortError') toast('Failed to write file');
  }
}

// ---------- Persistance localStorage ----------
function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {}
}
function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// ---------- Retry mistakes ----------
function retryWrong() {
  const res = state._lastResults || computeResults();
  const wrongIds = res.details.filter((d) => !d.isCorrect).map((d) => d.id);
  if (!wrongIds.length) {
    toast('No mistakes to retry 🎉');
    return;
  }
  const pool = QUESTIONS.filter((q) => wrongIds.includes(q.id));
  const cfg = { ...state.config, numQ: pool.length };
  // build a session from the mistakes only
  const questions = (cfg.shuffle ? shuffle(pool) : pool).map((q) => {
    let order = q.options.map((_, i) => i);
    if (cfg.shuffle) order = shuffle(order);
    return {
      id: q.id,
      domain: q.domain,
      q: q.q,
      multi: !!q.multi,
      options: order.map((i) => q.options[i]),
      correct: (Array.isArray(q.correct) ? q.correct : [q.correct]).map((c) => order.indexOf(c)),
      explanation: q.explanation,
    };
  });
  state = {
    config: cfg,
    questions,
    answers: {},
    flagged: {},
    current: 0,
    startedAt: Date.now(),
    finished: false,
    timeLimit: 0,
    elapsed: 0,
  };
  persist();
  show('screen-quiz');
  startTimer();
  renderQuestion();
  renderNav();
}

// ---------- Init / events ----------
function init() {
  renderDomainStats();

  const saved = loadSaved();
  if (saved && !saved.finished && saved.questions && saved.questions.length) {
    $('#btnResume').style.display = 'inline-flex';
    $('#btnResume').onclick = () => {
      state = saved;
      show('screen-quiz');
      startTimer();
      renderQuestion();
      renderNav();
    };
  }

  $('#btnStart').onclick = startSession;
  $('#btnNext').onclick = next;
  $('#btnPrev').onclick = prev;
  $('#flagBtn').onclick = toggleFlag;
  $('#btnFinish').onclick = () => finishExam(false);
  $('#btnFinishSide').onclick = () => finishExam(false);
  $('#navToggle').onclick = () => setNavCollapsed(!$('.q-nav').classList.contains('collapsed'));
  $('#btnCopyPrompt').onclick = () => {
    $('#promptOut').select();
    navigator.clipboard
      .writeText($('#promptOut').value)
      .then(() => toast('Prompt copied! Paste it into Claude.'));
  };
  $('#btnDownloadJson').onclick = downloadJson;
  $('#btnSaveFile').onclick = saveToFile;
  $('#btnRestart').onclick = () => {
    localStorage.removeItem(STORAGE_KEY);
    show('screen-start');
    $('#btnResume').style.display = 'none';
    $('#timer').style.display = 'none';
  };
  $('#btnRetryWrong').onclick = retryWrong;

  $$('.filter-bar .btn').forEach((b) => {
    b.onclick = () => {
      $$('.filter-bar .btn').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      renderReview((state._lastResults || computeResults()).details, b.dataset.filter);
    };
  });

  // keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (!$('#screen-quiz').classList.contains('active')) return;
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'f' || e.key === 'F') toggleFlag();
    else if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
      const q = state.questions[state.current];
      const i = parseInt(e.key, 10) - 1;
      if (i < q.options.length) selectOption(q, i);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
