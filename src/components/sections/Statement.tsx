"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Large statement whose words light up as the visitor scrolls through it. */
export default function Statement({ text, eyebrow, facts }: { text: string; eyebrow?: string; facts?: { value: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current!.querySelector<HTMLElement>(".statement__text")!;
      const split = SplitText.create(el, { type: "words", wordsClass: "word" });
      gsap.fromTo(
        split.words,
        { opacity: 0.16 },
        { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: true } },
      );
      const factsEl = ref.current!.querySelector(".facts");
      if (factsEl) {
        gsap.from(factsEl.querySelectorAll(".fact"), {
          y: 50,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          scrollTrigger: { trigger: factsEl, start: "top 88%", once: true },
        });
      }
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <div className="statement container" ref={ref}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <p className="statement__text">{text}</p>
      {facts && (
        <ul className="facts">
          {facts.map((f) => (
            <li className="fact" key={f.label}>
              <strong>{f.value}</strong>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
