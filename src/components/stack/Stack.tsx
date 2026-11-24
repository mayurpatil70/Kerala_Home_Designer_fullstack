"use client";

/**
 * Stacking sections: each panel sticks, and the next panel slides over it while
 * the covered panel gently scales down and dims. Panels taller than the screen
 * scroll fully first, then stick by their bottom edge so no content is hidden.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion, requestRefresh } from "@/lib/gsap";

export function Stack({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const panels = Array.from(root.querySelectorAll<HTMLElement>(":scope > .stack-panel"));
      panels.forEach((panel, i) => {
        const next = panels[i + 1];
        if (!next) return;
        const inner = panel.querySelector<HTMLElement>(":scope > .stack-panel__inner");
        const shade = panel.querySelector<HTMLElement>(":scope > .stack-panel__shade");
        if (!inner || !shade) return;
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(inner, { scale: 1, borderRadius: 0 }, { scale: 0.92, borderRadius: 32 }, 0)
          .fromTo(shade, { opacity: 0 }, { opacity: 0.6 }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <div className={`stack ${className ?? ""}`} ref={ref}>
      {children}
    </div>
  );
}

export function StackPanel({
  children,
  tone = "light",
  className,
  id,
  label,
}: {
  children: ReactNode;
  tone?: "light" | "paper" | "dark" | "sky" | "navy";
  className?: string;
  id?: string;
  label?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  // Stick by the bottom edge when the panel is taller than the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelector<HTMLElement>(":scope > .stack-panel__inner");
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const top = Math.min(0, vh - el.offsetHeight);
        el.style.top = `${top}px`;
        if (inner) inner.style.transformOrigin = `50% ${Math.round(vh / 2 - top)}px`;
      });
    };
    update();
    const ro = new ResizeObserver(() => {
      update();
      requestRefresh();
    });
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={ref} id={id} className={`stack-panel stack-panel--${tone} ${className ?? ""}`} aria-label={label}>
      <div className="stack-panel__inner">{children}</div>
      <div className="stack-panel__shade" aria-hidden="true" />
    </section>
  );
}
