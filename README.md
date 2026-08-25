# AWS SAA-C03 Practice Exam Tool

A static web app to practice for the **AWS Certified Solutions Architect - Associate (SAA-C03)** exam. No build step, no backend, no tracking.

**Live version:** https://tetienne.github.io/aws-saa-training/

Aligned with the SAA-C03 exam guide, last reviewed against it in August 2026.

## These are not real exam questions

Every question in this repository was written from scratch. None of them comes from an exam, a "dump", or a recalled question set.

That distinction is not just an ethical one. Possessing or sharing real exam content violates the [AWS Certification Program Agreement](https://aws.amazon.com/certification/policies/), and AWS invalidates results and revokes certifications over it. A dump also trains you to recognize strings rather than to reason about architecture, which is what the exam actually measures.

## How the questions are written

Each question starts from a task statement in the [official exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html) and is checked against AWS service documentation and the AWS Well-Architected Framework.

They follow the register of the real exam: third-person scenarios, a single qualifier in caps (`MOST cost-effective`, `LEAST operational overhead`), four options for multiple choice, five or more with `(Select TWO.)` for multiple response. Distractors are answers a candidate with partial knowledge would plausibly pick, not filler. Every explanation states why the correct answer is right and why each distractor is wrong.

`validate.mjs` enforces what can be checked mechanically: unique ids, option counts, task statement coverage, answer-position balance, and near-duplicate stems. It runs on every push and pull request.

## The question bank

300 questions, weighted like the scored content of the real exam:

| Domain                                   | Weight | Questions |
| ---------------------------------------- | ------ | --------- |
| 1 - Design Secure Architectures          | 30%    | 90        |
| 2 - Design Resilient Architectures       | 26%    | 78        |
| 3 - Design High-Performing Architectures | 24%    | 72        |
| 4 - Design Cost-Optimized Architectures  | 20%    | 60        |

All 14 task statements (1.1 through 4.4) are covered, each question tagged with the one it tests.

## Features

- **Two modes:** _Exam_ reveals answers only at the end with a per-domain report; _Practice_ gives immediate feedback and explanation after each question
- Timer options, including a 130-minute full-exam setting
- Single and multiple-answer questions, question and answer shuffling
- Flag questions for review, navigate freely between them
- **Retry my mistakes:** relaunch a session containing only the questions you missed
- Progress saved locally, so a session survives a refresh

## Start with the official material

This tool is a supplement, not a substitute. The official resources come first:

- [Exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html) ([PDF](https://docs.aws.amazon.com/pdfs/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.pdf))
- [Exam prep plan on AWS Skill Builder](https://skillbuilder.aws/category/exam-prep/solutions-architect-associate-SAA-C03)
- [Official Practice Question Set (SAA-C03)](https://skillbuilder.aws/learn/6NV91XYP1P/official-practice-question-set-aws-certified-solutions-architect--associate-saac03--english/N1HSPV1K17)
- [Official Practice Exam (SAA-C03)](https://skillbuilder.aws/learn/R3KVD4BBJY/official-practice-exam-aws-certified-solutions-architect--associate-saac03--english/W7GU3R1HCT)

Nothing replaces building the services yourself.

### How the real exam is scored

The exam has 65 questions over 130 minutes, but only 50 of them count: the other 15 are unscored trial questions, not identified as such. Results are reported as a scaled score from 100 to 1,000, with 720 as the passing mark. Scoring is compensatory, so there is no minimum to reach per domain, only overall.

A scaled score is not a percentage of correct answers, so no practice tool can tell you your real score. This one uses 72% as an approximation of the passing bar and labels it as such.

## Usage

Open the live version, or run it locally:

```bash
git clone https://github.com/tetienne/aws-saa-training.git
open aws-saa-training/index.html
```

No dependencies, no server required.

## Project structure

| File                      | Purpose                                                                 |
| ------------------------- | ----------------------------------------------------------------------- |
| `index.html`              | UI and styles                                                           |
| `app.js`                  | Quiz engine (session, timer, scoring, review)                           |
| `questions.js`            | The question bank, one object per question                              |
| `validate.mjs`            | Integrity check for the bank (`node validate.mjs`)                      |
| `test-escape.mjs`         | Guards the escaping of bank content in the DOM (`node test-escape.mjs`) |
| `package.json`            | Pins Prettier, the only development dependency                          |
| `.pre-commit-config.yaml` | Formatting and check hooks, see [Setup](#setup)                         |
| `mise.toml`               | Node and pre-commit versions, and the `setup` task                      |

### Question format

```js
{
  "id": 1,
  "domain": 1,            // 1-4, see table above
  "ts": "1.3",            // exam guide task statement
  "q": "Question text...",
  "options": ["A", "B", "C", "D"],
  "correct": 1,           // index, or an array of indexes with "multi": true
  "explanation": "Why the correct answer is right and the others are wrong."
}
```

## Contributing

Two contributions are especially useful:

**Reporting a wrong answer or explanation.** Open an issue with the question id and the AWS documentation page that contradicts it. AWS services change, and questions that were correct when written go stale.

**Adding questions.** Write them against a task statement from the exam guide, cite nothing you have not verified in AWS documentation, and explain why each distractor fails. Questions submitted here are contributed under CC BY 4.0, like the rest of the bank.

Original questions only. Pull requests containing recalled or copied exam content will be closed.

### Setup

The app itself has no runtime dependencies. Formatting and checks are automated with [pre-commit](https://pre-commit.com). [mise](https://mise.jdx.dev) provides Node and pre-commit at the versions CI uses:

```bash
mise install                         # Node and pre-commit, versions from mise.toml
mise run setup                       # npm install + pre-commit install
```

Without mise, install Node 24 and pre-commit yourself, then run `npm install && pre-commit install`. The Prettier hook runs from `node_modules`, so re-run `mise run setup` if a commit fails on it after cleaning the working tree.

Every commit is then formatted with Prettier, and `validate.mjs` / `test-escape.mjs` run on the files they cover. The same checks run in CI. To run them by hand:

```bash
npm run format                       # or: npm run format:check
npm test                             # validate.mjs + test-escape.mjs
pre-commit run --all-files
```

## License

The code (`index.html`, `app.js`, `validate.mjs`, `test-escape.mjs`) is under the [MIT License](LICENSE).

The question bank (`questions.js`) is under [CC BY 4.0](LICENSE-CONTENT): reuse it anywhere, including commercially, as long as you credit the source and say what you changed.

## Disclaimer

An unofficial study tool, not affiliated with or endorsed by Amazon Web Services. The questions are original practice material written in the style of the exam, not actual exam questions. AWS and AWS Certified Solutions Architect are trademarks of Amazon Web Services, Inc.
