"use client";

import { useEffect, type RefObject } from "react";

// Calls back with 0..1 progress of an element through the viewport, only while it is near view.
// mode "through": 0 when its top hits the viewport bottom, 1 when its bottom leaves the top.
// mode "pin": 0 when its top hits the viewport top, 1 when its bottom reaches the viewport bottom.
export function useProgress(ref: RefObject<HTMLElement | null>, cb: (p: number) => void, mode: "through" | "pin" = "through") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let near = false, id = 0, last = -1;

    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = innerHeight;
      const p = mode === "pin" ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / (vh + r.height);
      const c = Math.min(1, Math.max(0, p));
      if (c !== last) cb((last = c));
      if (near) id = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      near = e.isIntersecting;
      cancelAnimationFrame(id);
      if (near) id = requestAnimationFrame(tick);
    }, { rootMargin: "20% 0px" });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mode]);
}
