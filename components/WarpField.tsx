"use client";

import { useEffect, useRef } from "react";
import { scrollVelocity } from "@/lib/scroller";

type Star = { x: number; y: number; z: number; pz: number; c: number };

const COLORS = ["236,235,230", "129,145,255", "168,242,58"];
const WEIGHTS = [0.72, 0.2, 0.08];

function pickColor() {
  const r = Math.random();
  return r < WEIGHTS[0] ? 0 : r < WEIGHTS[0] + WEIGHTS[1] ? 1 : 2;
}

// Light streaks rushing out of a vanishing point. Scroll velocity feeds the warp speed.
export default function WarpField({ density = 1, originX = 0.66, originY = 0.46 }: { density?: number; originX?: number; originY?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, id = 0, visible = true;
    let stars: Star[] = [];
    let ox = originX, oy = originY, tox = ox, toy = oy;
    let speed = 0.0075, boost = 0;

    const spawn = (s: Star, far: boolean) => {
      s.x = (Math.random() - 0.5) * 2;
      s.y = (Math.random() - 0.5) * 2;
      s.z = far ? 1 : Math.random() * 0.9 + 0.1;
      s.pz = s.z;
      s.c = pickColor();
    };

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(520, (w * h) / 3200) * density);
      stars = Array.from({ length: count }, () => {
        const s = { x: 0, y: 0, z: 0, pz: 0, c: 0 };
        spawn(s, false);
        return s;
      });
      if (reduced) for (let i = 0; i < 4; i++) draw();
    };

    const draw = () => {
      ox += (tox - ox) * 0.04;
      oy += (toy - oy) * 0.04;
      boost += (Math.min(Math.abs(scrollVelocity()) * 0.0016, 0.05) - boost) * 0.08;
      const v = speed + boost;
      const cx = w * ox, cy = h * oy, f = Math.max(w, h) * 0.5;

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      for (const s of stars) {
        s.pz = s.z;
        s.z -= v;
        if (s.z <= 0.02) {
          spawn(s, true);
          continue;
        }
        const tz = s.z + v * 9; // trail length grows with speed
        const x1 = cx + (s.x / tz) * f, y1 = cy + (s.y / tz) * f;
        const x2 = cx + (s.x / s.z) * f, y2 = cy + (s.y / s.z) * f;
        if (x2 < -50 || x2 > w + 50 || y2 < -50 || y2 > h + 50) {
          spawn(s, true);
          continue;
        }
        const depth = 1 - s.z;
        ctx.strokeStyle = `rgba(${COLORS[s.c]},${Math.min(1, depth * depth * 2)})`;
        ctx.lineWidth = Math.max(0.5, depth * 2.6);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    };

    const loop = () => {
      if (visible && !document.hidden) draw();
      id = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      tox = originX + (e.clientX / innerWidth - 0.5) * 0.18;
      toy = originY + (e.clientY / innerHeight - 0.5) * 0.14;
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) speed = 0.03;
    resize();

    if (!reduced) {
      addEventListener("pointermove", onMove, { passive: true });
      id = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      ro.disconnect();
      removeEventListener("pointermove", onMove);
    };
  }, [density, originX, originY]);

  return <canvas ref={ref} className="warp" aria-hidden="true" />;
}
