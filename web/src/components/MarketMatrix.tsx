import { COLUMNS, TOOLS, type Cell, type Group } from "@/data/market";
import { PAPERS } from "@/data/site";
import { Heading, Section } from "./ui";

function Mark({ v }: { v: Cell }) {
  if (v === "yes") return <span className="text-jade">✓</span>;
  if (v === "part") return <span className="text-amber">~</span>;
  return <span className="text-fg-faint">·</span>;
}

const GROUPS: { key: Group; label: string; sub: string }[] = [
  { key: "reviewer", label: "AI reviewers", sub: "built to judge the code inside one PR" },
  { key: "duplicate", label: "Duplicate-PR detectors", sub: "built to compare a PR against the queue" },
  { key: "platform", label: "The platform itself", sub: "what GitHub gives you out of the box" },
];

export function MarketMatrix() {
  const reviewers = TOOLS.filter((t) => t.group === "reviewer");

  return (
    <Section id="compare" index="02" label="where jinx sits">
      <Heading lead="They read your diff." accent="None of them read your queue." />

      {/* The insight, stated before any table: these are two different questions. */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="border border-line bg-panel/40 p-6">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
            every AI reviewer asks
          </p>
          <p className="mt-4 text-2xl font-semibold leading-snug text-fg-dim">
            &ldquo;Is this code
            <br />
            any good?&rdquo;
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {reviewers.map((t) => (
              <span
                key={t.name}
                className="border border-line px-2 py-1 font-mono text-[11px] text-fg-faint"
              >
                {t.name}
              </span>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-fg-faint">
            They are good at it, and Jinx does not compete with them. It never looks at whether your
            code is correct.
          </p>
        </div>

        <div className="border border-jade/40 bg-jade/[0.05] p-6">
          <p className="font-mono text-[11px] uppercase tracking-wider text-jade">nobody asks</p>
          <p className="mt-4 text-2xl font-semibold leading-snug text-fg">
            &ldquo;Is this PR
            <br />
            already open?&rdquo;
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="border border-jade/50 bg-jade/10 px-2 py-1 font-mono text-[11px] text-jade">
              jinx
            </span>
          </div>
          <ul className="mt-5 space-y-1.5 font-mono text-[11px] text-fg-dim">
            <li>▸ 1.9 false alarms per 100 clean PRs</li>
            <li>▸ names the PR it matched, and why</li>
            <li>▸ free, CPU-only, no API key</li>
          </ul>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-fg-dim">
        We read the full public docs of every major AI review tool in November 2026, searching for
        duplicate, similar or related <span className="text-fg">pull request</span> detection. Where
        duplicate detection exists at all, it is for <span className="text-fg">issues</span>.
      </p>

      {/* The detail, grouped by what each tool is for. */}
      <div className="mt-6 overflow-x-auto border border-line">
        <table className="w-full min-w-[54rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-panel-2 font-mono text-[11px] text-fg-dim">
              <th scope="col" className="px-4 py-2.5 font-normal">
                tool
              </th>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  title={c.label}
                  className={`px-3 py-2.5 text-center font-normal ${
                    c.key === "dupPr" ? "text-jade" : ""
                  }`}
                >
                  {c.short}
                </th>
              ))}
              <th scope="col" className="px-4 py-2.5 font-normal">
                price
              </th>
            </tr>
          </thead>

          {GROUPS.map((g) => (
            <tbody key={g.key}>
              <tr className="border-b border-line bg-panel/60">
                <td colSpan={COLUMNS.length + 2} className="px-4 py-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-fg-dim">
                    {g.label}
                  </span>
                  <span className="ml-3 font-mono text-[11px] text-fg-faint">{g.sub}</span>
                </td>
              </tr>

              {TOOLS.filter((t) => t.group === g.key).map((t) => (
                <tr
                  key={t.name}
                  className={`border-b border-line last:border-0 ${t.ours ? "bg-jade/[0.06]" : ""}`}
                >
                  <th scope="row" className="px-4 py-3 text-left font-normal">
                    <span
                      className={`font-mono text-xs ${
                        t.ours ? "font-semibold text-jade" : "text-fg"
                      }`}
                    >
                      {t.ours && <span className="mr-1.5">▸</span>}
                      {t.name}
                    </span>
                  </th>
                  {COLUMNS.map((c) => (
                    <td
                      key={c.key}
                      className={`px-3 py-3 text-center font-mono text-sm ${
                        c.key === "dupPr" ? "bg-ink/40" : ""
                      }`}
                    >
                      <Mark v={t[c.key] as Cell} />
                    </td>
                  ))}
                  <td className="px-4 py-3 font-mono text-[11px] text-fg-dim">{t.price}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <p className="mt-3 font-mono text-[11px] text-fg-faint">
        <span className="text-jade">✓</span> yes · <span className="text-amber">~</span> partly ·{" "}
        <span>·</span> no. The highlighted column is the one that splits the categories.
      </p>

      {/* What "partly" is hiding, for the rows where it matters. */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.filter((t) => t.note && (t.ours || t.dupPr !== "no")).map((t) => (
          <div key={t.name} className="border border-line bg-panel p-3">
            <p className={`font-mono text-[11px] ${t.ours ? "text-jade" : "text-fg-dim"}`}>
              {t.name}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-fg-dim">{t.note}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-3xl border-l-2 border-amber/50 bg-amber/[0.04] px-4 py-3 text-xs leading-relaxed text-fg-dim">
        <span className="font-mono text-amber">honest note · </span>
        This table is about what each tool is built to do, read from its own documentation. We have
        not benchmarked the commercial tools head to head — that needs paid accounts on live
        repositories — so nothing here says Jinx finds more bugs or reviews better than CodeRabbit or
        Greptile. It does not. It answers a question they do not ask. The measured comparison, further
        down, is against the tools that actually do duplicate-PR detection.{" "}
        <a
          href={PAPERS.marketNotes}
          className="text-fg underline-offset-2 hover:text-jade hover:underline"
        >
          Read the full audit →
        </a>
      </p>
    </Section>
  );
}
