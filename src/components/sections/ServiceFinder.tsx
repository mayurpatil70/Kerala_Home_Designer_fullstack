"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ServiceIcon } from "@/components/ui/Icons";
import { services, type ServiceSlug } from "@/content/services";

type Kind = "home" | "business";
type Stage = "new" | "existing" | "inside";

const MATCH: Record<Kind, Record<Stage, ServiceSlug[]>> = {
  home: {
    new: ["residential-construction", "architectural-design", "turnkey-construction"],
    existing: ["renovation-remodelling", "interior-design"],
    inside: ["interior-design"],
  },
  business: {
    new: ["commercial-construction", "architectural-design", "turnkey-construction"],
    existing: ["renovation-remodelling", "interior-design"],
    inside: ["interior-design"],
  },
};

/** Two quick questions that point visitors to the right services. */
export default function ServiceFinder() {
  const [kind, setKind] = useState<Kind>("home");
  const [stage, setStage] = useState<Stage>("new");
  const matches = MATCH[kind][stage].map((s) => services.find((x) => x.slug === s)!);

  const opt = <T extends string>(value: T, current: T, set: (v: T) => void, label: string) => (
    <button key={value} className={`chip chip--lg${value === current ? " is-active" : ""}`} aria-pressed={value === current} onClick={() => set(value)}>
      {label}
    </button>
  );

  return (
    <div className="finder">
      <div className="finder__q">
        <p className="finder__label">1. What is the project for?</p>
        <div className="finder__opts">
          {opt<Kind>("home", kind, setKind, "A home")}
          {opt<Kind>("business", kind, setKind, "A business / commercial space")}
        </div>
        <p className="finder__label">2. What are you planning?</p>
        <div className="finder__opts">
          {opt<Stage>("new", stage, setStage, "Building new")}
          {opt<Stage>("existing", stage, setStage, "Improving an existing building")}
          {opt<Stage>("inside", stage, setStage, "Only the interiors")}
        </div>
      </div>
      <div className="finder__results" aria-live="polite">
        <p className="finder__label">Services that fit</p>
        <ul>
          {matches.map((s) => (
            <li key={`${kind}-${stage}-${s.slug}`}>
              <Link href={`/services/${s.slug}`} className="finder__item">
                <span className="finder__icon"><ServiceIcon name={s.icon} /></span>
                <span>
                  <strong>{s.title}</strong>
                  <span>{s.short}</span>
                </span>
                <ArrowUpRight className="finder__arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
