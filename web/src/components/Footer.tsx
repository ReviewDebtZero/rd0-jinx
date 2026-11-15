import { AIDEV, PAPERS, REPO } from "@/data/site";
import { CopyLine } from "./CopyLine";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-mono text-[17px] font-bold tracking-tight">
              <span className="text-accent">rd0</span>
              <span className="text-fg-faint">/</span>jinx
            </p>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-fg-dim">
              <span className="text-fg">rd0</span> is a toolkit for review debt — the reviewer time a
              team owes but has not paid. <span className="text-fg">Jinx</span> is its first tool: it
              catches pull requests that redo work already sitting in the queue. Free, MIT licensed,
              and it runs on the CI machine&rsquo;s CPU.
            </p>
            <div className="mt-4 max-w-sm">
              <CopyLine command="pip install rd0-jinx" />
            </div>
          </div>

          <div>
            <p className="font-mono text-[12.5px] text-fg-faint">project</p>
            <ul className="mt-3 space-y-2 font-mono text-[13px] text-fg-dim">
              <li>
                <a href={REPO} className="hover:text-accent">
                  GitHub
                </a>
              </li>
              <li>
                <a href={`${REPO}/issues`} className="hover:text-accent">
                  Issues
                </a>
              </li>
              <li>
                <a href={`${REPO}/blob/main/LICENSE`} className="hover:text-accent">
                  MIT license
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[12.5px] text-fg-faint">research</p>
            <ul className="mt-3 space-y-2 font-mono text-[13px] text-fg-dim">
              <li>
                <a href={PAPERS.empirical} className="hover:text-accent">
                  Empirical study
                </a>
              </li>
              <li>
                <a href={PAPERS.tooldemo} className="hover:text-accent">
                  Tool demo paper
                </a>
              </li>
              <li>
                <a href={PAPERS.report} className="hover:text-accent">
                  Full report
                </a>
              </li>
              <li>
                <a href={AIDEV} className="hover:text-accent">
                  AIDev dataset
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-5 font-mono text-[12.5px] text-fg-faint">
          <p>Harshul Jain · Saurabh Yergattikar · Tanya Sah · Parv Khatri</p>
          <p>
            Benchmark derived from{" "}
            <a href={AIDEV} className="hover:text-accent">
              AIDev
            </a>{" "}
            (CC BY 4.0) · formerly AgentDup
          </p>
        </div>
      </div>
    </footer>
  );
}
