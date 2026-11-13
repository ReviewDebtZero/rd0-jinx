import { CLI_OUTPUT, REPO } from "@/data/site";
import { Frame, Heading, Section } from "./ui";

/**
 * The real queue from the live Action run on harshuljain13/rd0-jinx, issue #11.
 * Titles and outcomes are as they happened: Jinx commented on #15, stayed quiet
 * on #13, and missed #14 (0.30, under the 0.5 threshold).
 */
const QUEUE = [
  { n: 12, title: "feat(cli): add --version flag", when: "17:14", verdict: null },
  { n: 13, title: "docs: explain how to choose the threshold", when: "17:14", verdict: "quiet" },
  { n: 14, title: "Print installed package version with jinx -V", when: "17:16", verdict: "missed" },
];

export function Demo() {
  return (
    <Section id="demo" index="01" label="what it looks like">
      <Heading lead="One comment." accent="With its reasons attached." />
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-dim">
        A real Action run on our own repository, where four PRs were opened against issue #11. Jinx
        commented on #15, stayed quiet on the unrelated #13, and missed #14. It never closes, blocks
        or labels anything — a maintainer still decides.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Frame
          title="github.com/harshuljain13/rd0-jinx · pull requests"
          right={<span className="text-jade">issue #11</span>}
        >
          <ul className="divide-y divide-line">
            {QUEUE.map((p) => (
              <li key={p.n} className="flex items-baseline gap-3 px-3 py-2.5 font-mono text-xs">
                <span className="text-fg-faint">#{p.n}</span>
                <span className="min-w-0 flex-1 truncate text-fg-dim">{p.title}</span>
                {p.verdict === "quiet" && <span className="shrink-0 text-fg-faint">no comment</span>}
                {p.verdict === "missed" && (
                  <span className="shrink-0 text-amber" title="scored 0.30, below the 0.5 threshold">
                    missed · 0.30
                  </span>
                )}
                <span className="w-10 shrink-0 text-right text-fg-faint">{p.when}</span>
              </li>
            ))}

            {/* The PR that gets the warning. */}
            <li className="bg-panel-2 px-3 py-2.5">
              <div className="flex items-baseline gap-3 font-mono text-xs">
                <span className="text-jade">#15</span>
                <span className="min-w-0 flex-1 truncate text-fg">feat(cli): add --version flag</span>
                <span className="w-10 shrink-0 text-right text-jade">17:18</span>
              </div>

              <div className="mt-3 border border-jade/30 bg-jade/[0.04]">
                <div className="flex items-center gap-2 border-b border-jade/20 px-3 py-1.5 font-mono text-[11px]">
                  <span className="text-jade">jinx</span>
                  <span className="border border-line px-1.5 text-fg-faint">bot</span>
                  <span className="ml-auto text-fg-faint">score 1.00</span>
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-xs text-fg">
                    This PR may duplicate{" "}
                    <span className="font-mono text-jade">#12 feat(cli): add --version flag</span>
                  </p>
                  <ul className="mt-2 space-y-1 font-mono text-[11px] text-fg-dim">
                    <li>· same linked issue (#11)</li>
                    <li>· shares 2 of 2 changed files (src/rd0_jinx/cli.py, tests/test_cli_version.py)</li>
                    <li>· 100% of changed line ranges overlap</li>
                    <li>· 56% of added lines are identical</li>
                    <li>· similar title/description after removing agent template text (0.73)</li>
                  </ul>
                  <p className="mt-2.5 border-t border-jade/20 pt-2 text-[11px] italic text-fg-faint">
                    Automated hint, not a decision. A maintainer should confirm before closing anything.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </Frame>

        <Frame
          title="the same check, from the CLI"
          right={
            <a href={`${REPO}/tree/main/packages/rd0-jinx/examples`} className="hover:text-jade">
              examples →
            </a>
          }
        >
          <pre className="overflow-x-auto px-3 py-3 font-mono text-[10px] leading-relaxed text-fg-dim">
            {CLI_OUTPUT}
          </pre>
        </Frame>
      </div>

      <p className="mt-4 font-mono text-[11px] text-fg-faint">
        The CLI example is a real queue from AIDev: huggingface/transformers #44134 and the 19 PRs that
        were open when it was created.{" "}
        <a href={`${REPO}/pull/15`} className="text-fg-dim underline-offset-2 hover:text-jade hover:underline">
          See the original comment on #15 →
        </a>
      </p>
    </Section>
  );
}
