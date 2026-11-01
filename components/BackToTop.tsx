"use client";

import { scroller } from "@/lib/scroller";

export default function BackToTop() {
  const up = () => (scroller.lenis ? scroller.lenis.scrollTo(0, { duration: 1.6 }) : scrollTo({ top: 0, behavior: "smooth" }));
  return (
    <button className="totop" onClick={up}>
      Back to top <span aria-hidden="true">↑</span>
    </button>
  );
}
