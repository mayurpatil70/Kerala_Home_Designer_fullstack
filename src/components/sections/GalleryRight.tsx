"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import type { ArtKind } from "@/content/projects";

export type GalleryTile = {
  title: string;
  meta: string;
  tag?: string;
  art: ArtKind;
  href?: string;
};

/**
 * Gallery rows that glide to the right as the page scrolls down.
 * Each row moves at its own speed for depth; tiles tilt and reveal labels on hover.
 */
export default function GalleryRight({ rows }: { rows: GalleryTile[][] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const rowEls = ref.current!.querySelectorAll<HTMLElement>(".grow__track");
      rowEls.forEach((track, i) => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const speed = i % 2 === 0 ? 1 : 0.7;
        gsap.fromTo(
          track,
          { x: () => -distance() * speed },
          {
            x: () => -distance() * speed * 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div className="grow" ref={ref}>
      {rows.map((row, r) => (
        <div className="grow__row" key={r}>
          <div className="grow__track">
            {row.map((t, i) => {
              const body = (
                <>
                  <PlaceholderArt kind={t.art} />
                  <span className="gtile__shade" aria-hidden="true" />
                  {t.tag && <span className="gtile__tag">{t.tag}</span>}
                  <span className="gtile__info">
                    <strong>{t.title}</strong>
                    <span>{t.meta}</span>
                  </span>
                </>
              );
              return t.href ? (
                <Link key={`${r}-${i}`} href={t.href} className={`gtile gtile--${(i + r) % 3}`} data-cursor="View">
                  {body}
                </Link>
              ) : (
                <div key={`${r}-${i}`} className={`gtile gtile--${(i + r) % 3}`}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
