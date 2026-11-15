import { REPO } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

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
          <span className="font-mono text-[17px] font-bold tracking-tight text-accent">rd0</span>
          <span className="font-mono text-[17px] text-fg-faint">/</span>
          <span className="font-mono text-[17px] font-bold tracking-tight">jinx</span>
          <span className="font-mono text-[12.5px] text-fg-faint">v0.1.0</span>
        </a>

        <nav className="ml-auto hidden items-center gap-5 font-mono text-[13px] text-fg-dim md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <a
            href={REPO}
            className="border border-line px-2.5 py-1 font-mono text-[13px] text-fg-dim transition-colors hover:border-line-bright hover:text-fg"
          >
            GitHub
          </a>
        </div>
      </div>
      <nav
        aria-label="Sections"
        className="flex gap-5 overflow-x-auto border-t border-line px-5 py-2 font-mono text-[13px] text-fg-dim md:hidden"
      >
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="shrink-0 transition-colors hover:text-fg">
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
