import { REPO } from "@/data/site";

const LINKS = [
  { href: "#demo", label: "demo" },
  { href: "#compare", label: "compare" },
  { href: "#benchmark", label: "benchmark" },
  { href: "#install", label: "install" },
  { href: "#research", label: "research" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-5">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-mono text-base font-semibold tracking-tight text-jade">rd0</span>
          <span className="font-mono text-base text-fg-faint">/</span>
          <span className="font-mono text-base font-semibold tracking-tight">jinx</span>
          <span className="font-mono text-[11px] text-fg-faint">v0.1.0</span>
        </a>

        <nav className="ml-auto hidden items-center gap-5 font-mono text-xs text-fg-dim md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={REPO}
          className="ml-auto border border-line px-2.5 py-1 font-mono text-xs text-fg-dim transition-colors hover:border-line-bright hover:text-fg md:ml-0"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
