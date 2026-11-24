"use client";

/**
 * Scrollytelling: the section is several screens tall; its stage stays on screen
 * (CSS sticky) while a 3D house assembles through the five process stages.
 * Using sticky instead of a GSAP pin lets this section stack with the panels
 * around it.
 */

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { processSteps } from "@/content/process";

const HouseScene = dynamic(() => import("@/components/three/HouseScene"), {
  ssr: false,
  loading: () => <div className="build__loading">Loading 3D model…</div>,
});

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return <div className="build__loading">3D preview isn&apos;t supported on this device.</div>;
    return this.props.children;
  }
}

const STAGES = processSteps.length;

export default function BuildStory() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const num = q(".build__pct-num")[0];
      const fill = q(".build__track i")[0];
      const dusk = q(".build__bg--dusk")[0];
      const hint = q(".build__hint")[0];
      let last = -1;

      const update = (p: number) => {
        progress.current = p;
        const idx = Math.min(STAGES - 1, Math.floor(p * STAGES));
        if (idx !== last) {
          last = idx;
          setStep(idx);
        }
        if (num) num.textContent = String(Math.round(p * 100));
        if (fill) fill.style.transform = `scaleY(${p})`;
        if (dusk) dusk.style.opacity = String(Math.min(1, Math.max(0, (p - 0.75) / 0.25)));
        if (hint) hint.style.opacity = p > 0.9 ? "0" : "1";
      };

      if (prefersReducedMotion()) {
        update(1);
        return;
      }

      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => update(self.progress),
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div className="build" ref={ref}>
      <div className="build__stage">
        <div className="build__bg build__bg--blueprint" />
        <div className="build__bg build__bg--dusk" />
        <div className="build__canvas">
          <SceneBoundary>
            <HouseScene progress={progress} active={active} />
          </SceneBoundary>
        </div>
        <div className="build__veil" aria-hidden="true" />

        <div className="build__ui container">
          <div className="build__head">
            <p className="eyebrow eyebrow--light">Our process</p>
            <h2 className="h2 h2--light">From first conversation to handover</h2>
          </div>

          <ol className="build__steps">
            {processSteps.map((s, i) => (
              <li key={s.no} className={`build__step${i === step ? " is-active" : ""}${i < step ? " is-done" : ""}`}>
                <span className="build__step-num">{s.no}</span>
                <div>
                  <p className="build__step-title">{s.title}</p>
                  <div className="build__step-body">
                    <div>
                      <p>{s.text}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="build__meter" aria-hidden="true">
            <p className="build__pct">
              <span className="build__pct-num">0</span>
              <sup>%</sup>
            </p>
            <p className="build__pct-label">{processSteps[step].short}</p>
            <span className="build__track"><i /></span>
          </div>

          <div className="build__foot">
            <p className="build__hint" aria-hidden="true">Keep scrolling to build</p>
            <Link href="/process" className="link-wave link-wave--light build__link">See our full process</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
