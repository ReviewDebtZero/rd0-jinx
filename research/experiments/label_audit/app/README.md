# Labeling app (100 duplicate-PR pairs)

Interactive version of the `human/` label sheets: same 100 pairs, same six labels,
same hidden Haiku key — but one pair at a time with the full context the audit saw
(titles, changed files, truncated descriptions) plus links to the live PRs.

## Run

```bash
pip install -r requirements.txt
python app.py
```

Open http://localhost:7860 (or the printed port). Two annotators label
independently — each enters a different name (e.g. `A` and `B`), and their
answers are appended to `answers/<name>.jsonl`. Reopening the app resumes where
each annotator left off. To share one instance, run `app.py` inside a HF Space
or deploy it behind any static auth; names keep annotators apart on the same
server. Never commit `answers/` or `human/key_do_not_open.csv`.

## Score

From `research/experiments/label_audit/`:

```bash
python human/agreement.py app/answers/a.jsonl app/answers/b.jsonl
```

`agreement.py` accepts `.jsonl` answer files and the `.xlsx` sheets
interchangeably, and writes `human/agreement.json` (per-annotator strict/loose
precision, Cohen's kappa A-vs-B and each-vs-Haiku).

`make_tasks.py` regenerates `tasks.jsonl` from `pairs.csv` +
`audit_cross_pairs.parquet`; the committed `tasks.jsonl` means the app runs
without benchmark data.
