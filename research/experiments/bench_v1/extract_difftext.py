# Truncated raw patch text (for PRSense / vector-triage re-implementations) for PRs in the benchmark.
import collections
import pickle
import sys
from pathlib import Path

import pyarrow.parquet as pq

need = pickle.loads(Path(sys.argv[2]).read_bytes())["need"]
pf = pq.ParquetFile(sys.argv[1]); out = collections.defaultdict(list); size = collections.Counter()
for g in range(pf.num_row_groups):
    tb = pf.read_row_group(g, columns=["pr_id", "filename", "patch"]).to_pydict()
    for pid, fn, patch in zip(tb["pr_id"], tb["filename"], tb["patch"]):
        if pid in need and patch and size[pid] < 4000:
            chunk = f"diff --git a/{fn} b/{fn}\n{patch[:2000]}\n"; out[pid].append(chunk); size[pid] += len(chunk)
    print(g, len(out), flush=True)
Path(sys.argv[3]).write_bytes(pickle.dumps({k: "".join(v)[:4000] for k, v in out.items()})); print("done")
