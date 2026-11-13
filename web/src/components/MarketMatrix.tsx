import { COLUMNS, TOOLS, type Cell } from "@/data/market";
import { PAPERS } from "@/data/site";
import { Heading, Section } from "./ui";

function Mark({ v }: { v: Cell }) {
  if (v === "yes") return <span className="text-jade">yes</span>;
  if (v === "part") return <span className="text-amber">partly</span>;
  return <span className="text-fg-faint">no</span>;
}

export function MarketMatrix() {
  return (
    <Section id="compare" index="02" label="where jinx sits">
      <Heading lead="The reviewers read your diff." accent="None of them read your queue." />
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-dim">
        We read the full public docs of every major AI review tool in November 2026 looking for
        duplicate, similar or related pull-request detection. The AI reviewers are good at a
        different question — <span className="text-fg">is this code any good?</span> — and none of
        them answers <span className="text-fg">is this PR already open somewhere else?</span>{" "}
        Where duplicate detection does exist, it is for issues.
      </p>

      <div className="mt-8 overflow-x-auto border border-line">
        <table className="w-full min-w-[56rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-panel-2 font-mono text-[11px] text-fg-dim">
              <th scope="col" className="px-3 py-2.5 font-normal">
                tool
              </th>
              {COLUMNS.map((c) => (
                <th key={c.key} scope="col" className="px-3 py-2.5 font-normal" title={c.label}>
                  {c.short}
                </th>
              ))}
              <th scope="col" className="px-3 py-2.5 font-normal">
                price
              </th>
            </tr>
          </thead>
          <tbody className="font-mono text-xs">
            {TOOLS.map((t) => (
              <tr
                key={t.name}
                className={`border-b border-line align-top last:border-0 ${
                  t.ours ? "bg-jade/[0.05]" : ""
                }`}
              >
                <th scope="row" className="px-3 py-3 text-left font-normal">
                  <span className={t.ours ? "font-semibold text-jade" : "text-fg"}>{t.name}</span>
                  <span className="mt-0.5 block text-[11px] font-normal text-fg-faint">{t.kind}</span>
                </th>
                {COLUMNS.map((c) => (
                  <td key={c.key} className="px-3 py-3">
                    <Mark v={t[c.key] as Cell} />
                  </td>
                ))}
                <td className="px-3 py-3 text-fg-dim">{t.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.filter((t) => t.note && (t.ours || t.dupPr !== "no")).map((t) => (
          <div key={t.name} className="border border-line bg-panel p-3">
            <p className={`font-mono text-[11px] ${t.ours ? "text-jade" : "text-fg-dim"}`}>{t.name}</p>
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
        <a href={PAPERS.marketNotes} className="text-fg underline-offset-2 hover:text-jade hover:underline">
          Read the full audit →
        </a>
      </p>
    </Section>
  );
}
