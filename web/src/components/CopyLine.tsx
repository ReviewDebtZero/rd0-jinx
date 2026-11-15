"use client";

import { useState } from "react";

/** A `$ command` line with a copy button. The page's primary call to action. */
export function CopyLine({ command, className = "" }: { command: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard denied (insecure context or permission): leave the label be,
      // the command is selectable either way.
    }
  }

  return (
    <div
      className={`flex min-w-0 items-center gap-3 border border-line bg-panel px-3 py-2.5 font-mono text-[15px] ${className}`}
    >
      <span aria-hidden className="select-none text-accent">
        $
      </span>
      <code className="min-w-0 flex-1 truncate text-fg" title={command}>{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy "${command}" to the clipboard`}
        className="shrink-0 border border-line px-2 py-0.5 text-[12.5px] text-fg-dim transition-colors hover:border-accent/50 hover:text-accent"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
