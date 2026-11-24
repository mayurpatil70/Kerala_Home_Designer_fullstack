"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ───────── Preloader → page intro handshake ───────── */
let introDone = false;
const INTRO_EVENT = "site:intro";

export function markIntroDone() {
  introDone = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export const isIntroDone = () => introDone;

/** Runs `cb` once the preloader has finished (immediately if it already has). */
export function onIntro(cb: () => void) {
  if (introDone) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(INTRO_EVENT, handler, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, handler);
}

/** Debounced ScrollTrigger.refresh() for layout changes (fonts, resizes, filters). */
let refreshTimer: number | undefined;
export function requestRefresh(delay = 150) {
  if (typeof window === "undefined") return;
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), delay);
}

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
