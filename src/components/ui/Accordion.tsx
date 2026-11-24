"use client";

import { useId, useState } from "react";
import { Plus } from "./Icons";

export default function Accordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className={`accordion__item${isOpen ? " is-open" : ""}`} key={it.q}>
            <h3 className="accordion__h">
              <button
                id={`${uid}-b-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="accordion__btn"
              >
                <span>{it.q}</span>
                <span className="accordion__icon"><Plus /></span>
              </button>
            </h3>
            <div id={`${uid}-p-${i}`} role="region" aria-labelledby={`${uid}-b-${i}`} className="accordion__panel">
              <div>
                <p>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
