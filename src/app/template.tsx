"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, isIntroDone, prefersReducedMotion, requestRefresh } from "@/lib/gsap";
import { useScroll } from "@/components/providers/SmoothScroll";
import Logo from "@/components/brand/Logo";

/**
 * Page transition: on every navigation after the first load, a sky-blue and navy
 * curtain wipes upward to reveal the new page. Also resets scroll to the top.
 */
export default function Template({ children }: { children: ReactNode }) {
  const curtain = useRef<HTMLDivElement>(null);
  const { scrollTo } = useScroll();

  useLayoutEffect(() => {
    const el = curtain.current;
    scrollTo(0, { immediate: true, offset: 0 });
    requestRefresh(80);
    if (!el || !isIntroDone() || prefersReducedMotion()) return;

    const panels = el.querySelectorAll<HTMLElement>(".curtain__panel");
    const logo = el.querySelector<SVGElement>(".curtain__logo");
    const tl = gsap
      .timeline({ onComplete: () => { gsap.set(el, { display: "none" }); } })
      .set(el, { display: "block" })
      .set(panels, { yPercent: 0 })
      .fromTo(logo, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -30, duration: 0.45, ease: "power2.in" }, 0.15)
      .to(panels, { yPercent: -100, duration: 1, ease: "expo.inOut", stagger: { each: 0.1, from: "end" } }, 0.25);
    return () => {
      tl.kill();
      gsap.set(el, { display: "none" });
    };
  }, [scrollTo]);

  return (
    <>
      <div className="curtain" ref={curtain} aria-hidden="true">
        <div className="curtain__panel curtain__panel--sky" />
        <div className="curtain__panel curtain__panel--navy">
          <Logo compact className="curtain__logo" />
        </div>
      </div>
      {children}
    </>
  );
}
