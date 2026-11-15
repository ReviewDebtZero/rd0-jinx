"use client";

import { useEffect, useRef, useState } from "react";

/** True when the visitor has asked the OS to reduce motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Fires once when the element first scrolls into view.
 *
 * One observer per element is fine here: the page has well under a hundred
 * animated nodes, and this avoids a shared-registry abstraction that would be
 * harder to read than the thing it replaces.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(margin = "-12% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No IntersectionObserver (or a very old browser): show everything.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return { ref, inView };
}
