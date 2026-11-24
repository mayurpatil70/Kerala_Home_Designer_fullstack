"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, markIntroDone, prefersReducedMotion } from "@/lib/gsap";
import { useScroll } from "@/components/providers/SmoothScroll";
import Logo from "@/components/brand/Logo";

/** First-load intro: the logo assembles part by part while a counter runs, then panels lift. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const { lock, unlock } = useScroll();

  useGSAP(
    () => {
      lock();
      let released = false;
      const release = () => {
        if (released) return;
        released = true;
        unlock();
      };
      const el = root.current!;
      const count = el.querySelector(".preloader__count span")!;
      const counter = { v: 0 };

      if (prefersReducedMotion()) {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.4,
          delay: 0.2,
          onComplete: () => {
            release();
            markIntroDone();
            setDone(true);
          },
        });
        return release;
      }

      const parts = el.querySelectorAll<SVGPathElement>(".preloader__logo path");
      gsap.set(parts, { autoAlpha: 0, y: 40, transformOrigin: "50% 50%" });
      gsap
        .timeline()
        .to(parts, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.12 }, 0.1)
        .to(counter, {
          v: 92,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => (count.textContent = String(Math.round(counter.v))),
        }, 0);

      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      const minTime = new Promise((r) => setTimeout(r, 1700));
      const cap = new Promise((r) => setTimeout(r, 4000));
      let cancelled = false;
      Promise.race([Promise.all([fontsReady, minTime]), cap]).then(() => {
        if (cancelled) return;
        gsap
          .timeline({
            onComplete: () => {
              release();
              setDone(true);
            },
          })
          .to(counter, { v: 100, duration: 0.4, ease: "power1.out", onUpdate: () => (count.textContent = String(Math.round(counter.v))) })
          .to(el.querySelectorAll(".preloader__inner > *"), { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: "power3.in", stagger: 0.05 }, "+=0.1")
          .add(() => markIntroDone(), "-=0.15")
          .to(el.querySelectorAll(".preloader__panel"), { yPercent: -100, duration: 1.1, ease: "expo.inOut", stagger: 0.08 }, "-=0.25")
          .set(el, { autoAlpha: 0 });
      });

      return () => {
        cancelled = true;
        release();
      };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__panel preloader__panel--b" />
      <div className="preloader__panel preloader__panel--a">
        <div className="preloader__inner">
          <Logo className="preloader__logo" />
          <p className="preloader__count">
            <span>0</span>
            <sup>%</sup>
          </p>
        </div>
      </div>
    </div>
  );
}
