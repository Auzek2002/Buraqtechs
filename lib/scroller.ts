import type Lenis from "lenis";

// Shared handle so any component can read velocity or drive the scroll.
export const scroller: { lenis: Lenis | null } = { lenis: null };

export function scrollVelocity() {
  return scroller.lenis?.velocity ?? 0;
}

export function scrollToTop(immediate = true) {
  if (scroller.lenis) scroller.lenis.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
}
