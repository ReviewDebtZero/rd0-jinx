# Jinx strategy study: which duplicate-PR detection strategy works on coding-agent PRs?

All numbers in this file are produced by `experiments/report/make_report.py` from `experiments/results/`. Benchmark: AIDev (CC BY 4.0, hao-li/AIDev on Hugging Face), live-queue evaluation. Nothing here used OpenAI. Jev (TypeSafe) was **not** run: its weights are not public and the user cancelled it; it is listed as future work only.

## 1. Plain-English summary

- **Task.** When a coding agent opens a new pull request (PR), find the already-open PR in the same repository that does the same work (its *duplicate*). Each method ranks every PR that was open at that moment (the *live queue*; median 40 PRs, p90 314).
- **Hard case = cross-author pairs** (313 pairs, two different authors). Self-replacement pairs (same author re-opens their own work) are easy for almost every method.
- **Best top-1 on cross-author:** `Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR)` with Recall@1 0.942 [0.912, 0.972]. Current Jinx tool: 0.927 [0.889, 0.958]. Classic research detector (INTRUDE + time (Wang et al. 2019), LR): 0.914 [0.878, 0.948]. Best existing bot (contrib-guard/phoenix (bot, exact port)): 0.914 [0.885, 0.947].
- **Best Recall@5 on cross-author:** `LLM judge Claude Haiku 4.5 + Jinx (avg) top-5` with 0.990 [0.981, 1.000]. Jinx: 0.990 [0.981, 1.000].
- **Kill rule (pre-registered by the user): "if AgentDup does not beat the best baseline on cross-author Recall@5 by a meaningful, CI-backed margin, say so plainly."** (AgentDup was the tool's earlier name.) Best baseline that does not use Jinx's own signals: `TF-IDF template-stripped` (Recall@5 0.987). Jinx minus baseline: +0.3 points [-0.0, +0.9]. **The kill rule FAILS: the confidence interval includes zero.** Strategies with a CI-backed Recall@5 gain over `INTRUDE + time (Wang et al. 2019), LR`: 0 of 66.
- **Did any new strategy beat the current Jinx tool?** Strategies with a CI-backed gain over it on Recall@1, Recall@5 or MRR: 0. The best new ones (all-signals LR, cascades with re-rankers or LLM judges) are within noise of it.
- **What is CI-backed:** vs the classic detector, Recall@1 +1.3 points [-0.7, +3.1] and MRR +0.9 points [-0.2, +2.0]. vs the best existing bot, Recall@5 +1.0 points [+0.0, +2.5] and Recall@1 +1.3 points [-2.7, +4.7].
- **False alarms** (alert on a PR that has no duplicate, at a matched threshold): Jinx 1.8% [1.2, 2.5] vs classic 2.0% (difference -0.3 points [-0.7, +0.0]).
- **Label-bias warning.** A trivial rule that only checks "same linked issue" or "#number mentioned in the text" gets cross-author Recall@1 0.936. Many labels come from comments that also put a link in the PR, so part of the benchmark is easy. We therefore also report the subset with no link at all.
- **Random pairs vs live queues.** Ranking the 67 strategies by the classic random-pair AUC and by live-queue cross-author Recall@1 agrees only partly (Kendall tau 0.70). Strategies that look much better under random pairs than in live queues: `LLM judge Qwen2.5-14B + Jinx (avg) top-10` (AUC rank 3, live rank 29); `LLM judge Qwen2.5-14B re-rank top-10` (AUC rank 47, live rank 64); `LLM judge Qwen2.5-14B + Jinx (avg) top-5` (AUC rank 5, live rank 22); `Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10` (AUC rank 2, live rank 18) (see Section 8).

## 2. Data

- Labelled duplicate pairs: 1767 (self-replacement 1454, cross-author 313: same agent 207, cross-agent 106). Labels are *silver*: taken from AIDev comments such as "duplicate of #N" / "superseded by #N" where both PRs are in AIDev.
- Negative queries (PRs with no known duplicate, used for false alarms): 2,965. PRs needed (queries + queues): 76,209.
- Agent-vs-human pairs: **not available** (this AIDev version has agent PRs only and the GitHub token was dead).

Duplicate classes (by code overlap between the two PRs):

| Class | cross-author | self-replacement |
|---|---|---|
| A. code twin (>=50% identical changed lines) | 132 | 819 |
| B. partial code overlap | 146 | 512 |
| C. same files, different code | 10 | 31 |
| D. no shared files (intent-level) | 25 | 92 |

Extra relation groups: *same issue, different code* = shares a linked issue and has class C or D; *same code, different description* = code twin with title+body TF-IDF < 0.3.

## 3. Strategies compared

| Family | What it does | Strategies |
|---|---|---|
| 0 trivial | newest open PR first | Recency only (newest open PR first) |
| 1 lexical | word overlap of title + description | TF-IDF raw text (Li et al. 2017); TF-IDF template-stripped; BM25 raw text; BM25 template-stripped |
| 2 code | overlap of changed files, hunks, identical lines, or BM25 on the diff | BM25 on diff; Changed-files Jaccard; Hunk overlap; Identical changed lines; Code overlap sum (files+hunks+lines) |
| 3 links | same linked issue or explicit #ref | Links only (same issue / #ref); Links only, no tie-break (same issue / #ref) |
| 4 embedding | cosine of a neural sentence/code embedding | MiniLM raw text; MiniLM template-stripped; MiniLM on diff; BGE-small raw text; BGE-small template-stripped; BGE-small on diff; BGE-base template-stripped; UniXcoder (code model) on diff; UniXcoder template-stripped text; CodeBERT (mean-pooled) on diff; Jina code embeddings v2 on diff |
| 5 existing bot | matching logic of public duplicate-PR bots | contrib-guard/phoenix (bot, exact port); Simili-bot (bot, re-impl); PRSense (bot, re-impl) |
| 6 unsupervised hybrid | reciprocal-rank fusion (RRF) of several signals, no training | RRF hybrid: BM25 + embedding; RRF hybrid: BM25 + embedding + code; RRF hybrid: text + code + links + recency |
| 7 supervised | logistic regression (LR) / gradient boosting trained on repo-grouped folds | INTRUDE + time (Wang et al. 2019), LR; Jinx lexical, LR; Jinx + MiniLM, LR (current tool); All signals, LR; Jinx features, gradient boosting; All signals, gradient boosting |
| 8 re-ranker on top-k | cross-encoder re-scores Jinx's top 10 | Cross-encoder ms-marco MiniLM re-rank top-10; Cross-encoder ms-marco MiniLM + Jinx (avg) top-10; Cross-encoder BGE-reranker-base re-rank top-10; Cross-encoder BGE-reranker-base + Jinx (avg) top-10; Cross-encoder BGE-reranker-v2-m3 re-rank top-10; Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 |
| 9 LLM judge on top-k | LLM answers duplicate yes/no for each of Jinx's top k | LLM judge Qwen2.5-1.5B re-rank top-5; LLM judge Qwen2.5-1.5B + Jinx (avg) top-5; LLM judge Qwen2.5-1.5B re-rank top-10; LLM judge Qwen2.5-1.5B + Jinx (avg) top-10; LLM judge Qwen2.5-7B re-rank top-5; LLM judge Qwen2.5-7B + Jinx (avg) top-5; LLM judge Qwen2.5-7B re-rank top-10; LLM judge Qwen2.5-7B + Jinx (avg) top-10; LLM judge Qwen2.5-Coder-7B re-rank top-5; LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5; LLM judge Qwen2.5-Coder-7B re-rank top-10; LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10; LLM judge Qwen2.5-14B re-rank top-5; LLM judge Qwen2.5-14B + Jinx (avg) top-5; LLM judge Qwen2.5-14B re-rank top-10; LLM judge Qwen2.5-14B + Jinx (avg) top-10; LLM judge Claude Haiku 4.5 re-rank top-5; LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 |
| 10 stacked cascade (ours) | LR over Jinx score + re-ranker / LLM scores on the top 10 | Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10; Cascade: Jinx + BGE-reranker-base (stacked LR); Cascade: Jinx + Qwen2.5-7B judge (stacked LR); Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR); Cascade: Jinx + Qwen2.5-14B judge (stacked LR); Cascade: Jinx + fine-tuned BGE-reranker (stacked LR); Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR); Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) |

Training uses 5 repository-grouped folds (no repository appears in both train and test). Confidence intervals: repository-cluster bootstrap, 95%.

## 4. Best strategy of each family, cross-author

| Family | Best strategy | Recall@1 [95% CI] | Recall@5 [95% CI] | MRR [95% CI] |
|---|---|---|---|---|
| 0 trivial | Recency only (newest open PR first) | 0.297 [0.214, 0.408] | 0.597 [0.466, 0.758] | 0.438 [0.340, 0.559] |
| 1 lexical | TF-IDF template-stripped | 0.914 [0.882, 0.948] | 0.987 [0.975, 1.000] | 0.947 [0.927, 0.969] |
| 2 code | BM25 on diff | 0.728 [0.623, 0.831] | 0.895 [0.797, 0.976] | 0.806 [0.710, 0.893] |
| 3 links | Links only (same issue / #ref) | 0.936 [0.904, 0.970] | 0.978 [0.959, 0.997] | 0.957 [0.933, 0.982] |
| 4 embedding | BGE-small template-stripped | 0.907 [0.876, 0.945] | 0.981 [0.965, 0.996] | 0.944 [0.923, 0.967] |
| 5 existing bot | contrib-guard/phoenix (bot, exact port) | 0.914 [0.885, 0.947] | 0.981 [0.960, 0.997] | 0.947 [0.927, 0.969] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding | 0.882 [0.847, 0.917] | 0.974 [0.948, 0.997] | 0.926 [0.902, 0.952] |
| 7 supervised | All signals, LR | 0.927 [0.894, 0.959] | 0.990 [0.978, 1.000] | 0.955 [0.934, 0.976] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | 0.930 [0.889, 0.962] | 0.984 [0.969, 0.997] | 0.957 [0.932, 0.977] |
| 9 LLM judge on top-k | LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | 0.936 [0.906, 0.963] | 0.990 [0.981, 1.000] | 0.961 [0.942, 0.979] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 0.942 [0.912, 0.972] | 0.984 [0.968, 0.997] | 0.962 [0.941, 0.982] |

## 5. Which strategy for which kind of duplicate (Recall@1)

| Group | n | best strategy | its Recall@1 | Jinx | INTRUDE + time | contrib-guard | best non-Jinx |
|---|---|---|---|---|---|---|---|
| self-replacement | 1454 | INTRUDE + time (Wang et al. 2019), LR | 0.901 | 0.891 | 0.901 | 0.878 | INTRUDE + time (Wang et al. 2019), LR (0.901) |
| cross-author | 313 | Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 0.942 | 0.927 | 0.914 | 0.914 | Links only (same issue / #ref) (0.936) |
| cross-author, same agent | 207 | Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 0.942 | 0.923 | 0.913 | 0.932 | Links only (same issue / #ref) (0.942) |
| cross-author, cross-agent | 106 | LLM judge Claude Haiku 4.5 re-rank top-5 | 0.962 | 0.934 | 0.915 | 0.877 | Links only (same issue / #ref) (0.925) |
| cross-author, no #ref in text | 173 | LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | 0.902 | 0.879 | 0.850 | 0.879 | BGE-small template-stripped (0.890) |
| cross-author, shares linked issue | 93 | Cascade: Jinx + BGE-reranker-base (stacked LR) | 0.989 | 0.968 | 0.968 | 0.925 | Links only, no tie-break (same issue / #ref) (0.978) |
| cross-author, no link at all (no #ref, no shared issue) | 118 | Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 0.890 | 0.839 | 0.805 | 0.856 | BGE-base template-stripped (0.864) |
| same issue, different code (classes C/D, shares linked issue) | 35 | Links only (same issue / #ref) | 1.000 | 0.943 | 0.914 | 0.886 | Links only (same issue / #ref) (1.000) |
| same code, different description (code twin, text TF-IDF < 0.3) | 285 | Jinx features, gradient boosting | 0.853 | 0.786 | 0.821 | 0.730 | INTRUDE + time (Wang et al. 2019), LR (0.821) |
| cross-author, same code, different description | 34 | Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | 0.971 | 0.941 | 0.912 | 0.853 | BM25 on diff (0.912) |
| class A. code twin (>=50% identical changed lines) | 951 | INTRUDE + time (Wang et al. 2019), LR | 0.939 | 0.927 | 0.939 | 0.902 | INTRUDE + time (Wang et al. 2019), LR (0.939) |
| cross-author, class A. code twin (>=50% identical changed lines) | 132 | Jinx + MiniLM, LR (current tool) | 0.977 | 0.977 | 0.970 | 0.955 | INTRUDE + time (Wang et al. 2019), LR (0.970) |
| class B. partial code overlap | 658 | Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 0.897 | 0.878 | 0.883 | 0.872 | INTRUDE + time (Wang et al. 2019), LR (0.883) |
| cross-author, class B. partial code overlap | 146 | Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 0.959 | 0.932 | 0.918 | 0.904 | BGE-small template-stripped (0.932) |
| class C. same files, different code | 41 | INTRUDE + time (Wang et al. 2019), LR | 0.878 | 0.829 | 0.878 | 0.829 | INTRUDE + time (Wang et al. 2019), LR (0.878) |
| cross-author, class C. same files, different code | 10 | TF-IDF raw text (Li et al. 2017) | 0.800 | 0.700 | 0.700 | 0.700 | TF-IDF raw text (Li et al. 2017) (0.800) |
| class D. no shared files (intent-level) | 117 | TF-IDF template-stripped | 0.880 | 0.778 | 0.735 | 0.829 | TF-IDF template-stripped (0.880) |
| cross-author, class D. no shared files (intent-level) | 25 | Links only (same issue / #ref) | 0.880 | 0.720 | 0.680 | 0.840 | Links only (same issue / #ref) (0.880) |

## 6. Paired differences (cross-author, points, 95% CI; * = CI excludes 0)

**vs `Jinx + MiniLM, LR (current tool)`**

| Strategy | ΔRecall@1 | ΔRecall@5 | ΔMRR |
|---|---|---|---|
| Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | +1.6 [-0.5, +3.8] | -0.6 [-1.5, +0.0] | +0.8 [-0.4, +1.9] |
| Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | +1.0 [-1.0, +2.6] | -1.3 [-2.6, -0.3]* | +0.4 [-0.7, +1.2] |
| Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | +1.0 [-1.2, +3.2] | -0.6 [-1.5, +0.0] | +0.5 [-0.6, +1.7] |
| LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | +1.0 [-0.3, +2.5] | +0.0 [+0.0, +0.0] | +0.7 [-0.1, +1.7] |
| Links only (same issue / #ref) | +1.0 [-2.7, +4.3] | -1.3 [-2.4, +0.0] | +0.3 [-2.1, +2.5] |
| Cascade: Jinx + BGE-reranker-base (stacked LR) | +0.6 [-1.2, +2.1] | -1.0 [-2.4, +0.4] | +0.4 [-0.6, +1.1] |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | +0.6 [-1.2, +2.9] | +0.0 [+0.0, +0.0] | +0.5 [-0.6, +1.8] |
| Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | +0.3 [-2.3, +2.3] | -0.6 [-2.0, +0.6] | +0.3 [-1.1, +1.4] |
| Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | +0.3 [-1.8, +2.8] | -0.6 [-1.5, +0.0] | +0.3 [-0.9, +1.7] |
| Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | +0.3 [-1.4, +2.0] | -0.3 [-1.1, +0.0] | +0.1 [-0.9, +0.9] |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | +0.3 [-1.3, +2.1] | -0.3 [-1.1, +0.0] | +0.3 [-0.7, +1.3] |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | +0.3 [-1.8, +2.8] | -0.6 [-1.5, +0.0] | +0.3 [-0.9, +1.7] |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | +0.3 [-1.8, +2.8] | +0.0 [+0.0, +0.0] | +0.4 [-0.8, +1.8] |
| LLM judge Qwen2.5-7B + Jinx (avg) top-10 | +0.0 [-1.7, +1.9] | -0.3 [-1.1, +0.0] | -0.1 [-1.0, +0.9] |
| LLM judge Qwen2.5-7B + Jinx (avg) top-5 | +0.0 [-1.7, +1.9] | +0.0 [+0.0, +0.0] | -0.1 [-1.0, +0.9] |
| All signals, LR | +0.0 [-1.7, +2.0] | +0.0 [-1.0, +0.8] | +0.1 [-0.8, +1.3] |
| LLM judge Qwen2.5-Coder-7B re-rank top-5 | -0.3 [-2.7, +2.3] | +0.0 [+0.0, +0.0] | +0.0 [-1.4, +1.5] |
| LLM judge Claude Haiku 4.5 re-rank top-5 | -0.3 [-2.9, +2.4] | +0.0 [+0.0, +0.0] | +0.2 [-1.3, +1.9] |
| Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | -0.3 [-2.6, +2.2] | -0.3 [-1.0, +0.0] | -0.1 [-1.3, +1.2] |
| Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | -0.6 [-4.2, +3.0] | +0.0 [-0.9, +1.0] | -0.3 [-2.6, +1.8] |
| Jinx lexical, LR | -1.0 [-2.7, +0.9] | +0.0 [-0.9, +1.0] | -0.5 [-1.5, +0.5] |
| Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | -1.0 [-2.0, +0.0] | -0.3 [-1.1, +0.0] | -0.5 [-1.0, +0.0] |
| LLM judge Qwen2.5-14B + Jinx (avg) top-5 | -1.0 [-2.0, +0.0] | +0.0 [+0.0, +0.0] | -0.5 [-1.0, +0.0] |
| All signals, gradient boosting | -1.0 [-4.0, +2.6] | -1.0 [-1.9, +0.0] | -0.5 [-2.3, +1.6] |
| TF-IDF template-stripped | -1.3 [-4.8, +2.7] | -0.3 [-0.9, +0.0] | -0.7 [-2.9, +1.7] |
| INTRUDE + time (Wang et al. 2019), LR | -1.3 [-3.1, +0.7] | -0.3 [-1.5, +0.8] | -0.9 [-2.0, +0.2] |
| contrib-guard/phoenix (bot, exact port) | -1.3 [-4.7, +2.7] | -1.0 [-2.5, +0.0] | -0.8 [-2.9, +1.7] |
| LLM judge Qwen2.5-14B + Jinx (avg) top-10 | -1.6 [-3.2, +0.0] | -0.3 [-1.1, +0.0] | -0.8 [-1.6, +0.0] |
| Jinx features, gradient boosting | -1.6 [-4.2, +0.8] | -0.6 [-1.6, +0.0] | -0.9 [-2.4, +0.6] |
| TF-IDF raw text (Li et al. 2017) | -1.6 [-4.9, +2.2] | -1.0 [-1.8, +0.0] | -0.9 [-3.0, +1.5] |
| LLM judge Qwen2.5-Coder-7B re-rank top-10 | -1.9 [-4.4, +1.1] | -0.6 [-1.8, +0.7] | -1.0 [-2.5, +0.7] |
| BGE-small template-stripped | -1.9 [-4.6, +1.1] | -1.0 [-2.0, +0.0] | -1.1 [-2.7, +0.7] |
| BGE-small raw text | -2.2 [-5.5, +1.7] | -0.6 [-2.0, +0.5] | -1.2 [-3.1, +1.0] |
| MiniLM template-stripped | -2.6 [-5.3, +0.8] | -1.6 [-2.9, -0.4]* | -1.9 [-3.5, +0.1] |
| BGE-base template-stripped | -2.9 [-5.9, +0.9] | -1.0 [-2.0, +0.0] | -1.6 [-3.4, +0.6] |
| MiniLM raw text | -3.5 [-6.6, +0.3] | -1.9 [-3.0, -0.7]* | -2.4 [-4.1, -0.2]* |
| RRF hybrid: BM25 + embedding | -4.5 [-8.1, -0.5]* | -1.6 [-3.8, +0.0] | -2.8 [-5.2, -0.2]* |
| Simili-bot (bot, re-impl) | -4.8 [-8.1, -0.7]* | -1.6 [-2.9, -0.4]* | -3.0 [-5.0, -0.5]* |
| LLM judge Qwen2.5-7B re-rank top-5 | -4.8 [-8.0, -1.6]* | +0.0 [+0.0, +0.0] | -3.0 [-4.9, -1.0]* |
| Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | -6.1 [-10.5, -2.0]* | -0.6 [-1.6, +0.0] | -3.5 [-6.2, -1.1]* |
| RRF hybrid: BM25 + embedding + code | -6.4 [-12.0, -1.0]* | -0.6 [-1.3, +0.0] | -4.3 [-8.1, -0.7]* |
| BM25 template-stripped | -6.7 [-11.2, -1.6]* | -2.2 [-4.5, +0.0] | -4.3 [-7.4, -0.9]* |
| Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | -8.3 [-13.8, -2.5]* | -2.2 [-4.4, -0.3]* | -5.7 [-9.4, -2.0]* |
| BM25 raw text | -8.6 [-13.5, -3.1]* | -2.2 [-4.5, +0.0] | -5.6 [-9.0, -1.9]* |
| PRSense (bot, re-impl) | -9.9 [-17.6, -2.2]* | -2.6 [-4.9, -0.4]* | -6.9 [-13.4, -1.3]* |
| Cross-encoder ms-marco MiniLM re-rank top-10 | -11.2 [-17.0, -4.6]* | -1.6 [-3.1, +0.4] | -6.7 [-10.5, -2.6]* |
| LLM judge Qwen2.5-14B re-rank top-5 | -11.8 [-16.4, -6.6]* | +0.0 [+0.0, +0.0] | -6.9 [-9.7, -3.9]* |
| LLM judge Qwen2.5-7B re-rank top-10 | -12.1 [-17.1, -7.0]* | -4.2 [-6.7, -2.1]* | -8.5 [-11.9, -5.0]* |
| RRF hybrid: text + code + links + recency | -12.1 [-20.7, -3.7]* | -2.2 [-4.0, -0.4]* | -8.2 [-14.3, -2.3]* |
| UniXcoder template-stripped text | -13.4 [-20.4, -5.9]* | -5.8 [-10.5, -1.5]* | -10.1 [-15.8, -4.3]* |
| BM25 on diff | -19.8 [-30.5, -10.3]* | -9.6 [-20.1, -1.9]* | -14.8 [-24.8, -6.8]* |
| Code overlap sum (files+hunks+lines) | -22.0 [-30.5, -13.6]* | -11.2 [-19.2, -4.3]* | -17.1 [-24.9, -10.2]* |
| Links only, no tie-break (same issue / #ref) | -23.6 [-30.3, -16.7]* | -18.2 [-24.9, -10.6]* | -21.1 [-27.1, -14.6]* |
| LLM judge Qwen2.5-1.5B re-rank top-5 | -24.3 [-29.2, -18.6]* | +0.0 [+0.0, +0.0] | -14.5 [-17.2, -11.2]* |
| Jina code embeddings v2 on diff | -24.9 [-34.5, -13.9]* | -14.4 [-23.5, -5.0]* | -19.3 [-27.8, -9.8]* |
| BGE-small on diff | -25.6 [-35.8, -14.3]* | -15.3 [-23.6, -6.5]* | -20.6 [-29.6, -10.7]* |
| Changed-files Jaccard | -26.2 [-34.8, -17.9]* | -13.4 [-23.1, -5.7]* | -20.2 [-28.3, -13.2]* |
| Hunk overlap | -26.5 [-34.8, -17.0]* | -12.1 [-19.2, -5.1]* | -20.6 [-27.7, -13.2]* |
| MiniLM on diff | -28.1 [-38.2, -17.1]* | -16.3 [-25.0, -6.2]* | -22.6 [-31.9, -12.6]* |
| UniXcoder (code model) on diff | -28.8 [-40.0, -16.8]* | -18.2 [-28.7, -6.4]* | -23.8 [-34.0, -12.8]* |
| Identical changed lines | -29.7 [-36.8, -20.9]* | -18.8 [-26.1, -10.2]* | -24.7 [-31.2, -16.8]* |
| Cross-encoder BGE-reranker-base re-rank top-10 | -31.0 [-37.8, -23.9]* | -4.5 [-7.1, -2.2]* | -20.5 [-25.1, -15.7]* |
| LLM judge Qwen2.5-14B re-rank top-10 | -32.3 [-42.3, -21.3]* | -7.3 [-10.8, -3.7]* | -21.3 [-28.0, -14.0]* |
| LLM judge Qwen2.5-1.5B re-rank top-10 | -32.6 [-39.3, -25.0]* | -5.1 [-8.0, -2.2]* | -20.7 [-24.4, -16.0]* |
| CodeBERT (mean-pooled) on diff | -39.9 [-50.9, -27.3]* | -30.0 [-41.9, -15.5]* | -34.6 [-45.7, -22.0]* |
| Recency only (newest open PR first) | -62.9 [-71.5, -52.1]* | -39.3 [-51.8, -23.3]* | -51.6 [-61.6, -39.3]* |

**vs `INTRUDE + time (Wang et al. 2019), LR`**

| Strategy | ΔRecall@1 | ΔRecall@5 | ΔMRR |
|---|---|---|---|
| Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | +2.9 [+0.7, +5.1]* | -0.3 [-1.5, +0.8] | +1.7 [+0.3, +3.0]* |
| Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | +2.2 [-0.4, +4.3] | -1.0 [-2.2, +0.0] | +1.3 [-0.2, +2.5] |
| Links only (same issue / #ref) | +2.2 [-0.3, +5.0] | -1.0 [-2.5, +0.9] | +1.2 [-0.7, +3.1] |
| Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | +2.2 [+0.0, +4.3] | -0.3 [-1.5, +0.8] | +1.4 [+0.2, +2.6]* |
| LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | +2.2 [+0.8, +3.8]* | +0.3 [-0.8, +1.5] | +1.7 [+0.6, +2.8]* |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | +1.9 [-0.9, +4.7] | +0.3 [-0.8, +1.5] | +1.4 [-0.3, +3.1] |
| Cascade: Jinx + BGE-reranker-base (stacked LR) | +1.9 [-0.8, +3.9] | -0.6 [-1.6, +0.0] | +1.3 [-0.2, +2.4] |
| Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | +1.6 [-1.4, +3.9] | -0.3 [-1.5, +0.7] | +1.2 [-0.5, +2.5] |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | +1.6 [-1.1, +4.2] | +0.0 [-1.0, +0.9] | +1.2 [-0.4, +2.7] |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | +1.6 [-0.6, +4.2] | +0.3 [-0.8, +1.5] | +1.3 [-0.2, +2.9] |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | +1.6 [-0.6, +4.2] | -0.3 [-1.5, +0.8] | +1.2 [-0.2, +2.9] |
| Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | +1.6 [-1.0, +3.9] | +0.0 [-1.0, +1.0] | +1.0 [-0.6, +2.4] |
| Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | +1.6 [-0.6, +4.2] | -0.3 [-1.5, +0.8] | +1.2 [-0.2, +2.9] |
| LLM judge Qwen2.5-7B + Jinx (avg) top-10 | +1.3 [-1.0, +3.6] | +0.0 [-1.0, +1.0] | +0.8 [-0.6, +2.2] |
| LLM judge Qwen2.5-7B + Jinx (avg) top-5 | +1.3 [-1.0, +3.6] | +0.3 [-0.8, +1.5] | +0.8 [-0.6, +2.2] |
| All signals, LR | +1.3 [-1.0, +3.7] | +0.3 [-0.9, +1.3] | +1.0 [-0.5, +2.5] |
| Jinx + MiniLM, LR (current tool) | +1.3 [-0.7, +3.1] | +0.3 [-0.8, +1.5] | +0.9 [-0.2, +2.0] |
| LLM judge Claude Haiku 4.5 re-rank top-5 | +1.0 [-2.1, +3.9] | +0.3 [-0.8, +1.5] | +1.1 [-0.8, +3.0] |
| LLM judge Qwen2.5-Coder-7B re-rank top-5 | +1.0 [-1.0, +3.5] | +0.3 [-0.8, +1.5] | +1.0 [-0.4, +2.5] |
| Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | +1.0 [-2.4, +4.0] | +0.0 [-1.3, +1.3] | +0.8 [-1.1, +2.6] |
| Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | +0.6 [-4.2, +4.9] | +0.3 [+0.0, +1.1] | +0.6 [-2.3, +3.1] |
| LLM judge Qwen2.5-14B + Jinx (avg) top-5 | +0.3 [-1.6, +2.4] | +0.3 [-0.8, +1.5] | +0.4 [-0.6, +1.6] |
| Jinx lexical, LR | +0.3 [-0.7, +1.6] | +0.3 [+0.0, +1.1] | +0.4 [-0.2, +1.1] |
| Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | +0.3 [-1.6, +2.4] | +0.0 [-1.0, +1.0] | +0.4 [-0.6, +1.6] |
| All signals, gradient boosting | +0.3 [-2.8, +4.0] | -0.6 [-1.5, +0.0] | +0.4 [-1.5, +2.8] |
| TF-IDF template-stripped | +0.0 [-3.1, +3.8] | +0.0 [-1.2, +1.4] | +0.2 [-1.7, +2.6] |
| contrib-guard/phoenix (bot, exact port) | +0.0 [-3.0, +3.7] | -0.6 [-2.6, +1.0] | +0.2 [-1.8, +2.5] |
| Jinx features, gradient boosting | -0.3 [-2.5, +2.2] | -0.3 [-1.5, +0.7] | +0.0 [-1.4, +1.7] |
| TF-IDF raw text (Li et al. 2017) | -0.3 [-3.5, +3.3] | -0.6 [-2.1, +1.0] | -0.0 [-1.9, +2.2] |
| LLM judge Qwen2.5-14B + Jinx (avg) top-10 | -0.3 [-2.6, +2.2] | +0.0 [-1.0, +1.0] | +0.1 [-1.2, +1.5] |
| BGE-small template-stripped | -0.6 [-4.1, +2.6] | -0.6 [-2.2, +0.9] | -0.1 [-2.3, +1.8] |
| LLM judge Qwen2.5-Coder-7B re-rank top-10 | -0.6 [-3.2, +2.5] | -0.3 [-1.2, +0.8] | -0.1 [-1.6, +1.7] |
| BGE-small raw text | -1.0 [-4.4, +3.0] | -0.3 [-2.1, +1.3] | -0.3 [-2.5, +2.0] |
| MiniLM template-stripped | -1.3 [-4.4, +2.2] | -1.3 [-2.9, +0.3] | -0.9 [-3.2, +1.2] |
| BGE-base template-stripped | -1.6 [-4.9, +2.2] | -0.6 [-2.2, +0.9] | -0.6 [-2.7, +1.6] |
| MiniLM raw text | -2.2 [-5.2, +1.5] | -1.6 [-3.1, +0.0] | -1.5 [-3.4, +0.8] |
| RRF hybrid: BM25 + embedding | -3.2 [-6.9, +0.4] | -1.3 [-3.7, +1.1] | -1.9 [-4.2, +0.6] |
| LLM judge Qwen2.5-7B re-rank top-5 | -3.5 [-6.6, -0.7]* | +0.3 [-0.8, +1.5] | -2.0 [-4.1, -0.2]* |
| Simili-bot (bot, re-impl) | -3.5 [-7.5, +0.9] | -1.3 [-2.9, +0.3] | -2.1 [-4.5, +0.6] |
| Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | -4.8 [-9.8, -0.4]* | -0.3 [-1.8, +1.1] | -2.6 [-5.9, -0.1]* |
| RRF hybrid: BM25 + embedding + code | -5.1 [-11.6, +0.4] | -0.3 [-1.6, +1.3] | -3.4 [-7.7, +0.4] |
| BM25 template-stripped | -5.4 [-9.7, -0.8]* | -1.9 [-4.4, +0.8] | -3.4 [-6.2, -0.2]* |
| Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | -7.0 [-11.8, -1.7]* | -1.9 [-4.2, +0.3] | -4.8 [-8.0, -1.4]* |
| BM25 raw text | -7.3 [-12.2, -2.1]* | -1.9 [-4.4, +0.8] | -4.7 [-7.7, -1.2]* |
| PRSense (bot, re-impl) | -8.6 [-17.6, -0.5]* | -2.2 [-4.8, +0.0] | -6.0 [-13.4, -0.2]* |
| Cross-encoder ms-marco MiniLM re-rank top-10 | -9.9 [-16.6, -3.1]* | -1.3 [-2.9, +0.4] | -5.8 [-10.2, -1.6]* |
| LLM judge Qwen2.5-14B re-rank top-5 | -10.5 [-14.9, -5.7]* | +0.3 [-0.8, +1.5] | -6.0 [-8.7, -3.0]* |
| LLM judge Qwen2.5-7B re-rank top-10 | -10.9 [-15.4, -6.2]* | -3.8 [-6.2, -1.9]* | -7.5 [-10.6, -4.4]* |
| RRF hybrid: text + code + links + recency | -10.9 [-20.2, -2.0]* | -1.9 [-4.1, +0.4] | -7.2 [-13.7, -1.3]* |
| UniXcoder template-stripped text | -12.1 [-18.5, -4.9]* | -5.4 [-10.5, -1.4]* | -9.2 [-14.5, -3.7]* |
| BM25 on diff | -18.5 [-30.3, -8.8]* | -9.3 [-20.1, -1.5]* | -13.9 [-24.2, -5.8]* |
| Code overlap sum (files+hunks+lines) | -20.8 [-30.1, -12.1]* | -10.9 [-19.0, -4.2]* | -16.2 [-24.6, -9.1]* |
| Links only, no tie-break (same issue / #ref) | -22.4 [-28.0, -16.3]* | -17.9 [-24.7, -10.3]* | -20.2 [-25.6, -14.3]* |
| LLM judge Qwen2.5-1.5B re-rank top-5 | -23.0 [-27.7, -17.5]* | +0.3 [-0.8, +1.5] | -13.6 [-16.4, -10.3]* |
| Jina code embeddings v2 on diff | -23.6 [-33.5, -12.6]* | -14.1 [-23.3, -4.5]* | -18.3 [-27.3, -8.8]* |
| BGE-small on diff | -24.3 [-34.6, -12.8]* | -15.0 [-23.6, -6.3]* | -19.7 [-29.0, -9.8]* |
| Changed-files Jaccard | -24.9 [-34.2, -16.4]* | -13.1 [-23.1, -5.5]* | -19.2 [-28.1, -12.3]* |
| Hunk overlap | -25.2 [-34.2, -16.0]* | -11.8 [-19.0, -5.2]* | -19.7 [-27.3, -12.2]* |
| MiniLM on diff | -26.8 [-37.7, -15.8]* | -16.0 [-24.9, -6.1]* | -21.7 [-31.2, -11.8]* |
| UniXcoder (code model) on diff | -27.5 [-38.7, -15.5]* | -17.9 [-28.4, -6.1]* | -22.9 [-33.4, -11.8]* |
| Identical changed lines | -28.4 [-35.5, -19.7]* | -18.5 [-25.7, -10.2]* | -23.8 [-30.3, -15.8]* |
| Cross-encoder BGE-reranker-base re-rank top-10 | -29.7 [-36.2, -23.6]* | -4.2 [-6.7, -2.0]* | -19.6 [-24.0, -15.3]* |
| LLM judge Qwen2.5-14B re-rank top-10 | -31.0 [-40.5, -20.2]* | -7.0 [-10.5, -3.7]* | -20.3 [-26.7, -13.3]* |
| LLM judge Qwen2.5-1.5B re-rank top-10 | -31.3 [-37.4, -23.8]* | -4.8 [-7.7, -2.0]* | -19.7 [-23.2, -15.3]* |
| CodeBERT (mean-pooled) on diff | -38.7 [-49.3, -26.0]* | -29.7 [-41.8, -15.4]* | -33.7 [-44.9, -21.0]* |
| Recency only (newest open PR first) | -61.7 [-69.6, -51.1]* | -39.0 [-51.6, -23.3]* | -50.7 [-60.3, -38.6]* |

**vs `contrib-guard/phoenix (bot, exact port)`**

| Strategy | ΔRecall@1 | ΔRecall@5 | ΔMRR |
|---|---|---|---|
| Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | +2.9 [-0.4, +5.8] | +0.3 [-0.8, +2.0] | +1.5 [-0.5, +3.5] |
| Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | +2.2 [-2.1, +5.9] | -0.3 [-1.8, +1.5] | +1.1 [-1.5, +3.4] |
| Links only (same issue / #ref) | +2.2 [+0.0, +4.9] | -0.3 [-1.6, +0.9] | +1.0 [-0.3, +2.6] |
| Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | +2.2 [-1.1, +5.2] | +0.3 [-0.8, +2.0] | +1.3 [-0.8, +3.0] |
| LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | +2.2 [-1.1, +5.1] | +1.0 [+0.0, +2.5] | +1.5 [-0.4, +3.3] |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | +1.9 [-1.5, +5.2] | +1.0 [+0.0, +2.5] | +1.2 [-0.8, +3.3] |
| Cascade: Jinx + BGE-reranker-base (stacked LR) | +1.9 [-2.6, +5.6] | +0.0 [-1.7, +2.0] | +1.1 [-1.5, +3.5] |
| Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | +1.6 [-3.3, +5.6] | +0.3 [-1.2, +2.3] | +1.0 [-1.8, +3.5] |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | +1.6 [-2.1, +5.1] | +0.6 [-0.7, +2.3] | +1.0 [-1.1, +3.3] |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | +1.6 [-1.1, +4.2] | +1.0 [+0.0, +2.5] | +1.1 [-0.6, +2.8] |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | +1.6 [-1.1, +4.2] | +0.3 [-0.8, +2.0] | +1.1 [-0.6, +2.8] |
| Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | +1.6 [-1.9, +4.6] | +0.6 [-0.7, +2.3] | +0.8 [-1.4, +2.9] |
| Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | +1.6 [-1.1, +4.2] | +0.3 [-0.8, +2.0] | +1.1 [-0.6, +2.8] |
| LLM judge Qwen2.5-7B + Jinx (avg) top-10 | +1.3 [-1.9, +4.0] | +0.6 [-0.7, +2.3] | +0.7 [-1.4, +2.6] |
| LLM judge Qwen2.5-7B + Jinx (avg) top-5 | +1.3 [-1.9, +4.0] | +1.0 [+0.0, +2.5] | +0.7 [-1.4, +2.6] |
| All signals, LR | +1.3 [-2.1, +4.4] | +1.0 [-0.4, +2.6] | +0.9 [-1.2, +2.9] |
| Jinx + MiniLM, LR (current tool) | +1.3 [-2.7, +4.7] | +1.0 [+0.0, +2.5] | +0.8 [-1.7, +2.9] |
| LLM judge Claude Haiku 4.5 re-rank top-5 | +1.0 [-2.6, +4.0] | +1.0 [+0.0, +2.5] | +1.0 [-1.1, +2.8] |
| LLM judge Qwen2.5-Coder-7B re-rank top-5 | +1.0 [-1.9, +3.8] | +1.0 [+0.0, +2.5] | +0.8 [-1.0, +2.6] |
| Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | +1.0 [-2.1, +4.1] | +0.6 [+0.0, +2.2] | +0.6 [-1.4, +2.7] |
| Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | +0.6 [-3.2, +4.3] | +1.0 [-0.5, +2.9] | +0.4 [-2.1, +2.9] |
| LLM judge Qwen2.5-14B + Jinx (avg) top-5 | +0.3 [-3.1, +3.3] | +1.0 [+0.0, +2.5] | +0.3 [-1.9, +2.3] |
| Jinx lexical, LR | +0.3 [-3.2, +3.2] | +1.0 [-0.5, +2.9] | +0.2 [-1.8, +2.1] |
| Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | +0.3 [-3.1, +3.3] | +0.6 [-0.7, +2.3] | +0.3 [-1.9, +2.3] |
| All signals, gradient boosting | +0.3 [-2.5, +3.3] | +0.0 [-1.5, +1.9] | +0.3 [-1.4, +2.2] |
| TF-IDF template-stripped | +0.0 [-2.1, +2.0] | +0.6 [-0.6, +2.4] | +0.1 [-1.0, +1.2] |
| INTRUDE + time (Wang et al. 2019), LR | +0.0 [-3.7, +3.0] | +0.6 [-1.0, +2.6] | -0.2 [-2.5, +1.8] |
| LLM judge Qwen2.5-14B + Jinx (avg) top-10 | -0.3 [-3.5, +2.7] | +0.6 [-0.7, +2.3] | -0.1 [-2.1, +1.9] |
| Jinx features, gradient boosting | -0.3 [-3.5, +2.6] | +0.3 [-0.9, +1.9] | -0.1 [-2.0, +1.7] |
| TF-IDF raw text (Li et al. 2017) | -0.3 [-2.8, +1.7] | +0.0 [-0.8, +1.0] | -0.2 [-1.4, +0.9] |
| LLM judge Qwen2.5-Coder-7B re-rank top-10 | -0.6 [-3.9, +2.8] | +0.3 [-1.1, +2.4] | -0.3 [-2.5, +1.9] |
| BGE-small template-stripped | -0.6 [-3.6, +2.2] | +0.0 [-1.4, +1.8] | -0.3 [-2.2, +1.5] |
| BGE-small raw text | -1.0 [-3.5, +1.6] | +0.3 [-1.3, +2.1] | -0.5 [-2.2, +1.1] |
| MiniLM template-stripped | -1.3 [-4.1, +1.1] | -0.6 [-1.8, +0.6] | -1.1 [-2.9, +0.5] |
| BGE-base template-stripped | -1.6 [-4.2, +1.2] | +0.0 [-1.4, +1.8] | -0.8 [-2.5, +0.9] |
| MiniLM raw text | -2.2 [-5.0, +0.3] | -1.0 [-2.1, +0.4] | -1.6 [-3.1, -0.3]* |
| RRF hybrid: BM25 + embedding | -3.2 [-6.6, -0.6]* | -0.6 [-3.2, +1.5] | -2.1 [-3.6, -0.7]* |
| LLM judge Qwen2.5-7B re-rank top-5 | -3.5 [-7.7, +0.0] | +1.0 [+0.0, +2.5] | -2.2 [-5.0, +0.1] |
| Simili-bot (bot, re-impl) | -3.5 [-6.4, -0.4]* | -0.6 [-1.8, +0.6] | -2.2 [-4.1, -0.5]* |
| Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | -4.8 [-10.2, +0.0] | +0.3 [-0.9, +2.0] | -2.7 [-6.2, +0.2] |
| RRF hybrid: BM25 + embedding + code | -5.1 [-10.5, -0.3]* | +0.3 [-1.0, +2.2] | -3.5 [-7.2, -0.3]* |
| BM25 template-stripped | -5.4 [-9.1, -2.3]* | -1.3 [-3.5, +0.0] | -3.6 [-5.5, -1.5]* |
| Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | -7.0 [-12.0, -1.6]* | -1.3 [-3.8, +1.4] | -5.0 [-8.2, -1.4]* |
| BM25 raw text | -7.3 [-11.5, -3.7]* | -1.3 [-3.5, +0.0] | -4.9 [-7.2, -2.4]* |
| PRSense (bot, re-impl) | -8.6 [-16.5, -1.6]* | -1.6 [-4.3, +1.2] | -6.2 [-12.9, -0.9]* |
| Cross-encoder ms-marco MiniLM re-rank top-10 | -9.9 [-15.8, -4.3]* | -0.6 [-2.7, +2.1] | -6.0 [-9.8, -2.3]* |
| LLM judge Qwen2.5-14B re-rank top-5 | -10.5 [-15.2, -6.5]* | +1.0 [+0.0, +2.5] | -6.2 [-9.3, -3.5]* |
| LLM judge Qwen2.5-7B re-rank top-10 | -10.9 [-16.6, -5.6]* | -3.2 [-6.1, -0.5]* | -7.7 [-11.7, -4.0]* |
| RRF hybrid: text + code + links + recency | -10.9 [-19.0, -3.2]* | -1.3 [-3.4, +1.5] | -7.4 [-13.1, -2.0]* |
| UniXcoder template-stripped text | -12.1 [-17.5, -6.6]* | -4.8 [-9.9, -0.4]* | -9.4 [-13.8, -4.9]* |
| BM25 on diff | -18.5 [-28.6, -9.7]* | -8.6 [-19.1, -0.4]* | -14.0 [-24.1, -6.2]* |
| Code overlap sum (files+hunks+lines) | -20.8 [-29.0, -12.5]* | -10.2 [-18.4, -3.1]* | -16.4 [-24.2, -9.1]* |
| Links only, no tie-break (same issue / #ref) | -22.4 [-29.1, -15.5]* | -17.3 [-24.1, -9.7]* | -20.4 [-26.2, -13.9]* |
| LLM judge Qwen2.5-1.5B re-rank top-5 | -23.0 [-28.2, -18.1]* | +1.0 [+0.0, +2.5] | -13.7 [-16.7, -10.4]* |
| Jina code embeddings v2 on diff | -23.6 [-32.0, -13.9]* | -13.4 [-22.8, -3.7]* | -18.5 [-26.5, -9.6]* |
| BGE-small on diff | -24.3 [-33.4, -13.5]* | -14.4 [-23.0, -5.5]* | -19.9 [-28.2, -10.2]* |
| Changed-files Jaccard | -24.9 [-33.3, -16.8]* | -12.5 [-22.6, -4.6]* | -19.4 [-27.7, -12.4]* |
| Hunk overlap | -25.2 [-33.2, -16.5]* | -11.2 [-18.6, -3.9]* | -19.9 [-26.9, -12.5]* |
| MiniLM on diff | -26.8 [-36.4, -16.7]* | -15.3 [-24.0, -5.4]* | -21.9 [-30.4, -12.3]* |
| UniXcoder (code model) on diff | -27.5 [-37.1, -16.4]* | -17.3 [-27.9, -5.2]* | -23.0 [-32.4, -12.3]* |
| Identical changed lines | -28.4 [-34.9, -20.2]* | -17.9 [-25.5, -9.0]* | -23.9 [-30.0, -16.3]* |
| Cross-encoder BGE-reranker-base re-rank top-10 | -29.7 [-37.6, -22.5]* | -3.5 [-6.0, -1.3]* | -19.7 [-25.1, -14.8]* |
| LLM judge Qwen2.5-14B re-rank top-10 | -31.0 [-39.8, -20.9]* | -6.4 [-10.2, -2.3]* | -20.5 [-26.6, -13.5]* |
| LLM judge Qwen2.5-1.5B re-rank top-10 | -31.3 [-37.5, -24.4]* | -4.2 [-7.2, -1.0]* | -19.9 [-23.8, -15.6]* |
| CodeBERT (mean-pooled) on diff | -38.7 [-47.9, -27.4]* | -29.1 [-41.4, -14.3]* | -33.8 [-44.0, -21.6]* |
| Recency only (newest open PR first) | -61.7 [-69.0, -51.7]* | -38.3 [-51.3, -22.1]* | -50.9 [-59.5, -39.2]* |

## 7. False alarms and operating curve

Threshold per fold = median top-1 score of the training folds' cross-author duplicates; alert if the top-1 score is above it. 2,965 PRs with no duplicate.

| Strategy | False-alarm rate [95% CI] | cross-author correct alerts |
|---|---|---|
| LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | 0.5% [0.2, 0.8] | 50.8% |
| Jinx features, gradient boosting | 1.1% [0.7, 1.6] | 41.5% |
| Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 1.2% [0.7, 1.7] | 48.9% |
| Links only (same issue / #ref) | 1.2% [0.7, 1.7] | 47.0% |
| LLM judge Claude Haiku 4.5 re-rank top-5 | 1.2% [0.7, 1.7] | 61.7% |
| Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 1.3% [0.8, 1.8] | 45.0% |
| Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | 1.3% [0.8, 1.8] | 50.2% |
| Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | 1.4% [0.9, 1.9] | 47.6% |
| LLM judge Qwen2.5-14B + Jinx (avg) top-5 | 1.4% [0.9, 2.1] | 49.2% |
| Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | 1.4% [0.9, 2.0] | 47.9% |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | 1.4% [1.0, 2.0] | 47.6% |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | 1.4% [1.0, 2.0] | 47.6% |
| LLM judge Qwen2.5-7B + Jinx (avg) top-5 | 1.5% [1.0, 2.1] | 48.9% |
| Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | 1.5% [1.0, 2.1] | 45.0% |
| LLM judge Qwen2.5-7B + Jinx (avg) top-10 | 1.5% [1.0, 2.1] | 48.9% |
| LLM judge Qwen2.5-14B + Jinx (avg) top-10 | 1.6% [1.0, 2.4] | 48.6% |
| LLM judge Qwen2.5-7B re-rank top-10 | 1.6% [1.0, 2.2] | 46.6% |
| All signals, LR | 1.6% [1.1, 2.2] | 45.4% |
| LLM judge Qwen2.5-7B re-rank top-5 | 1.6% [1.0, 2.2] | 46.6% |
| LLM judge Qwen2.5-Coder-7B re-rank top-10 | 1.8% [1.2, 2.3] | 47.9% |
| LLM judge Qwen2.5-Coder-7B re-rank top-5 | 1.8% [1.2, 2.3] | 48.2% |
| Jinx + MiniLM, LR (current tool) | 1.8% [1.2, 2.5] | 46.0% |
| All signals, gradient boosting | 1.9% [1.3, 2.7] | 45.4% |
| Jinx lexical, LR | 1.9% [1.3, 2.7] | 47.3% |
| INTRUDE + time (Wang et al. 2019), LR | 2.0% [1.3, 3.0] | 47.3% |
| BGE-small template-stripped | 2.3% [1.5, 3.3] | 46.0% |
| BGE-small raw text | 2.3% [1.6, 3.3] | 45.4% |
| Links only, no tie-break (same issue / #ref) | 2.3% [1.7, 3.1] | 61.0% |
| Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | 2.6% [1.9, 3.3] | 48.9% |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | 2.8% [2.0, 3.8] | 49.2% |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | 2.8% [2.0, 3.8] | 49.2% |
| Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | 2.9% [2.0, 4.1] | 44.7% |
| BGE-base template-stripped | 2.9% [2.0, 4.3] | 46.3% |
| TF-IDF template-stripped | 3.1% [2.3, 4.2] | 46.3% |
| TF-IDF raw text (Li et al. 2017) | 3.5% [2.5, 4.8] | 47.0% |
| Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 3.8% [2.8, 5.1] | 47.6% |
| Cascade: Jinx + BGE-reranker-base (stacked LR) | 4.1% [3.2, 5.3] | 50.5% |
| Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | 4.2% [3.2, 5.2] | 47.3% |
| Simili-bot (bot, re-impl) | 4.5% [3.2, 6.2] | 46.6% |
| MiniLM template-stripped | 4.6% [3.1, 6.4] | 47.6% |
| MiniLM raw text | 4.6% [3.3, 6.4] | 47.3% |
| Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | 4.7% [3.7, 5.7] | 49.2% |
| PRSense (bot, re-impl) | 4.7% [3.5, 6.0] | 41.9% |
| LLM judge Qwen2.5-14B re-rank top-5 | 4.7% [3.4, 6.0] | 44.7% |
| contrib-guard/phoenix (bot, exact port) | 5.5% [4.0, 7.0] | 46.3% |
| Cross-encoder ms-marco MiniLM re-rank top-10 | 6.0% [4.7, 7.8] | 44.7% |
| BGE-small on diff | 6.0% [4.1, 8.2] | 38.7% |
| Jina code embeddings v2 on diff | 7.0% [4.6, 9.8] | 40.6% |
| MiniLM on diff | 8.9% [6.4, 11.4] | 39.0% |
| UniXcoder (code model) on diff | 9.0% [6.8, 11.3] | 37.7% |
| BM25 on diff | 10.1% [7.9, 12.4] | 38.3% |
| BM25 template-stripped | 10.8% [7.3, 14.4] | 43.8% |
| Changed-files Jaccard | 12.3% [9.5, 15.1] | 37.7% |
| CodeBERT (mean-pooled) on diff | 13.3% [11.1, 15.5] | 32.9% |
| BM25 raw text | 13.4% [8.9, 17.9] | 43.5% |
| LLM judge Qwen2.5-14B re-rank top-10 | 13.4% [9.7, 17.8] | 26.8% |
| UniXcoder template-stripped text | 14.2% [10.9, 18.4] | 42.8% |
| LLM judge Qwen2.5-1.5B re-rank top-5 | 18.4% [15.1, 21.8] | 36.7% |
| LLM judge Qwen2.5-1.5B re-rank top-10 | 18.8% [15.1, 22.6] | 31.9% |
| RRF hybrid: BM25 + embedding + code | 22.8% [20.2, 25.7] | 54.0% |
| Code overlap sum (files+hunks+lines) | 23.9% [19.3, 28.8] | 33.5% |
| Hunk overlap | 26.6% [22.3, 30.8] | 32.6% |
| Identical changed lines | 33.8% [29.0, 38.4] | 30.4% |
| Cross-encoder BGE-reranker-base re-rank top-10 | 36.2% [33.0, 38.8] | 29.4% |
| Recency only (newest open PR first) | 46.6% [38.3, 54.5] | 7.7% |
| RRF hybrid: BM25 + embedding | 48.7% [46.0, 51.7] | 76.0% |
| RRF hybrid: text + code + links + recency | 53.0% [46.6, 59.3] | 48.2% |

Share of cross-author duplicates caught with the right top-1 when the threshold is set to give a fixed false-alarm rate:

| Strategy | FAR 1% | FAR 2% | FAR 5% | FAR 10% | FAR 20% |
|---|---|---|---|---|---|
| BM25 raw text | 1.3% | 2.3% | 5.9% | 10.1% | 20.7% |
| Code overlap sum (files+hunks+lines) | 1.0% | 2.2% | 5.6% | 10.2% | 20.1% |
| BM25 template-stripped | 1.3% | 2.4% | 5.5% | 10.0% | 20.3% |
| Jina code embeddings v2 on diff | 1.1% | 2.6% | 5.4% | 9.9% | 20.4% |
| UniXcoder template-stripped text | 1.1% | 2.1% | 5.3% | 9.9% | 19.9% |
| UniXcoder (code model) on diff | 1.2% | 2.3% | 5.3% | 9.9% | 19.9% |
| Changed-files Jaccard | 0.0% | 1.9% | 5.2% | 10.0% | 19.8% |
| PRSense (bot, re-impl) | 1.0% | 2.1% | 5.2% | 10.0% | 20.1% |
| MiniLM template-stripped | 1.1% | 2.1% | 5.2% | 10.0% | 19.8% |
| LLM judge Qwen2.5-14B re-rank top-10 | 1.0% | 2.0% | 5.2% | 9.8% | 20.1% |
| All signals, gradient boosting | 1.1% | 2.0% | 5.1% | 10.0% | 20.1% |
| BM25 on diff | 1.3% | 2.3% | 5.1% | 10.3% | 20.0% |
| Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 1.0% | 2.1% | 5.1% | 9.9% | 20.1% |
| Recency only (newest open PR first) | 0.9% | 1.9% | 5.1% | 9.9% | 20.7% |
| Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | 1.1% | 2.0% | 5.1% | 10.0% | 20.4% |
| Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | 1.0% | 2.0% | 5.1% | 9.8% | 20.0% |
| BGE-small raw text | 1.0% | 2.0% | 5.1% | 10.1% | 20.0% |
| Links only (same issue / #ref) | 1.0% | 2.1% | 5.1% | 9.6% | 20.1% |
| Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | 1.2% | 1.9% | 5.1% | 10.1% | 20.1% |
| LLM judge Qwen2.5-7B + Jinx (avg) top-5 | 1.1% | 1.9% | 5.1% | 9.9% | 20.3% |
| Cross-encoder BGE-reranker-base re-rank top-10 | 1.0% | 1.9% | 5.1% | 10.1% | 20.1% |
| LLM judge Qwen2.5-Coder-7B re-rank top-10 | 1.0% | 2.0% | 5.1% | 10.2% | 19.8% |
| LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | 1.0% | 2.0% | 5.0% | 10.1% | 20.1% |
| LLM judge Qwen2.5-1.5B re-rank top-5 | 1.1% | 2.1% | 5.0% | 10.2% | 19.8% |
| LLM judge Qwen2.5-14B re-rank top-5 | 1.1% | 1.9% | 5.0% | 9.5% | 9.5% |
| LLM judge Qwen2.5-7B + Jinx (avg) top-10 | 1.1% | 2.0% | 5.0% | 9.9% | 20.4% |
| LLM judge Qwen2.5-7B re-rank top-10 | 1.1% | 2.0% | 5.0% | 10.2% | 20.3% |
| Jinx lexical, LR | 1.2% | 1.9% | 5.0% | 9.9% | 20.5% |
| Cross-encoder ms-marco MiniLM re-rank top-10 | 1.0% | 2.0% | 5.0% | 9.9% | 20.0% |
| MiniLM on diff | 1.3% | 2.9% | 5.0% | 9.9% | 19.9% |
| INTRUDE + time (Wang et al. 2019), LR | 1.2% | 1.9% | 5.0% | 10.0% | 20.7% |
| MiniLM raw text | 1.2% | 2.2% | 5.0% | 9.9% | 19.9% |
| BGE-small template-stripped | 1.0% | 2.0% | 5.0% | 10.0% | 19.8% |
| LLM judge Qwen2.5-14B + Jinx (avg) top-5 | 1.2% | 2.1% | 5.0% | 10.0% | 20.5% |
| LLM judge Qwen2.5-7B re-rank top-5 | 1.1% | 2.0% | 5.0% | 10.1% | 19.7% |
| Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | 1.1% | 2.5% | 5.0% | 9.9% | 20.3% |
| TF-IDF template-stripped | 1.0% | 2.0% | 5.0% | 9.8% | 20.0% |
| Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | 2.0% | 2.2% | 5.0% | 9.7% | 20.4% |
| TF-IDF raw text (Li et al. 2017) | 1.0% | 2.1% | 5.0% | 9.7% | 19.9% |
| Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 1.1% | 2.0% | 5.0% | 9.9% | 19.9% |
| LLM judge Qwen2.5-Coder-7B re-rank top-5 | 1.0% | 2.0% | 5.0% | 10.1% | 20.1% |
| Jinx + MiniLM, LR (current tool) | 1.0% | 2.1% | 5.0% | 10.0% | 20.5% |
| LLM judge Qwen2.5-1.5B re-rank top-10 | 1.1% | 2.0% | 5.0% | 10.2% | 20.2% |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | 1.1% | 2.0% | 5.0% | 10.1% | 20.3% |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | 1.1% | 2.0% | 5.0% | 10.1% | 20.3% |
| Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 1.0% | 2.0% | 5.0% | 9.9% | 20.0% |
| Jinx features, gradient boosting | 1.0% | 2.1% | 5.0% | 9.8% | 20.3% |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | 1.0% | 2.0% | 5.0% | 9.9% | 20.4% |
| All signals, LR | 1.0% | 2.1% | 4.9% | 10.1% | 20.6% |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | 1.0% | 2.0% | 4.9% | 9.9% | 20.4% |
| Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | 1.0% | 2.0% | 4.9% | 10.0% | 20.3% |
| BGE-small on diff | 1.3% | 2.6% | 4.9% | 10.0% | 19.9% |
| CodeBERT (mean-pooled) on diff | 1.4% | 2.2% | 4.9% | 9.9% | 20.0% |
| BGE-base template-stripped | 1.0% | 2.0% | 4.9% | 10.3% | 19.9% |
| Cascade: Jinx + BGE-reranker-base (stacked LR) | 1.0% | 2.1% | 4.9% | 9.9% | 20.4% |
| Simili-bot (bot, re-impl) | 1.0% | 2.1% | 4.9% | 10.0% | 19.7% |
| contrib-guard/phoenix (bot, exact port) | 1.0% | 2.1% | 4.9% | 10.1% | 19.9% |
| Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | 1.0% | 2.1% | 4.9% | 10.0% | 19.8% |
| LLM judge Qwen2.5-14B + Jinx (avg) top-10 | 1.0% | 2.1% | 4.8% | 9.9% | 20.5% |
| Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | 1.0% | 2.9% | 4.7% | 9.8% | 20.3% |
| LLM judge Claude Haiku 4.5 re-rank top-5 | 0.0% | 1.6% | 2.9% | 2.9% | 12.1% |
| Links only, no tie-break (same issue / #ref) | 0.0% | 0.0% | 2.3% | 2.3% | 2.3% |
| RRF hybrid: BM25 + embedding | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% |
| RRF hybrid: text + code + links + recency | 0.0% | 0.0% | 0.0% | 0.0% | 19.4% |
| Hunk overlap | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% |
| Identical changed lines | 0.0% | 0.0% | 0.0% | 0.0% | 7.1% |
| RRF hybrid: BM25 + embedding + code | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% |

## 8. Random-pair (classic) evaluation vs live queue

Random-pair AUC = can the method tell the true duplicate from one random other PR in the queue. Live queue = must rank it first among all open PRs.

| Strategy | random-pair AUC | AUC rank | live-queue cross-author R@1 | live rank |
|---|---|---|---|---|
| All signals, LR | 0.986 | 1 | 0.927 | 14 |
| Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | 0.981 | 2 | 0.923 | 18 |
| LLM judge Qwen2.5-14B + Jinx (avg) top-10 | 0.980 | 3 | 0.911 | 29 |
| LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | 0.980 | 3 | 0.936 | 2 |
| LLM judge Qwen2.5-14B + Jinx (avg) top-5 | 0.979 | 5 | 0.917 | 22 |
| Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 0.979 | 6 | 0.936 | 2 |
| Jinx + MiniLM, LR (current tool) | 0.979 | 7 | 0.927 | 14 |
| Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | 0.979 | 8 | 0.917 | 22 |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | 0.978 | 9 | 0.930 | 8 |
| Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 0.977 | 10 | 0.942 | 1 |
| LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | 0.977 | 11 | 0.933 | 6 |
| Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | 0.977 | 12 | 0.930 | 8 |
| All signals, gradient boosting | 0.977 | 13 | 0.917 | 22 |
| Cascade: Jinx + BGE-reranker-base (stacked LR) | 0.976 | 14 | 0.933 | 6 |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | 0.976 | 15 | 0.930 | 8 |
| Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | 0.976 | 16 | 0.930 | 8 |
| LLM judge Qwen2.5-7B + Jinx (avg) top-10 | 0.976 | 17 | 0.927 | 14 |
| Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 0.976 | 18 | 0.920 | 21 |
| LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | 0.975 | 19 | 0.930 | 8 |
| Jinx lexical, LR | 0.975 | 20 | 0.917 | 22 |
| Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | 0.975 | 21 | 0.930 | 8 |
| LLM judge Qwen2.5-7B + Jinx (avg) top-5 | 0.975 | 22 | 0.927 | 14 |
| Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | 0.974 | 23 | 0.936 | 2 |
| INTRUDE + time (Wang et al. 2019), LR | 0.974 | 24 | 0.914 | 26 |
| LLM judge Claude Haiku 4.5 re-rank top-5 | 0.972 | 25 | 0.923 | 18 |
| LLM judge Qwen2.5-Coder-7B re-rank top-5 | 0.971 | 26 | 0.923 | 18 |
| Jinx features, gradient boosting | 0.970 | 27 | 0.911 | 29 |
| LLM judge Qwen2.5-Coder-7B re-rank top-10 | 0.970 | 28 | 0.907 | 32 |
| Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | 0.968 | 29 | 0.866 | 41 |
| Links only (same issue / #ref) | 0.965 | 30 | 0.936 | 2 |
| LLM judge Qwen2.5-7B re-rank top-5 | 0.960 | 31 | 0.879 | 39 |
| Simili-bot (bot, re-impl) | 0.957 | 32 | 0.879 | 39 |
| Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | 0.957 | 33 | 0.843 | 44 |
| BGE-base template-stripped | 0.956 | 34 | 0.898 | 36 |
| BGE-small template-stripped | 0.956 | 35 | 0.907 | 32 |
| MiniLM raw text | 0.955 | 36 | 0.891 | 37 |
| BGE-small raw text | 0.955 | 37 | 0.904 | 34 |
| MiniLM template-stripped | 0.955 | 38 | 0.901 | 35 |
| TF-IDF template-stripped | 0.953 | 39 | 0.914 | 26 |
| RRF hybrid: BM25 + embedding | 0.951 | 40 | 0.882 | 38 |
| LLM judge Qwen2.5-14B re-rank top-5 | 0.950 | 41 | 0.808 | 48 |
| TF-IDF raw text (Li et al. 2017) | 0.950 | 42 | 0.911 | 29 |
| contrib-guard/phoenix (bot, exact port) | 0.948 | 43 | 0.914 | 26 |
| LLM judge Qwen2.5-7B re-rank top-10 | 0.946 | 44 | 0.805 | 49 |
| PRSense (bot, re-impl) | 0.942 | 45 | 0.827 | 46 |
| Cross-encoder ms-marco MiniLM re-rank top-10 | 0.924 | 46 | 0.815 | 47 |
| LLM judge Qwen2.5-14B re-rank top-10 | 0.923 | 47 | 0.604 | 64 |
| RRF hybrid: BM25 + embedding + code | 0.921 | 48 | 0.863 | 42 |
| LLM judge Qwen2.5-1.5B re-rank top-5 | 0.897 | 49 | 0.684 | 55 |
| Code overlap sum (files+hunks+lines) | 0.873 | 50 | 0.706 | 53 |
| LLM judge Qwen2.5-1.5B re-rank top-10 | 0.866 | 51 | 0.601 | 65 |
| Changed-files Jaccard | 0.858 | 52 | 0.665 | 58 |
| BM25 template-stripped | 0.855 | 53 | 0.859 | 43 |
| Hunk overlap | 0.854 | 54 | 0.661 | 59 |
| BM25 raw text | 0.844 | 55 | 0.840 | 45 |
| BM25 on diff | 0.842 | 56 | 0.728 | 52 |
| Jina code embeddings v2 on diff | 0.839 | 57 | 0.677 | 56 |
| RRF hybrid: text + code + links + recency | 0.832 | 58 | 0.805 | 49 |
| BGE-small on diff | 0.831 | 59 | 0.671 | 57 |
| Cross-encoder BGE-reranker-base re-rank top-10 | 0.830 | 60 | 0.617 | 63 |
| UniXcoder template-stripped text | 0.828 | 61 | 0.792 | 51 |
| Links only, no tie-break (same issue / #ref) | 0.810 | 62 | 0.690 | 54 |
| Identical changed lines | 0.808 | 63 | 0.629 | 62 |
| MiniLM on diff | 0.803 | 64 | 0.645 | 60 |
| UniXcoder (code model) on diff | 0.774 | 65 | 0.639 | 61 |
| CodeBERT (mean-pooled) on diff | 0.666 | 66 | 0.527 | 66 |
| Recency only (newest open PR first) | 0.578 | 67 | 0.297 | 67 |

## 9. Latency and cost

| Component | Hardware | Numbers |
|---|---|---|
| lexical features ms/query | CPU | {"median": 4.3549504928342335, "p90": 43.002333160116265} |
| cpu_rerankers | CPU | {"cross-encoder/ms-marco-MiniLM-L6-v2": {"cpu_threads": 4, "pairs": 200, "ms_per_pair": 45.7, "ms_per_query_top10": 457.5}, "BAAI/bge-reranker-base": {"cpu_threads": 4, "pairs": 200, "ms_per_pair": 286.1, "ms_per_query_top10": 2861.4}} |
| gpu_bge_diff | L4 | {"tag": "bge_diff", "model": "BAAI/bge-small-en-v1.5", "variant": "diff", "maxlen": 512, "n": 76209, "dim": 384, "gpu": "L4", "seconds": 144.0, "ms_per_pr_gpu": 1.89} |
| gpu_bge_raw | L4 | {"tag": "bge_raw", "model": "BAAI/bge-small-en-v1.5", "variant": "raw", "maxlen": 512, "n": 76209, "dim": 384, "gpu": "L4", "seconds": 125.0, "ms_per_pr_gpu": 1.64} |
| gpu_bge_stripped | L4 | {"tag": "bge_stripped", "model": "BAAI/bge-small-en-v1.5", "variant": "stripped", "maxlen": 512, "n": 76209, "dim": 384, "gpu": "L4", "seconds": 120.7, "ms_per_pr_gpu": 1.583} |
| gpu_bgebase_stripped | L4 | {"tag": "bgebase_stripped", "model": "BAAI/bge-base-en-v1.5", "variant": "stripped", "maxlen": 512, "n": 76209, "dim": 768, "gpu": "L4", "seconds": 244.3, "ms_per_pr_gpu": 3.205} |
| gpu_ce_bgebase | L4 | {"tag": "ce_bgebase", "model": "BAAI/bge-reranker-base", "pairs": 43591, "gpu": "L4", "seconds": 137.5, "ms_per_pair_gpu": 3.154} |
| gpu_ce_bgem3 | L4 | {"tag": "ce_bgem3", "model": "BAAI/bge-reranker-v2-m3", "pairs": 43591, "gpu": "L4", "seconds": 445.7, "ms_per_pair_gpu": 10.224} |
| gpu_ce_msmarco | L4 | {"tag": "ce_msmarco", "model": "cross-encoder/ms-marco-MiniLM-L6-v2", "pairs": 43591, "gpu": "L4", "seconds": 41.6, "ms_per_pair_gpu": 0.954} |
| gpu_codebert_diff | L4 | {"tag": "codebert_diff", "model": "microsoft/codebert-base", "variant": "diff", "maxlen": 512, "n": 76209, "dim": 768, "gpu": "L4", "seconds": 262.1, "ms_per_pr_gpu": 3.44} |
| gpu_finetune_bgebase | L4 | {"gpu": "L4", "folds": [{"fold": 0, "base": "BAAI/bge-reranker-base", "train_pairs": 34896, "test_pairs": 8695, "train_s": 678.1, "predict_s": 121.0}, {"fold": 1, "base": "BAAI/bge-reranker-base", "train_pairs": 34892, "test_pairs": 8699, "train_s": 668.5, "predict_s": 120.4}, {"fold": 2, "base": "BAAI/bge-reranker-base", "train_pairs": 34821, "test_pairs": 8770, "train_s": 668.3, "predict_s": 121.9}, {"fold": 3, "base": "BAAI/bge-reranker-base", "train_pairs": 34868, "test_pairs": 8723, "train_s": 668.1, "predict_s": 118.9}, {"fold": 4, "base": "BAAI/bge-reranker-base", "train_pairs": 34887, "test_pairs": 8704, "train_s": 674.0, "predict_s": 121.1}], "train_s_total": 3357.0, "predict_ms_per_pair_gpu": 13.84} |
| gpu_jinacode_diff | L4 | {"tag": "jinacode_diff", "model": "jinaai/jina-embeddings-v2-base-code", "variant": "diff", "maxlen": 512, "n": 76209, "dim": 768, "gpu": "L4", "seconds": 620.2, "ms_per_pr_gpu": 8.138} |
| gpu_qwen14 | L40S | {"tag": "qwen14", "model": "Qwen/Qwen2.5-14B-Instruct", "pairs": 43591, "gpu": "L40S", "seconds": 5187.5, "ms_per_pair_gpu_batched": 119.003, "prompt_tokens_total": 49530439} |
| gpu_qwen15 | L40S | {"tag": "qwen15", "model": "Qwen/Qwen2.5-1.5B-Instruct", "pairs": 43591, "gpu": "L40S", "seconds": 687.2, "ms_per_pair_gpu_batched": 15.766, "prompt_tokens_total": 49530439} |
| gpu_qwen7 | L40S | {"tag": "qwen7", "model": "Qwen/Qwen2.5-7B-Instruct", "pairs": 43591, "gpu": "L40S", "seconds": 2567.3, "ms_per_pair_gpu_batched": 58.895, "prompt_tokens_total": 49530439} |
| gpu_qwencoder7 | L40S | {"tag": "qwencoder7", "model": "Qwen/Qwen2.5-Coder-7B-Instruct", "pairs": 43591, "gpu": "L40S", "seconds": 2478.3, "ms_per_pair_gpu_batched": 56.854, "prompt_tokens_total": 49530439} |
| gpu_unix_diff | L4 | {"tag": "unix_diff", "model": "microsoft/unixcoder-base", "variant": "diff", "maxlen": 512, "n": 76209, "dim": 768, "gpu": "L4", "seconds": 284.0, "ms_per_pr_gpu": 3.727} |
| gpu_unix_stripped | L4 | {"tag": "unix_stripped", "model": "microsoft/unixcoder-base", "variant": "stripped", "maxlen": 512, "n": 76209, "dim": 768, "gpu": "L4", "seconds": 247.7, "ms_per_pr_gpu": 3.251} |
| claude haiku45 API |  | {"pairs": 4587, "ms/pair median": 912.8988000011304, "ms/pair p90": 977.3896139959106, "model": "claude-haiku-4-5", "usd": 7.252751, "budget": 15.0} |

Modal billing for app `agentdup-study`: {"source": "modal billing report --start 2026-11-10 -r h --show-resources, app agentdup-study, hours up to 2026-11-10T23:00Z. The 00:00Z hour (end of the Qwen2.5-14B run, roughly 0.75 h of L40S, about $1.5) had not posted when this was written.", "by_resource_usd": {"Network Egress": 0.077, "Memory": 0.312, "L40S": 4.82, "CPU": 0.28, "L4": 1.401}, "total_usd": 6.89}

## 10. Error analysis (current Jinx tool, cross-author pairs it does not rank first)

23 of 313 cross-author queries are missed at rank 1.

| By class | misses |
|---|---|
| B. partial code overlap | 10 |
| D. no shared files (intent-level) | 7 |
| A. code twin (>=50% identical changed lines) | 3 |
| C. same files, different code | 3 |

Top-1 was a PR by the *same author as the new PR* in 48% of misses (the author's own other open work). Median queue size of misses: 21. Full list: `experiments/results/errors_cross_author.csv`.

## 11. Limitations

- Silver labels from comments; no new human labels. The 142 hand-labelled duplicates in the 600-PR AIDev sample have no partner PR and could not be used for ranking.
- Agent-vs-human duplicates are not covered.
- PRSense, Simili, vector-triage and PRism are local re-implementations with free models (their shipped versions need OpenAI/Gemini/GitHub Models keys). contrib-guard (phoenix) is an exact port.
- LLM judges and re-rankers only see Jinx's top-k, so their Recall@k is capped by Jinx's Recall@k. Claude Haiku was run on cross-author + negative queries only (budget).
- Commercial review tools (CodeRabbit, Copilot review, Qodo, Greptile, ...) were compared from their documentation only, not run.
- Jev (TypeSafe System One) was not evaluated.

## 12. Reproduce

```bash
cd experiments/bench_v2
python3 bm25_feats.py            # BM25 features
bash run_embeds.sh               # CPU MiniLM embeddings (or Modal below)
modal run ../modal/gpu_jobs.py::embed_all
modal run ../modal/gpu_jobs.py::rerank_all
modal run ../modal/gpu_jobs.py::judge --model Qwen/Qwen2.5-1.5B-Instruct --tag qwen15
modal run ../modal/gpu_jobs.py::judge --model Qwen/Qwen2.5-7B-Instruct --tag qwen7
modal run ../modal/gpu_jobs.py::judge --model Qwen/Qwen2.5-Coder-7B-Instruct --tag qwencoder7
modal run ../modal/gpu_jobs.py::judge --model Qwen/Qwen2.5-14B-Instruct --tag qwen14
modal run ../modal/gpu_jobs.py::finetune_all
ANTHROPIC_API_KEY=... python3 claude_judge.py   # budget-capped
NB=2000 python3 eval2.py
python3 ../report/make_report.py && python3 ../report/make_tables.py
```

Full per-group tables for every strategy: `tables.md`. Raw per-query ranks: `experiments/results/ranks.parquet`.
