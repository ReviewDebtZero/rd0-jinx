import data from "@/data/jinx.json";
import { ACTION_YAML, PAPERS, REPO } from "@/data/site";
import { CopyLine } from "./CopyLine";
import { Frame, Heading, Section } from "./ui";

export function Problem() {
  const c = data.cost;
  const stats = [
    { v: `${c.after_1h}%`, k: "went unnoticed for over an hour" },
    { v: `${c.after_1d}%`, k: "went unnoticed for over a day" },
    { v: `${c.reviewed_before}%`, k: "had already pulled in a human review or comment" },
  ];
  return (
    <Section index="00" label="why this exists">
      <Heading lead="A duplicate PR costs a review," accent="not a merge conflict." />
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-dim">
        Across {data.n_cross} real cases in AIDev where one agent&rsquo;s PR repeated a PR from a
        different author:
      </p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.k} className="border border-line bg-panel p-4">
            <dd className="font-mono text-3xl font-semibold tracking-tight text-amber">{s.v}</dd>
            <dt className="mt-2 text-xs leading-relaxed text-fg-dim">{s.k}</dt>
          </div>
        ))}
      </dl>
      <p className="mt-4 font-mono text-[11px] text-fg-faint">
        The reviewer&rsquo;s time is already spent by the time anyone notices. Jinx aims to say it on
        day zero.
      </p>
    </Section>
  );
}

export function Install() {
  return (
    <Section id="install" index="05" label="add it to your repo">
      <Heading lead="Two minutes." accent="Then it is just there." />

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] text-fg-dim">1 · as a GitHub Action</p>
          <p className="mt-2 text-xs leading-relaxed text-fg-dim">
            Drop this in <code className="text-fg">.github/workflows/jinx.yml</code>. Jinx comments
            on a new PR when it finds a likely duplicate, and edits that same comment when the PR
            changes — it never posts twice.
          </p>
          <Frame className="mt-3" title=".github/workflows/jinx.yml">
            <pre className="overflow-x-auto px-3 py-3 font-mono text-[11px] leading-relaxed text-fg-dim">
              {ACTION_YAML}
            </pre>
          </Frame>
          <p className="mt-3 text-xs leading-relaxed text-fg-faint">
            <code className="text-fg-dim">pull_request_target</code> is safe here: Jinx reads PR data
            through the GitHub API and never checks out or runs the PR&rsquo;s code.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] text-fg-dim">2 · or from the command line</p>
          <p className="mt-2 text-xs leading-relaxed text-fg-dim">
            Check one PR against a queue on your own machine. Input takes the GitHub API&rsquo;s JSON
            shape; the queue can be a JSON list or JSON lines.
          </p>
          <div className="mt-3 space-y-2">
            <CopyLine command="pip install jinx-pr" />
            <CopyLine command="jinx check new_pr.json --open-queue open_prs.jsonl" />
          </div>

          <div className="mt-4 border border-line">
            <div className="border-b border-line bg-panel-2 px-3 py-1.5 font-mono text-[11px] text-fg-faint">
              flags
            </div>
            <table className="w-full font-mono text-[11px]">
              <tbody className="text-fg-dim">
                {[
                  ["--top N", "list at most N candidates"],
                  ["--threshold X", "flag only scores ≥ X (default 0.5)"],
                  ["--json", "machine-readable output"],
                  ["--embed", "also use the local MiniLM model"],
                  ["--templates FILE", "templates learned from your own PRs"],
                ].map(([f, d]) => (
                  <tr key={f} className="border-b border-line last:border-0">
                    <td className="whitespace-nowrap px-3 py-2 text-fg">{f}</td>
                    <td className="px-3 py-2 text-fg-faint">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <a
            href={`${REPO}#readme`}
            className="mt-4 inline-block border border-line px-3 py-1.5 font-mono text-xs text-fg-dim transition-colors hover:border-line-bright hover:text-fg"
          >
            Full documentation →
          </a>
        </div>
      </div>
    </Section>
  );
}

export function Limits() {
  const h = data.haiku;
  return (
    <Section index="06" label="what it does not do">
      <Heading lead="The limits," accent="stated plainly." />
      <ul className="mt-6 grid gap-3 lg:grid-cols-3">
        {[
          {
            t: "It misses rewrites",
            b: "Two PRs that fix the same issue with different files and different words will slip past. Lowering the threshold catches more of them and costs you false alarms.",
          },
          {
            t: "It has not been run by strangers",
            b: "The numbers come from historical replays plus a live Action run on our own repository. No outside maintainer has deployed it yet. If you try it, we want the bug report.",
          },
          {
            t: "An LLM would do better",
            b: `Claude Haiku re-checking Jinx's top five cuts false alarms from ${h.jinx_far_same_sample} to ${h.far} per 100 PRs, for about ${h.cents_per_pr}¢ per PR. That needs an API key, so it is not in the default.`,
          },
        ].map((x) => (
          <li key={x.t} className="border border-line bg-panel p-4">
            <h3 className="font-mono text-xs text-amber">{x.t}</h3>
            <p className="mt-2 text-xs leading-relaxed text-fg-dim">{x.b}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Research() {
  return (
    <Section id="research" index="07" label="the research">
      <Heading lead="How you build the queue" accent="decides who wins." />
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-dim">
        Most published duplicate-PR evaluations score against a pool that includes recently closed
        PRs. Keep closed-in-the-last-7-days PRs in the queue and Jinx leads the classic research
        detector by 9 points. Score it the way a bot actually sees the world — open PRs only — and
        the two tie. The benchmark design was doing the work. We report both, and we pre-registered a
        kill rule that our own method then failed on cross-author Recall@5.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Empirical study", d: "Re-evaluating duplicate PR detection on coding-agent PRs, 66 strategies.", href: PAPERS.empirical },
          { t: "Tool demo paper", d: "Jinx: explainable duplicate warnings for agent pull requests.", href: PAPERS.tooldemo },
          { t: "Full report", d: "Every strategy, per-class results, CIs, latency and cost.", href: PAPERS.report },
          { t: "Data card", d: "How the benchmark was built, and its known gaps.", href: PAPERS.dataCard },
        ].map((x) => (
          <a
            key={x.t}
            href={x.href}
            className="border border-line bg-panel p-4 transition-colors hover:border-jade/40"
          >
            <p className="font-mono text-xs text-jade">{x.t} →</p>
            <p className="mt-2 text-xs leading-relaxed text-fg-dim">{x.d}</p>
          </a>
        ))}
      </div>
    </Section>
  );
}
