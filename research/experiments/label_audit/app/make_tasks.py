"""Build tasks.jsonl for the labeling app from the same 100 sampled pairs as the sheets.

Joins human/pairs.csv (ids, links, titles) with audit_cross_pairs.parquet (the full
pair context the Haiku audit saw: titles, changed files, truncated descriptions).
Run once; the output is committed so the app needs no benchmark data.
"""

import json
import pathlib

import pandas as pd

HERE = pathlib.Path(__file__).resolve().parent
AUDIT = HERE.parent / "audit_cross_pairs.parquet"
PAIRS = HERE.parent / "human" / "pairs.csv"

pairs = pd.read_csv(PAIRS)
audit = pd.read_parquet(AUDIT)
audit["repo_name"] = audit.repo.str.split("/repos/").str[1]

by_key = {}
for _, r in audit.iterrows():
    by_key[(r.repo_name, int(r.old), int(r.new))] = r


def pr_num(url):
    return int(url.rsplit("/", 1)[1])


tasks = []
for _, p in pairs.iterrows():
    key = (p.repository, pr_num(p["older PR"]), pr_num(p["newer PR"]))
    r = by_key.get(key)
    if r is None:
        raise SystemExit(f"pair not found in audit table: {key}")
    tasks.append(
        {
            "id": int(p.id),
            "repository": p.repository,
            "older_pr": p["older PR"],
            "newer_pr": p["newer PR"],
            "older_title": p["older title"],
            "newer_title": p["newer title"],
            "linking_comment": p["comment that linked them"],
            "context": r.prompt,
        }
    )

out = HERE / "tasks.jsonl"
out.write_text("\n".join(json.dumps(t) for t in tasks) + "\n")
print(f"wrote {len(tasks)} tasks to {out}")
