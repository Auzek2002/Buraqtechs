let io: IntersectionObserver | null = null;

// Observes every un-revealed [data-reveal] node and flags it once it enters view.
export function scanReveals() {
  if (typeof window === "undefined") return;
  io ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        io!.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0 }
  );
  document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io!.observe(el));
}
