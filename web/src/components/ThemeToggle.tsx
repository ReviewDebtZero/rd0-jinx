"use client";

import { useEffect, useState } from "react";

/**
 * Light by default, dark on request, OS preference on first visit.
 *
 * The initial class is set by an inline script in layout.tsx so the correct
 * theme is painted on the first frame. This component only has to catch up
 * with whatever that script already decided.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setReady(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private mode or storage disabled: the choice just will not persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to the light theme" : "Switch to the dark theme"}
      aria-pressed={dark}
      className="border border-line px-2 py-1 font-mono text-xs text-fg-dim transition-colors hover:border-line-bright hover:text-fg"
    >
      {/* Render a stable placeholder until mounted, so the server and client
          markup match and the label does not flicker. */}
      <span aria-hidden>{ready ? (dark ? "light" : "dark") : "dark"}</span>
    </button>
  );
}
