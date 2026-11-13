import data from "@/data/jinx.json";
import { Heading, Section } from "./ui";

const STEPS = [
  {
    id: "s.01",
    title: "Strip the template",
    body: "Agent PRs all open with the same “## Summary … ## Testing” scaffolding. Those lines were learned from 361k agent PRs in AIDev, and anything repeated across the current queue is dropped too. Without this, unrelated PRs look alike.",
  },
  {
    id: "s.02",
    title: "Compare the code",
    body: "Which files both PRs change, how far their changed line ranges overlap, and how many added lines are byte-identical. This is the signal the text-only bots do not have.",
  },
  {
    id: "s.03",
    title: "Follow the links",
    body: "Whether both PRs close the same issue, or the new one references the old. Only forward references count, matching what a bot could actually know at the time.",
  },
  {
    id: "s.04",
    title: "Add the context",
    body: "Same author, and the time gap between the two PRs. A re-opened or replacement PR looks different from two agents colliding.",
  },
  {
    id: "s.05",
    title: "Combine, then explain",
    body: "A small logistic model turns those signals into one score from 0 to 1. The shipped weights were trained on all 4,832 AIDev queue queries. Every reason that fired is printed in the comment.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how" index="04" label="how it works">
      <Heading lead="Four signals and a logistic model." accent="No LLM anywhere in the loop." />
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-dim">
        The whole thing is arithmetic over PR metadata and the diff. That is why it costs nothing,
        finishes in {data.latency_ms} ms, and can name every reason it fired.
      </p>

      <div className="mt-8 overflow-x-auto border border-line bg-panel">
        <pre className="px-5 py-4 font-mono text-[11px] leading-relaxed text-fg-dim">
{`  new PR ──┐
           ├─▶ strip template ──┬─▶ code overlap   files · line ranges · added lines ─┐
  open ────┘                    ├─▶ links          same issue · #mention             ─┤
  queue                         ├─▶ text           TF-IDF · optional MiniLM           ├─▶ logistic ──▶ ranked
  (≤200)                        └─▶ context        same author · time gap            ─┘    model        + reasons`}
        </pre>
      </div>

      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.id} className="border border-line bg-panel p-4">
            <p className="font-mono text-[11px] text-jade">{s.id}</p>
            <h3 className="mt-2 text-sm font-semibold text-fg">{s.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-fg-dim">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
