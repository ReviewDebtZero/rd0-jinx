# Per-PR changed files and hunk line ranges from AIDev pr_commit_details (streamed by row group).
import collections
import pickle
import re
import sys
import time
from pathlib import Path

import pyarrow.parquet as pq

H = re.compile(r"^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@", re.MULTILINE)
pf = pq.ParquetFile(sys.argv[1])
need = pickle.loads(Path(sys.argv[3]).read_bytes())['need'] if len(sys.argv) > 3 else None
files = collections.defaultdict(set)
hunks = collections.defaultdict(set)
added = collections.defaultdict(set)
t0 = time.time()
for g in range(pf.num_row_groups):
    tb = pf.read_row_group(g, columns=["pr_id", "filename", "patch"]).to_pydict()
    for pid, fn, patch in zip(tb["pr_id"], tb["filename"], tb["patch"]):
        if fn is None or (need is not None and pid not in need):
            continue
        files[pid].add(fn)
        if patch:
            for m in H.finditer(patch):
                s = int(m.group(1)); n = int(m.group(2) or 1)
                hunks[pid].add((fn, s, s + max(n, 1)))
            for line in patch.split("\n"):
                if line.startswith("+") and not line.startswith("+++"):
                    l = line[1:].strip()
                    if len(l) >= 8:
                        added[pid].add(hash(fn) ^ hash(l) & 0xFFFFFFFF)
    print(g, len(files), round(time.time() - t0), flush=True)
Path(sys.argv[2]).write_bytes(pickle.dumps({"files": dict(files), "hunks": dict(hunks), "added": dict(added)}))
print("done", len(files))
