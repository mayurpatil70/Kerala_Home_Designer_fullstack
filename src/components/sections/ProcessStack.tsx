"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Check } from "@/components/ui/Icons";
import { processSteps } from "@/content/process";

/** Process stages as cards that stick and stack on top of each other while scrolling. */
export default function ProcessStack() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = Array.from(ref.current!.querySelectorAll<HTMLElement>(".pstep"));
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.fromTo(
          card.querySelector(".pstep__card"),
          { scale: 1, filter: "brightness(1)" },
          {
            scale: 0.94,
            filter: "brightness(0.82)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 85%", end: "top 25%", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div className="psteps container" ref={ref}>
      {processSteps.map((s, i) => (
        <div className="pstep" key={s.no} style={{ top: `calc(var(--header-h) + 24px + ${i * 22}px)` }}>
          <article className="pstep__card">
            <div className="pstep__head">
              <span className="pstep__no">{s.no}</span>
              <div>
                <h3 className="pstep__title">{s.title}</h3>
                <p className="pstep__text">{s.text}</p>
              </div>
            </div>
            <div className="pstep__cols">
              <div>
                <p className="pstep__label">What you share</p>
                <ul>
                  {s.youShare.map((x) => (
                    <li key={x}><Check /> {x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="pstep__label">What you receive</p>
                <ul>
                  {s.youGet.map((x) => (
                    <li key={x}><Check /> {x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
