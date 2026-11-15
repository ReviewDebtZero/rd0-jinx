# Jinx user guide

Reference for `rd0-jinx`: the GitHub Action inputs, the `jinx` CLI, the Python API, learning templates
from your own PRs, and a documentation-based comparison with other tools. The short version is in the
[README](../README.md).

## As a GitHub Action

```yaml
- uses: harshuljain13/rd0-jinx@main
  with:
    threshold: ""        # empty = bundled default (0.5); lower catches more, with more false alarms
    max-open-prs: "200"
    top: "3"
    embed: "false"       # "true" adds MiniLM (installs PyTorch on every run)
```

## Command line

```bash
pip install rd0-jinx            # adds the `jinx` command
pip install "rd0-jinx[embed]"   # optional local MiniLM model (installs PyTorch)

jinx check packages/rd0-jinx/examples/new_pr.json \
  --open-queue packages/rd0-jinx/examples/open_prs.jsonl --top 2
```

Input uses the GitHub API's JSON shape (`number`, `title`, `body`, `user.login`, `created_at`). The optional
fields are `diff` (unified diff text), `files`, `agent` and `linked_issues`. The queue can be a JSON list or
a JSON-lines file.

| Flag | What it does |
|---|---|
| `--top N` | List at most N candidates |
| `--threshold X` | Flag only scores >= X (default 0.5) |
| `--json` | Machine-readable output |
| `--embed` | Also use the local MiniLM text model (needs `[embed]`) |
| `--templates FILE` | Use templates learned from your own PRs |

## Python API

```python
from rd0_jinx import PR, Detector

new = PR.from_dict(new_pr_json)                      # GitHub API JSON shape
queue = [PR.from_dict(d) for d in open_prs_json]

det = Detector()                                     # ships with trained weights
for m in det.rank(new, queue, top=3):
    if m.score >= det.threshold:
        print(m.number, round(m.score, 2), m.reasons)
```

## How it works, in detail

1. **Remove template text.** The template lines were learned from 361k agent PRs in AIDev; lines repeated
   across the current queue are removed too.
2. **Compare the code:** shared files, overlapping changed line ranges, identical added lines.
3. **Check links:** the same linked issue, or the new PR mentioning the other one.
4. **Add context:** the same author, and the time gap between the PRs.
5. **Combine** these with a small logistic model. The shipped weights are in
   `packages/rd0-jinx/src/rd0_jinx/data/weights.json` (lexical) and `weights_emb.json` (`--embed`), trained on
   all 4,832 AIDev queue queries by `research/experiments/bench_v2/train_package_weights.py`.

## Learn templates for your own PRs

```bash
jinx learn-templates corpus.jsonl -o my_templates.json   # JSON-lines with agent, repo, body
jinx check new.json --open-queue open.jsonl --templates my_templates.json
```

## Where Jinx sits in the market

We read the full public documentation of every major AI review tool in November 2026, looking for duplicate,
similar or related **pull request** detection. The AI reviewers answer a different question — *is this code any
good?* — and none of them answers *is this PR already open somewhere else?* Where duplicate detection exists at
all, it is for **issues**.

| Tool | Kind | Warns a PR duplicates an **open PR** | Explains why | Reads the diff | No API key | Stays in your CI | Price |
|---|---|:---:|:---:|:---:|:---:|:---:|---|
| **Jinx** | duplicate-PR detector | ✅ | ✅ | ✅ | ✅ | ✅ | Free, MIT |
| CodeRabbit | AI reviewer + triage | 🟡 | ✅ | ✅ | ❌ | ❌ | $24–72/dev/mo · free on public repos |
| Greptile | AI reviewer | ❌ | ✅ | ✅ | ❌ | 🟡 | ~$30/seat/mo or $1/review credit |
| Graphite Diamond | AI reviewer | ❌ | ✅ | ✅ | ❌ | ❌ | $20–40/user/mo |
| GitHub Copilot review | AI reviewer | ❌ | ✅ | ✅ | ❌ | ❌ | Paid Copilot plan |
| Qodo Merge / PR-Agent | AI reviewer | ❌ | ✅ | ✅ | ❌ | 🟡 | Free tier + paid |
| contrib-guard | duplicate-PR bot | ✅ | ❌ | ❌ | ✅ | ✅ | Free, open source |
| Simili-bot | duplicate-PR bot | ✅ | 🟡 | ❌ | ❌ | ❌ | Needs a paid embedding key |
| GitHub, out of the box | platform | ❌ | ❌ | ❌ | ✅ | ✅ | Free |

<details>
<summary><b>What the 🟡 and ❌ actually mean</b></summary>

- **CodeRabbit** — Duplicate detection is a documented feature for *issues* ("Issue Enrichment"). For PRs, Triage
  surfaces *close candidates* for superseded PRs, and "Related PRs" lists merged and open PRs that touched the
  same code as reviewer context. Neither is a duplicate alarm raised on a newly opened PR.
- **Qodo Merge / PR-Agent** — ships `/similar_issue`, using embeddings and a vector database. Nothing equivalent
  exists for pull requests.
- **Greptile, Graphite, Copilot, Ellipsis, Sourcery, Dosu** — we searched each vendor's full docs for
  duplicate / similar PR / related PR and found no such feature. That is not proof no hidden feature exists.
- **Self-hosting** — Greptile offers bring-your-own-LLM self-hosting on Enterprise only; Qodo has a self-hosted
  tier. Neither keeps the default path inside your CI the way Jinx does.

Full audit, with the doc URL behind every cell: [`research/docs/commercial_tools_comparison.md`](research/docs/commercial_tools_comparison.md).
</details>

> [!IMPORTANT]
> This table is about **what each tool is built to do**, read from its own documentation. We have **not**
> benchmarked the commercial tools head to head — that needs paid accounts on live repositories. Nothing here
> says Jinx reviews code better than CodeRabbit or Greptile. It does not. It answers a question they do not ask.

### Or from the command line

```bash
pip install "git+https://github.com/harshuljain13/rd0-jinx#subdirectory=packages/rd0-jinx"   # adds the `jinx` command
pip install "rd0-jinx[embed] @ git+https://github.com/harshuljain13/rd0-jinx#subdirectory=packages/rd0-jinx"   # optional local MiniLM model

jinx check packages/rd0-jinx/examples/new_pr.json \
  --open-queue packages/rd0-jinx/examples/open_prs.jsonl --top 2
```

Input uses the GitHub API's JSON shape (`number`, `title`, `body`, `user.login`, `created_at`). The optional
fields are `diff` (unified diff text), `files`, `agent` and `linked_issues`. The queue can be a JSON list or a
JSON-lines file.

| Flag | What it does |
|---|---|
| `--top N` | List at most N candidates |
| `--threshold X` | Flag only scores ≥ X (default 0.5) |
| `--json` | Machine-readable output |
| `--embed` | Also use the local MiniLM text model (needs `[embed]`) |
| `--templates FILE` | Use templates learned from your own PRs |

### From Python

```python
from rd0_jinx import PR, Detector

new = PR.from_dict(new_pr_json)                  # GitHub API JSON shape
queue = [PR.from_dict(d) for d in open_prs_json]

det = Detector()                                 # ships with trained weights
for m in det.rank(new, queue, top=3):
    if m.score >= det.threshold:
        print(m.number, round(m.score, 2), m.reasons)
```

1. **Remove template text.** The template lines were learned from 361k agent PRs in AIDev; lines repeated across the current queue are removed too.
2. **Compare the code:** shared files, overlapping changed line ranges, identical added lines.
3. **Check links:** the same linked issue, or the new PR mentioning the other one.
4. **Add context:** the same author, and the time gap between the PRs.
5. **Combine** these with a small logistic model. The shipped weights are in `packages/rd0-jinx/src/rd0_jinx/data/weights.json` (lexical) and `weights_emb.json` (`--embed`), trained on all 4,832 AIDev queue queries by `research/experiments/bench_v2/train_package_weights.py`.

### Learn templates for your own PRs

```bash
jinx learn-templates corpus.jsonl -o my_templates.json   # JSON-lines with agent, repo, body
jinx check new.json --open-queue open.jsonl --templates my_templates.json
```

