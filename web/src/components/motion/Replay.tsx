"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/motion";

export type Stage = "idle" | "scanning" | "done";

/**
 * Drives the demo: the new PR lands, Jinx scans the queue, the warning appears.
 *
 * Runs once when the block scrolls into view and can be re-run by the replay
 * button. Under reduced motion it jumps straight to the finished state, which
 * is also what the server renders, so nothing is hidden from a crawler.
 */
export function useReplay(scanMs = 1300) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const [stage, setStage] = useState<Stage>("done");
  const [nonce, setNonce] = useState(0);
  const [armed, setArmed] = useState(false);

  // Only take control once mounted on the client; the server output stays
  // "done" so the content is present without JavaScript.
  useEffect(() => setArmed(true), []);

  useEffect(() => {
    if (!armed || !inView) return;
    if (reduced) {
      setStage("done");
      return;
    }
    setStage("scanning");
    const t = setTimeout(() => setStage("done"), scanMs);
    return () => clearTimeout(t);
  }, [armed, inView, reduced, scanMs, nonce]);

  const replay = useCallback(() => setNonce((n) => n + 1), []);

  return { ref, stage, replay, canReplay: armed && !reduced };
}

/** The sweeping bar shown while Jinx is "scanning" the queue. */
export function ScanBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <span className="font-mono text-[12.5px] text-accent">▸</span>
      <span className="font-mono text-[12.5px] text-fg-dim">{label}</span>
      <span className="relative h-[3px] flex-1 overflow-hidden bg-panel-2">
        <span className="animate-scan absolute inset-y-0 w-1/4 bg-accent" />
      </span>
    </div>
  );
}
