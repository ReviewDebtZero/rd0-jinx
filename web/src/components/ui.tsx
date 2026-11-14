import type { ReactNode } from "react";

/** A `// section name` divider. The page's main structural device. */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 font-mono text-[13px] tracking-wide text-fg-faint">
      <span className="text-accent">{`// ${index}`}</span>
      <span className="text-fg-dim">{children}</span>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Section wrapper: consistent rhythm and a hairline rule above. */
export function Section({
  id,
  index,
  label,
  children,
}: {
  id?: string;
  index: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line scroll-mt-16">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
        <SectionLabel index={index}>{label}</SectionLabel>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/** Two-tier heading: plain phrase, then the emphasis in accent. */
export function Heading({ lead, accent }: { lead: string; accent: string }) {
  return (
    <h2 className="max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
      {lead} <span className="text-accent">{accent}</span>
    </h2>
  );
}

export function Pill({ children, tone = "line" }: { children: ReactNode; tone?: "line" | "accent" }) {
  const tones = {
    line: "border-line text-fg-dim",
    accent: "border-accent/40 text-accent",
  };
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 font-mono text-[12.5px] tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** A bordered panel. No shadow, no radius: the border is the whole affordance. */
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`border border-line bg-panel ${className}`}>{children}</div>;
}

/** Panel with a titled header strip, used for the demo and diagram frames. */
export function Frame({
  title,
  right,
  children,
  className = "",
}: {
  title: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-line bg-panel ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-panel-2 px-3 py-2 font-mono text-[12.5px] text-fg-dim">
        <span className="truncate">{title}</span>
        {right}
      </div>
      {children}
    </div>
  );
}
