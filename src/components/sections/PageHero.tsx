"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, onIntro, prefersReducedMotion } from "@/lib/gsap";

type Crumb = { label: string; href?: string };

/** Navy page header with breadcrumb, masked title reveal and a self-drawing blueprint sketch. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  meta,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  children?: ReactNode;
  meta?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(ref);
      const split = SplitText.create(q(".phero__title")[0], { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap.set(split.lines, { yPercent: 110 });
      gsap.set(q(".phero__fade"), { autoAlpha: 0, y: 24 });
      gsap.set(q(".phero__draw"), { strokeDashoffset: 1 });

      const off = onIntro(() => {
        gsap
          .timeline({ delay: 0.35, defaults: { ease: "expo.out" } })
          .to(split.lines, { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0)
          .to(q(".phero__fade"), { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.2)
          .to(q(".phero__draw"), { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", stagger: 0.12 }, 0.1);
      });

      // Parallax as the next panel slides over
      gsap.to(q(".phero__decor"), {
        yPercent: 18,
        rotate: 4,
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

  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${siteUrl}${c.href}` } : {}),
    })),
  };

  return (
    <div className="phero" ref={ref}>
      <div className="phero__grid" aria-hidden="true" />
      <svg className="phero__decor" viewBox="0 0 600 500" aria-hidden="true">
        <path className="phero__draw phero__draw--accent" pathLength={1} d="M40 230L300 60L560 230Z" />
        <path className="phero__draw" pathLength={1} d="M100 230V450H500V230" />
        <path className="phero__draw" pathLength={1} d="M100 330H500M240 230V450M360 330V450" />
        <path className="phero__draw" pathLength={1} d="M150 450V380H200V450M400 260H460V300H400Z" />
        <path className="phero__draw phero__draw--dim" pathLength={1} d="M20 470H580M60 480V460M540 480V460" />
      </svg>

      <div className="phero__inner container">
        <nav className="crumbs phero__fade" aria-label="Breadcrumb">
          <ol>
            {crumbs.map((c, i) => (
              <li key={i}>
                {c.href && i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow eyebrow--light phero__fade">{eyebrow}</p>}
        <h1 className="phero__title">{title}</h1>
        {lead && <p className="phero__lead phero__fade">{lead}</p>}
        {meta && <div className="phero__meta phero__fade">{meta}</div>}
        {children && <div className="phero__actions phero__fade">{children}</div>}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
