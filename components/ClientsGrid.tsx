"use client";

import { useRef, type CSSProperties } from "react";
import { clients } from "@/lib/content";

// Logo wall. The 1px gaps act as grid lines lit by a light that follows the pointer.
export default function ClientsGrid({ exclude = [] }: { exclude?: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const list = clients.filter((c) => !exclude.includes(c.name));
  const move = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} className="cgrid" onPointerMove={move}>
      {list.map((c, i) => (
        <div className="cgrid__cell" key={c.name} data-reveal="fade" style={{ "--d": (i % 4) * 70 } as CSSProperties}>
          <img className={c.dark ? "is-dark" : undefined} src={c.src} alt={c.name} width={c.w} height={c.h} loading="lazy" decoding="async" />
          <span className="cgrid__name mono">{c.name}</span>
        </div>
      ))}
      <div className="cgrid__cell cgrid__cell--more" style={{ "--span": 4 - (list.length % 4) } as CSSProperties}>
        <span className="mono">+ Your brand</span>
      </div>
    </div>
  );
}
