"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, onIntro, prefersReducedMotion } from "@/lib/gsap";
import { useEnquiry } from "@/components/providers/EnquiryProvider";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import Logo from "@/components/brand/Logo";
import { site } from "@/content/site";

const LogoScene = dynamic(() => import("@/components/three/LogoScene"), { ssr: false });

/** If WebGL is unavailable, show the flat sky-blue logo instead. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return <Logo className="hhero__fallback" />;
    return this.props.children;
  }
}

export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useRef(0);
  const [active, setActive] = useState(true);
  const enquire = useEnquiry();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "100px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      gsap.to(scroll, {
        current: 1,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
      if (prefersReducedMotion()) return;

      const split = SplitText.create(q(".hhero__title")[0], { type: "lines,words", mask: "lines", linesClass: "split-line" });
      gsap.set(split.lines, { yPercent: 110 });
      gsap.set(q(".hhero__fade"), { autoAlpha: 0, y: 26 });
      gsap.set(q(".hhero__rule"), { scaleX: 0 });

      const off = onIntro(() => {
        gsap
          .timeline({ delay: 0.5, defaults: { ease: "expo.out" } })
          .to(q(".hhero__rule"), { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0)
          .to(split.lines, { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.2)
          .to(q(".hhero__fade"), { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.6);
      });

      gsap.to(q(".hhero__copy"), {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
      return () => {
        off();
        split.revert();
      };
    },
    { scope: ref },
  );

  return (
    <div className="hhero" ref={ref}>
      <div className="hhero__grid" aria-hidden="true" />
      <div className="hhero__glow" aria-hidden="true" />

      <div className="hhero__canvas">
        <SceneBoundary>
          <LogoScene scroll={scroll} active={active} />
        </SceneBoundary>
      </div>

      <div className="hhero__copy container">
        <p className="hhero__roles hhero__fade">
          {site.roles.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </p>
        <span className="hhero__rule" aria-hidden="true" />
        <h1 className="hhero__title">
          <span className="hhero__t1">Thoughtfully Designed.</span> <span className="hhero__t2">Professionally Built.</span>
        </h1>
        <p className="hhero__tagline hhero__fade">{site.tagline}</p>
        <p className="hhero__lead hhero__fade">
          Residential and commercial construction, architecture and interiors for clients across Kerala, from practical family homes to premium, customised spaces.
        </p>
        <div className="hhero__ctas hhero__fade">
          <Magnetic>
            <Button variant="sky" size="lg" onClick={() => enquire({ source: "home-hero" })}>
              Discuss Your Project
            </Button>
          </Magnetic>
          <Button variant="outline-light" size="lg" href="/projects">
            Explore Our Projects
          </Button>
        </div>
      </div>

      <div className="hhero__scroll hhero__fade" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </div>
  );
}
