"use client";

import type { ReactNode } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/motion";

/**
 * Fade and lift on first scroll into view.
 *
 * Deliberately small: 10px of travel and 500ms. Marketing pages that slide
 * content 60px feel slow on the second visit, and this one is meant to be
 * skimmed.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
        inView ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
