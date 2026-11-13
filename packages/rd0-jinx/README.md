# rd0-jinx

**Find the pull request that already does this.**

Coding agents (Copilot, Codex, Devin, Claude Code, Cursor, Jules) open a lot of pull requests, and some of
them redo work that is already open. `rd0-jinx` checks a new PR against the open ones and, when it finds a
likely duplicate, tells you which PR it matches and why.

- Runs on CPU in about 6 ms per PR. No LLM, no API key, no network call.
- Explains every match: shared files, overlapping line ranges, identical added lines, the same linked issue.
- About 1.9 false alarms per 100 PRs that have no duplicate.

Full README, benchmark and papers: **https://github.com/harshuljain13/rd0**

## Install

```bash
pip install rd0-jinx                # the `jinx` command
pip install "rd0-jinx[embed]"       # optional local MiniLM text model (installs PyTorch)
```

## Use it

```bash
jinx check new_pr.json --open-queue open_prs.jsonl --top 2
```

```text
PR #44134: checked 19 open PRs in 12 ms. 1 likely duplicate(s) (score >= 0.50).
  DUPLICATE? #44110  score 1.00  refactor(tvp): use capture_outputs for output tracing
               - one PR links to the other (#44110)
               - shares 1 of 1 changed files (src/transformers/models/tvp/modeling_tvp.py)
               - 100% of changed line ranges overlap
               - 100% of added lines are identical
               - similar title/description after removing agent template text (0.92)
```

Input uses the GitHub API's JSON shape (`number`, `title`, `body`, `user.login`, `created_at`). Optional
fields are `diff` (unified diff text), `files`, `agent` and `linked_issues`. The queue can be a JSON list or
a JSON-lines file.

| Flag | What it does |
|---|---|
| `--top N` | List at most N candidates |
| `--threshold X` | Flag only scores >= X (default 0.5) |
| `--json` | Machine-readable output |
| `--embed` | Also use the local MiniLM text model (needs `[embed]`) |
| `--templates FILE` | Use templates learned from your own PRs |

## In Python

```python
from rd0_jinx import PR, Detector

new = PR.from_dict(new_pr_json)                      # GitHub API JSON shape
queue = [PR.from_dict(d) for d in open_prs_json]

det = Detector()                                     # ships with trained weights
for m in det.rank(new, queue, top=3):
    if m.score >= det.threshold:
        print(m.number, round(m.score, 2), m.reasons)
```

## As a GitHub Action

```yaml
- uses: harshuljain13/rd0@main
  with:
    threshold: ""        # empty = bundled default (0.5)
    max-open-prs: "200"
```

## License

MIT. The shipped weights were trained on [AIDev](https://huggingface.co/datasets/hao-li/AIDev) (CC BY 4.0).
