"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type TextProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "lines" slides masked lines up; "words" fades words in */
  mode?: "lines" | "words";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/** Headline that reveals line by line (masked) when scrolled into view. */
export function RevealText<T extends ElementType = "h2">({ as, children, className, delay = 0, mode = "lines", ...rest }: TextProps<T>) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const split = SplitText.create(ref.current, {
        type: mode === "lines" ? "lines" : "words",
        mask: mode === "lines" ? "lines" : undefined,
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          const targets = mode === "lines" ? self.lines : self.words;
          return gsap.from(targets, {
            yPercent: mode === "lines" ? 105 : 40,
            autoAlpha: mode === "lines" ? 1 : 0,
            duration: mode === "lines" ? 1.1 : 0.8,
            ease: "expo.out",
            stagger: mode === "lines" ? 0.09 : 0.03,
            delay,
            scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
          });
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/** Fades & lifts its children in, staggered, when they scroll into view. */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 40,
  as,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  as?: ElementType;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const items = ref.current.querySelectorAll<HTMLElement>(":scope > *");
      gsap.from(items, {
        y,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Image frame that wipes open (clip-path) and drifts with parallax while scrolling. */
export function ParallaxFrame({
  children,
  className,
  amount = 12,
  reveal = true,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const inner = ref.current.querySelector<HTMLElement>(".pframe__inner");
      if (reveal) {
        gsap.fromTo(
          ref.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          },
        );
      }
      if (inner) {
        gsap.fromTo(
          inner,
          { yPercent: -amount / 2, scale: 1.15 },
          {
            yPercent: amount / 2,
            scale: 1.15,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={`pframe ${className ?? ""}`}>
      <div className="pframe__inner">{children}</div>
    </div>
  );
}
