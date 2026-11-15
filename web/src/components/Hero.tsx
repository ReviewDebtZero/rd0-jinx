import data from "@/data/jinx.json";
import { AGENTS, PIP_INSTALL, REPO } from "@/data/site";
import { CopyLine } from "./CopyLine";
import { CountUp } from "./motion/CountUp";
import { Typewriter } from "./motion/Typewriter";
import { Pill } from "./ui";

const WAYS = [
  { cmd: PIP_INSTALL, what: "the library and the CLI" },
  { cmd: "jinx check pr.json --open-queue q.jsonl", what: "check one PR locally" },
  { cmd: "uses: harshuljain13/rd0-jinx@main", what: "comment on every new PR" },
];

export function Hero() {
  const jinx = data.methods[0];

  return (
    <section id="top" className="grid-bg border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-16 sm:pt-24">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="accent">open source</Pill>
          <Pill>MIT</Pill>
          <Pill>CPU only</Pill>
          <Pill>no API key</Pill>
          <Pill>{data.n_cross} replayed duplicates</Pill>
        </div>

        <p className="mt-8 font-mono text-[13px] text-fg-dim">
          <Typewriter text="// jinx — duplicate warnings for pull requests from coding agents" />
        </p>

        <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Review it once.
          <br />
          <span className="text-accent">Not twice.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-fg-dim sm:text-lg">
          Coding agents reopen work that is already sitting in the queue. Jinx checks every new pull
          request against the open ones and leaves <span className="text-fg">one</span> comment when it
          finds a likely duplicate — naming the PR it matches and why it matched.
        </p>

        <div className="mt-8 max-w-xl">
          <CopyLine command={PIP_INSTALL} />
        </div>

        <div className="mt-6 max-w-xl border border-line">
          <div className="border-b border-line bg-panel-2 px-3 py-1.5 font-mono text-[12.5px] text-fg-faint">
            ways to run
          </div>
          <table className="w-full font-mono text-[13px]">
            <tbody>
              {WAYS.map((w) => (
                <tr key={w.cmd} className="border-b border-line last:border-0">
                  <td className="break-all px-3 py-2 text-fg">{w.cmd}</td>
                  <td className="hidden px-3 py-2 text-right text-fg-faint sm:table-cell">{w.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={REPO}
            className="glow-accent border border-accent/50 bg-accent/10 px-4 py-2 font-mono text-[15px] text-accent transition-colors hover:bg-accent/15"
          >
            Star on GitHub
          </a>
          <a
            href="#benchmark"
            className="border border-line px-4 py-2 font-mono text-[15px] text-fg-dim transition-colors hover:border-line-bright hover:text-fg"
          >
            See the benchmark →
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12.5px] text-fg-faint">
          <span className="text-fg-dim">reads PRs from</span>
          {AGENTS.map((a) => (
            <span key={a} className="border border-line px-2 py-0.5">
              {a}
            </span>
          ))}
        </div>
      </div>

      <StatStrip latency={data.latency_ms} far={jinx.far} top1={jinx.top1} n={data.n_cross} />
    </section>
  );
}

function StatStrip({
  latency,
  far,
  top1,
  n,
}: {
  latency: number;
  far: number;
  top1: number;
  n: number;
}) {
  const stats = [
    { to: latency, decimals: 1, prefix: "", suffix: " ms", k: "per pull request", sub: "median, 4 CPU threads" },
    { to: far, decimals: 1, prefix: "", suffix: "", k: "false alarms / 100", sub: "on PRs with no duplicate" },
    { to: Math.round(top1), decimals: 0, prefix: "", suffix: "/100", k: "right PR ranked first", sub: `over ${n} real duplicates` },
    { to: 0, decimals: 0, prefix: "$", suffix: "", k: "to run", sub: "no LLM, no API key" },
    { to: 0, decimals: 0, prefix: "", suffix: "", k: "runtime dependencies", sub: "pure Python, 3.9+" },
  ];
  return (
    <div className="border-t border-line bg-panel/50">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
        {stats.map((s) => (
          <div key={s.k} className="border-b border-line px-5 py-5 lg:border-b-0">
            <p className="font-mono text-3xl font-bold tracking-tight text-note">
              <CountUp to={s.to} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-[13px] text-fg-dim">{s.k}</p>
            <p className="mt-0.5 font-mono text-[12.5px] text-fg-faint">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
