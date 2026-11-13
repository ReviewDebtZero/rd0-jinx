# Jinx project checklist

Owner: **D** = Devin, **H** = Harshul. Update this file in every PR.

## 1. Research question and results
- [x] D: prior art and gap (`research/docs/phase1_prior_art_and_plan.md`)
- [x] D: live-queue benchmark on AIDev: 4,832 queries, 1,867 duplicate pairs (342 cross-author), 2,965 no-duplicate PRs
- [x] D: 66-strategy study with repository-cluster CIs, per-class results, false alarms, latency, cost (`research/experiments/report/`)
- [x] D: pre-registered kill rule tested and reported (fails on cross-author Recall@5)
- [ ] H: accept the narrower claim (beats bots; better Recall@1/MRR and fewer false alarms than INTRUDE + time)

## 2. Benchmark (artifact)
- [x] D: release files (queries, queues, labels, features) + data card (`research/docs/DATA_CARD.md`, `research/experiments/bench_v2/export_release.py`)
- [ ] H: approve uploading the release (Zenodo / Hugging Face, about 680 MB)
- [x] D: label audit, Claude Haiku on 200 random + all 342 cross-author pairs ($0.82): strict precision 79% / 85% (`research/experiments/label_audit/`)
- [ ] D: human spot-check of 30 audit labels
- [x] D: limitation noted: no agent-human pairs (no working GitHub token)

## 3. Tool (Jinx)
- [x] D: library, CLI, GitHub Action, README, 11 unit tests
- [x] D: renamed AgentDup -> Jinx (`rd0-jinx` / `rd0_jinx` / `jinx`)
- [x] D: ship trained weights (`research/experiments/bench_v2/train_package_weights.py`)
- [x] D: feature-parity check: package features == benchmark features (0 difference on 200 queries)
- [x] D: end-to-end CLI tests on real AIDev PRs (`packages/rd0-jinx/tests/test_e2e_aidev.py`)
- [x] D: Action run live on harshuljain13/rd0-jinx with demo PRs #12-#15 for issue #11; comment on #15, quiet on #13, missed #14 (0.30 < 0.5); screenshot in tool demo
- [x] D: clean Ruff warnings in `research/experiments/` scripts (0 findings; `ruff.toml` pins the settings)
- [ ] H: rename GitHub repo `harshuljain13/rd0-jinx` -> `rd0-jinx` (Settings; Devin lacks admin)
- [ ] H: approve making the repo public (needed by both tool tracks)

## 4. Repo organization
- [x] D: one repo layout: `packages/rd0-jinx/`, `web/`, `research/{experiments,paper,docs}/`, `action.yml` at the root
- [x] D/H: review and merge PRs #1-#6 (one commit each)

## 5. Papers
- [x] D: `research/paper/` set up: IEEE (empirical) and ACM (tool demo) templates, `refs.bib`, tables and numbers generated from results
- [ ] D: verify every `refs.bib` entry (author names marked TODO)
- [x] D: empirical paper first full draft (RQ1-RQ4) -> PDF (3 pages; expand to venue length once chosen)
- [x] D: claim audit of the empirical draft (`research/paper/CLAIM_AUDIT.md`): 4 wording fixes, no number changes
- [ ] D: independent re-review after venue-length expansion
- [x] D: tool-demo paper first draft (2 pages, ACM) + TikZ architecture figure; expand after sandbox/pilot results
- [x] D: demo video script (`research/paper/tooldemo/VIDEO_SCRIPT.md`)
- [x] D: plain-English rewrite of both papers, colour architecture diagram (`research/paper/figures/arch.tex`), 5 vector figures (`research/paper/scripts/make_figures.py`), highlighted tables
- [x] D: 3-reviewer panel (methods, writing, figures/tool demo); reports in `research/paper/reviews/`
- [ ] H: record or approve a screencast (after the sandbox Action run)
- [ ] H: choose venue(s): ICPC Tool Demo (19 Nov), ICPC RENE (abstract 11 Dec, paper 18 Dec), FSE Tool Demos (26 Jan)
- [ ] H: approve submission (nothing is submitted without approval)

## 6. Budget
- Spent: Anthropic $8.08 (cap $20); Modal about $8.5 (cap $20).
- [x] D: review-panel fixes: real-use queues (open PRs only, 200 most recent, forward-only mentions) are now the main benchmark; all 66 strategies rerun; 7-day-window results kept in `research/experiments/results_grace7/` and reported as RQ3
- [x] D: impact analysis: duplicate cost (`research/experiments/impact/duplicate_cost.py`) and day-0 warning replay (`research/experiments/impact/replay.py`)
- [x] D: shipped weights retrained on real-use queues; Action `embed` input (MiniLM on by default); end-to-end package latency (`research/experiments/bench_v2/package_latency.py`)
- [ ] H: 100-pair human label check (two labellers)
- [ ] H: GitHub token (read-only, public repos) for a shadow-mode run on live repos
- [x] D: second review round on the reframed papers (fixes below)


## Round-2 review (research/paper/reviews/round2/)
- [x] LLM/re-ranker rows: unscored candidates now keep Jinx's score; judge coverage stored in `summary.json`
- [x] Cost analysis on the open-only sample, human flags only, effort counted only after the second PR opened
- [x] Replay compares Jinx, INTRUDE + time and contrib-guard, with repo-bootstrap CIs and wrong-PR warnings
- [x] 200-PR cap misses reported (11 cross-author); deployed Recall@1 with them counted as misses
- [x] Package `mention_ref` is forward-only, matching training; Action default `embed: "false"`
- [x] Link rule without TF-IDF tie-break reported; table redesigned; consistent figure colours and names
- [x] Empirical paper no longer claims Jinx as a contribution; tool demo cites the study; shared table/figure removed from the demo
- [x] Claude Haiku re-run on open-only top-5: all cross-author queries + 1,600 random no-duplicate queries ($7.93, `research/experiments/bench_v2/haiku_open.py`); false alarms from `research/experiments/results_haiku_subset/`
- [x] Repo public at https://github.com/harshuljain13/rd0-jinx; README with banner, badges, quickstart and results
- [x] Action PR-comment screenshot (`assets/action_comment.png`, tool-demo Fig.)
- [x] Captioned demo video draft (`research/paper/tooldemo/video/`), no voice-over yet
- [ ] H: publish `rd0-jinx` on PyPI — artifact is built and verified, name is free; needs Trusted Publishing set up (see `.github/workflows/release.yml`)
- [ ] record voice-over for the demo video
- [ ] Human 100-pair label check: sheets ready in `research/experiments/label_audit/human/` (label_sheet_A/B.xlsx); score with `agreement.py`

## Launch prep (2026-11-13)
- [x] D: monorepo layout; `action.yml` installs from `packages/rd0-jinx`
- [x] D: PyPI metadata, package README, LICENSE copy, MANIFEST.in; sdist/wheel pass `twine check`
- [x] D: verified 15/15 tests from a clean-venv install of the built sdist
- [x] D: `ci.yml` (tests 3.9 + 3.13, lint, build, web) and `release.yml` (Trusted Publishing)
- [x] D: README rebuilt around a market comparison (9 tools) + the measured detector benchmark
- [x] D: website rebuilt in `web/` as a Next.js static export; numbers generated by `web/scripts/make_data.py`
- [x] D: regenerated `research/experiments/report/tables.md`, which was stale against `results/` (said n=342, results say n=313)
- [ ] H: review and merge the `chore/launch-prep` branch
- [ ] H: rename the GitHub repo to `rd0-jinx`, then set up PyPI Trusted Publishing and tag `v0.1.0`
- [ ] H: register `rd0.ai` and point it at the Vercel deploy (`SITE` in `web/src/app/layout.tsx` already says rd0.ai)
- [ ] H: self-host JetBrains Mono / Inter in `web/src/fonts` if you want them (system stack today)

## Naming (settled 2026-11-13)
- **rd0** is the umbrella: a toolkit for review debt. Domain `rd0.ai`.
- **Jinx** is the first tool, covering duplicate PRs. It keeps its name, so both papers stand as written.
- PyPI distribution is `rd0-jinx`; the import is `rd0_jinx`; the command stays the short `jinx`.
- The repo is `harshuljain13/rd0-jinx`, because everything in it — package, benchmark,
  papers, site — is about Jinx. A second tool gets its own `rd0-<name>` repo.
- Checked and free: PyPI `rd0-jinx` and `rd0`, npm `rd0`, `rd0.ai`, `rd0.dev`.
- [ ] H: reserve the PyPI name `rd0` too, so the umbrella cannot be taken
- [ ] H: confirm the GitHub Marketplace listing name is free (could not be verified without auth)

