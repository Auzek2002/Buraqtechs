"use client";

import { useEffect, useRef } from "react";

// Dot + trailing ring. Grows over links; shows a label for [data-cursor] targets.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    let tx = innerWidth / 2, ty = innerHeight / 2, rx = tx, ry = ty, id = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.current!.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      ring.current!.classList.add("is-on");
      dot.current!.classList.add("is-on");
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const interactive = t.closest("a, button, input, textarea, select, label");
      ring.current!.classList.toggle("is-link", !!interactive && !labelled);
      ring.current!.classList.toggle("is-label", !!labelled);
      label.current!.textContent = labelled?.dataset.cursor ?? "";
    };
    const onLeave = () => {
      ring.current!.classList.remove("is-on");
      dot.current!.classList.remove("is-on");
    };
    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.current!.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(id);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cur-ring" aria-hidden="true">
        <span ref={label} />
      </div>
      <div ref={dot} className="cur-dot" aria-hidden="true" />
    </>
  );
}
