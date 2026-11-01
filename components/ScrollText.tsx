"use client";

import { useRef, type CSSProperties } from "react";
import { useProgress } from "@/lib/useProgress";

// Paragraph that lights up word by word as it is scrolled through.
export default function ScrollText({ text, className = "", accent = [] }: { text: string; className?: string; accent?: number[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  useProgress(ref, (p) => ref.current?.style.setProperty("--p", (p * 1.7 - 0.25).toFixed(4)));

  return (
    <p ref={ref} className={`stext ${className}`} style={{ "--n": words.length } as CSSProperties}>
      {words.map((w, i) => (
        <span key={i} className={accent.includes(i) ? "stext__acc" : undefined} style={{ "--i": i } as CSSProperties}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
