/**
 * Capability matrix against the tools actually on the market.
 *
 * Sourced from `research/docs/commercial_tools_comparison.md`, which was built
 * by reading each vendor's own docs (and source, where open) on 9-10 Nov 2026,
 * plus published pricing. "no" means we searched the vendor's full docs for
 * duplicate / similar PR / related PR and found no such feature. It does not
 * prove no hidden feature exists.
 *
 * We have not benchmarked the commercial tools head to head: measuring them
 * needs paid accounts installed on live repositories. These rows are about what
 * each tool is built to do, not about who scores higher.
 */
export type Cell = "yes" | "part" | "no";

export type Tool = {
  name: string;
  kind: string;
  ours?: boolean;
  dupPr: Cell;
  explains: Cell;
  diffAware: Cell;
  noKey: Cell;
  selfHosted: Cell;
  price: string;
  note: string;
};

export const COLUMNS = [
  { key: "dupPr", label: "Warns a PR duplicates an open one", short: "duplicate PR" },
  { key: "explains", label: "Explains why it matched", short: "explains" },
  { key: "diffAware", label: "Looks at the diff, not just the text", short: "diff-aware" },
  { key: "noKey", label: "Runs with no API key or LLM", short: "no API key" },
  { key: "selfHosted", label: "Code never leaves your CI", short: "stays local" },
] as const;

export const TOOLS: Tool[] = [
  {
    name: "Jinx",
    kind: "duplicate-PR detector",
    ours: true,
    dupPr: "yes",
    explains: "yes",
    diffAware: "yes",
    noKey: "yes",
    selfHosted: "yes",
    price: "Free, MIT",
    note: "Ranks a new PR against every open PR and gives code-level reasons.",
  },
  {
    name: "CodeRabbit",
    kind: "AI reviewer + triage",
    dupPr: "part",
    explains: "yes",
    diffAware: "yes",
    noKey: "no",
    selfHosted: "no",
    price: "$24–72/dev/mo · free on public repos",
    note: "Duplicate detection is for issues. Triage surfaces close candidates for superseded PRs, and 'Related PRs' lists PRs touching the same code as context — neither is a duplicate alarm on a new PR.",
  },
  {
    name: "Greptile",
    kind: "AI reviewer",
    dupPr: "no",
    explains: "yes",
    diffAware: "yes",
    noKey: "no",
    selfHosted: "part",
    price: "~$30/seat/mo or $1/review credit",
    note: "Codebase-aware review of one PR. Self-hosting with your own LLM on Enterprise only.",
  },
  {
    name: "Graphite Diamond",
    kind: "AI reviewer",
    dupPr: "no",
    explains: "yes",
    diffAware: "yes",
    noKey: "no",
    selfHosted: "no",
    price: "$20–40/user/mo",
    note: "Reviews each PR aware of the stack beneath it. GitHub only.",
  },
  {
    name: "GitHub Copilot review",
    kind: "AI reviewer",
    dupPr: "no",
    explains: "yes",
    diffAware: "yes",
    noKey: "no",
    selfHosted: "no",
    price: "Paid Copilot plan",
    note: "Reviews the code inside one PR.",
  },
  {
    name: "Qodo Merge",
    kind: "AI reviewer",
    dupPr: "no",
    explains: "yes",
    diffAware: "yes",
    noKey: "no",
    selfHosted: "part",
    price: "Free tier + paid",
    note: "Has /similar_issue for issues, via embeddings and a vector DB. Nothing equivalent for PRs.",
  },
  {
    name: "contrib-guard",
    kind: "duplicate-PR bot",
    dupPr: "yes",
    explains: "no",
    diffAware: "no",
    noKey: "yes",
    selfHosted: "yes",
    price: "Free, open source",
    note: "TF-IDF on title and body over a 0.4 threshold. Reports a score, not a reason. The strongest existing bot in our benchmark.",
  },
  {
    name: "Simili-bot",
    kind: "duplicate-PR bot",
    dupPr: "yes",
    explains: "part",
    diffAware: "no",
    noKey: "no",
    selfHosted: "no",
    price: "Needs a paid embedding key",
    note: "Embeddings plus an LLM check.",
  },
  {
    name: "GitHub, out of the box",
    kind: "platform",
    dupPr: "no",
    explains: "no",
    diffAware: "no",
    noKey: "yes",
    selfHosted: "yes",
    price: "Free",
    note: 'A human types "Duplicate of #N" once they notice.',
  },
];
