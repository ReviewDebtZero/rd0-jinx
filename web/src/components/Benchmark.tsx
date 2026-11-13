"use client";

import { useId, useState } from "react";
import data from "@/data/jinx.json";
import { AIDEV, PAPERS } from "@/data/site";
import { Heading, Section } from "./ui";

const METHODS = data.methods;
const MAX_FAR = Math.max(...METHODS.map((m) => m.far_hi));
const FAR_STEPS = ["0.01", "0.02", "0.05", "0.1", "0.2"] as const;

export function Benchmark() {
  return (
    <Section id="benchmark" index="03" label="measured against real detectors">
      <Heading lead="Same recall as the best of them." accent="A third of the false alarms." />
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-dim">
        We replayed {data.n_cross} real duplicate pull requests from the public{" "}
        <a href={AIDEV} className="text-fg underline-offset-2 hover:text-accent hover:underline">
          AIDev
        </a>{" "}
        dataset. Each method saw only the PRs that were genuinely open at that moment, the way a bot
        would. Intervals are 95% bootstrap CIs clustered by repository.
      </p>

      <FarChart />
      <ResultsTable />
      <OperatingPoint />

      <p className="mt-6 max-w-3xl border-l-2 border-note/50 bg-note/[0.04] px-4 py-3 text-xs leading-relaxed text-fg-dim">
        <span className="font-mono text-note">honest note · </span>
        On ranking, the strong methods are statistically tied, and a plain link rule is slightly ahead
        overall — though all it can ever tell you is &ldquo;these two share a link&rdquo;. Our claim is
        the narrow one: Jinx raises under half the false alarms of the shipping bots, says exactly why
        it matched, and installs in two minutes.{" "}
        <a href={PAPERS.report} className="text-fg underline-offset-2 hover:text-accent hover:underline">
          All 66 strategies →
        </a>
      </p>
    </Section>
  );
}

/** Horizontal bars: false alarms per 100 clean PRs, with the CI drawn in. */
function FarChart() {
  return (
    <figure className="mt-8 border border-line bg-panel p-5">
      <figcaption className="font-mono text-[11px] text-fg-dim">
        false alarms per 100 pull requests that have no duplicate — lower is better
      </figcaption>
      <div className="mt-5 space-y-2.5">
        {[...METHODS]
          .sort((a, b) => a.far - b.far)
          .map((m) => (
            <div key={m.name} className="grid grid-cols-[9rem_1fr_5.5rem] items-center gap-3">
              <span
                className={`truncate font-mono text-[11px] ${m.ours ? "text-accent" : "text-fg-dim"}`}
                title={m.name}
              >
                {m.name}
              </span>
              <div className="relative h-4">
                {/* CI whisker */}
                <div
                  className="absolute top-1/2 h-px -translate-y-1/2 bg-line-bright"
                  style={{
                    left: `${(m.far_lo / MAX_FAR) * 100}%`,
                    width: `${((m.far_hi - m.far_lo) / MAX_FAR) * 100}%`,
                  }}
                />
                {/* point estimate */}
                <div
                  className={`absolute top-1/2 h-4 -translate-y-1/2 ${
                    m.ours ? "bg-accent" : "bg-fg-faint/70"
                  }`}
                  style={{ width: `${(m.far / MAX_FAR) * 100}%` }}
                />
              </div>
              <span className="text-right font-mono text-[11px] text-fg-dim">
                {m.far.toFixed(1)}
                <span className="text-fg-faint">
                  {" "}
                  [{m.far_lo.toFixed(1)}–{m.far_hi.toFixed(1)}]
                </span>
              </span>
            </div>
          ))}
      </div>
    </figure>
  );
}

function ResultsTable() {
  return (
    <div className="mt-5 overflow-x-auto border border-line">
      <table className="w-full min-w-[44rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-panel-2 font-mono text-[11px] text-fg-dim">
            <th scope="col" className="px-3 py-2.5 font-normal">
              method
            </th>
            <th scope="col" className="px-3 py-2.5 font-normal">
              right PR ranked first / 100
            </th>
            <th scope="col" className="px-3 py-2.5 font-normal">
              false alarms / 100 clean PRs
            </th>
            <th scope="col" className="px-3 py-2.5 font-normal">
              what it tells you
            </th>
          </tr>
        </thead>
        <tbody className="font-mono text-xs">
          {METHODS.map((m) => (
            <tr
              key={m.name}
              className={`border-b border-line last:border-0 ${m.ours ? "bg-accent/[0.05]" : ""}`}
            >
              <th scope="row" className="px-3 py-2.5 text-left font-normal">
                <span className={m.ours ? "font-semibold text-accent" : "text-fg"}>{m.name}</span>
              </th>
              <td className="px-3 py-2.5 text-fg-dim">
                {m.top1.toFixed(1)}{" "}
                <span className="text-fg-faint">
                  [{m.top1_lo.toFixed(1)}–{m.top1_hi.toFixed(1)}]
                </span>
              </td>
              <td className="px-3 py-2.5 text-fg-dim">
                {m.far.toFixed(1)}{" "}
                <span className="text-fg-faint">
                  [{m.far_lo.toFixed(1)}–{m.far_hi.toFixed(1)}]
                </span>
              </td>
              <td className="px-3 py-2.5 text-fg-faint">{m.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Pick a tolerable false-alarm budget, see what each method catches there. */
function OperatingPoint() {
  const [i, setI] = useState(2);
  const id = useId();
  const far = FAR_STEPS[i];
  const pct = Math.round(parseFloat(far) * 100);

  const ranked = [...METHODS].sort(
    (a, b) =>
      (b.curve[far as keyof typeof b.curve] ?? 0) - (a.curve[far as keyof typeof a.curve] ?? 0),
  );

  return (
    <div className="mt-5 border border-line bg-panel p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm text-fg-dim">
          If you can live with{" "}
          <span className="font-mono text-accent">
            {pct} false {pct === 1 ? "alarm" : "alarms"}
          </span>{" "}
          per 100 clean PRs…
        </label>
        <span className="font-mono text-[11px] text-fg-faint">…this is what each method catches</span>
      </div>

      <input
        id={id}
        type="range"
        min={0}
        max={FAR_STEPS.length - 1}
        step={1}
        value={i}
        onChange={(e) => setI(Number(e.target.value))}
        className="mt-4 w-full"
        aria-valuetext={`${pct} false alarms per 100 clean pull requests`}
      />
      <div className="mt-1 flex justify-between font-mono text-[11px] text-fg-faint">
        {FAR_STEPS.map((s) => (
          <span key={s}>{Math.round(parseFloat(s) * 100)}</span>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        {ranked.map((m) => {
          const v = m.curve[far as keyof typeof m.curve] ?? 0;
          return (
            <div key={m.name} className="grid grid-cols-[9rem_1fr_3rem] items-center gap-3">
              <span
                className={`truncate font-mono text-[11px] ${m.ours ? "text-accent" : "text-fg-dim"}`}
              >
                {m.name}
              </span>
              <div className="h-3 bg-panel-2">
                <div
                  className={`h-3 transition-[width] duration-300 ${
                    m.ours ? "bg-accent" : "bg-fg-faint/60"
                  }`}
                  style={{ width: `${v}%` }}
                />
              </div>
              <span className="text-right font-mono text-[11px] text-fg-dim">{v}%</span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 font-mono text-[11px] leading-relaxed text-fg-faint">
        &ldquo;Caught&rdquo; means the method ranked the right PR first and scored it above the
        threshold that produces this false-alarm rate. Cross-validated replays on AIDev.
      </p>
    </div>
  );
}
