"use client";

import { useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/motion";

/**
 * Types a line out, then leaves a blinking block cursor.
 *
 * The text is rendered in full inside a visually-hidden span so the real
 * sentence is always in the accessibility tree and in the HTML a crawler sees;
 * the animated copy is aria-hidden.
 */
export function Typewriter({
  text,
  speed = 38,
  startDelay = 350,
  className = "",
  cursorClassName = "",
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  cursorClassName?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>("0px");
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setN(i);
      if (i < text.length) timer = setTimeout(tick, speed);
    };
    const start = setTimeout(tick, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [inView, reduced, text, speed, startDelay]);

  const shown = reduced ? text : text.slice(0, n);
  const done = shown.length === text.length;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {shown}
        <span
          className={`ml-0.5 inline-block w-[0.55em] translate-y-[0.08em] bg-accent align-baseline ${
            done ? "animate-blink" : ""
          } ${cursorClassName}`}
          style={{ height: "1.05em" }}
        />
      </span>
    </span>
  );
}
