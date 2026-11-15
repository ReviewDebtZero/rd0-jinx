"""Zero-shot cross-encoder (ms-marco MiniLM-L6) re-ranking of Jinx's top-10 for every benchmark query."""
import json
import pickle
import time
from pathlib import Path

import pandas as pd
import torch
from pairtext import D, pr_text
from sentence_transformers import CrossEncoder

torch.set_num_threads(4)
B = pickle.loads(Path(D + "bench.pkl").read_bytes()); Q = B["queries"]
T = pd.read_parquet(D + "top10.parquet")
ce = CrossEncoder("cross-encoder/ms-marco-MiniLM-L6-v2", device="cpu", max_length=512)
cache = {}
def tx(i):
    if i not in cache: cache[i] = pr_text(int(i))
    return cache[i]
pairs = [(tx(Q[q]["q"]), tx(c)) for q, c in zip(T.qi, T.cand)]
t0 = time.time(); s = ce.predict(pairs, batch_size=32, show_progress_bar=False); el = time.time() - t0
T["ce"] = s; T[["qi", "cand", "ce"]].to_parquet(D + "ce_scores.parquet")
Path(D + "ce_timing.json").write_text(json.dumps({"pairs": len(T), "seconds": el, "ms_per_pair": 1000 * el / len(T)}))
print("ce done", len(T), round(el), "s", round(1000 * el / len(T), 1), "ms/pair")
