"use client";

import { useEffect, useRef } from "react";
import { scrollVelocity } from "@/lib/scroller";

// Infinite ticker whose speed and direction follow the scroll.
export default function Marquee({ items, reverse = false, outline = false }: { items: string[]; reverse?: boolean; outline?: boolean }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0, dir = reverse ? 1 : -1, id = 0, visible = false;
    const loop = () => {
      const v = scrollVelocity();
      if (Math.abs(v) > 0.5) dir = (v > 0 ? -1 : 1) * (reverse ? -1 : 1);
      x += dir * (0.6 + Math.min(Math.abs(v) * 0.25, 14));
      const half = el.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
      if (visible) id = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(id);
      if (visible) id = requestAnimationFrame(loop);
    });
    io.observe(el.parentElement!);
    return () => {
      io.disconnect();
      cancelAnimationFrame(id);
    };
  }, [reverse]);

  const run = [...items, ...items];
  return (
    <div className={`mq${outline ? " mq--outline" : ""}`} aria-hidden="true">
      <div ref={track} className="mq__track">
        {[0, 1].map((k) => (
          <div className="mq__set" key={k}>
            {run.map((t, i) => (
              <span className="mq__item" key={i}>
                {t}
                <svg viewBox="0 0 20 20" className="mq__star">
                  <path d="M10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
