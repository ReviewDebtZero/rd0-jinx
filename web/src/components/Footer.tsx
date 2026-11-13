import { AIDEV, PAPERS, REPO } from "@/data/site";
import { CopyLine } from "./CopyLine";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-mono text-base font-semibold tracking-tight">jinx</p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-fg-dim">
              Explainable duplicate warnings for pull requests from coding agents. Free, MIT
              licensed, and it runs on the CI machine&rsquo;s CPU.
            </p>
            <div className="mt-4 max-w-sm">
              <CopyLine command="pip install jinx-pr" />
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] text-fg-faint">project</p>
            <ul className="mt-3 space-y-2 font-mono text-xs text-fg-dim">
              <li>
                <a href={REPO} className="hover:text-jade">
                  GitHub
                </a>
              </li>
              <li>
                <a href={`${REPO}/issues`} className="hover:text-jade">
                  Issues
                </a>
              </li>
              <li>
                <a href={`${REPO}/blob/main/LICENSE`} className="hover:text-jade">
                  MIT license
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] text-fg-faint">research</p>
            <ul className="mt-3 space-y-2 font-mono text-xs text-fg-dim">
              <li>
                <a href={PAPERS.empirical} className="hover:text-jade">
                  Empirical study
                </a>
              </li>
              <li>
                <a href={PAPERS.tooldemo} className="hover:text-jade">
                  Tool demo paper
                </a>
              </li>
              <li>
                <a href={PAPERS.report} className="hover:text-jade">
                  Full report
                </a>
              </li>
              <li>
                <a href={AIDEV} className="hover:text-jade">
                  AIDev dataset
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-5 font-mono text-[11px] text-fg-faint">
          <p>Harshul Jain · Saurabh Yergattikar · Tanya Sah · Parv Khatri</p>
          <p>
            Benchmark derived from{" "}
            <a href={AIDEV} className="hover:text-jade">
              AIDev
            </a>{" "}
            (CC BY 4.0) · formerly AgentDup
          </p>
        </div>
      </div>
    </footer>
  );
}
