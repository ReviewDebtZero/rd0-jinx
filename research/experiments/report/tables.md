**cross-author** (n = 313)

| Family | Strategy | Recall@1 [95% CI] | Recall@5 [95% CI] | MRR [95% CI] |
|---|---|---|---|---|
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 0.942 [0.91, 0.97] | 0.984 [0.97, 1.00] | 0.962 [0.94, 0.98] |
| 9 LLM judge on top-k | LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | 0.936 [0.91, 0.96] | 0.990 [0.98, 1.00] | 0.961 [0.94, 0.98] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 0.936 [0.90, 0.97] | 0.984 [0.97, 1.00] | 0.959 [0.94, 0.98] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | 0.936 [0.90, 0.97] | 0.978 [0.96, 0.99] | 0.958 [0.93, 0.98] |
| 3 links | Links only (same issue / #ref) | 0.936 [0.90, 0.97] | 0.978 [0.96, 1.00] | 0.957 [0.93, 0.98] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | 0.933 [0.90, 0.96] | 0.990 [0.98, 1.00] | 0.959 [0.94, 0.98] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker-base (stacked LR) | 0.933 [0.90, 0.96] | 0.981 [0.97, 1.00] | 0.958 [0.93, 0.98] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | 0.930 [0.90, 0.96] | 0.990 [0.98, 1.00] | 0.958 [0.94, 0.98] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | 0.930 [0.90, 0.96] | 0.984 [0.97, 1.00] | 0.957 [0.94, 0.98] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | 0.930 [0.90, 0.96] | 0.984 [0.97, 1.00] | 0.957 [0.94, 0.98] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | 0.930 [0.89, 0.96] | 0.984 [0.97, 1.00] | 0.957 [0.93, 0.98] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | 0.930 [0.89, 0.96] | 0.987 [0.98, 1.00] | 0.957 [0.93, 0.98] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | 0.930 [0.90, 0.96] | 0.987 [0.98, 1.00] | 0.955 [0.93, 0.97] |
| 7 supervised | All signals, LR | 0.927 [0.89, 0.96] | 0.990 [0.98, 1.00] | 0.955 [0.93, 0.98] |
| 7 supervised | Jinx + MiniLM, LR (current tool) | 0.927 [0.89, 0.96] | 0.990 [0.98, 1.00] | 0.954 [0.93, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-5 | 0.927 [0.90, 0.95] | 0.990 [0.98, 1.00] | 0.953 [0.93, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-10 | 0.927 [0.90, 0.95] | 0.987 [0.98, 1.00] | 0.953 [0.93, 0.97] |
| 9 LLM judge on top-k | LLM judge Claude Haiku 4.5 re-rank top-5 | 0.923 [0.90, 0.95] | 0.990 [0.98, 1.00] | 0.956 [0.94, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-5 | 0.923 [0.89, 0.96] | 0.990 [0.98, 1.00] | 0.954 [0.93, 0.98] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | 0.923 [0.89, 0.96] | 0.987 [0.97, 1.00] | 0.953 [0.93, 0.97] |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 0.920 [0.88, 0.96] | 0.990 [0.98, 1.00] | 0.951 [0.93, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-5 | 0.917 [0.88, 0.95] | 0.990 [0.98, 1.00] | 0.949 [0.93, 0.97] |
| 7 supervised | All signals, gradient boosting | 0.917 [0.89, 0.96] | 0.981 [0.97, 1.00] | 0.949 [0.93, 0.97] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | 0.917 [0.88, 0.95] | 0.987 [0.98, 1.00] | 0.949 [0.93, 0.97] |
| 7 supervised | Jinx lexical, LR | 0.917 [0.88, 0.95] | 0.990 [0.98, 1.00] | 0.949 [0.92, 0.97] |
| 1 lexical | TF-IDF template-stripped | 0.914 [0.88, 0.95] | 0.987 [0.98, 1.00] | 0.947 [0.93, 0.97] |
| 5 existing bot | contrib-guard/phoenix (bot, exact port) | 0.914 [0.88, 0.95] | 0.981 [0.96, 1.00] | 0.947 [0.93, 0.97] |
| 7 supervised | INTRUDE + time (Wang et al. 2019), LR | 0.914 [0.88, 0.95] | 0.987 [0.98, 1.00] | 0.945 [0.92, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-10 | 0.911 [0.88, 0.95] | 0.987 [0.98, 1.00] | 0.946 [0.92, 0.97] |
| 7 supervised | Jinx features, gradient boosting | 0.911 [0.88, 0.95] | 0.984 [0.97, 1.00] | 0.945 [0.92, 0.97] |
| 1 lexical | TF-IDF raw text (Li et al. 2017) | 0.911 [0.88, 0.94] | 0.981 [0.96, 1.00] | 0.945 [0.93, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-10 | 0.907 [0.87, 0.94] | 0.984 [0.97, 1.00] | 0.944 [0.92, 0.97] |
| 4 embedding | BGE-small template-stripped | 0.907 [0.88, 0.94] | 0.981 [0.97, 1.00] | 0.944 [0.92, 0.97] |
| 4 embedding | BGE-small raw text | 0.904 [0.87, 0.94] | 0.984 [0.97, 1.00] | 0.942 [0.92, 0.97] |
| 4 embedding | MiniLM template-stripped | 0.901 [0.87, 0.94] | 0.974 [0.96, 0.99] | 0.935 [0.92, 0.96] |
| 4 embedding | BGE-base template-stripped | 0.898 [0.87, 0.94] | 0.981 [0.97, 1.00] | 0.938 [0.92, 0.96] |
| 4 embedding | MiniLM raw text | 0.891 [0.86, 0.93] | 0.971 [0.95, 0.99] | 0.930 [0.91, 0.95] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding | 0.882 [0.85, 0.92] | 0.974 [0.95, 1.00] | 0.926 [0.90, 0.95] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-5 | 0.879 [0.84, 0.92] | 0.990 [0.98, 1.00] | 0.924 [0.90, 0.95] |
| 5 existing bot | Simili-bot (bot, re-impl) | 0.879 [0.85, 0.92] | 0.974 [0.96, 0.99] | 0.924 [0.90, 0.95] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | 0.866 [0.82, 0.91] | 0.984 [0.97, 1.00] | 0.919 [0.89, 0.95] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding + code | 0.863 [0.81, 0.92] | 0.984 [0.97, 1.00] | 0.911 [0.87, 0.95] |
| 1 lexical | BM25 template-stripped | 0.859 [0.82, 0.90] | 0.968 [0.94, 1.00] | 0.911 [0.88, 0.94] |
| 10 stacked cascade (ours) | Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | 0.843 [0.79, 0.90] | 0.968 [0.94, 1.00] | 0.897 [0.86, 0.94] |
| 1 lexical | BM25 raw text | 0.840 [0.79, 0.89] | 0.968 [0.94, 1.00] | 0.898 [0.87, 0.93] |
| 5 existing bot | PRSense (bot, re-impl) | 0.827 [0.74, 0.91] | 0.965 [0.94, 0.99] | 0.885 [0.82, 0.95] |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM re-rank top-10 | 0.815 [0.76, 0.88] | 0.974 [0.96, 1.00] | 0.887 [0.85, 0.93] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-5 | 0.808 [0.77, 0.86] | 0.990 [0.98, 1.00] | 0.885 [0.86, 0.92] |
| 6 unsupervised hybrid | RRF hybrid: text + code + links + recency | 0.805 [0.72, 0.89] | 0.968 [0.95, 0.99] | 0.873 [0.81, 0.94] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-10 | 0.805 [0.75, 0.87] | 0.949 [0.92, 0.97] | 0.869 [0.83, 0.91] |
| 4 embedding | UniXcoder template-stripped text | 0.792 [0.73, 0.86] | 0.933 [0.88, 0.98] | 0.853 [0.80, 0.91] |
| 2 code | BM25 on diff | 0.728 [0.62, 0.83] | 0.895 [0.80, 0.98] | 0.806 [0.71, 0.89] |
| 2 code | Code overlap sum (files+hunks+lines) | 0.706 [0.62, 0.79] | 0.879 [0.80, 0.95] | 0.783 [0.70, 0.86] |
| 3 links | Links only, no tie-break (same issue / #ref) | 0.690 [0.62, 0.77] | 0.808 [0.73, 0.89] | 0.743 [0.67, 0.82] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-5 | 0.684 [0.64, 0.74] | 0.990 [0.98, 1.00] | 0.809 [0.78, 0.85] |
| 4 embedding | Jina code embeddings v2 on diff | 0.677 [0.58, 0.79] | 0.847 [0.75, 0.94] | 0.762 [0.68, 0.86] |
| 4 embedding | BGE-small on diff | 0.671 [0.57, 0.79] | 0.837 [0.76, 0.93] | 0.748 [0.66, 0.86] |
| 2 code | Changed-files Jaccard | 0.665 [0.58, 0.75] | 0.856 [0.76, 0.94] | 0.752 [0.67, 0.83] |
| 2 code | Hunk overlap | 0.661 [0.58, 0.75] | 0.869 [0.80, 0.94] | 0.748 [0.68, 0.83] |
| 4 embedding | MiniLM on diff | 0.645 [0.54, 0.76] | 0.827 [0.74, 0.93] | 0.728 [0.64, 0.83] |
| 4 embedding | UniXcoder (code model) on diff | 0.639 [0.53, 0.77] | 0.808 [0.70, 0.93] | 0.716 [0.61, 0.83] |
| 2 code | Identical changed lines | 0.629 [0.56, 0.72] | 0.802 [0.73, 0.89] | 0.707 [0.64, 0.80] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base re-rank top-10 | 0.617 [0.55, 0.69] | 0.946 [0.92, 0.97] | 0.749 [0.70, 0.80] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-10 | 0.604 [0.50, 0.72] | 0.917 [0.88, 0.96] | 0.741 [0.67, 0.82] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-10 | 0.601 [0.53, 0.68] | 0.939 [0.91, 0.97] | 0.747 [0.71, 0.80] |
| 4 embedding | CodeBERT (mean-pooled) on diff | 0.527 [0.42, 0.66] | 0.690 [0.56, 0.84] | 0.608 [0.50, 0.74] |
| 0 trivial | Recency only (newest open PR first) | 0.297 [0.21, 0.41] | 0.597 [0.47, 0.76] | 0.438 [0.34, 0.56] |


**all labelled** (n = 1767)

| Family | Strategy | Recall@1 [95% CI] | Recall@5 [95% CI] | MRR [95% CI] |
|---|---|---|---|---|
| 7 supervised | Jinx lexical, LR | 0.903 [0.86, 0.94] | 0.984 [0.97, 1.00] | 0.937 [0.91, 0.96] |
| 7 supervised | INTRUDE + time (Wang et al. 2019), LR | 0.903 [0.86, 0.94] | 0.981 [0.96, 0.99] | 0.936 [0.91, 0.96] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | 0.903 [0.85, 0.94] | 0.976 [0.95, 1.00] | 0.935 [0.89, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | 0.903 [0.85, 0.94] | 0.975 [0.95, 0.99] | 0.934 [0.89, 0.97] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 0.902 [0.85, 0.94] | 0.976 [0.95, 1.00] | 0.934 [0.89, 0.97] |
| 7 supervised | Jinx features, gradient boosting | 0.901 [0.87, 0.93] | 0.980 [0.96, 0.99] | 0.937 [0.91, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | 0.901 [0.85, 0.94] | 0.976 [0.95, 1.00] | 0.934 [0.89, 0.97] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 0.899 [0.84, 0.94] | 0.976 [0.95, 1.00] | 0.932 [0.89, 0.97] |
| 7 supervised | All signals, gradient boosting | 0.898 [0.86, 0.93] | 0.978 [0.96, 0.99] | 0.935 [0.91, 0.95] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | 0.898 [0.85, 0.94] | 0.974 [0.95, 0.99] | 0.932 [0.89, 0.96] |
| 7 supervised | All signals, LR | 0.898 [0.84, 0.94] | 0.980 [0.96, 0.99] | 0.933 [0.89, 0.96] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | 0.897 [0.85, 0.94] | 0.975 [0.95, 0.99] | 0.931 [0.89, 0.96] |
| 7 supervised | Jinx + MiniLM, LR (current tool) | 0.897 [0.84, 0.94] | 0.975 [0.95, 0.99] | 0.931 [0.89, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-5 | 0.896 [0.84, 0.94] | 0.975 [0.95, 0.99] | 0.930 [0.89, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-10 | 0.896 [0.84, 0.94] | 0.975 [0.95, 0.99] | 0.930 [0.89, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-5 | 0.894 [0.84, 0.94] | 0.975 [0.95, 0.99] | 0.929 [0.89, 0.96] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | 0.894 [0.84, 0.94] | 0.975 [0.95, 0.99] | 0.929 [0.89, 0.96] |
| 3 links | Links only (same issue / #ref) | 0.891 [0.86, 0.92] | 0.971 [0.95, 0.99] | 0.928 [0.90, 0.95] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | 0.891 [0.84, 0.93] | 0.975 [0.95, 1.00] | 0.928 [0.89, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | 0.891 [0.84, 0.94] | 0.975 [0.95, 0.99] | 0.927 [0.88, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | 0.890 [0.84, 0.94] | 0.973 [0.95, 0.99] | 0.926 [0.88, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-5 | 0.890 [0.84, 0.93] | 0.975 [0.95, 0.99] | 0.927 [0.89, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-10 | 0.889 [0.83, 0.93] | 0.975 [0.95, 0.99] | 0.927 [0.88, 0.96] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker-base (stacked LR) | 0.887 [0.83, 0.93] | 0.974 [0.95, 0.99] | 0.925 [0.88, 0.96] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | 0.885 [0.83, 0.93] | 0.975 [0.95, 0.99] | 0.924 [0.88, 0.96] |
| 5 existing bot | contrib-guard/phoenix (bot, exact port) | 0.885 [0.85, 0.92] | 0.965 [0.93, 0.99] | 0.921 [0.89, 0.95] |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 0.882 [0.82, 0.93] | 0.975 [0.95, 1.00] | 0.922 [0.88, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-10 | 0.875 [0.82, 0.92] | 0.973 [0.95, 0.99] | 0.916 [0.88, 0.95] |
| 1 lexical | TF-IDF template-stripped | 0.870 [0.82, 0.91] | 0.962 [0.93, 0.99] | 0.912 [0.87, 0.95] |
| 1 lexical | TF-IDF raw text (Li et al. 2017) | 0.868 [0.82, 0.91] | 0.960 [0.93, 0.99] | 0.909 [0.87, 0.94] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-5 | 0.865 [0.81, 0.91] | 0.975 [0.95, 0.99] | 0.910 [0.87, 0.94] |
| 4 embedding | BGE-base template-stripped | 0.860 [0.81, 0.90] | 0.956 [0.92, 0.98] | 0.907 [0.87, 0.94] |
| 4 embedding | BGE-small raw text | 0.856 [0.80, 0.90] | 0.956 [0.92, 0.98] | 0.900 [0.85, 0.94] |
| 4 embedding | BGE-small template-stripped | 0.852 [0.80, 0.90] | 0.956 [0.92, 0.98] | 0.898 [0.85, 0.94] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding + code | 0.850 [0.79, 0.90] | 0.954 [0.91, 0.99] | 0.895 [0.85, 0.93] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding | 0.840 [0.79, 0.88] | 0.950 [0.91, 0.98] | 0.890 [0.85, 0.93] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | 0.839 [0.78, 0.89] | 0.969 [0.95, 0.99] | 0.895 [0.85, 0.93] |
| 1 lexical | BM25 template-stripped | 0.836 [0.79, 0.88] | 0.937 [0.90, 0.97] | 0.885 [0.84, 0.92] |
| 5 existing bot | Simili-bot (bot, re-impl) | 0.836 [0.78, 0.88] | 0.950 [0.92, 0.98] | 0.885 [0.84, 0.92] |
| 4 embedding | MiniLM template-stripped | 0.835 [0.78, 0.88] | 0.943 [0.90, 0.98] | 0.884 [0.84, 0.92] |
| 4 embedding | MiniLM raw text | 0.832 [0.78, 0.88] | 0.941 [0.90, 0.98] | 0.882 [0.83, 0.92] |
| 10 stacked cascade (ours) | Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | 0.831 [0.78, 0.88] | 0.968 [0.94, 0.99] | 0.887 [0.85, 0.93] |
| 6 unsupervised hybrid | RRF hybrid: text + code + links + recency | 0.830 [0.78, 0.87] | 0.965 [0.94, 0.99] | 0.890 [0.85, 0.92] |
| 1 lexical | BM25 raw text | 0.828 [0.78, 0.87] | 0.937 [0.90, 0.97] | 0.879 [0.84, 0.91] |
| 5 existing bot | PRSense (bot, re-impl) | 0.825 [0.77, 0.88] | 0.935 [0.89, 0.97] | 0.874 [0.82, 0.92] |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM re-rank top-10 | 0.825 [0.77, 0.87] | 0.968 [0.95, 0.99] | 0.884 [0.84, 0.92] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-5 | 0.812 [0.76, 0.85] | 0.975 [0.95, 0.99] | 0.877 [0.84, 0.91] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-10 | 0.791 [0.74, 0.84] | 0.954 [0.93, 0.97] | 0.858 [0.82, 0.90] |
| 4 embedding | UniXcoder template-stripped text | 0.761 [0.71, 0.81] | 0.889 [0.84, 0.94] | 0.822 [0.78, 0.86] |
| 2 code | BM25 on diff | 0.746 [0.69, 0.79] | 0.887 [0.84, 0.93] | 0.811 [0.77, 0.85] |
| 2 code | Code overlap sum (files+hunks+lines) | 0.730 [0.68, 0.78] | 0.890 [0.83, 0.94] | 0.803 [0.76, 0.85] |
| 4 embedding | Jina code embeddings v2 on diff | 0.719 [0.67, 0.76] | 0.883 [0.84, 0.92] | 0.792 [0.75, 0.83] |
| 2 code | Changed-files Jaccard | 0.707 [0.65, 0.76] | 0.886 [0.85, 0.92] | 0.790 [0.75, 0.83] |
| 4 embedding | BGE-small on diff | 0.700 [0.66, 0.75] | 0.866 [0.82, 0.91] | 0.774 [0.73, 0.82] |
| 2 code | Hunk overlap | 0.694 [0.64, 0.75] | 0.875 [0.82, 0.92] | 0.777 [0.73, 0.82] |
| 2 code | Identical changed lines | 0.687 [0.64, 0.73] | 0.847 [0.79, 0.90] | 0.760 [0.72, 0.80] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-5 | 0.681 [0.63, 0.72] | 0.975 [0.95, 0.99] | 0.799 [0.76, 0.83] |
| 4 embedding | UniXcoder (code model) on diff | 0.670 [0.61, 0.73] | 0.840 [0.79, 0.89] | 0.745 [0.70, 0.80] |
| 4 embedding | MiniLM on diff | 0.659 [0.61, 0.71] | 0.843 [0.80, 0.89] | 0.742 [0.70, 0.79] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-10 | 0.634 [0.58, 0.70] | 0.929 [0.90, 0.95] | 0.759 [0.72, 0.80] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base re-rank top-10 | 0.630 [0.58, 0.68] | 0.942 [0.92, 0.96] | 0.758 [0.72, 0.80] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-10 | 0.615 [0.57, 0.66] | 0.937 [0.91, 0.96] | 0.747 [0.71, 0.78] |
| 3 links | Links only, no tie-break (same issue / #ref) | 0.585 [0.54, 0.63] | 0.783 [0.74, 0.83] | 0.675 [0.64, 0.72] |
| 4 embedding | CodeBERT (mean-pooled) on diff | 0.572 [0.52, 0.63] | 0.780 [0.73, 0.84] | 0.664 [0.62, 0.72] |
| 0 trivial | Recency only (newest open PR first) | 0.452 [0.39, 0.52] | 0.732 [0.67, 0.80] | 0.582 [0.52, 0.65] |


**self-replacement** (n = 1454)

| Family | Strategy | Recall@1 [95% CI] | Recall@5 [95% CI] | MRR [95% CI] |
|---|---|---|---|---|
| 7 supervised | INTRUDE + time (Wang et al. 2019), LR | 0.901 [0.86, 0.94] | 0.979 [0.96, 0.99] | 0.935 [0.90, 0.97] |
| 7 supervised | Jinx lexical, LR | 0.900 [0.85, 0.94] | 0.982 [0.97, 1.00] | 0.935 [0.90, 0.97] |
| 7 supervised | Jinx features, gradient boosting | 0.899 [0.87, 0.93] | 0.979 [0.96, 0.99] | 0.935 [0.91, 0.96] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | 0.898 [0.84, 0.95] | 0.974 [0.95, 1.00] | 0.930 [0.88, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | 0.897 [0.83, 0.95] | 0.971 [0.94, 1.00] | 0.929 [0.88, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | 0.895 [0.83, 0.95] | 0.974 [0.95, 1.00] | 0.929 [0.88, 0.97] |
| 7 supervised | All signals, gradient boosting | 0.894 [0.86, 0.93] | 0.978 [0.95, 0.99] | 0.932 [0.90, 0.96] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 0.893 [0.83, 0.94] | 0.975 [0.95, 1.00] | 0.928 [0.88, 0.97] |
| 7 supervised | All signals, LR | 0.891 [0.83, 0.94] | 0.978 [0.96, 0.99] | 0.928 [0.88, 0.97] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 0.891 [0.83, 0.94] | 0.974 [0.95, 1.00] | 0.927 [0.87, 0.97] |
| 7 supervised | Jinx + MiniLM, LR (current tool) | 0.891 [0.82, 0.94] | 0.971 [0.94, 1.00] | 0.925 [0.87, 0.97] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | 0.890 [0.83, 0.94] | 0.973 [0.95, 1.00] | 0.926 [0.87, 0.97] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | 0.890 [0.83, 0.94] | 0.972 [0.94, 1.00] | 0.926 [0.87, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-5 | 0.890 [0.83, 0.94] | 0.971 [0.94, 1.00] | 0.925 [0.87, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-5 | 0.889 [0.82, 0.94] | 0.971 [0.94, 1.00] | 0.925 [0.87, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-10 | 0.889 [0.82, 0.95] | 0.972 [0.94, 1.00] | 0.925 [0.87, 0.97] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | 0.889 [0.82, 0.94] | 0.972 [0.94, 1.00] | 0.925 [0.87, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-10 | 0.884 [0.81, 0.94] | 0.972 [0.94, 1.00] | 0.923 [0.87, 0.97] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | 0.884 [0.82, 0.94] | 0.972 [0.94, 1.00] | 0.923 [0.87, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-5 | 0.882 [0.82, 0.93] | 0.971 [0.94, 1.00] | 0.921 [0.87, 0.96] |
| 3 links | Links only (same issue / #ref) | 0.882 [0.85, 0.92] | 0.970 [0.95, 0.99] | 0.922 [0.89, 0.95] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | 0.882 [0.82, 0.94] | 0.971 [0.94, 1.00] | 0.920 [0.87, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | 0.882 [0.82, 0.93] | 0.970 [0.94, 0.99] | 0.920 [0.87, 0.96] |
| 5 existing bot | contrib-guard/phoenix (bot, exact port) | 0.878 [0.84, 0.91] | 0.961 [0.93, 0.99] | 0.915 [0.88, 0.94] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker-base (stacked LR) | 0.877 [0.81, 0.93] | 0.972 [0.94, 1.00] | 0.918 [0.87, 0.96] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | 0.875 [0.81, 0.93] | 0.972 [0.94, 1.00] | 0.917 [0.87, 0.96] |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 0.873 [0.80, 0.93] | 0.972 [0.94, 1.00] | 0.916 [0.86, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-10 | 0.868 [0.81, 0.92] | 0.970 [0.94, 0.99] | 0.910 [0.86, 0.95] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-5 | 0.862 [0.80, 0.91] | 0.971 [0.94, 1.00] | 0.907 [0.86, 0.95] |
| 1 lexical | TF-IDF template-stripped | 0.861 [0.81, 0.91] | 0.956 [0.91, 0.99] | 0.904 [0.86, 0.95] |
| 1 lexical | TF-IDF raw text (Li et al. 2017) | 0.858 [0.80, 0.91] | 0.955 [0.92, 0.99] | 0.901 [0.85, 0.94] |
| 4 embedding | BGE-base template-stripped | 0.852 [0.79, 0.91] | 0.951 [0.91, 0.98] | 0.900 [0.86, 0.94] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding + code | 0.847 [0.78, 0.90] | 0.948 [0.89, 0.99] | 0.892 [0.83, 0.94] |
| 4 embedding | BGE-small raw text | 0.846 [0.78, 0.90] | 0.950 [0.91, 0.99] | 0.891 [0.84, 0.94] |
| 4 embedding | BGE-small template-stripped | 0.840 [0.77, 0.90] | 0.950 [0.91, 0.98] | 0.889 [0.84, 0.94] |
| 6 unsupervised hybrid | RRF hybrid: text + code + links + recency | 0.836 [0.78, 0.88] | 0.964 [0.94, 0.99] | 0.894 [0.85, 0.93] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | 0.834 [0.76, 0.89] | 0.966 [0.94, 0.99] | 0.890 [0.84, 0.93] |
| 1 lexical | BM25 template-stripped | 0.831 [0.78, 0.88] | 0.931 [0.88, 0.97] | 0.880 [0.83, 0.92] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding | 0.831 [0.77, 0.88] | 0.944 [0.90, 0.99] | 0.882 [0.83, 0.93] |
| 10 stacked cascade (ours) | Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | 0.829 [0.77, 0.88] | 0.968 [0.94, 0.99] | 0.885 [0.83, 0.93] |
| 5 existing bot | Simili-bot (bot, re-impl) | 0.827 [0.76, 0.88] | 0.944 [0.91, 0.98] | 0.876 [0.82, 0.92] |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM re-rank top-10 | 0.827 [0.76, 0.89] | 0.966 [0.94, 0.99] | 0.883 [0.83, 0.93] |
| 1 lexical | BM25 raw text | 0.825 [0.77, 0.87] | 0.931 [0.88, 0.97] | 0.875 [0.83, 0.92] |
| 5 existing bot | PRSense (bot, re-impl) | 0.825 [0.76, 0.88] | 0.929 [0.88, 0.97] | 0.871 [0.81, 0.92] |
| 4 embedding | MiniLM template-stripped | 0.821 [0.76, 0.88] | 0.936 [0.89, 0.98] | 0.873 [0.82, 0.92] |
| 4 embedding | MiniLM raw text | 0.819 [0.75, 0.88] | 0.934 [0.88, 0.98] | 0.871 [0.82, 0.92] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-5 | 0.812 [0.75, 0.87] | 0.971 [0.94, 1.00] | 0.875 [0.83, 0.92] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-10 | 0.787 [0.73, 0.85] | 0.955 [0.93, 0.98] | 0.856 [0.81, 0.90] |
| 4 embedding | UniXcoder template-stripped text | 0.754 [0.70, 0.81] | 0.880 [0.82, 0.93] | 0.815 [0.76, 0.87] |
| 2 code | BM25 on diff | 0.750 [0.70, 0.80] | 0.885 [0.83, 0.93] | 0.812 [0.76, 0.86] |
| 2 code | Code overlap sum (files+hunks+lines) | 0.735 [0.67, 0.79] | 0.892 [0.82, 0.94] | 0.808 [0.75, 0.85] |
| 4 embedding | Jina code embeddings v2 on diff | 0.728 [0.69, 0.77] | 0.891 [0.85, 0.93] | 0.798 [0.76, 0.84] |
| 2 code | Changed-files Jaccard | 0.716 [0.65, 0.77] | 0.892 [0.86, 0.92] | 0.798 [0.76, 0.84] |
| 4 embedding | BGE-small on diff | 0.706 [0.66, 0.75] | 0.872 [0.83, 0.91] | 0.780 [0.74, 0.82] |
| 2 code | Hunk overlap | 0.702 [0.64, 0.76] | 0.876 [0.81, 0.93] | 0.783 [0.73, 0.83] |
| 2 code | Identical changed lines | 0.699 [0.64, 0.75] | 0.856 [0.79, 0.91] | 0.772 [0.72, 0.82] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-5 | 0.681 [0.63, 0.73] | 0.971 [0.94, 1.00] | 0.797 [0.75, 0.84] |
| 4 embedding | UniXcoder (code model) on diff | 0.677 [0.62, 0.74] | 0.847 [0.81, 0.89] | 0.752 [0.70, 0.81] |
| 4 embedding | MiniLM on diff | 0.662 [0.62, 0.71] | 0.846 [0.81, 0.89] | 0.745 [0.71, 0.79] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-10 | 0.640 [0.58, 0.70] | 0.932 [0.90, 0.96] | 0.762 [0.72, 0.81] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base re-rank top-10 | 0.633 [0.58, 0.69] | 0.942 [0.91, 0.97] | 0.760 [0.71, 0.81] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-10 | 0.618 [0.57, 0.67] | 0.936 [0.91, 0.96] | 0.747 [0.71, 0.79] |
| 4 embedding | CodeBERT (mean-pooled) on diff | 0.581 [0.53, 0.63] | 0.799 [0.75, 0.85] | 0.676 [0.63, 0.72] |
| 3 links | Links only, no tie-break (same issue / #ref) | 0.562 [0.52, 0.61] | 0.777 [0.74, 0.83] | 0.660 [0.62, 0.71] |
| 0 trivial | Recency only (newest open PR first) | 0.486 [0.42, 0.56] | 0.761 [0.70, 0.83] | 0.613 [0.56, 0.68] |


**cross-author, same agent** (n = 207)

| Family | Strategy | Recall@1 [95% CI] | Recall@5 [95% CI] | MRR [95% CI] |
|---|---|---|---|---|
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 0.942 [0.91, 0.97] | 0.990 [0.98, 1.00] | 0.965 [0.94, 0.98] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | 0.942 [0.90, 0.98] | 0.990 [0.98, 1.00] | 0.964 [0.94, 0.99] |
| 3 links | Links only (same issue / #ref) | 0.942 [0.91, 0.97] | 0.986 [0.96, 1.00] | 0.962 [0.94, 0.98] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | 0.937 [0.89, 0.97] | 0.986 [0.97, 1.00] | 0.961 [0.93, 0.98] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 0.937 [0.90, 0.97] | 0.981 [0.96, 1.00] | 0.959 [0.93, 0.98] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 0.932 [0.89, 0.97] | 0.981 [0.96, 1.00] | 0.957 [0.93, 0.98] |
| 5 existing bot | contrib-guard/phoenix (bot, exact port) | 0.932 [0.90, 0.96] | 0.986 [0.96, 1.00] | 0.957 [0.94, 0.98] |
| 9 LLM judge on top-k | LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | 0.928 [0.89, 0.96] | 0.990 [0.98, 1.00] | 0.956 [0.93, 0.98] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | 0.928 [0.90, 0.96] | 0.986 [0.96, 1.00] | 0.955 [0.93, 0.98] |
| 7 supervised | All signals, LR | 0.928 [0.89, 0.96] | 0.986 [0.97, 1.00] | 0.954 [0.93, 0.98] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | 0.928 [0.89, 0.96] | 0.986 [0.97, 1.00] | 0.953 [0.92, 0.98] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker-base (stacked LR) | 0.923 [0.88, 0.96] | 0.986 [0.97, 1.00] | 0.954 [0.93, 0.98] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | 0.923 [0.89, 0.96] | 0.990 [0.98, 1.00] | 0.953 [0.93, 0.98] |
| 1 lexical | TF-IDF template-stripped | 0.923 [0.89, 0.96] | 0.990 [0.98, 1.00] | 0.953 [0.93, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | 0.923 [0.89, 0.96] | 0.981 [0.96, 1.00] | 0.953 [0.93, 0.98] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | 0.923 [0.89, 0.96] | 0.981 [0.96, 1.00] | 0.953 [0.93, 0.98] |
| 7 supervised | Jinx + MiniLM, LR (current tool) | 0.923 [0.87, 0.97] | 0.990 [0.98, 1.00] | 0.952 [0.92, 0.98] |
| 7 supervised | All signals, gradient boosting | 0.923 [0.89, 0.96] | 0.981 [0.96, 1.00] | 0.952 [0.93, 0.98] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-5 | 0.923 [0.88, 0.96] | 0.990 [0.98, 1.00] | 0.951 [0.92, 0.98] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-10 | 0.923 [0.88, 0.96] | 0.986 [0.97, 1.00] | 0.951 [0.92, 0.98] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | 0.923 [0.88, 0.96] | 0.981 [0.96, 1.00] | 0.951 [0.92, 0.98] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | 0.918 [0.87, 0.96] | 0.990 [0.97, 1.00] | 0.952 [0.92, 0.98] |
| 1 lexical | TF-IDF raw text (Li et al. 2017) | 0.918 [0.88, 0.95] | 0.986 [0.96, 1.00] | 0.950 [0.93, 0.97] |
| 4 embedding | BGE-base template-stripped | 0.918 [0.89, 0.95] | 0.981 [0.96, 1.00] | 0.950 [0.93, 0.97] |
| 4 embedding | MiniLM template-stripped | 0.918 [0.88, 0.95] | 0.981 [0.96, 1.00] | 0.946 [0.92, 0.97] |
| 4 embedding | BGE-small raw text | 0.913 [0.88, 0.95] | 0.986 [0.96, 1.00] | 0.949 [0.93, 0.97] |
| 4 embedding | BGE-small template-stripped | 0.913 [0.87, 0.95] | 0.986 [0.96, 1.00] | 0.949 [0.92, 0.97] |
| 7 supervised | Jinx lexical, LR | 0.913 [0.87, 0.95] | 0.990 [0.98, 1.00] | 0.948 [0.92, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-5 | 0.913 [0.87, 0.96] | 0.990 [0.98, 1.00] | 0.948 [0.92, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-10 | 0.913 [0.87, 0.96] | 0.986 [0.97, 1.00] | 0.947 [0.92, 0.97] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | 0.913 [0.87, 0.96] | 0.986 [0.97, 1.00] | 0.947 [0.92, 0.97] |
| 7 supervised | INTRUDE + time (Wang et al. 2019), LR | 0.913 [0.87, 0.95] | 0.990 [0.98, 1.00] | 0.947 [0.91, 0.98] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding | 0.908 [0.85, 0.95] | 0.990 [0.98, 1.00] | 0.947 [0.92, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-5 | 0.908 [0.87, 0.95] | 0.990 [0.98, 1.00] | 0.945 [0.92, 0.97] |
| 9 LLM judge on top-k | LLM judge Claude Haiku 4.5 re-rank top-5 | 0.903 [0.86, 0.94] | 0.990 [0.98, 1.00] | 0.945 [0.92, 0.97] |
| 7 supervised | Jinx features, gradient boosting | 0.903 [0.86, 0.95] | 0.981 [0.96, 1.00] | 0.942 [0.91, 0.97] |
| 1 lexical | BM25 template-stripped | 0.903 [0.85, 0.94] | 0.986 [0.96, 1.00] | 0.942 [0.91, 0.97] |
| 4 embedding | MiniLM raw text | 0.903 [0.87, 0.94] | 0.976 [0.96, 0.99] | 0.937 [0.91, 0.96] |
| 1 lexical | BM25 raw text | 0.899 [0.85, 0.94] | 0.986 [0.96, 1.00] | 0.938 [0.91, 0.96] |
| 5 existing bot | Simili-bot (bot, re-impl) | 0.899 [0.86, 0.94] | 0.981 [0.96, 1.00] | 0.936 [0.91, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-10 | 0.889 [0.85, 0.94] | 0.981 [0.96, 1.00] | 0.933 [0.91, 0.97] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding + code | 0.874 [0.83, 0.92] | 0.990 [0.98, 1.00] | 0.924 [0.90, 0.95] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | 0.874 [0.82, 0.93] | 0.981 [0.96, 1.00] | 0.923 [0.88, 0.96] |
| 5 existing bot | PRSense (bot, re-impl) | 0.860 [0.81, 0.92] | 0.976 [0.96, 0.99] | 0.913 [0.88, 0.95] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-5 | 0.855 [0.81, 0.91] | 0.990 [0.98, 1.00] | 0.910 [0.88, 0.94] |
| 10 stacked cascade (ours) | Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | 0.841 [0.78, 0.90] | 0.966 [0.94, 0.99] | 0.897 [0.86, 0.94] |
| 6 unsupervised hybrid | RRF hybrid: text + code + links + recency | 0.836 [0.78, 0.90] | 0.986 [0.96, 1.00] | 0.900 [0.86, 0.94] |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM re-rank top-10 | 0.826 [0.78, 0.88] | 0.986 [0.97, 1.00] | 0.898 [0.87, 0.93] |
| 4 embedding | UniXcoder template-stripped text | 0.826 [0.76, 0.88] | 0.957 [0.93, 0.98] | 0.885 [0.84, 0.92] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-5 | 0.787 [0.73, 0.85] | 0.990 [0.98, 1.00] | 0.873 [0.84, 0.91] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-10 | 0.778 [0.71, 0.85] | 0.937 [0.91, 0.97] | 0.850 [0.80, 0.90] |
| 2 code | BM25 on diff | 0.739 [0.68, 0.80] | 0.932 [0.89, 0.97] | 0.828 [0.78, 0.88] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-5 | 0.720 [0.67, 0.78] | 0.990 [0.98, 1.00] | 0.834 [0.80, 0.87] |
| 2 code | Code overlap sum (files+hunks+lines) | 0.715 [0.65, 0.79] | 0.889 [0.83, 0.94] | 0.793 [0.74, 0.85] |
| 4 embedding | BGE-small on diff | 0.710 [0.64, 0.80] | 0.884 [0.84, 0.94] | 0.792 [0.74, 0.86] |
| 4 embedding | Jina code embeddings v2 on diff | 0.700 [0.63, 0.78] | 0.879 [0.83, 0.93] | 0.787 [0.74, 0.85] |
| 2 code | Changed-files Jaccard | 0.686 [0.63, 0.76] | 0.879 [0.82, 0.94] | 0.773 [0.72, 0.83] |
| 4 embedding | MiniLM on diff | 0.681 [0.61, 0.77] | 0.874 [0.82, 0.94] | 0.765 [0.71, 0.84] |
| 4 embedding | UniXcoder (code model) on diff | 0.662 [0.58, 0.75] | 0.855 [0.80, 0.93] | 0.747 [0.68, 0.83] |
| 3 links | Links only, no tie-break (same issue / #ref) | 0.657 [0.58, 0.74] | 0.797 [0.72, 0.89] | 0.718 [0.65, 0.80] |
| 2 code | Hunk overlap | 0.652 [0.58, 0.73] | 0.899 [0.85, 0.95] | 0.750 [0.69, 0.81] |
| 2 code | Identical changed lines | 0.643 [0.57, 0.72] | 0.821 [0.77, 0.89] | 0.723 [0.66, 0.79] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base re-rank top-10 | 0.638 [0.57, 0.72] | 0.961 [0.93, 0.99] | 0.763 [0.71, 0.82] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-10 | 0.623 [0.55, 0.72] | 0.952 [0.91, 0.99] | 0.769 [0.72, 0.83] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-10 | 0.580 [0.49, 0.70] | 0.908 [0.87, 0.95] | 0.726 [0.66, 0.80] |
| 4 embedding | CodeBERT (mean-pooled) on diff | 0.575 [0.48, 0.69] | 0.754 [0.65, 0.86] | 0.656 [0.56, 0.76] |
| 0 trivial | Recency only (newest open PR first) | 0.319 [0.23, 0.42] | 0.647 [0.52, 0.80] | 0.470 [0.37, 0.59] |


**cross-author, cross-agent** (n = 106)

| Family | Strategy | Recall@1 [95% CI] | Recall@5 [95% CI] | MRR [95% CI] |
|---|---|---|---|---|
| 9 LLM judge on top-k | LLM judge Claude Haiku 4.5 re-rank top-5 | 0.962 [0.94, 1.00] | 0.991 [0.98, 1.00] | 0.977 [0.96, 1.00] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | 0.962 [0.92, 0.99] | 0.972 [0.94, 1.00] | 0.971 [0.94, 0.99] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-5 | 0.953 [0.92, 0.99] | 0.991 [0.98, 1.00] | 0.973 [0.96, 0.99] |
| 9 LLM judge on top-k | LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | 0.953 [0.92, 0.99] | 0.991 [0.98, 1.00] | 0.973 [0.95, 0.99] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 0.953 [0.91, 0.99] | 0.991 [0.98, 1.00] | 0.967 [0.94, 0.99] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker-base (stacked LR) | 0.953 [0.91, 0.99] | 0.972 [0.94, 1.00] | 0.966 [0.93, 0.99] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | 0.953 [0.91, 0.99] | 0.972 [0.94, 1.00] | 0.966 [0.93, 0.99] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | 0.943 [0.91, 0.98] | 0.991 [0.98, 1.00] | 0.966 [0.95, 0.99] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | 0.943 [0.91, 0.98] | 0.991 [0.98, 1.00] | 0.966 [0.95, 0.99] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | 0.943 [0.91, 0.98] | 0.991 [0.98, 1.00] | 0.966 [0.95, 0.99] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-10 | 0.943 [0.90, 0.99] | 0.991 [0.98, 1.00] | 0.965 [0.95, 0.99] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 0.943 [0.90, 0.99] | 0.991 [0.98, 1.00] | 0.963 [0.93, 0.99] |
| 7 supervised | Jinx + MiniLM, LR (current tool) | 0.934 [0.90, 0.98] | 0.991 [0.98, 1.00] | 0.957 [0.93, 0.99] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-5 | 0.934 [0.90, 0.98] | 0.991 [0.98, 1.00] | 0.957 [0.93, 0.99] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-10 | 0.934 [0.90, 0.98] | 0.991 [0.98, 1.00] | 0.957 [0.93, 0.99] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | 0.934 [0.90, 0.98] | 0.991 [0.98, 1.00] | 0.957 [0.93, 0.99] |
| 7 supervised | All signals, LR | 0.925 [0.87, 0.98] | 1.000 [1.00, 1.00] | 0.958 [0.93, 0.99] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-5 | 0.925 [0.89, 0.97] | 0.991 [0.98, 1.00] | 0.953 [0.93, 0.98] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-5 | 0.925 [0.88, 0.98] | 0.991 [0.98, 1.00] | 0.953 [0.93, 0.99] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | 0.925 [0.88, 0.98] | 0.991 [0.98, 1.00] | 0.953 [0.93, 0.99] |
| 7 supervised | Jinx features, gradient boosting | 0.925 [0.87, 0.98] | 0.991 [0.98, 1.00] | 0.951 [0.92, 0.99] |
| 7 supervised | Jinx lexical, LR | 0.925 [0.88, 0.97] | 0.991 [0.98, 1.00] | 0.951 [0.92, 0.99] |
| 3 links | Links only (same issue / #ref) | 0.925 [0.85, 0.99] | 0.962 [0.92, 1.00] | 0.946 [0.89, 0.99] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | 0.915 [0.86, 0.97] | 0.991 [0.98, 1.00] | 0.949 [0.92, 0.98] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | 0.915 [0.86, 0.97] | 0.991 [0.98, 1.00] | 0.948 [0.92, 0.98] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | 0.915 [0.84, 0.98] | 0.991 [0.98, 1.00] | 0.948 [0.91, 0.99] |
| 7 supervised | INTRUDE + time (Wang et al. 2019), LR | 0.915 [0.86, 0.96] | 0.981 [0.96, 1.00] | 0.941 [0.90, 0.98] |
| 7 supervised | All signals, gradient boosting | 0.906 [0.84, 0.99] | 0.981 [0.95, 1.00] | 0.944 [0.91, 0.99] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-10 | 0.906 [0.85, 0.98] | 0.991 [0.98, 1.00] | 0.943 [0.91, 0.98] |
| 1 lexical | TF-IDF template-stripped | 0.896 [0.83, 0.96] | 0.981 [0.95, 1.00] | 0.936 [0.89, 0.98] |
| 1 lexical | TF-IDF raw text (Li et al. 2017) | 0.896 [0.83, 0.96] | 0.972 [0.94, 1.00] | 0.934 [0.89, 0.98] |
| 4 embedding | BGE-small template-stripped | 0.896 [0.83, 0.98] | 0.972 [0.95, 1.00] | 0.934 [0.90, 0.98] |
| 4 embedding | BGE-small raw text | 0.887 [0.82, 0.98] | 0.981 [0.96, 1.00] | 0.928 [0.89, 0.98] |
| 5 existing bot | contrib-guard/phoenix (bot, exact port) | 0.877 [0.81, 0.95] | 0.972 [0.92, 1.00] | 0.925 [0.88, 0.98] |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 0.877 [0.79, 0.97] | 0.991 [0.98, 1.00] | 0.923 [0.87, 0.98] |
| 4 embedding | MiniLM raw text | 0.868 [0.81, 0.94] | 0.962 [0.93, 0.99] | 0.917 [0.88, 0.96] |
| 4 embedding | MiniLM template-stripped | 0.868 [0.82, 0.94] | 0.962 [0.93, 0.99] | 0.914 [0.88, 0.96] |
| 4 embedding | BGE-base template-stripped | 0.858 [0.79, 0.94] | 0.981 [0.96, 1.00] | 0.917 [0.87, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-10 | 0.858 [0.79, 0.94] | 0.972 [0.94, 1.00] | 0.908 [0.86, 0.96] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | 0.849 [0.76, 0.93] | 0.991 [0.98, 1.00] | 0.912 [0.87, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-5 | 0.849 [0.79, 0.93] | 0.991 [0.98, 1.00] | 0.908 [0.86, 0.96] |
| 10 stacked cascade (ours) | Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | 0.849 [0.74, 0.95] | 0.972 [0.94, 1.00] | 0.898 [0.82, 0.97] |
| 5 existing bot | Simili-bot (bot, re-impl) | 0.840 [0.78, 0.93] | 0.962 [0.93, 0.99] | 0.901 [0.86, 0.96] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding + code | 0.840 [0.73, 0.95] | 0.972 [0.95, 1.00] | 0.887 [0.81, 0.97] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding | 0.830 [0.76, 0.92] | 0.943 [0.87, 1.00] | 0.884 [0.82, 0.95] |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM re-rank top-10 | 0.792 [0.67, 0.92] | 0.953 [0.92, 0.99] | 0.865 [0.79, 0.95] |
| 1 lexical | BM25 template-stripped | 0.774 [0.69, 0.86] | 0.934 [0.85, 1.00] | 0.850 [0.77, 0.93] |
| 5 existing bot | PRSense (bot, re-impl) | 0.764 [0.58, 0.94] | 0.943 [0.88, 1.00] | 0.830 [0.68, 0.96] |
| 3 links | Links only, no tie-break (same issue / #ref) | 0.755 [0.64, 0.86] | 0.830 [0.73, 0.92] | 0.793 [0.69, 0.89] |
| 6 unsupervised hybrid | RRF hybrid: text + code + links + recency | 0.745 [0.56, 0.93] | 0.934 [0.89, 1.00] | 0.819 [0.69, 0.95] |
| 1 lexical | BM25 raw text | 0.726 [0.63, 0.83] | 0.934 [0.85, 1.00] | 0.819 [0.74, 0.90] |
| 4 embedding | UniXcoder template-stripped text | 0.726 [0.58, 0.88] | 0.887 [0.74, 1.00] | 0.791 [0.65, 0.92] |
| 2 code | BM25 on diff | 0.708 [0.50, 0.93] | 0.821 [0.60, 1.00] | 0.763 [0.57, 0.96] |
| 2 code | Code overlap sum (files+hunks+lines) | 0.689 [0.49, 0.87] | 0.858 [0.70, 0.98] | 0.762 [0.58, 0.92] |
| 2 code | Hunk overlap | 0.679 [0.51, 0.84] | 0.811 [0.65, 0.95] | 0.743 [0.59, 0.89] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-10 | 0.651 [0.50, 0.83] | 0.934 [0.87, 0.99] | 0.772 [0.66, 0.89] |
| 4 embedding | Jina code embeddings v2 on diff | 0.632 [0.48, 0.85] | 0.783 [0.61, 0.99] | 0.711 [0.56, 0.91] |
| 2 code | Changed-files Jaccard | 0.623 [0.45, 0.81] | 0.811 [0.61, 0.97] | 0.713 [0.54, 0.87] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-5 | 0.613 [0.51, 0.70] | 0.991 [0.98, 1.00] | 0.761 [0.71, 0.82] |
| 2 code | Identical changed lines | 0.604 [0.47, 0.80] | 0.764 [0.62, 0.95] | 0.676 [0.55, 0.85] |
| 4 embedding | BGE-small on diff | 0.594 [0.43, 0.81] | 0.745 [0.57, 0.96] | 0.661 [0.51, 0.87] |
| 4 embedding | UniXcoder (code model) on diff | 0.594 [0.43, 0.82] | 0.717 [0.52, 0.97] | 0.656 [0.50, 0.88] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base re-rank top-10 | 0.575 [0.43, 0.70] | 0.915 [0.86, 0.96] | 0.722 [0.61, 0.81] |
| 4 embedding | MiniLM on diff | 0.575 [0.40, 0.80] | 0.736 [0.56, 0.96] | 0.655 [0.50, 0.86] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-10 | 0.557 [0.43, 0.66] | 0.915 [0.86, 0.97] | 0.706 [0.63, 0.78] |
| 4 embedding | CodeBERT (mean-pooled) on diff | 0.434 [0.29, 0.64] | 0.566 [0.38, 0.83] | 0.516 [0.37, 0.73] |
| 0 trivial | Recency only (newest open PR first) | 0.255 [0.14, 0.43] | 0.500 [0.34, 0.73] | 0.375 [0.25, 0.56] |


**cross-author, no #ref in text** (n = 173)

| Family | Strategy | Recall@1 [95% CI] | Recall@5 [95% CI] | MRR [95% CI] |
|---|---|---|---|---|
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | 0.902 [0.85, 0.95] | 0.983 [0.97, 1.00] | 0.938 [0.91, 0.97] |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 0.902 [0.86, 0.94] | 0.983 [0.97, 1.00] | 0.937 [0.91, 0.97] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | 0.896 [0.84, 0.94] | 0.977 [0.96, 0.99] | 0.934 [0.90, 0.97] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 0.896 [0.85, 0.94] | 0.971 [0.95, 0.99] | 0.931 [0.90, 0.96] |
| 9 LLM judge on top-k | LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | 0.890 [0.84, 0.93] | 0.983 [0.97, 1.00] | 0.933 [0.90, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | 0.890 [0.85, 0.94] | 0.983 [0.97, 1.00] | 0.932 [0.90, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | 0.890 [0.85, 0.94] | 0.971 [0.95, 0.99] | 0.931 [0.90, 0.96] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | 0.890 [0.85, 0.94] | 0.971 [0.95, 0.99] | 0.931 [0.90, 0.96] |
| 4 embedding | BGE-small template-stripped | 0.890 [0.84, 0.94] | 0.971 [0.94, 0.99] | 0.931 [0.89, 0.96] |
| 4 embedding | BGE-small raw text | 0.890 [0.85, 0.94] | 0.977 [0.95, 1.00] | 0.930 [0.90, 0.96] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker-base (stacked LR) | 0.890 [0.83, 0.94] | 0.965 [0.94, 0.99] | 0.930 [0.89, 0.96] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | 0.890 [0.84, 0.93] | 0.977 [0.95, 1.00] | 0.929 [0.90, 0.96] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | 0.890 [0.83, 0.93] | 0.977 [0.96, 0.99] | 0.927 [0.89, 0.96] |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | 0.890 [0.82, 0.94] | 0.960 [0.93, 0.99] | 0.926 [0.88, 0.96] |
| 9 LLM judge on top-k | LLM judge Claude Haiku 4.5 re-rank top-5 | 0.884 [0.83, 0.93] | 0.983 [0.97, 1.00] | 0.932 [0.90, 0.96] |
| 4 embedding | BGE-base template-stripped | 0.884 [0.83, 0.94] | 0.977 [0.95, 1.00] | 0.931 [0.90, 0.96] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | 0.884 [0.82, 0.94] | 0.971 [0.95, 0.99] | 0.928 [0.89, 0.96] |
| 7 supervised | All signals, LR | 0.884 [0.82, 0.93] | 0.983 [0.96, 1.00] | 0.928 [0.89, 0.96] |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 0.884 [0.83, 0.93] | 0.971 [0.95, 0.99] | 0.926 [0.89, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-5 | 0.884 [0.83, 0.93] | 0.983 [0.97, 1.00] | 0.924 [0.89, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-10 | 0.884 [0.83, 0.93] | 0.977 [0.96, 0.99] | 0.924 [0.89, 0.96] |
| 3 links | Links only (same issue / #ref) | 0.884 [0.84, 0.94] | 0.960 [0.93, 0.99] | 0.922 [0.89, 0.96] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-5 | 0.879 [0.83, 0.93] | 0.983 [0.97, 1.00] | 0.926 [0.89, 0.96] |
| 7 supervised | All signals, gradient boosting | 0.879 [0.83, 0.94] | 0.965 [0.95, 0.99] | 0.924 [0.89, 0.96] |
| 5 existing bot | contrib-guard/phoenix (bot, exact port) | 0.879 [0.84, 0.92] | 0.971 [0.94, 0.99] | 0.923 [0.90, 0.95] |
| 7 supervised | Jinx + MiniLM, LR (current tool) | 0.879 [0.81, 0.93] | 0.983 [0.97, 1.00] | 0.923 [0.88, 0.96] |
| 4 embedding | MiniLM template-stripped | 0.873 [0.82, 0.92] | 0.971 [0.94, 0.99] | 0.918 [0.89, 0.95] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-5 | 0.867 [0.81, 0.92] | 0.983 [0.97, 1.00] | 0.917 [0.88, 0.95] |
| 1 lexical | TF-IDF template-stripped | 0.867 [0.82, 0.92] | 0.977 [0.96, 1.00] | 0.917 [0.89, 0.95] |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | 0.867 [0.81, 0.92] | 0.977 [0.96, 0.99] | 0.917 [0.88, 0.95] |
| 1 lexical | TF-IDF raw text (Li et al. 2017) | 0.867 [0.81, 0.91] | 0.965 [0.94, 0.99] | 0.915 [0.88, 0.95] |
| 4 embedding | MiniLM raw text | 0.867 [0.82, 0.92] | 0.965 [0.94, 0.99] | 0.914 [0.88, 0.95] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-10 | 0.861 [0.80, 0.92] | 0.977 [0.96, 0.99] | 0.914 [0.87, 0.95] |
| 5 existing bot | Simili-bot (bot, re-impl) | 0.861 [0.81, 0.91] | 0.971 [0.94, 0.99] | 0.912 [0.88, 0.94] |
| 7 supervised | Jinx features, gradient boosting | 0.855 [0.80, 0.91] | 0.971 [0.95, 0.99] | 0.911 [0.88, 0.95] |
| 7 supervised | Jinx lexical, LR | 0.855 [0.79, 0.91] | 0.983 [0.97, 1.00] | 0.910 [0.87, 0.94] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-10 | 0.855 [0.79, 0.92] | 0.971 [0.95, 1.00] | 0.910 [0.87, 0.95] |
| 7 supervised | INTRUDE + time (Wang et al. 2019), LR | 0.850 [0.79, 0.90] | 0.977 [0.96, 0.99] | 0.903 [0.86, 0.94] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding | 0.850 [0.80, 0.90] | 0.960 [0.92, 1.00] | 0.901 [0.87, 0.94] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | 0.844 [0.77, 0.90] | 0.977 [0.95, 1.00] | 0.905 [0.86, 0.94] |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding + code | 0.844 [0.79, 0.90] | 0.977 [0.96, 1.00] | 0.899 [0.87, 0.94] |
| 1 lexical | BM25 template-stripped | 0.838 [0.79, 0.89] | 0.948 [0.91, 0.99] | 0.889 [0.86, 0.93] |
| 5 existing bot | PRSense (bot, re-impl) | 0.832 [0.77, 0.91] | 0.960 [0.93, 0.99] | 0.895 [0.85, 0.94] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-5 | 0.815 [0.76, 0.88] | 0.983 [0.97, 1.00] | 0.881 [0.84, 0.92] |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM re-rank top-10 | 0.809 [0.75, 0.88] | 0.971 [0.95, 0.99] | 0.881 [0.84, 0.92] |
| 6 unsupervised hybrid | RRF hybrid: text + code + links + recency | 0.809 [0.75, 0.88] | 0.960 [0.93, 0.99] | 0.872 [0.83, 0.93] |
| 1 lexical | BM25 raw text | 0.809 [0.75, 0.86] | 0.948 [0.91, 0.99] | 0.870 [0.84, 0.91] |
| 4 embedding | UniXcoder template-stripped text | 0.775 [0.71, 0.86] | 0.908 [0.85, 0.98] | 0.832 [0.77, 0.90] |
| 10 stacked cascade (ours) | Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | 0.740 [0.67, 0.83] | 0.942 [0.91, 0.99] | 0.827 [0.78, 0.89] |
| 2 code | BM25 on diff | 0.723 [0.66, 0.81] | 0.931 [0.89, 0.98] | 0.817 [0.77, 0.88] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-5 | 0.717 [0.65, 0.79] | 0.983 [0.97, 1.00] | 0.824 [0.78, 0.87] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-10 | 0.717 [0.64, 0.79] | 0.908 [0.87, 0.94] | 0.804 [0.75, 0.86] |
| 2 code | Code overlap sum (files+hunks+lines) | 0.694 [0.62, 0.77] | 0.879 [0.81, 0.93] | 0.774 [0.72, 0.83] |
| 2 code | Changed-files Jaccard | 0.665 [0.60, 0.76] | 0.873 [0.80, 0.93] | 0.760 [0.71, 0.83] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-5 | 0.647 [0.58, 0.73] | 0.983 [0.97, 1.00] | 0.791 [0.75, 0.84] |
| 4 embedding | BGE-small on diff | 0.647 [0.56, 0.77] | 0.838 [0.78, 0.91] | 0.731 [0.66, 0.83] |
| 4 embedding | Jina code embeddings v2 on diff | 0.636 [0.54, 0.77] | 0.855 [0.80, 0.93] | 0.740 [0.67, 0.84] |
| 2 code | Hunk overlap | 0.624 [0.54, 0.71] | 0.861 [0.81, 0.92] | 0.719 [0.66, 0.78] |
| 4 embedding | UniXcoder (code model) on diff | 0.607 [0.51, 0.73] | 0.815 [0.73, 0.93] | 0.701 [0.61, 0.81] |
| 4 embedding | MiniLM on diff | 0.595 [0.52, 0.69] | 0.821 [0.74, 0.93] | 0.693 [0.63, 0.78] |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base re-rank top-10 | 0.555 [0.48, 0.64] | 0.913 [0.88, 0.95] | 0.701 [0.64, 0.76] |
| 2 code | Identical changed lines | 0.549 [0.47, 0.65] | 0.751 [0.67, 0.86] | 0.644 [0.57, 0.74] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-10 | 0.532 [0.43, 0.67] | 0.850 [0.80, 0.91] | 0.677 [0.61, 0.77] |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-10 | 0.520 [0.44, 0.63] | 0.942 [0.91, 0.97] | 0.702 [0.65, 0.77] |
| 4 embedding | CodeBERT (mean-pooled) on diff | 0.462 [0.35, 0.60] | 0.624 [0.48, 0.79] | 0.546 [0.42, 0.68] |
| 3 links | Links only, no tie-break (same issue / #ref) | 0.451 [0.37, 0.54] | 0.653 [0.57, 0.77] | 0.542 [0.48, 0.63] |
| 0 trivial | Recency only (newest open PR first) | 0.301 [0.20, 0.44] | 0.590 [0.44, 0.77] | 0.437 [0.32, 0.59] |


**Best Recall@1 of each strategy family, per duplicate class**

| Duplicate class | n | trivial | lexical | stacked cascade (ours) | code | links | embedding | existing bot | unsupervised hybrid | supervised | re-ranker on top-k | LLM judge on top-k | best overall |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| same issue, different code (classes C/D, shares linked issue) | 35 | 0.37 | 0.97 | 0.94 | 0.51 | 1.00 | 0.94 | 0.89 | 0.89 | 0.94 | 0.97 | 0.94 | Links only (same issue / #ref) (1.00) |
| same code, different description (code twin, text TF-IDF < 0.3) | 285 | 0.59 | 0.65 | 0.80 | 0.79 | 0.78 | 0.76 | 0.73 | 0.68 | 0.85 | 0.78 | 0.80 | Jinx features, gradient boosting (0.85) |
| cross-author, same code, different description | 34 | 0.32 | 0.85 | 0.94 | 0.91 | 0.88 | 0.85 | 0.88 | 0.79 | 0.94 | 0.97 | 0.97 | Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 (0.97) |
| class A. code twin (>=50% identical changed lines) | 951 | 0.52 | 0.87 | 0.92 | 0.87 | 0.90 | 0.86 | 0.90 | 0.89 | 0.94 | 0.91 | 0.92 | INTRUDE + time (Wang et al. 2019), LR (0.94) |
| cross-author, class A. code twin (>=50% identical changed lines) | 132 | 0.33 | 0.95 | 0.98 | 0.88 | 0.96 | 0.94 | 0.95 | 0.93 | 0.98 | 0.96 | 0.98 | Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) (0.98) |
| class B. partial code overlap | 658 | 0.36 | 0.87 | 0.90 | 0.72 | 0.88 | 0.87 | 0.87 | 0.85 | 0.89 | 0.88 | 0.89 | Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) (0.90) |
| cross-author, class B. partial code overlap | 146 | 0.28 | 0.91 | 0.96 | 0.72 | 0.93 | 0.93 | 0.90 | 0.88 | 0.93 | 0.95 | 0.95 | Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) (0.96) |
| class C. same files, different code | 41 | 0.56 | 0.85 | 0.85 | 0.76 | 0.85 | 0.78 | 0.83 | 0.85 | 0.88 | 0.85 | 0.85 | Jinx lexical, LR (0.88) |
| cross-author, class C. same files, different code | 10 | 0.40 | 0.80 | 0.80 | 0.80 | 0.80 | 0.70 | 0.70 | 0.80 | 0.70 | 0.80 | 0.80 | Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) (0.80) |
| class D. no shared files (intent-level) | 117 | 0.40 | 0.88 | 0.85 | 0.41 | 0.86 | 0.83 | 0.83 | 0.79 | 0.79 | 0.85 | 0.85 | TF-IDF template-stripped (0.88) |
| cross-author, class D. no shared files (intent-level) | 25 | 0.20 | 0.84 | 0.80 | 0.36 | 0.88 | 0.84 | 0.84 | 0.84 | 0.76 | 0.84 | 0.84 | Links only (same issue / #ref) (0.88) |


**Paired difference vs `Jinx + MiniLM, LR (current tool)`, cross-author (points; CI excludes 0 = significant)**

| Strategy | ΔRecall@1 | ΔRecall@5 | ΔMRR |
|---|---|---|---|
| Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | +1.6 [-0.5, +3.8] | -0.6 [-1.5, +0.0] | +0.8 [-0.4, +1.9] |
| Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | +1.0 [-1.0, +2.6] | -1.3 [-2.6, -0.3] | +0.4 [-0.7, +1.2] |
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
| MiniLM template-stripped | -2.6 [-5.3, +0.8] | -1.6 [-2.9, -0.4] | -1.9 [-3.5, +0.1] |
| BGE-base template-stripped | -2.9 [-5.9, +0.9] | -1.0 [-2.0, +0.0] | -1.6 [-3.4, +0.6] |
| MiniLM raw text | -3.5 [-6.6, +0.3] | -1.9 [-3.0, -0.7] | -2.4 [-4.1, -0.2] |
| RRF hybrid: BM25 + embedding | -4.5 [-8.1, -0.5] | -1.6 [-3.8, +0.0] | -2.8 [-5.2, -0.2] |
| Simili-bot (bot, re-impl) | -4.8 [-8.1, -0.7] | -1.6 [-2.9, -0.4] | -3.0 [-5.0, -0.5] |
| LLM judge Qwen2.5-7B re-rank top-5 | -4.8 [-8.0, -1.6] | +0.0 [+0.0, +0.0] | -3.0 [-4.9, -1.0] |
| Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | -6.1 [-10.5, -2.0] | -0.6 [-1.6, +0.0] | -3.5 [-6.2, -1.1] |
| RRF hybrid: BM25 + embedding + code | -6.4 [-12.0, -1.0] | -0.6 [-1.3, +0.0] | -4.3 [-8.1, -0.7] |
| BM25 template-stripped | -6.7 [-11.2, -1.6] | -2.2 [-4.5, +0.0] | -4.3 [-7.4, -0.9] |
| Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | -8.3 [-13.8, -2.5] | -2.2 [-4.4, -0.3] | -5.7 [-9.4, -2.0] |
| BM25 raw text | -8.6 [-13.5, -3.1] | -2.2 [-4.5, +0.0] | -5.6 [-9.0, -1.9] |
| PRSense (bot, re-impl) | -9.9 [-17.6, -2.2] | -2.6 [-4.9, -0.4] | -6.9 [-13.4, -1.3] |
| Cross-encoder ms-marco MiniLM re-rank top-10 | -11.2 [-17.0, -4.6] | -1.6 [-3.1, +0.4] | -6.7 [-10.5, -2.6] |
| LLM judge Qwen2.5-14B re-rank top-5 | -11.8 [-16.4, -6.6] | +0.0 [+0.0, +0.0] | -6.9 [-9.7, -3.9] |
| LLM judge Qwen2.5-7B re-rank top-10 | -12.1 [-17.1, -7.0] | -4.2 [-6.7, -2.1] | -8.5 [-11.9, -5.0] |
| RRF hybrid: text + code + links + recency | -12.1 [-20.7, -3.7] | -2.2 [-4.0, -0.4] | -8.2 [-14.3, -2.3] |
| UniXcoder template-stripped text | -13.4 [-20.4, -5.9] | -5.8 [-10.5, -1.5] | -10.1 [-15.8, -4.3] |
| BM25 on diff | -19.8 [-30.5, -10.3] | -9.6 [-20.1, -1.9] | -14.8 [-24.8, -6.8] |
| Code overlap sum (files+hunks+lines) | -22.0 [-30.5, -13.6] | -11.2 [-19.2, -4.3] | -17.1 [-24.9, -10.2] |
| Links only, no tie-break (same issue / #ref) | -23.6 [-30.3, -16.7] | -18.2 [-24.9, -10.6] | -21.1 [-27.1, -14.6] |
| LLM judge Qwen2.5-1.5B re-rank top-5 | -24.3 [-29.2, -18.6] | +0.0 [+0.0, +0.0] | -14.5 [-17.2, -11.2] |
| Jina code embeddings v2 on diff | -24.9 [-34.5, -13.9] | -14.4 [-23.5, -5.0] | -19.3 [-27.8, -9.8] |
| BGE-small on diff | -25.6 [-35.8, -14.3] | -15.3 [-23.6, -6.5] | -20.6 [-29.6, -10.7] |
| Changed-files Jaccard | -26.2 [-34.8, -17.9] | -13.4 [-23.1, -5.7] | -20.2 [-28.3, -13.2] |
| Hunk overlap | -26.5 [-34.8, -17.0] | -12.1 [-19.2, -5.1] | -20.6 [-27.7, -13.2] |
| MiniLM on diff | -28.1 [-38.2, -17.1] | -16.3 [-25.0, -6.2] | -22.6 [-31.9, -12.6] |
| UniXcoder (code model) on diff | -28.8 [-40.0, -16.8] | -18.2 [-28.7, -6.4] | -23.8 [-34.0, -12.8] |
| Identical changed lines | -29.7 [-36.8, -20.9] | -18.8 [-26.1, -10.2] | -24.7 [-31.2, -16.8] |
| Cross-encoder BGE-reranker-base re-rank top-10 | -31.0 [-37.8, -23.9] | -4.5 [-7.1, -2.2] | -20.5 [-25.1, -15.7] |
| LLM judge Qwen2.5-14B re-rank top-10 | -32.3 [-42.3, -21.3] | -7.3 [-10.8, -3.7] | -21.3 [-28.0, -14.0] |
| LLM judge Qwen2.5-1.5B re-rank top-10 | -32.6 [-39.3, -25.0] | -5.1 [-8.0, -2.2] | -20.7 [-24.4, -16.0] |
| CodeBERT (mean-pooled) on diff | -39.9 [-50.9, -27.3] | -30.0 [-41.9, -15.5] | -34.6 [-45.7, -22.0] |
| Recency only (newest open PR first) | -62.9 [-71.5, -52.1] | -39.3 [-51.8, -23.3] | -51.6 [-61.6, -39.3] |


**Paired difference vs `INTRUDE + time (Wang et al. 2019), LR`, cross-author (points; CI excludes 0 = significant)**

| Strategy | ΔRecall@1 | ΔRecall@5 | ΔMRR |
|---|---|---|---|
| Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | +2.9 [+0.7, +5.1] | -0.3 [-1.5, +0.8] | +1.7 [+0.3, +3.0] |
| Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | +2.2 [-0.4, +4.3] | -1.0 [-2.2, +0.0] | +1.3 [-0.2, +2.5] |
| Links only (same issue / #ref) | +2.2 [-0.3, +5.0] | -1.0 [-2.5, +0.9] | +1.2 [-0.7, +3.1] |
| Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | +2.2 [+0.0, +4.3] | -0.3 [-1.5, +0.8] | +1.4 [+0.2, +2.6] |
| LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | +2.2 [+0.8, +3.8] | +0.3 [-0.8, +1.5] | +1.7 [+0.6, +2.8] |
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
| LLM judge Qwen2.5-7B re-rank top-5 | -3.5 [-6.6, -0.7] | +0.3 [-0.8, +1.5] | -2.0 [-4.1, -0.2] |
| Simili-bot (bot, re-impl) | -3.5 [-7.5, +0.9] | -1.3 [-2.9, +0.3] | -2.1 [-4.5, +0.6] |
| Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | -4.8 [-9.8, -0.4] | -0.3 [-1.8, +1.1] | -2.6 [-5.9, -0.1] |
| RRF hybrid: BM25 + embedding + code | -5.1 [-11.6, +0.4] | -0.3 [-1.6, +1.3] | -3.4 [-7.7, +0.4] |
| BM25 template-stripped | -5.4 [-9.7, -0.8] | -1.9 [-4.4, +0.8] | -3.4 [-6.2, -0.2] |
| Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | -7.0 [-11.8, -1.7] | -1.9 [-4.2, +0.3] | -4.8 [-8.0, -1.4] |
| BM25 raw text | -7.3 [-12.2, -2.1] | -1.9 [-4.4, +0.8] | -4.7 [-7.7, -1.2] |
| PRSense (bot, re-impl) | -8.6 [-17.6, -0.5] | -2.2 [-4.8, +0.0] | -6.0 [-13.4, -0.2] |
| Cross-encoder ms-marco MiniLM re-rank top-10 | -9.9 [-16.6, -3.1] | -1.3 [-2.9, +0.4] | -5.8 [-10.2, -1.6] |
| LLM judge Qwen2.5-14B re-rank top-5 | -10.5 [-14.9, -5.7] | +0.3 [-0.8, +1.5] | -6.0 [-8.7, -3.0] |
| LLM judge Qwen2.5-7B re-rank top-10 | -10.9 [-15.4, -6.2] | -3.8 [-6.2, -1.9] | -7.5 [-10.6, -4.4] |
| RRF hybrid: text + code + links + recency | -10.9 [-20.2, -2.0] | -1.9 [-4.1, +0.4] | -7.2 [-13.7, -1.3] |
| UniXcoder template-stripped text | -12.1 [-18.5, -4.9] | -5.4 [-10.5, -1.4] | -9.2 [-14.5, -3.7] |
| BM25 on diff | -18.5 [-30.3, -8.8] | -9.3 [-20.1, -1.5] | -13.9 [-24.2, -5.8] |
| Code overlap sum (files+hunks+lines) | -20.8 [-30.1, -12.1] | -10.9 [-19.0, -4.2] | -16.2 [-24.6, -9.1] |
| Links only, no tie-break (same issue / #ref) | -22.4 [-28.0, -16.3] | -17.9 [-24.7, -10.3] | -20.2 [-25.6, -14.3] |
| LLM judge Qwen2.5-1.5B re-rank top-5 | -23.0 [-27.7, -17.5] | +0.3 [-0.8, +1.5] | -13.6 [-16.4, -10.3] |
| Jina code embeddings v2 on diff | -23.6 [-33.5, -12.6] | -14.1 [-23.3, -4.5] | -18.3 [-27.3, -8.8] |
| BGE-small on diff | -24.3 [-34.6, -12.8] | -15.0 [-23.6, -6.3] | -19.7 [-29.0, -9.8] |
| Changed-files Jaccard | -24.9 [-34.2, -16.4] | -13.1 [-23.1, -5.5] | -19.2 [-28.1, -12.3] |
| Hunk overlap | -25.2 [-34.2, -16.0] | -11.8 [-19.0, -5.2] | -19.7 [-27.3, -12.2] |
| MiniLM on diff | -26.8 [-37.7, -15.8] | -16.0 [-24.9, -6.1] | -21.7 [-31.2, -11.8] |
| UniXcoder (code model) on diff | -27.5 [-38.7, -15.5] | -17.9 [-28.4, -6.1] | -22.9 [-33.4, -11.8] |
| Identical changed lines | -28.4 [-35.5, -19.7] | -18.5 [-25.7, -10.2] | -23.8 [-30.3, -15.8] |
| Cross-encoder BGE-reranker-base re-rank top-10 | -29.7 [-36.2, -23.6] | -4.2 [-6.7, -2.0] | -19.6 [-24.0, -15.3] |
| LLM judge Qwen2.5-14B re-rank top-10 | -31.0 [-40.5, -20.2] | -7.0 [-10.5, -3.7] | -20.3 [-26.7, -13.3] |
| LLM judge Qwen2.5-1.5B re-rank top-10 | -31.3 [-37.4, -23.8] | -4.8 [-7.7, -2.0] | -19.7 [-23.2, -15.3] |
| CodeBERT (mean-pooled) on diff | -38.7 [-49.3, -26.0] | -29.7 [-41.8, -15.4] | -33.7 [-44.9, -21.0] |
| Recency only (newest open PR first) | -61.7 [-69.6, -51.1] | -39.0 [-51.6, -23.3] | -50.7 [-60.3, -38.6] |


**Paired difference vs `contrib-guard/phoenix (bot, exact port)`, cross-author (points; CI excludes 0 = significant)**

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
| MiniLM raw text | -2.2 [-5.0, +0.3] | -1.0 [-2.1, +0.4] | -1.6 [-3.1, -0.3] |
| RRF hybrid: BM25 + embedding | -3.2 [-6.6, -0.6] | -0.6 [-3.2, +1.5] | -2.1 [-3.6, -0.7] |
| LLM judge Qwen2.5-7B re-rank top-5 | -3.5 [-7.7, +0.0] | +1.0 [+0.0, +2.5] | -2.2 [-5.0, +0.1] |
| Simili-bot (bot, re-impl) | -3.5 [-6.4, -0.4] | -0.6 [-1.8, +0.6] | -2.2 [-4.1, -0.5] |
| Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | -4.8 [-10.2, +0.0] | +0.3 [-0.9, +2.0] | -2.7 [-6.2, +0.2] |
| RRF hybrid: BM25 + embedding + code | -5.1 [-10.5, -0.3] | +0.3 [-1.0, +2.2] | -3.5 [-7.2, -0.3] |
| BM25 template-stripped | -5.4 [-9.1, -2.3] | -1.3 [-3.5, +0.0] | -3.6 [-5.5, -1.5] |
| Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | -7.0 [-12.0, -1.6] | -1.3 [-3.8, +1.4] | -5.0 [-8.2, -1.4] |
| BM25 raw text | -7.3 [-11.5, -3.7] | -1.3 [-3.5, +0.0] | -4.9 [-7.2, -2.4] |
| PRSense (bot, re-impl) | -8.6 [-16.5, -1.6] | -1.6 [-4.3, +1.2] | -6.2 [-12.9, -0.9] |
| Cross-encoder ms-marco MiniLM re-rank top-10 | -9.9 [-15.8, -4.3] | -0.6 [-2.7, +2.1] | -6.0 [-9.8, -2.3] |
| LLM judge Qwen2.5-14B re-rank top-5 | -10.5 [-15.2, -6.5] | +1.0 [+0.0, +2.5] | -6.2 [-9.3, -3.5] |
| LLM judge Qwen2.5-7B re-rank top-10 | -10.9 [-16.6, -5.6] | -3.2 [-6.1, -0.5] | -7.7 [-11.7, -4.0] |
| RRF hybrid: text + code + links + recency | -10.9 [-19.0, -3.2] | -1.3 [-3.4, +1.5] | -7.4 [-13.1, -2.0] |
| UniXcoder template-stripped text | -12.1 [-17.5, -6.6] | -4.8 [-9.9, -0.4] | -9.4 [-13.8, -4.9] |
| BM25 on diff | -18.5 [-28.6, -9.7] | -8.6 [-19.1, -0.4] | -14.0 [-24.1, -6.2] |
| Code overlap sum (files+hunks+lines) | -20.8 [-29.0, -12.5] | -10.2 [-18.4, -3.1] | -16.4 [-24.2, -9.1] |
| Links only, no tie-break (same issue / #ref) | -22.4 [-29.1, -15.5] | -17.3 [-24.1, -9.7] | -20.4 [-26.2, -13.9] |
| LLM judge Qwen2.5-1.5B re-rank top-5 | -23.0 [-28.2, -18.1] | +1.0 [+0.0, +2.5] | -13.7 [-16.7, -10.4] |
| Jina code embeddings v2 on diff | -23.6 [-32.0, -13.9] | -13.4 [-22.8, -3.7] | -18.5 [-26.5, -9.6] |
| BGE-small on diff | -24.3 [-33.4, -13.5] | -14.4 [-23.0, -5.5] | -19.9 [-28.2, -10.2] |
| Changed-files Jaccard | -24.9 [-33.3, -16.8] | -12.5 [-22.6, -4.6] | -19.4 [-27.7, -12.4] |
| Hunk overlap | -25.2 [-33.2, -16.5] | -11.2 [-18.6, -3.9] | -19.9 [-26.9, -12.5] |
| MiniLM on diff | -26.8 [-36.4, -16.7] | -15.3 [-24.0, -5.4] | -21.9 [-30.4, -12.3] |
| UniXcoder (code model) on diff | -27.5 [-37.1, -16.4] | -17.3 [-27.9, -5.2] | -23.0 [-32.4, -12.3] |
| Identical changed lines | -28.4 [-34.9, -20.2] | -17.9 [-25.5, -9.0] | -23.9 [-30.0, -16.3] |
| Cross-encoder BGE-reranker-base re-rank top-10 | -29.7 [-37.6, -22.5] | -3.5 [-6.0, -1.3] | -19.7 [-25.1, -14.8] |
| LLM judge Qwen2.5-14B re-rank top-10 | -31.0 [-39.8, -20.9] | -6.4 [-10.2, -2.3] | -20.5 [-26.6, -13.5] |
| LLM judge Qwen2.5-1.5B re-rank top-10 | -31.3 [-37.5, -24.4] | -4.2 [-7.2, -1.0] | -19.9 [-23.8, -15.6] |
| CodeBERT (mean-pooled) on diff | -38.7 [-47.9, -27.4] | -29.1 [-41.4, -14.3] | -33.8 [-44.0, -21.6] |
| Recency only (newest open PR first) | -61.7 [-69.0, -51.7] | -38.3 [-51.3, -22.1] | -50.9 [-59.5, -39.2] |


**False-alarm rate on 2,965 PRs with no duplicate** (threshold = median top-1 score of training-fold cross-author duplicates)

| Family | Strategy | False-alarm rate | Cross-author correct alerts |
|---|---|---|---|
| 9 LLM judge on top-k | LLM judge Claude Haiku 4.5 + Jinx (avg) top-5 | 0.5% | 50.8% |
| 7 supervised | Jinx features, gradient boosting | 1.1% | 41.5% |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned reranker + Qwen2.5-7B (stacked LR) | 1.2% | 48.9% |
| 3 links | Links only (same issue / #ref) | 1.2% | 47.0% |
| 9 LLM judge on top-k | LLM judge Claude Haiku 4.5 re-rank top-5 | 1.2% | 61.7% |
| 10 stacked cascade (ours) | Cascade: Jinx + fine-tuned BGE-reranker (stacked LR) | 1.3% | 45.0% |
| 10 stacked cascade (ours) | Fine-tuned BGE-reranker (repo-grouped folds) re-rank top-10 | 1.3% | 50.2% |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-7B judge (stacked LR) | 1.4% | 47.6% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-5 | 1.4% | 49.2% |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker + Qwen2.5-7B (stacked LR) | 1.4% | 47.9% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-5 | 1.4% | 47.6% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B + Jinx (avg) top-10 | 1.4% | 47.6% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-5 | 1.5% | 48.9% |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-Coder-7B judge (stacked LR) | 1.5% | 45.0% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B + Jinx (avg) top-10 | 1.5% | 48.9% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B + Jinx (avg) top-10 | 1.6% | 48.6% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-10 | 1.6% | 46.6% |
| 7 supervised | All signals, LR | 1.6% | 45.4% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-7B re-rank top-5 | 1.6% | 46.6% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-10 | 1.8% | 47.9% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-Coder-7B re-rank top-5 | 1.8% | 48.2% |
| 7 supervised | Jinx + MiniLM, LR (current tool) | 1.8% | 46.0% |
| 7 supervised | All signals, gradient boosting | 1.9% | 45.4% |
| 7 supervised | Jinx lexical, LR | 1.9% | 47.3% |
| 7 supervised | INTRUDE + time (Wang et al. 2019), LR | 2.0% | 47.3% |
| 4 embedding | BGE-small template-stripped | 2.3% | 46.0% |
| 4 embedding | BGE-small raw text | 2.3% | 45.4% |
| 3 links | Links only, no tie-break (same issue / #ref) | 2.3% | 61.0% |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 + Jinx (avg) top-10 | 2.6% | 48.9% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-10 | 2.8% | 49.2% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B + Jinx (avg) top-5 | 2.8% | 49.2% |
| 10 stacked cascade (ours) | Cascade: Jinx + Qwen2.5-14B judge (stacked LR) | 2.9% | 44.7% |
| 4 embedding | BGE-base template-stripped | 2.9% | 46.3% |
| 1 lexical | TF-IDF template-stripped | 3.1% | 46.3% |
| 1 lexical | TF-IDF raw text (Li et al. 2017) | 3.5% | 47.0% |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM + Jinx (avg) top-10 | 3.8% | 47.6% |
| 10 stacked cascade (ours) | Cascade: Jinx + BGE-reranker-base (stacked LR) | 4.1% | 50.5% |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-v2-m3 re-rank top-10 | 4.2% | 47.3% |
| 5 existing bot | Simili-bot (bot, re-impl) | 4.5% | 46.6% |
| 4 embedding | MiniLM template-stripped | 4.6% | 47.6% |
| 4 embedding | MiniLM raw text | 4.6% | 47.3% |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base + Jinx (avg) top-10 | 4.7% | 49.2% |
| 5 existing bot | PRSense (bot, re-impl) | 4.7% | 41.9% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-5 | 4.7% | 44.7% |
| 5 existing bot | contrib-guard/phoenix (bot, exact port) | 5.5% | 46.3% |
| 8 re-ranker on top-k | Cross-encoder ms-marco MiniLM re-rank top-10 | 6.0% | 44.7% |
| 4 embedding | BGE-small on diff | 6.0% | 38.7% |
| 4 embedding | Jina code embeddings v2 on diff | 7.0% | 40.6% |
| 4 embedding | MiniLM on diff | 8.9% | 39.0% |
| 4 embedding | UniXcoder (code model) on diff | 9.0% | 37.7% |
| 2 code | BM25 on diff | 10.1% | 38.3% |
| 1 lexical | BM25 template-stripped | 10.8% | 43.8% |
| 2 code | Changed-files Jaccard | 12.3% | 37.7% |
| 4 embedding | CodeBERT (mean-pooled) on diff | 13.3% | 32.9% |
| 1 lexical | BM25 raw text | 13.4% | 43.5% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-14B re-rank top-10 | 13.4% | 26.8% |
| 4 embedding | UniXcoder template-stripped text | 14.2% | 42.8% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-5 | 18.4% | 36.7% |
| 9 LLM judge on top-k | LLM judge Qwen2.5-1.5B re-rank top-10 | 18.8% | 31.9% |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding + code | 22.8% | 54.0% |
| 2 code | Code overlap sum (files+hunks+lines) | 23.9% | 33.5% |
| 2 code | Hunk overlap | 26.6% | 32.6% |
| 2 code | Identical changed lines | 33.8% | 30.4% |
| 8 re-ranker on top-k | Cross-encoder BGE-reranker-base re-rank top-10 | 36.2% | 29.4% |
| 0 trivial | Recency only (newest open PR first) | 46.6% | 7.7% |
| 6 unsupervised hybrid | RRF hybrid: BM25 + embedding | 48.7% | 76.0% |
| 6 unsupervised hybrid | RRF hybrid: text + code + links + recency | 53.0% | 48.2% |


**Operating curve: share of cross-author duplicates caught (correct top-1 above threshold) at a fixed false-alarm rate**

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


**Random-pair (classic) vs live-queue evaluation** (Kendall tau = 0.70)

| Strategy | Random-pair AUC | rank | Live-queue cross-author R@1 | rank |
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


**Latency and cost**

| Component | Numbers |
|---|---|
| lexical features ms/query | {"median": 4.3549504928342335, "p90": 43.002333160116265} |
| cpu_rerankers | {"cross-encoder/ms-marco-MiniLM-L6-v2": {"cpu_threads": 4, "pairs": 200, "ms_per_pair": 45.7, "ms_per_query_top10": 457.5}, "BAAI/bge-reranker-base": {"cpu_threads": 4, "pairs": 200, "ms_per_pair": 286.1, "ms_per_query_top10": 2861.4}} |
| gpu_bge_diff | {"tag": "bge_diff", "model": "BAAI/bge-small-en-v1.5", "variant": "diff", "maxlen": 512, "n": 76209, "dim": 384, "gpu": "L4", "seconds": 144.0, "ms_per_pr_gpu": 1.89} |
| gpu_bge_raw | {"tag": "bge_raw", "model": "BAAI/bge-small-en-v1.5", "variant": "raw", "maxlen": 512, "n": 76209, "dim": 384, "gpu": "L4", "seconds": 125.0, "ms_per_pr_gpu": 1.64} |
| gpu_bge_stripped | {"tag": "bge_stripped", "model": "BAAI/bge-small-en-v1.5", "variant": "stripped", "maxlen": 512, "n": 76209, "dim": 384, "gpu": "L4", "seconds": 120.7, "ms_per_pr_gpu": 1.583} |
| gpu_bgebase_stripped | {"tag": "bgebase_stripped", "model": "BAAI/bge-base-en-v1.5", "variant": "stripped", "maxlen": 512, "n": 76209, "dim": 768, "gpu": "L4", "seconds": 244.3, "ms_per_pr_gpu": 3.205} |
| gpu_ce_bgebase | {"tag": "ce_bgebase", "model": "BAAI/bge-reranker-base", "pairs": 43591, "gpu": "L4", "seconds": 137.5, "ms_per_pair_gpu": 3.154} |
| gpu_ce_bgem3 | {"tag": "ce_bgem3", "model": "BAAI/bge-reranker-v2-m3", "pairs": 43591, "gpu": "L4", "seconds": 445.7, "ms_per_pair_gpu": 10.224} |
| gpu_ce_msmarco | {"tag": "ce_msmarco", "model": "cross-encoder/ms-marco-MiniLM-L6-v2", "pairs": 43591, "gpu": "L4", "seconds": 41.6, "ms_per_pair_gpu": 0.954} |
| gpu_codebert_diff | {"tag": "codebert_diff", "model": "microsoft/codebert-base", "variant": "diff", "maxlen": 512, "n": 76209, "dim": 768, "gpu": "L4", "seconds": 262.1, "ms_per_pr_gpu": 3.44} |
| gpu_finetune_bgebase | {"gpu": "L4", "folds": [{"fold": 0, "base": "BAAI/bge-reranker-base", "train_pairs": 34896, "test_pairs": 8695, "train_s": 678.1, "predict_s": 121.0}, {"fold": 1, "base": "BAAI/bge-reranker-base", "train_pairs": 34892, "test_pairs": 8699, "train_s": 668.5, "predict_s": 120.4}, {"fold": 2, "base": "BAAI/bge-reranker-base", "train_pairs": 34821, "test_pairs": 8770, "train_s": 668.3, "predict_s": 121.9}, {"fold": 3, "base": "BAAI/bge-reranker-base", "train_pairs": 34868, "test_pairs": 8723, "train_s": 668.1, "predict_s": 118.9}, {"fold": 4, "base": "BAAI/bge-reranker-base", "train_pairs": 34887, "test_pairs": 8704, "train_s": 674.0, "predict_s": 121.1}], "train_s_total": 3357.0, "predict_ms_per_pair_gpu": 13.84} |
| gpu_jinacode_diff | {"tag": "jinacode_diff", "model": "jinaai/jina-embeddings-v2-base-code", "variant": "diff", "maxlen": 512, "n": 76209, "dim": 768, "gpu": "L4", "seconds": 620.2, "ms_per_pr_gpu": 8.138} |
| gpu_qwen14 | {"tag": "qwen14", "model": "Qwen/Qwen2.5-14B-Instruct", "pairs": 43591, "gpu": "L40S", "seconds": 5187.5, "ms_per_pair_gpu_batched": 119.003, "prompt_tokens_total": 49530439} |
| gpu_qwen15 | {"tag": "qwen15", "model": "Qwen/Qwen2.5-1.5B-Instruct", "pairs": 43591, "gpu": "L40S", "seconds": 687.2, "ms_per_pair_gpu_batched": 15.766, "prompt_tokens_total": 49530439} |
| gpu_qwen7 | {"tag": "qwen7", "model": "Qwen/Qwen2.5-7B-Instruct", "pairs": 43591, "gpu": "L40S", "seconds": 2567.3, "ms_per_pair_gpu_batched": 58.895, "prompt_tokens_total": 49530439} |
| gpu_qwencoder7 | {"tag": "qwencoder7", "model": "Qwen/Qwen2.5-Coder-7B-Instruct", "pairs": 43591, "gpu": "L40S", "seconds": 2478.3, "ms_per_pair_gpu_batched": 56.854, "prompt_tokens_total": 49530439} |
| gpu_unix_diff | {"tag": "unix_diff", "model": "microsoft/unixcoder-base", "variant": "diff", "maxlen": 512, "n": 76209, "dim": 768, "gpu": "L4", "seconds": 284.0, "ms_per_pr_gpu": 3.727} |
| gpu_unix_stripped | {"tag": "unix_stripped", "model": "microsoft/unixcoder-base", "variant": "stripped", "maxlen": 512, "n": 76209, "dim": 768, "gpu": "L4", "seconds": 247.7, "ms_per_pr_gpu": 3.251} |
| claude haiku45 API | {"pairs": 4587, "ms/pair median": 912.8988000011304, "ms/pair p90": 977.3896139959106, "model": "claude-haiku-4-5", "usd": 7.252751, "budget": 15.0} |
