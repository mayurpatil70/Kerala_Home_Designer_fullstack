"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type ScrollApi = {
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number; immediate?: boolean }) => void;
  lock: () => void;
  unlock: () => void;
};

const ScrollContext = createContext<ScrollApi | null>(null);

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScroll must be used inside <SmoothScroll>");
  return ctx;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const lockCount = useRef(0);

  useEffect(() => {
    // Always start at the top so the intro and pinned sections line up.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Keep ScrollTrigger measurements right after fonts and images settle.
  useEffect(() => {
    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
    };
  }, []);

  const scrollTo = useCallback<ScrollApi["scrollTo"]>((target, opts = {}) => {
    const offset = opts.offset ?? -72;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, immediate: opts.immediate, force: opts.immediate, duration: 1.4 });
      return;
    }
    // Reduced-motion / no Lenis fallback
    let y = 0;
    if (typeof target === "number") y = target;
    else {
      const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
      if (!el) return;
      y = el.getBoundingClientRect().top + window.scrollY + offset;
    }
    window.scrollTo({ top: y, behavior: "auto" });
  }, []);

  const lock = useCallback(() => {
    lockCount.current += 1;
    lenisRef.current?.stop();
    document.documentElement.classList.add("is-locked");
  }, []);

  const unlock = useCallback(() => {
    lockCount.current = Math.max(0, lockCount.current - 1);
    if (lockCount.current === 0) {
      lenisRef.current?.start();
      document.documentElement.classList.remove("is-locked");
    }
  }, []);

  return <ScrollContext.Provider value={{ scrollTo, lock, unlock }}>{children}</ScrollContext.Provider>;
}
