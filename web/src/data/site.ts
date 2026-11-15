export const REPO = "https://github.com/harshuljain13/rd0-jinx";
/** Until rd0-jinx is on PyPI, install straight from GitHub. */
export const PIP_INSTALL = `pip install "git+${REPO}#subdirectory=packages/rd0-jinx"`;
export const AIDEV = "https://huggingface.co/datasets/hao-li/AIDev";

export const PAPERS = {
  empirical: `${REPO}/blob/main/research/paper/empirical/main.pdf`,
  tooldemo: `${REPO}/blob/main/research/paper/tooldemo/main.pdf`,
  report: `${REPO}/blob/main/research/experiments/report/REPORT.md`,
  dataCard: `${REPO}/blob/main/research/docs/DATA_CARD.md`,
  marketNotes: `${REPO}/blob/main/research/docs/commercial_tools_comparison.md`,
};

/** The agents whose PRs the template stripper was trained on. */
export const AGENTS = ["Copilot", "Codex", "Devin", "Claude Code", "Cursor", "Jules"];

export const ACTION_YAML = `name: jinx
on:
  pull_request_target:
    types: [opened, reopened, synchronize, edited]
permissions:
  contents: read
  pull-requests: write
  issues: write
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: harshuljain13/rd0-jinx@main
        with:
          threshold: ""      # empty = bundled default (0.5)
          max-open-prs: "200"
          top: "3"
          embed: "false"     # "true" adds MiniLM (installs PyTorch)`;

export const CLI_OUTPUT = `$ jinx check new_pr.json --open-queue open_prs.jsonl --top 2

PR #44134: checked 19 open PRs in 12 ms. 1 likely duplicate(s) (score >= 0.50).
  DUPLICATE? #44110  score 1.00  refactor(tvp): use capture_outputs for output tracing
               - one PR links to the other (#44110)
               - shares 1 of 1 changed files (src/transformers/models/tvp/modeling_tvp.py)
               - 100% of changed line ranges overlap
               - 100% of added lines are identical
               - similar title/description after removing agent template text (0.92)
             #44133  score 0.05  refactor(poolformer): use capture_outputs for output tracing
               - similar title/description after removing agent template text (0.50)
               - same author (possible re-opened or replacement PR)`;
