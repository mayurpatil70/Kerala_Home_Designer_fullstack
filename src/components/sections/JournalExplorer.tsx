"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Flip, gsap, prefersReducedMotion, requestRefresh } from "@/lib/gsap";
import JournalCard from "./JournalCard";
import { articles, journalCategories, type JournalCategory } from "@/content/journal";

/** Journal listing with category filter (PRD §6 categories). */
export default function JournalExplorer() {
  const [cat, setCat] = useState<JournalCategory | "All">("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const used = journalCategories.filter((c) => articles.some((a) => a.category === c));
  const shown = articles.filter((a) => cat === "All" || a.category === cat);

  useLayoutEffect(() => {
    const state = flipState.current;
    flipState.current = null;
    if (state) {
      Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 }),
        onComplete: () => requestRefresh(),
      });
    }
  }, [cat]);

  const pick = (c: JournalCategory | "All") => {
    if (c === cat) return;
    if (gridRef.current && !prefersReducedMotion()) flipState.current = Flip.getState(gridRef.current.querySelectorAll(".jgrid__item"));
    setCat(c);
  };

  return (
    <div className="explorer">
      <div className="filters filters--inline" role="group" aria-label="Filter articles by category">
        <button className={`chip${cat === "All" ? " is-active" : ""}`} aria-pressed={cat === "All"} onClick={() => pick("All")}>All articles</button>
        {used.map((c) => (
          <button key={c} className={`chip${cat === c ? " is-active" : ""}`} aria-pressed={cat === c} onClick={() => pick(c)}>
            {c}
          </button>
        ))}
      </div>
      <p className="filters__note">
        Categories appear here automatically as articles are published in them.
      </p>
      <div className="jgrid" ref={gridRef}>
        {articles.map((a, i) => (
          <div key={a.slug} className="jgrid__item" data-flip-id={a.slug} style={{ display: shown.includes(a) ? undefined : "none" }}>
            <JournalCard a={a} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
