# AWS SAA-C03 Practice Exam Tool

A lightweight, static web app to practice for the **AWS Certified Solutions Architect – Associate (SAA-C03)** exam. No build step, no backend, no tracking — just open the page and train.

**▶ Live version:** https://tetienne.github.io/aws-saa-training/

## Features

- **197 practice questions** with detailed explanations for every answer (including why the wrong options are wrong)
- Question bank weighted like the real exam:

  | Domain | Weight | Questions |
  |---|---|---|
  | 1 — Design Secure Architectures | 30% | 57 |
  | 2 — Design Resilient Architectures | 26% | 50 |
  | 3 — Design High-Performing Architectures | 24% | 50 |
  | 4 — Design Cost-Optimized Architectures | 20% | 40 |

- **Two modes:**
  - *Exam* — answers revealed only at the end, with a per-domain score report
  - *Practice* — immediate feedback and explanation after each question
- **Timer options**, including a realistic 130-minute full-exam mode
- Single and multiple-answer questions, question/answer shuffling
- Flag questions for review, navigate freely between questions
- **Retry my mistakes** — instantly relaunch a session containing only the questions you missed
- Pass threshold aligned with the real exam (72% ≈ 720/1000)

## Usage

Open the live version, or run it locally:

```bash
git clone https://github.com/tetienne/aws-saa-training.git
open aws-saa-training/index.html
```

No dependencies, no server required.

## Project structure

| File | Purpose |
|---|---|
| `index.html` | UI and styles |
| `app.js` | Quiz engine (session, timer, scoring, review) |
| `questions.js` | The full question bank (one object per question) |

### Question format

```js
{
  "id": 1,
  "domain": 1,            // 1-4, see table above
  "q": "Question text...",
  "options": ["A", "B", "C", "D"],
  "correct": 1,           // index, or an array of indexes with "multi": true
  "explanation": "Why the correct answer is right and the others are wrong."
}
```

Contributions of new questions are welcome — keep explanations factual and cover why each distractor is incorrect.

## Disclaimer

This is an unofficial study tool. The questions are original practice material written in the style of the exam — they are **not** actual exam questions. AWS and AWS Certified Solutions Architect are trademarks of Amazon Web Services, Inc.
